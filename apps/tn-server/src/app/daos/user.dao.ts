import { User } from '../../../../shared/user';
import { Db } from '../db';
import * as argon2 from 'argon2';

export interface LoginUserRes {
  isLogin:boolean;
  isTeacher:number;
}

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

  public async loginUser(username: string, password: string): Promise<LoginUserRes> {
    const $username = username;
    let res = {isLogin: false, isTeacher: null}
    return this.sqlite.get(`select * from user where email=$username`, { $username }).then(async(result:User)=>{
      const hash = result.password
      //console.log(result);
      if(await argon2.verify(hash, password)===true){
        res.isTeacher = result.isTeacher;
        res.isLogin = true;
        return res;
      }else{
        res.isTeacher = result.isTeacher;
        res.isLogin = false;
        return res;
      }
    })
  }

  public async registerUser(firstName: string, lastName: string, nickName: string, email: string, password: string, isTeacher: number): Promise<number> {
    const $firstName = firstName;
    const $lastName = lastName;
    const $nickName = nickName;
    const $email = email;   
    const $password = await argon2.hash(password);
    const $isTeacher = isTeacher; 
    let lastID;
    await this.sqlite.run(`INSERT INTO user (firstName, lastName, nickName, email, password, isTeacher) VALUES ($firstName, $lastName, $nickName, $email, $password, $isTeacher)`, 
    { $firstName, $lastName, $nickName, $email, $password, $isTeacher }).then((result)=>{
      if(result !=null){        
        console.log(result);
        lastID=result.lastID;
      }   
    }).catch(err=>{
      console.log("Email already exists");
      return err;
    });
     return lastID;
   }
}