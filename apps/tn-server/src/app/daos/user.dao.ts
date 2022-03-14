import { User } from '../../../../shared/user';
import { Db } from '../db';
import * as argon2 from 'argon2';
import { async } from 'rxjs';

export class UserDao {
  // initialize sqlite connector
  private sqlite: Db;

  constructor() {
    this.sqlite = new Db();
  }

  public async getUser(id: number): Promise<User> {
    const $id = id;
    return this.sqlite.get(`select * from user where userid=$id`, { $id });
  }

  public async loginUser(username: string, password: string): Promise<boolean> {
    const $username = username;
    return this.sqlite.get(`select * from user where email=$username`, { $username }).then(async(result:User)=>{
      const hash = result.password
      if(await argon2.verify(hash, password)===true){
        return true;
      }else{
        return false;
      }
    })
  }

  public async registerUser(firstName: string, lastName: string, email: string): Promise<User> {
    // const $firstName = firstName;
    // const $lastName = lastName;
    // const $email = email;
    
    this.sqlite.run(`INSERT INTO user (firstName, lastName, email) VALUES (?)`, ['Jake','Wright', 'jw@example.com']){
      console.log("row inserted");
    }
    // return this.sqlite.get(`select * from user where email=$username`, { $username }).then(async(result:User)=>{
    //   const hash = result.password
    //   if(await argon2.verify(hash, password)===true){
    //     return result;
    //   }else{
    //     return null;
    //   }
    // })
  }
}
