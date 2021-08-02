import * as request from 'supertest';
import TestingApplication from "../testing-application";
import createUserIntoMongoDB from "../../../../src/infrastructure/mongo/scripts/create-admin-user";
import User from "../../../../src/domain/entities/user";
import ID from "../../../../src/domain/value-objects/id";
import EmailAddress from "../../../../src/domain/value-objects/email-address";
import Password from "../../../../src/domain/value-objects/password";
import {UserTypes} from "../../../../src/domain/enums/user-types";

describe('POST /api/v1/user', () => {
  let app: TestingApplication;

  beforeAll(async () => {
    app = new TestingApplication();
    await app.start();
  });

  afterEach(async () => {
    await app.clearDatabase();
  });

  afterAll(async () => {
    await app.stop();
  });

  test('it should return 201 when user is created successfully', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/user')
      .send({
        emailAddress: 'agustin@email.com',
        password: '1234',
        type: 'END_USER'
      })
      .then(response => {
        expect(response.statusCode).toBe(201);
      });
  });

  test('it should return 400 when email address is not provided', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/user')
      .send({
        password: '1234',
        type: 'END_USER'
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });

  test('it should return 400 when password is not provided', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/user')
      .send({
        emailAddress: 'agustin@email.com',
        password: undefined,
        type: 'END_USER'
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });

  test('it should return 400 when type is not provided', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/user')
      .send({
        emailAddress: 'agustin@email.com',
        password: '1234',
        type: undefined
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });

  test('it should return 409 when email address is already taken', async () => {
    await createUserIntoMongoDB(new User({
      id: new ID('2'),
      emailAddress: new EmailAddress('agustin@email.com'),
      password: new Password('1234'),
      type: UserTypes.END_USER
    }));

    await request(app.getHttpServer())
      .post('/api/v1/user')
      .send({
        emailAddress: 'agustin@email.com',
        password: '1234',
        type: 'END_USER'
      })
      .then(response => {
        expect(response.statusCode).toBe(409);
      });
  });
})