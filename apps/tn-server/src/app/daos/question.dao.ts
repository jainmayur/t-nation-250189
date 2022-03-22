import { Db } from '../db';


export class QuestionDao {
  // initialize sqlite connector
  private sqlite: Db;
  //private log: pino.Logger;

  constructor() {
    this.sqlite = new Db();
    
  }

  public async addQuestion(question: string, correctAnswer: string, otherAnswersJSON: string): Promise<boolean> {
    const $question = question;
    const $correctAnswer = correctAnswer;
    const $otherAnswersJSON = otherAnswersJSON;
    return await this.sqlite.run(`INSERT INTO question (question, correctAnswer, otherAnswersJSON) VALUES ($question, $correctAnswer, $otherAnswersJSON)`, 
    { $question, $correctAnswer, $otherAnswersJSON }).then(()=>{
       return true;
    }).catch(err=>{
      return err;
    })
   }
}