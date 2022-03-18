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
    // this.userService.registerUser('Nancy','Benz', 'N.B', 'nb@example.com', 'testtest', 1)
    // .subscribe(res=>{
    //   console.log(res);
    // })
    this.registerForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      nickName:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required],
      accountholder:['',Validators.required]
    })
  }

  get f(){
    return this.registerForm.controls;
  }

  registerSubmit(){
    console.log(this.registerForm.value);
    let firstName = this.registerForm.controls.firstName.value;
    let lastName = this.registerForm.controls.lastName.value;
    let nickName = this.registerForm.controls.nickName.value;
    let email = this.registerForm.controls.email.value;
    let password = this.registerForm.controls.password.value;
    let Teacher = this.registerForm.controls.accountholder.value;
    const isTeacher = parseInt(Teacher);
    //console.log(isTeacher);    
    this.userService.registerUser(firstName, lastName, nickName, email, password, isTeacher)
    .subscribe(result=>{
      console.log("lastID: " + result);
      if(result){
        console.log("Registeration Successful..");
      }else{
        console.log("Email already exists..");
      }
      
    })
  }
}
