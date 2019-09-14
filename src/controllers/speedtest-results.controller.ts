import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {SpeedtestResults} from '../models';
import {SpeedtestResultsRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {SecurityBindings} from '@loopback/security';

export class SpeedtestResultsController {
  constructor(
    @repository(SpeedtestResultsRepository)
    public speedtestResultsRepository: SpeedtestResultsRepository,
  ) {}

  @post('/speedtest-results', {
    responses: {
      '200': {
        description: 'SpeedtestResults is created',
        content: {
          'application/json': {schema: getModelSchemaRef(SpeedtestResults)},
        },
      },
    },
  })
  @authenticate('jwt')
  async create(
    @inject(SecurityBindings.USER)
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SpeedtestResults, {exclude: ['testid']}),
        },
      },
    })
    speedtestResults: Omit<SpeedtestResults, 'testid'>,
  ): Promise<SpeedtestResults> {
    return this.speedtestResultsRepository.create(speedtestResults);
  }

  @get('/speedtest-results/count', {
    responses: {
      '200': {
        description: 'SpeedtestResults count is read',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @inject(SecurityBindings.USER)
    @param.query.object('where', getWhereSchemaFor(SpeedtestResults))
    where?: Where<SpeedtestResults>,
  ): Promise<Count> {
    return this.speedtestResultsRepository.count(where);
  }

  @get('/speedtest-results', {
    responses: {
      '200': {
        description: 'Array of SpeedtestResults is read',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SpeedtestResults)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @inject(SecurityBindings.USER)
    @param.query.object('filter', getFilterSchemaFor(SpeedtestResults))
    filter?: Filter<SpeedtestResults>,
  ): Promise<SpeedtestResults[]> {
    return this.speedtestResultsRepository.find(filter);
  }

  @patch('/speedtest-results', {
    responses: {
      '200': {
        description: 'SpeedtestResults are updated',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @inject(SecurityBindings.USER)
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SpeedtestResults, {partial: true}),
        },
      },
    })
    speedtestResults: SpeedtestResults,
    @param.query.object('where', getWhereSchemaFor(SpeedtestResults))
    where?: Where<SpeedtestResults>,
  ): Promise<Count> {
    return this.speedtestResultsRepository.updateAll(speedtestResults, where);
  }

  @get('/speedtest-results/{id}', {
    responses: {
      '200': {
        description: 'SpeedtestResult is read',
        content: {
          'application/json': {schema: getModelSchemaRef(SpeedtestResults)},
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @inject(SecurityBindings.USER)
    @param.path.string('id')
    id: string,
  ): Promise<SpeedtestResults> {
    return this.speedtestResultsRepository.findById(id);
  }

  @patch('/speedtest-results/{id}', {
    responses: {
      '204': {
        description: 'SpeedtestResult is updated',
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
          schema: getModelSchemaRef(SpeedtestResults, {partial: true}),
        },
      },
    })
    speedtestResults: SpeedtestResults,
  ): Promise<void> {
    await this.speedtestResultsRepository.updateById(id, speedtestResults);
  }

  @put('/speedtest-results/{id}', {
    responses: {
      '204': {
        description: 'SpeedtestResult is replaced',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @inject(SecurityBindings.USER)
    @param.path.string('id')
    id: string,
    @requestBody() speedtestResults: SpeedtestResults,
  ): Promise<void> {
    await this.speedtestResultsRepository.replaceById(id, speedtestResults);
  }

  @del('/speedtest-results/{id}', {
    responses: {
      '204': {
        description: 'SpeedtestResult is deleted',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(
    @inject(SecurityBindings.USER)
    @param.path.string('id')
    id: string,
  ): Promise<void> {
    await this.speedtestResultsRepository.deleteById(id);
  }
}
