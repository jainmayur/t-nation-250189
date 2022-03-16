import { pino } from 'pino';
import * as express from 'express';
import { UserService } from '../services/user.service';
import * as joi from 'joi';

export class UserController {
  public router = express.Router();

  private log: pino.Logger;

  private service: UserService;

  constructor() {
    this.log = pino().child({ context: UserController.name });
    this.service = new UserService();
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.get('/api/users/:id', this.getUser());
    this.router.post('/api/users/login', this.loginUser());
    this.router.post('/api/users/register', this.registerUser());
  }

  private loginUser() {
    return async (req, res) => {
      const username = req.body.username;
      const password = req.body.password;

      // validate incoming request
      const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required()
      })
      const { error } = schema.validate({username,password}, { abortEarly: false });
      if (error) {
        const errors = error.details.map((e) => e.message);
        this.log.error({ errors}, `GET /api/users/login`);
        res.status(400).json({errors});
        return;
      }

      this.log.info({username,password}, 'loginUser called');

      const result = await this.service.loginUser(username, password);
      if (result !== null) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    };
  }

  private getUser() {
    return async (req, res) => {
      const id = req.params.id;

      // validate incoming request
      const schema = joi.object({
        id: joi.number().integer().min(1)
      })
      const { error } = schema.validate({id}, { abortEarly: false });
      if (error) {
        const errors = error.details.map((e) => e.message);
        this.log.error({ errors}, `GET /api/user/:id`);
        res.status(400).json({errors});
        return;
      }

      this.log.info({ id }, 'getUser called');

      const result = await this.service.getUser(id);
      if (result !== null) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    };
  }

  private registerUser() {
    return async (req, res) => {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const nickName = req.body.nickName;
      const email = req.body.email;
      const password = req.body.password;
      const isTeacher = req.body.isTeacher;

      // validate incoming request
      const schema = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        nickName: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        isTeacher: joi.number().required()
      })
      const { error } = schema.validate({firstName, lastName, nickName, email, password, isTeacher}, { abortEarly: false });
      if (error) {
        const errors = error.details.map((e) => e.message);
        this.log.error({ errors}, `GET /api/user/register`);
        res.status(400).json({errors});
        return;
      }

      this.log.info({firstName, lastName, nickName, email, password, isTeacher}, 'registerUser called');

      const result = await this.service.registerUser(firstName, lastName, nickName, email, password, isTeacher);
      if (result !== null) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    };
  }
}