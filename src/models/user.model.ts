import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'demo-bays', table: 'User'}},
})
export class User extends Entity {
  @property({
    type: 'string',
    required: false,
    length: 36,
    id: 1,
    mysql: {
      columnName: 'id',
      dataType: 'char',
      dataLength: 36,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  id: string;

  @property({
    type: String,
    required: true,
    length: 45,
    mysql: {
      columnName: 'email',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  email: String;

  @property({
    type: 'string',
    required: true,
    length: 60,
    mysql: {
      columnName: 'password',
      dataType: 'binary',
      dataLength: 60,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  password: string;

  @property({
    type: String,
    required: false,
    length: 255,
    mysql: {
      columnName: 'firstName',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  firstname?: String;

  @property({
    type: String,
    required: false,
    length: 255,
    mysql: {
      columnName: 'lastName',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  lastname?: String;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
