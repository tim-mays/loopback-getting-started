import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey} from '@loopback/core';
import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {
  TokenServiceBindings,
  UserServiceBindings,
  TokenServiceConstants,
  PasswordHasherBindings,
} from './keys';
import {JWTService} from './services/jwt-service';
import {MyUserService} from './services/user-service';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication, RestBindings} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
import {JWTAuthenticationStrategy} from './authentication-strategies/jwt-strategy';
import {BcryptHasher} from './services/hash.password.bcryptjs';
import {SECURITY_SCHEMA_SPEC, SECURITY_SPEC} from './utils/security-spec';

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}
export const PackageKey = BindingKey.create<PackageInfo>('application.package');

const pkg: PackageInfo = require('../package.json');

export class StarterApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.setUpBindings();

    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);
    this.component(AuthenticationComponent);
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBindings(): void {
    // Bind package.json to the application context
    this.bind(PackageKey).to(pkg);

    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

    // // Bind bcrypt hash services
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
  }

  async start(): Promise<void> {
    await super.start();
    const oaiSpec = this.getSync(RestBindings.API_SPEC);
    this.api(
      Object.assign(oaiSpec, {
        components: {
          ...SECURITY_SCHEMA_SPEC,
        },
        security: SECURITY_SPEC,
      }),
    );
  }
}
