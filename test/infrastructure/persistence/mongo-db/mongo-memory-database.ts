import { MongoMemoryServer } from 'mongodb-memory-server';
import createConnectionWithMongoDB from "../../../../src/infrastructure/mongo/setup-mongo";

export default class MongoMemoryDatabase {
  private server: MongoMemoryServer;
  private connection: any;

  public async start(): Promise<void> {
    await this.createServer();
    await this.createConnection();
  }

  public async clear(): Promise<void> {
    await this.connection.db.dropDatabase().catch((error) => {
      console.error(error);
      throw new Error('Error resetting Mongo memory database');
    });
  }

  public async kill(): Promise<void> {
    await this.closeConnection();
    await this.stopServer();
  }

  private async createServer() {
    this.server = await MongoMemoryServer.create();
  }

  private async createConnection() {
    this.connection = await createConnectionWithMongoDB(this.server.getUri());
  }

  private async stopServer(): Promise<void> {
    await this.server.stop().catch((error) => {
      console.error(error);
      throw new Error('Error stopping Mongo memory database server');
    });
  }

  private async closeConnection(): Promise<void> {
    await this.connection.close().catch((error) => {
      console.error(error);
      throw new Error(
        'Error closing connection with Mongo memory database server',
      );
    });
  }
}