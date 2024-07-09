import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from "../service/common/common.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(private _router: Router, private _commonService: CommonService) { }
  ngOnInit(): void {

  }

  AddEmployee() {
    this._router.navigate(['employee'])
  }

  dashBoard() {
    this._router.navigate(['home'])
  }

  async LogOut() {


    const user = localStorage.getItem('currentUser')

    this._commonService.postData('auth/logout', user).subscribe(response => {
      console.log(response);
      this._router.navigate(['login']);
    }, error => {
      console.log(error);
    })

    localStorage.removeItem('currentUser');
    const users = localStorage.getItem('currentUser')
    if (users) {
      alert('please logout.')
    } else {
      alert('logout SuccessFully..!')
      this._router.navigate(['login']);

    }

  }

}
