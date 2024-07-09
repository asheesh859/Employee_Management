import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from "../service/common/common.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  constructor(private formBuiler: FormBuilder, private _router: Router, private _commonService: CommonService) { }
  ngOnInit(): void {
    this.signupForm = this.formBuiler.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
    })
  }
  async onSubmit() {
    const data = this.signupForm.value;
    await this._commonService.postData('auth/signUp', data).subscribe(response => {
      alert(response.Message);
      this.ngOnInit();
      this._router.navigate(['login'])
      
    }, error => {
      alert(error.Message);
    })
  }
  
  alreadyAccount() {
    this._router.navigate(['login'])
  }

}
