import { pino } from 'pino';
import * as express from 'express';
import * as joi from 'joi';
import { TriviaService } from '../services/trivia.service';

export class TriviaController {
  public router = express.Router();

  private log: pino.Logger;

  private service: TriviaService;

  constructor() {
    this.log = pino().child({ context: TriviaController.name });
    this.service = new TriviaService();
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.get('/api/trivia/:code', this.getGamesByTriviaCode());
    this.router.get('/api/triviaByUserId/:id', this.getGamesByUserId());
    this.router.post('/api/trivia/addContestForUser', this.addContestForUser());
  }

  private getGamesByTriviaCode() {
    return async (req, res) => {
      const code = req.params.code;

      // validate incoming request
      const schema = joi.object({
        code: joi.string()
      })
      const { error } = schema.validate({code}, { abortEarly: false });
      if (error) {
        const errors = error.details.map((e) => e.message);
        this.log.error({ errors}, `GET /api/trivia/:code`);
        res.status(400).json({errors});
        return;
      }

      this.log.info({ code }, 'getGamesByTriviaCode called');

      const result = await this.service.getGameByTriviaCode(code);
     
      if (result !== null) {
        this.log.info({ result }, 'retreived game');
        res.status(200).json(result);
      } else {
        res.status(200).json(result);
      }
    };
  }

  private getGamesByUserId() {
    return async (req, res) => {
      const id = req.params.id;

      // validate incoming request
      const schema = joi.object({
        id: joi.number().integer().min(1)
      })
      const { error } = schema.validate({id}, { abortEarly: false });
      if (error) {
        const errors = error.details.map((e) => e.message);
        this.log.error({ errors}, `GET /api/triviaByUserId/:id`);
        res.status(400).json({errors});
        return;
      }

      this.log.info({ id }, 'getGamesByUserId called');

      const result = await this.service.getGamesByUserId(id);
     
      if (result !== null) {
        this.log.info({ result }, 'retreived game');

        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    };
  }

  private addContestForUser() {
    return async (req, res) => {
      //todo how to unstringify
      const userId = req.params.userID;
      const gameId = req.params.gameID

      // validate incoming request
      const schema = joi.object({
        userId: joi.string().required(),
        gameId: joi.string().required()
      })

      const { error } = schema.validate({userId,gameId}, { abortEarly: false });
      if (error) {
        const errors = error.details.map((e) => e.message);
        this.log.error({ errors}, `POST /api/trivia/addContestForUser`);
        res.status(400).json({errors});
        return;
      }

      this.log.info({ userId,gameId }, 'addContestForUser called');

      const result = await this.service.addContestForUser(userId, gameId);
     
      if (result !== null) {
        this.log.info({ result }, 'retreived game');

        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    };
  }
}
