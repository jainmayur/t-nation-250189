import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:any = FormGroup;  //create property to hold formgroup
  constructor(
    private fb : FormBuilder, 
    private http : HttpClient, 
    private router : Router, 
    private userService: UserService,
    ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      nickname:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required]
    })
  }
  register(){
    console.log("register", this.registerForm);
    const firstName: string = this.registerForm.controls.firstname.value;
    const lastName: string = this.registerForm.controls.lastname.value;
    const nickName: string = this.registerForm.controls.nickname.value;
    const email: string = this.registerForm.controls.email.value;
    const password: string = this.registerForm.controls.password.value;

    this.userService.registerUser(firstName, lastName, nickName, email, password)
  }
}
