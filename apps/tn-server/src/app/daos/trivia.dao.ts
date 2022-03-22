// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TriviaContest } from 'apps/shared/trivia-contest';
import { Db } from '../db';
import { pino } from 'pino';

export class TriviaDao {
  // initialize sqlite connector
  private sqlite: Db;
  private log: pino.Logger;

  constructor() {
    this.sqlite = new Db();
    this.log = pino().child({ context: TriviaDao.name });
  }

  public async getContestsForUserId(id: number): Promise<TriviaContest[]> {
    const $id = id;
    this.log.info($id, "$id");

    
    return await this.sqlite.all(`select * from game where gameID in (select gameId from player where studentid = ${ $id })`);
    
  }

  public async addContestForUser(userId: number, gameId: number): Promise<boolean> {
    try {
      await this.sqlite.all<number>(`insert into game gameID, userId, ${ gameId }, ${ userId }` );

    } catch (error) {
      return false;
    }
    return true;
  }

  public async getGameByTriviaCode(code: string){
    const $code = code;
    return await this.sqlite.get<TriviaContest>(`select * from game where invite = '${$code}'`);
  }

}
