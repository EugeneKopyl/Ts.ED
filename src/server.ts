import path, {join} from "path";
import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import {config} from "./config";
import * as test from "./controllers/test";
import {AjvErrorObject} from '@tsed/ajv';
import {SqlServerConnectionOptions} from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  // httpsPort: 8084, // CHANGE
  componentsScan: false,
  mount: {
    "/test": [
      ...Object.values(test)
    ]
  },
  middlewares: [
    cors(),
    cookieParser(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    })
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
// @Configuration({
//   ...config,
//   componentsScan: false,
//   acceptMimes: ["application/json", "application/vnd.ms-excel", "application/pdf"],
//   httpPort: process.env.PORT || '3000',
//   httpsPort: false,
//   mount: {
//     "/test": `${path.resolve(__dirname)}/controllers/**/*.ts`
//   },
//   rootDir: __dirname,
//   connectionTimeout: 50000,
//   requestTimeout: 50000,
//   typeorm: [
//     {
//       database: process.env.GIV_DB_DATABASE,
//       entities: [`${__dirname}/entities/*{.ts,.js}`],
//       subscribers: [`${__dirname}/model-subscribers/*{.ts,.js}`],
//       host: process.env.MSSQL_HOST,
//       name: process.env.MSSQL_DB_NAME,
//       password: process.env.MSSQL_PASSWORD,
//       port: Number(process.env.MSSQL_PORT),
//       type: 'mssql',
//       username: process.env.MSSQL_USER,
//       requestTimeout: 50000,
//       options: {
//         useUTC: true,
//         enableArithAbort: false,
//         trustServerCertificate: true,
//       },
//       logging: true,
//       logger: 'advanced-console',
//     } as SqlServerConnectionOptions,
//   ],
//   ajv: {
//     errorFormatter: (error: AjvErrorObject & { dataPath: any }) => {
//       if (!error) {
//         return 'Unknown error';
//       }
//       return [
//         error.modelName || error.dataPath
//           ? `At ${error.modelName || ''}${error.dataPath || ''}`
//           : ``,
//         `value '${JSON.stringify(error.data)}' ${error.message}`,
//       ]
//         .filter((str) => str)
//         .join(', ');
//     },
//     allErrors: true,
//     verbose: true,
//     additionalProperties: true,
//   } as any,
//   logger: {
//     disableRoutesSummary: true,
//   },
//   middlewares: [
//     cors(),
//     cookieParser(),
//     compress({}),
//     methodOverride(),
//     bodyParser.json(),
//     bodyParser.urlencoded({
//       extended: true
//     })
//   ],
//   views: {
//     root: join(process.cwd(), "../views"),
//     extensions: {
//       ejs: "ejs"
//     }
//   },
//   exclude: [
//     "**/*.spec.ts"
//   ]
// })

export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
