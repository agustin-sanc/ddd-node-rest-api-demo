import Http from 'http';
import MongoMemoryDatabase from '../persistence/mongo-db/mongo-memory-database';
import setupEnvironmentVariables from '../../../src/infrastructure/setup-environment-variables';
import createHttpServerWithRESTAPI from '../../../src/infrastructure/rest-api/create-http-server-with-rest-api';

export default class TestingApplication {
  private httpServer: Http.Server;
  private database: MongoMemoryDatabase;

  public async start(): Promise<void> {
    setupEnvironmentVariables();
    await this.initDatabase();
    this.createHttpServer();
  }

  public async stop(): Promise<void> {
    await this.database.kill();
    this.httpServer.close();
  }

  public async clearDatabase(): Promise<void> {
    await this.database.clear();
  }

  private createHttpServer() {
    this.httpServer = createHttpServerWithRESTAPI();
  }

  private async initDatabase() {
    this.database = new MongoMemoryDatabase();
    await this.database.start();
  }

  public getHttpServer(): Http.Server {
    return this.httpServer;
  }
}