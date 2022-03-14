import { User } from '../../../../shared/user';
import * as express from 'express';
import path = require('path');
import * as request from 'supertest';
import { Db } from '../db';
import { UserController } from './user.controller';

describe('UserController', () => {
  let app;
  beforeAll(() => {
    app = express();
    app.use(express.json());

    // init sqlite (in memory)
    new Db(path.join(__dirname, '../../assets/trivia-nation.sql'), ':memory:');

    app.use(new UserController().router);
  });

  it('should return a teacher', () => {
    return request(app)
      .get('/api/users/1')
      .expect(200)
      .then((resp) => {
        const user: User = resp.body;
        expect(user.isTeacher).toBe(true);
      });
  });

  it('should return a student', () => {
    return request(app)
      .get('/api/users/2')
      .expect(200)
      .then((resp) => {
        const user: User = resp.body;
        expect(user.isTeacher).toBe(false);
      });
  });

  it('should return null if user id does not exist', () => {
    return request(app)
      .post('/api/users/3')
      .expect(404)
      .then((resp) => {
        expect(resp.body).toStrictEqual({});
      });
  });
});
