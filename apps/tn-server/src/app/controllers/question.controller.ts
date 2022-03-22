import { pino } from 'pino';
import * as express from 'express';
import { QuestionService } from '../services/question.service';
import * as joi from 'joi';

export class QuestionController {
  public router = express.Router();
  private log: pino.Logger;
  private service: QuestionService;

  constructor() {
    this.log = pino().child({ context: QuestionController.name });
    this.service = new QuestionService();
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.post('/api/trivia/addquestion', this.addQuestion());
  }

  
  private addQuestion() {
    return async (req, res) => {
      const question = req.body.question;
      const correctAnswer = req.body.correctAnswer;
      const otherAnswersJSON = req.body.otherAnswersJSON;
      
      // validate incoming request
      const schema = joi.object({
        question: joi.string().required(),
        correctAnswer: joi.string().required(),
        otherAnswersJSON: joi.string().required(),
      })

      const { error } = schema.validate({question, correctAnswer, otherAnswersJSON}, { abortEarly: false });
      if (error) {
        const errors = error.details.map((e) => e.message);
        this.log.error({ errors}, `POST /api/trivia/addquestion`);
        res.status(400).json({errors});
        return;
      }

      this.log.info({question, correctAnswer, otherAnswersJSON}, 'addQuestion called');

      const result = await this.service.addQuestion(question, correctAnswer, otherAnswersJSON);
      if (result !== null) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    };
  }
}