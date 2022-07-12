import {Inject, Injectable, registerProvider} from "@tsed/di";
import {DataSource} from "typeorm";
import {Logger} from "@tsed/logger";
import {Offers} from "../entities/Offers";

export const MSSQL_DATA_SOURCE = Symbol.for("MssqlDataSource");

// @ts-ignore
export const MssqlDataSource = new DataSource({
  database: process.env.MSSQL_DB_NAME,
  entities: [Offers],
  subscribers: [`${__dirname}/model-subscribers/*{.ts,.js}`],
  host: process.env.MSSQL_HOST,
  password: process.env.MSSQL_PASSWORD,
  port: Number(process.env.MSSQL_PORT),
  type: 'mssql',
  username: process.env.MSSQL_USER,
  requestTimeout: 50000,
  options: {
    useUTC: true,
    enableArithAbort: false,
    trustServerCertificate: true,
  },
  logging: true,
  logger: 'advanced-console',
});

registerProvider<DataSource>({
  provide: MSSQL_DATA_SOURCE,
  type: "typeorm:datasource",
  deps: [Logger],
  async useAsyncFactory(logger: Logger) {
    await MssqlDataSource.initialize();

    logger.info("Connected with typeorm to database: Mssql");

    return MssqlDataSource;
  },
  hooks: {
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.close();
    }
  }
});

@Injectable()
export class MyService {
  @Inject(MSSQL_DATA_SOURCE)
  protected mssqlDataSource: DataSource;

  async $onInit() {
    if (this.mssqlDataSource.isInitialized) {
      console.log("Mssql DB initialized!");
    }
  }
}
