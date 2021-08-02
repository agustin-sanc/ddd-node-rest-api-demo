import * as request from 'supertest';
import TestingApplication from "../testing-application";
import JwtService from "../../../../src/infrastructure/services/jwt-service";
import ID from "../../../../src/domain/value-objects/id";
import createUserIntoMongoDB, {createAdminUserIntoMongoDB} from "../../../../src/infrastructure/mongo/scripts/create-admin-user";
import User from "../../../../src/domain/entities/user";
import Password from "../../../../src/domain/value-objects/password";
import EmailAddress from "../../../../src/domain/value-objects/email-address";
import {UserTypes} from "../../../../src/domain/enums/user-types";

describe('GET /api/v1/user', () => {
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

  test('it should return user successfully when only admin token is provided', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/user')
      .set('Authorization', `Bearer ${adminToken}`)
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.user).toBeDefined();
      });
  });

  test('it should return user successfully when only admin token and user id is provided', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/user')
      .query({
        id: adminUserId.getValue()
      })
      .set('Authorization', `Bearer ${adminToken}`)
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.user).toBeDefined();
      });
  });

  test("it should return user successfully when only end user's token is provided", async () => {
    await request(app.getHttpServer())
      .get('/api/v1/user')
      .set('Authorization', `Bearer ${endUserToken}`)
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.user).toBeDefined();
      });
  });

  test("it should return unauthorized error when token is not provided", async () => {
    await request(app.getHttpServer())
      .get('/api/v1/user')
      .then(response => {
        expect(response.status).toBe(401);
      });
  });


  test("it should return forbidden error when end user's token is provided along with another user's id inside params", async () => {
    await request(app.getHttpServer())
      .get('/api/v1/user')
      .set('Authorization', `Bearer ${endUserToken}`)
      .query({
        id: adminUserId.getValue()
      })
      .then(response => {
        expect(response.status).toBe(403);
      });
  });

  test("it should return user successfully when end user's token is provided along with his user's id inside params", async () => {
    await request(app.getHttpServer())
      .get('/api/v1/user')
      .set('Authorization', `Bearer ${endUserToken}`)
      .query({
        id: endUserId.getValue()
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.user).toBeDefined();
      });
  });
})