import { Database, RunResult } from 'sqlite3';
import { pino } from 'pino';
import { environment } from '../environments/environment';
import path = require('path');

import {readFileSync} from 'fs'


/** Singleton connector to sqlite */
export class Db {
  static conn: Database;

  static log = pino().child({ context: 'sqlite' });

  /**
   * Create a singleton connector to Sqlite
   * @param file specify another location to support testing
   */
  constructor(schema: string = path.join(__dirname, 'assets/trivia-nation.sql'), file?: string) {
    if (!Db.conn) {
      this.initDb(schema, file || path.join(__dirname, environment.sqlite));
    }
  }

  private initDb(schema: string, file: string) {
    // connect to database
    Db.conn = new Database(file, (err) => {
      if (err) {
        Db.log.error(err);
      } else {
        Db.log.info('Successfully connected');
      }
    });

    // initialize tables/rows if necessary
    const specification = readFileSync(schema, 'utf8')
    Db.conn.exec(specification, (err) => {
      if (err) {
        Db.log.error(err);
      } else {
        Db.log.info('Sqlite ready')
      }
    });
  }

  async get<Type>(sql: string, binds = {}): Promise<Type> {
    return new Promise((resolve, reject) => {
      Db.conn.all(sql, binds, (err, rows) => {
        if (err) {
          Db.log.error({error: err, sql, binds});
          resolve(null);
        } else {
          resolve(rows.length > 0 ? rows[0] : null);
        }
      });
    });
  }

  async all<Type>(sql: string, binds = {}): Promise<Type[]> {
    return new Promise((resolve, reject) => {
      Db.conn.all(sql, binds, (err, rows) => {
        if (err) {
          Db.log.error({error: err, sql, binds});
          resolve([]);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async run(sql: string, binds = {}): Promise<RunResult> {
    return new Promise((resolve, reject) => {
      Db.conn.run(sql, binds, function (err) {
        if (err) {
          Db.log.error({error: err, sql, binds});
          reject({lastID: null, changes: 0});
        } else {
          resolve(this)
        }
      });
    });
  }
}
