import {DefaultCrudRepository} from '@loopback/repository';
import {SpeedtestResults, SpeedtestResultsRelations} from '../models';
import {MySqlDataSourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SpeedtestResultsRepository extends DefaultCrudRepository<
  SpeedtestResults,
  typeof SpeedtestResults.prototype.testid,
  SpeedtestResultsRelations
> {
  constructor(
    @inject('datasources.mySqlDataSource')
    dataSource: MySqlDataSourceDataSource,
  ) {
    super(SpeedtestResults, dataSource);
  }
}
