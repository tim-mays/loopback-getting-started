import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'demo-bays', table: 'speedtest_results'},
  },
})
export class SpeedtestResults extends Entity {
  @property({
    type: Date,
    required: false,
    mysql: {
      columnName: 'resultDate',
      dataType: 'datetime',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  resultdate?: Date;

  @property({
    type: String,
    required: false,
    length: 45,
    mysql: {
      columnName: 'ipAddress',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  ipaddress?: String;

  @property({
    type: String,
    required: false,
    length: 45,
    mysql: {
      columnName: 'country',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  country?: String;

  @property({
    type: String,
    required: false,
    length: 45,
    mysql: {
      columnName: 'region',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  region?: String;

  @property({
    type: String,
    required: false,
    length: 45,
    mysql: {
      columnName: 'city',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  city?: String;

  @property({
    type: Number,
    required: false,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'latitude',
      dataType: 'decimal',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  latitude?: Number;

  @property({
    type: Number,
    required: false,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'longitude',
      dataType: 'decimal',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  longitude?: Number;

  @property({
    type: String,
    required: false,
    length: 45,
    mysql: {
      columnName: 'serverSponsor',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  serversponsor?: String;

  @property({
    type: String,
    required: false,
    length: 45,
    mysql: {
      columnName: 'browserName',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  browsername?: String;

  @property({
    type: String,
    required: false,
    length: 45,
    mysql: {
      columnName: 'browserVersion',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  browserversion?: String;

  @property({
    type: String,
    required: false,
    length: 255,
    mysql: {
      columnName: 'userAgent',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  useragent?: String;

  @property({
    type: String,
    required: false,
    length: 45,
    mysql: {
      columnName: 'ispName',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  ispname?: String;

  @property({
    type: String,
    required: false,
    length: 45,
    mysql: {
      columnName: 'ispNameRaw',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  ispnameraw?: String;

  @property({
    type: String,
    required: false,
    length: 45,
    mysql: {
      columnName: 'OS',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  os?: String;

  @property({
    type: Number,
    required: false,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'download',
      dataType: 'decimal',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  download?: Number;

  @property({
    type: Number,
    required: false,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'upload',
      dataType: 'decimal',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  upload?: Number;

  @property({
    type: Number,
    required: false,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'latency',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  latency?: Number;

  @property({
    type: Number,
    required: false,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'jitter',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'Y',
    },
  })
  jitter?: Number;

  @property({
    type: String,
    required: true,
    length: 36,
    id: 1,
    mysql: {
      columnName: 'testId',
      dataType: 'char',
      dataLength: 36,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  testid: String;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SpeedtestResults>) {
    super(data);
  }
}

export interface SpeedtestResultsRelations {
  // describe navigational properties here
}

export type SpeedtestResultsWithRelations = SpeedtestResults &
  SpeedtestResultsRelations;
