import { User } from '../../../../shared/user';
import { UserDao } from '../daos/user.dao';
import { CONTESTS } from '../../../../shared/mocks/mock-trivia-contests';

export class UserService {
  private dao: UserDao;

  constructor() {
    this.dao = new UserDao();
  }

  public async getUser(id: number): Promise<User> {
    const result = await this.dao.getUser(id);
    if (result) {
      // convert isTeacher field to boolean
      result.isTeacher = (result.isTeacher as any) === 1;
      result.triviaContests = [CONTESTS[0].id, CONTESTS[1].id];
    }
    return result;
  }

  public async loginUser(username: string, password: string): Promise<boolean> {
    const result = await this.dao.loginUser(username, password);
    if (result) {
      // // convert isTeacher field to boolean
      // result.isTeacher = (result.isTeacher as any) === 1;
      // result.triviaContests = [CONTESTS[0].id, CONTESTS[1].id];
    }
    return result;
  }

  public async registerUser(firstname: string, lastname: string, email: string): Promise<boolean> {
    const result = await this.dao.registerUser(firstname, lastname, email);
    if (result) {
      // // convert isTeacher field to boolean
      // result.isTeacher = (result.isTeacher as any) === 1;
      // result.triviaContests = [CONTESTS[0].id, CONTESTS[1].id];
    }
    return result;
  }

}
