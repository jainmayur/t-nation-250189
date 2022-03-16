import { User } from '../../../../shared/user';
import { Db } from '../db';
import * as argon2 from 'argon2';
import { async } from 'rxjs';
import { number } from 'joi';

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

  public async registerUser(firstName: string, lastName: string, nickName: string, email: string, password: string, isTeacher: number): Promise<User> {
    const $firstName = firstName;
    const $lastName = lastName;
    const $nickName = nickName;
    const $email = email;   
    const $password = await argon2.hash(password);
    const $isTeacher = isTeacher; 
    return this.sqlite.run(`INSERT INTO user (firstName, lastName, nickName, email, password, isTeacher) VALUES ($firstName, $lastName, $nickName, $email, $password, $isTeacher) RETURNING *`, 
    { $firstName, $lastName, $nickName, $email, $password, $isTeacher }).then(async(res:User | any)=>{
      console.log("row inserted");
      return res;
    }) 
   }

}
