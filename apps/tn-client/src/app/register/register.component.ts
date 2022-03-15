import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:any = FormGroup;  //create property to hold formgroup
  constructor(private fb : FormBuilder, 
    private http : HttpClient, 
    private router : Router,
    private userService: UserService) {}

  ngOnInit(): void {
    this.userService.registerUser('Nancy','Benz', 'N.B', 'nb@example.com', 'testtest', 1)
    .subscribe(res=>{
      console.log(res);
    })
    this.registerForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      NickName:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required]
    })
  }
  registerSubmit(){
    console.log("Registration");
    console.log(this.registerForm.firstName);
    let firstName = this.registerForm.name.firstName.value;
    // let lastName = this.registerForm.id.lastName.value;
    // let nickName = this.registerForm.id.nickName.value;
    // let email = this.registerForm.id.email.value;
    // let password = this.registerForm.id.email.value;
    // let isTeacher = this.registerForm.id.email.value;
    // this.userService.registerUser(firstName, lastName, nickName, email, password, isTeacher)
    // .subscribe(res=>{
    //   console.log(res);
    //   console.log("Registeration Successful..");
    // })

  }
}
