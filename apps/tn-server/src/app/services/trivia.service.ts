
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TriviaContest } from 'apps/shared/trivia-contest';
import { TriviaDao } from '../daos/trivia.dao';

export class TriviaService {
  private dao: TriviaDao;

  constructor() {
    this.dao = new TriviaDao();
  }

  public async getGamesByUserId(id: number): Promise<TriviaContest[]> {
    return await this.dao.getContestsForUserId(id);
  }

  public async addContestForUser(userId: number, gameId: number): Promise<boolean> {
    return await this.dao.addContestForUser(userId, gameId);
  }

  public async getGameByTriviaCode(code: string): Promise<TriviaContest>
  {
    return await this.dao.getGameByTriviaCode(code);
  }
}
