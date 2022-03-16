import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:any = FormGroup;
  islogin: any = false;

  constructor(private fb : FormBuilder, 
    private http : HttpClient, 
    private router : Router, 
    private userService: UserService,
    private route: ActivatedRoute
   ) {}
  

  ngOnInit(){
    // this.userService.loginUser('jd@example.com', 'testtest').subscribe(res=>{
    //   console.log(res);
    // })
      this.loginForm = this.fb.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required]
    });
  }
  
  loginSubmit(){
    //let resp:boolean;
    let username = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;
    this.userService.loginUser(username, password).subscribe((res: any) =>{
      if (res === true) {
        console.log("Login Success!")
        this.router.navigate(['user-dashboard', 1]);
      } else {
        console.log("Wrong password!")
        this.loginForm.reset();
      }
      //this.islogin = res;
    })
  }

  // logout(){
  //   this.islogin = false;
  //   // this.loginForm.controls.email.value = "";
  //   // this.loginForm.controls.password.value="";
  // }
  
}
