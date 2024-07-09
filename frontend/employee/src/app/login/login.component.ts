import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonService } from '../service/common/common.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
 
})
export class LoginComponent implements OnInit {
loginForm!: FormGroup
  constructor(private formBuiler: FormBuilder, private _route: Router , private _commonService : CommonService) { }
  ngOnInit(): void {

    this.loginForm = this.formBuiler.group({
      email:['',[Validators.email]],
      password : ['',[Validators.minLength(6)]]
    })

  }

  async onSubmit(){
    const formData = this.loginForm.value;
    console.log(formData);
    await this._commonService.postData('auth/login' , formData).subscribe(response =>{
      console.log(response);
      localStorage.setItem('currentUser', JSON.stringify(response.user))
      alert(response.massege);
      this._route.navigate(['home']);
    },error =>{
      alert(error.error.massege);
      console.log(error.error.massege);
    })
    
    console.log(formData);
  }
  createAccount(){
    this._route.navigate(['signup']);
  }
}
