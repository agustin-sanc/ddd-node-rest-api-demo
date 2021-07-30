import * as Mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export default async function createConnectionWithMongoDB(URI?: string): Promise<any> {
  if(!URI) URI = process.env.MONGODB_URI;

  const database = await createConnectedMongoDatabase(URI);

  setOptions(database);
  setOnErrorBehaviour(database);
  setOnDisconnectedBehaviour(database, URI);

  return database.connection;
}

async function createConnectedMongoDatabase(URI: string): Promise<any> {
  const database = await Mongoose.connect(
    URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).catch((error) => {
    console.error(error);
    throw new Error('Error connecting with MongoDB');
  });

  console.log('Mongoose is connected with MongoDB');
  return database;
}

function setOptions(database: any): void {
  database.set('bufferCommands', false);
  database.set('debug', true);
}

function setOnDisconnectedBehaviour(database: any, URI: string): void {
  database.connection.on('disconnected', async () => {
    console.log('Mongoose is disconnected from MongoDB');

    await createConnectionWithMongoDB(URI);
  });
}

function setOnErrorBehaviour(database: any): void {
  database.connection.on('error', (error) => {
    console.error(error);
  });
}

export async function setupMongoMemoryDatabase(): Promise<void> {
  const server = await MongoMemoryServer.create();
  const uri = server.getUri();

  await createConnectionWithMongoDB(uri);
}