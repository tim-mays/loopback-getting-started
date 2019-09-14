import {StarterApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import * as dotenv from 'dotenv';

export {StarterApplication, PackageInfo, PackageKey} from './application';

export async function main(options: ApplicationConfig = {}) {
  dotenv.config();
  const app = new StarterApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
