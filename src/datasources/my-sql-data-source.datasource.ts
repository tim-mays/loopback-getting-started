import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './my-sql-data-source.datasource.json';
import SocksConnection = require('socksjs');
import {HttpErrors} from '@loopback/rest';

export class MySqlDataSourceDataSource extends juggler.DataSource {
  static dataSourceName = 'mySqlDataSource';

  constructor(
    @inject('datasources.config.mySqlDataSource', {optional: true})
    dsConfig: object = config,
  ) {
    if (process.env.NODE_ENV === 'production') {
      const mysqlServer = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      };

      const fixieUrl = process.env.FIXIE_SOCKS_HOST;

      if (fixieUrl !== undefined) {
        const fixieValues = fixieUrl.split(new RegExp('[/(:\\/@)/]+'));
        const fixieConnection = new SocksConnection(mysqlServer, {
          user: fixieValues[0],
          pass: fixieValues[1],
          host: fixieValues[2],
          port: fixieValues[3],
        });

        Object.assign(dsConfig, {
          host: undefined,
          port: undefined,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          stream: fixieConnection,
        });
      } else {
        throw new HttpErrors.InternalServerError(
          'Data source is not configured',
        );
      }
    } else {
      Object.assign(dsConfig, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });
    }

    super(dsConfig);
  }
}
