import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';
import { CommonService } from "../service/common/common.service";
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  employee: any;
  editEmployeeForm: any;
  SearchForm: any;
  EmployeeData: any;
  updateForm: Boolean = false;
  EmployeeTable: Boolean = true;


  skills: Array<any> = [
    { name: 'JavaScript', value: 'javascript' },
    { name: 'Angular', value: 'angular' },
    { name: 'React', value: 'react' },
    { name: 'Node.js', value: 'nodejs' },
    { name: 'Python', value: 'python' }
  ];
  constructor(private _commonService: CommonService, private _router: Router, private formBuilder: FormBuilder) { }
  ngOnInit(): void {

    this._commonService.getData('employee').subscribe(response => {
      this.employee = response.employee;
      
      console.log(this.employee)
    }, error => {
      console.log(error)
    })

    this.editEmployeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      LastName: ['', Validators.required],
      mobile: ['', Validators.maxLength(10)],
      Email: ['', [Validators.email]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      skills: this.formBuilder.array([], [Validators.required]),
      DateOfBirth: ['', [Validators.required]]

    })

    this.SearchForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]]
    })



  }


  onCheckboxChange(e: any) {
    const skills: FormArray = this.editEmployeeForm.get('skills') as FormArray;

    if (e.target.checked) {
      skills.push(this.formBuilder.control(e.target.value));
    } else {
      const index = skills.controls.findIndex(x => x.value === e.target.value);
      skills.removeAt(index);
    }
  }

  deleteEmployee(id: any) {
    this._commonService.deleteData('employee/deleteEmployee/' + id).subscribe(response => {
      alert(response.Message);

      this.ngOnInit();
    }, error => {
      alert(error.Message);
    })

  }

  async editEmployee(id: any) {
    console.log(id);
    this.EmployeeTable = false;
    this.updateForm = true;
    await this._commonService.getData('employee/' + id).subscribe(response => {
      this.EmployeeData = response.Employee;

      console.log(response.Employee)
    }, error => {
      alert(error.Message);
    })
  }


  onSubmit() {
    const id = this.EmployeeData.id;
    const data = this.editEmployeeForm.value;

    this._commonService.updateData('employee/employee/update/' + id, data).subscribe(response => {
      alert(response.Message);
      this.EmployeeTable = true;
      this.updateForm = false;
      this.ngOnInit();
    }, error => {
      console.log(error.Message);
    })


  }

  showTable() {
    this.EmployeeTable = true;
    this.updateForm = false;
  }

  onSearch() {

    const search = this.SearchForm.value;
    console.log(search);
    this._commonService.postData('employee/search' , search).subscribe(respose =>{
      alert(respose.Message);
      this.employee = [respose.employee];
    },error =>{
      alert(error.error.Message);
    })

}

}

