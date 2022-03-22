import { User } from '../../../../shared/user';
import { LoginUserRes, UserDao } from '../daos/user.dao';
import { CONTESTS } from '../../../../shared/mocks/mock-trivia-contests';
import { TriviaDao } from '../daos/trivia.dao';

export class UserService {
  private dao: UserDao;
  private triviaService: TriviaDao;
  //private _isTeacher : number;

  // get isTeacher() : number{
  //  return this._isTeacher; 
  // }

  // set isTeacher(isTeacher: number){
  //   this._isTeacher = isTeacher;
  // } 

  constructor() {
    this.dao = new UserDao();
    this.triviaService = new TriviaDao();
  }

  public async getUser(id: number): Promise<User> {
    const result = await this.dao.getUser(id);
    if (result) {
      // convert isTeacher field to boolean
      result.isTeacher = (result.isTeacher as any) === 1;


      //result.triviaContests = await this.triviaService.getContestsForUserId(id);
    }
    return result;
  }

  public async loginUser(username: string, password: string): Promise<LoginUserRes> {
    const result = await this.dao.loginUser(username, password);
    // if (result.isLogin) {
    //   // // convert isTeacher field to boolean
    //   // result.isTeacher = (result.isTeacher as any) === 1;
    //   // result.triviaContests = [CONTESTS[0].id, CONTESTS[1].id];
      //console.log("tn-server/userservice" + result);
      //this.isTeacher = result.isTeacher;
    //}
    return result;
  }

  public async registerUser(firstName: string, lastName: string, nickName: string, email: string, password: string, isTeacher: number): Promise<number> {
    const result = await this.dao.registerUser(firstName, lastName, nickName, email, password, isTeacher);
    // if (result) {
    //   // // convert isTeacher field to boolean
    //   // result.isTeacher = (result.isTeacher as any) === 1;
    //   // result.triviaContests = [CONTESTS[0].id, CONTESTS[1].id];
    // }
    return result;
  }

}
