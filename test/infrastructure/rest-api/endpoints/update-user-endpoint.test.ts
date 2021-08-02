import * as request from 'supertest';
import TestingApplication from "../testing-application";
import JwtService from "../../../../src/infrastructure/services/jwt-service";
import ID from "../../../../src/domain/value-objects/id";
import createUserIntoMongoDB, {createAdminUserIntoMongoDB} from "../../../../src/infrastructure/mongo/scripts/create-admin-user";
import User from "../../../../src/domain/entities/user";
import Password from "../../../../src/domain/value-objects/password";
import EmailAddress from "../../../../src/domain/value-objects/email-address";
import {UserTypes} from "../../../../src/domain/enums/user-types";

describe('PATCH /api/v1/user', () => {
  let app: TestingApplication;
  let adminUserId: ID, adminToken: string;
  let endUserId: ID, endUserToken: string;

  beforeAll(async () => {
    app = new TestingApplication();
    await app.start();

    const jwtService = new JwtService();

    adminUserId = new ID('1');
    adminToken = jwtService.createToken(adminUserId);

    endUserId = new ID('2');
    endUserToken = jwtService.createToken(endUserId);
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

  test('it should return 200 when user is updated successfully', async () => {
    await request(app.getHttpServer())
      .patch('/api/v1/user')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        id: adminUserId.getValue(),
        emailAddress: 'etc@email.com'
      })
      .then(response => {
        expect(response.status).toBe(200);
      });
  });

  test('it should return 200 when admin wants to edit some end user', async () => {
    await request(app.getHttpServer())
      .patch('/api/v1/user')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        id: endUserId.getValue(),
        emailAddress: 'etc@email.com'
      })
      .then(response => {
        expect(response.status).toBe(200);
      });
  });

  test('it should return 403 when some end user wants to edit some user', async () => {
    await request(app.getHttpServer())
      .patch('/api/v1/user')
      .set('Authorization', `Bearer ${endUserToken}`)
      .send({
        id: adminUserId.getValue(),
        emailAddress: 'etc@email.com'
      })
      .then(response => {
        expect(response.status).toBe(403);
      });
  });
})