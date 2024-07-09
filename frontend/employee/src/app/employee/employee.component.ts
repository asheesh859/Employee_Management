import { Component, InjectionToken, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../service/common/common.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,NavbarComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  AddEmployeeForm!: FormGroup
  skills: Array<any> = [
    { name: 'JavaScript', value: 'javascript' },
    { name: 'Angular', value: 'angular' },
    { name: 'React', value: 'react' },
    { name: 'Node.js', value: 'nodejs' },
    { name: 'Python', value: 'python' }
  ];

  constructor(private formBuiler: FormBuilder, private _router: Router, private _commonService: CommonService) { }
  ngOnInit(): void {
    this.AddEmployeeForm = this.formBuiler.group({
      firstName: ['', [Validators.required]],
      LastName: ['', Validators.required],
      mobile: ['', Validators.maxLength(10)],
      Email: ['', [Validators.email]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      skills: this.formBuiler.array([], [Validators.required]),
      DateOfBirth: ['', [Validators.required]]

    })
  }


  onCheckboxChange(e: any) {
    const skills: FormArray = this.AddEmployeeForm.get('skills') as FormArray;

    if (e.target.checked) {
      skills.push(this.formBuiler.control(e.target.value));
    } else {
      const index = skills.controls.findIndex(x => x.value === e.target.value);
      skills.removeAt(index);
    }
  }

  onSubmit() {
    const data = this.AddEmployeeForm.value;
    this._commonService.postData('employee/addEmployee', data).subscribe(response => {
      console.log(response);
      alert(response.Message);
      this.ngOnInit();
    }, error => {
      console.log(error);
    })
    console.log(data);
  }


}
