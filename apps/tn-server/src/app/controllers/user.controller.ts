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
        this.log.error({ errors}, `GET /api/user/login`);
        res.status(400).json({errors});
        return;
      }

      this.log.info({username,password}, 'getUser called');

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
      const email = req.body.email;

      // validate incoming request
      const schema = joi.object({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        email: joi.string().required()
      })
      const { error } = schema.validate({firstName,lastName, email}, { abortEarly: false });
      if (error) {
        const errors = error.details.map((e) => e.message);
        this.log.error({ errors}, `GET /api/user/register`);
        res.status(400).json({errors});
        return;
      }

      this.log.info({firstName,lastName, email}, 'getUser called');

      const result = await this.service.registerUser(firstName,lastName, email);
      if (result !== null) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    };
  }
}
