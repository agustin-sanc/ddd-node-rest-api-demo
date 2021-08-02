import * as request from 'supertest';
import TestingApplication from "../testing-application";
import createUserIntoMongoDB, {createAdminUserIntoMongoDB} from "../../../../src/infrastructure/mongo/scripts/create-admin-user";
import User from "../../../../src/domain/entities/user";
import ID from "../../../../src/domain/value-objects/id";
import EmailAddress from "../../../../src/domain/value-objects/email-address";
import Password from "../../../../src/domain/value-objects/password";
import {UserTypes} from "../../../../src/domain/enums/user-types";

describe('POST /api/v1/session', () => {
  let app: TestingApplication;

  beforeAll(async () => {
    app = new TestingApplication();
    await app.start();
  });

  beforeEach(async () => {
    await createAdminUserIntoMongoDB();

    await createUserIntoMongoDB(new User({
      id: new ID('2'),
      emailAddress: new EmailAddress('agustin@email.com'),
      password: new Password('1234'),
      type: UserTypes.END_USER
    }));
  });

  afterEach(async () => {
    await app.clearDatabase();
  });

  afterAll(async () => {
    await app.stop();
  });

  test('it should return 201 when session is created successfully', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/session')
      .send({
        emailAddress: 'admin@email.com',
        password: '1234',
      })
      .then(response => {
        expect(response.statusCode).toBe(201);
      })
  });

  test('it should return a token when the session is created successfully', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/session')
      .send({
        emailAddress: 'admin@email.com',
        password: '1234',
      })
      .then(response => {
        expect(response.body.token).toBeDefined();
      })
  });

  test('it should return 400 when email address is not provided', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/session')
      .send({
        emailAddress: undefined,
        password: '1234',
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
      })
  });

  test('it should return 400 when password is not provided', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/session')
      .send({
        emailAddress: 'admin@email.com',
        password: undefined,
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
      })
  });

  test('it should return 401 when credentials are invalid', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/session')
      .send({
        emailAddress: 'admin@email.com',
        password: '4325',
      })
      .then(response => {
        expect(response.statusCode).toBe(401);
      })
  });
});