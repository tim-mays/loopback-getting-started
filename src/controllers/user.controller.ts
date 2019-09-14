import {repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  HttpErrors,
  RestBindings,
  Request,
} from '@loopback/rest';
import {inject, Context} from '@loopback/core';
import {validateCredentials} from '../services/validator';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {UserProfile, securityId, SecurityBindings} from '@loopback/security';
import {
  CredentialsRequestBody,
  UserProfileSchema,
} from './specs/user-controller.specs';
import {Credentials} from '../repositories/user.repository';
import {PasswordHasher} from '../services/hash.password.bcryptjs';
import {inspect} from 'util';

import {
  TokenServiceBindings,
  PasswordHasherBindings,
  UserServiceBindings,
} from '../keys';
import * as _ from 'lodash';
import {SECURITY_SPEC_OPERATION} from '../utils/security-spec';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @inject(RestBindings.Http.CONTEXT) public ctx: Context,
    @inject(RestBindings.Http.REQUEST) private request: Request,
  ) {}

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {token};
  }

  @post('/users', {
    responses: {
      '200': {
        description: 'User is created',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @inject(SecurityBindings.USER)
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {exclude: ['id']}),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    validateCredentials(_.pick(user, ['email', 'password']));
    // eslint-disable-next-line require-atomic-updates
    user.password = await this.passwordHasher.hashPassword(user.password);

    try {
      const savedUser = await this.userRepository.create(user);
      delete savedUser.password;
      return savedUser;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' && error.errno === 1062) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @get('/users/me', {
    responses: {
      '200': {
        description: 'Current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<UserProfile> {
    // (@jannyHou)FIXME: explore a way to generate OpenAPI schema
    // for symbol property
    currentUserProfile.id = currentUserProfile[securityId];
    delete currentUserProfile[securityId];
    return currentUserProfile;
  }

  @get('/users/{id}', {
    security: SECURITY_SPEC_OPERATION,
    responses: {
      '200': {
        description: 'User is read',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @inject(SecurityBindings.USER)
    @param.path.string('id')
    id: string,
  ): Promise<User> {
    console.log(`header ${inspect(this.request.headers)}`);
    return this.userRepository.findById(id);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User is updated',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @inject(SecurityBindings.USER)
    @param.path.string('id')
    id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User is replaced',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @inject(SecurityBindings.USER)
    @param.path.string('id')
    id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User is deleted',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(
    @inject(SecurityBindings.USER) @param.path.string('id') id: string,
  ): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
