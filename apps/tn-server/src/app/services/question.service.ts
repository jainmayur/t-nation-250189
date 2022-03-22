import { QuestionDao } from "../daos/question.dao";


export class QuestionService {
  private dao: QuestionDao;

  constructor() {
    this.dao = new QuestionDao();
  }

    public async addQuestion(question: string, correctAnswer: string, otherAnswersJSON: string): Promise<boolean> {
    const result =  await this.dao.addQuestion(question, correctAnswer, otherAnswersJSON);
    console.log(result);
    return result;
   }

}
