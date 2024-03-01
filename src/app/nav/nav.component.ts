import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isLogin!: boolean;
  constructor(private _authService: AccountsService, private _router: Router ) {}

  ngOnInit(): void {
    this._authService.userToken.subscribe(() => {
      if (this._authService.userToken.getValue() == null) {
        this.isLogin = false;
      } else if (this._authService.userToken.getValue() != null) {
        this.isLogin = true;
      }
    });

    // if (this._authService.userToken == null){
    //   this.isLogin = false;
    // } else if (this._authService.userToken != null){
    //   this.isLogin = true;
    // }
  }

  logout(){
    // 1. remove userToken key value from local storage
    localStorage.removeItem("userToken");
    
    // 2. userToken variable = null
    this._authService.decodeUserToken(); // nulls userToken variable if userToken in local storage doesnt exist
    // or we can do this
    // this._authService.userToken.next(null);
    
    // 3. route to login page
    this._router.navigate(['/login']);
  }






}
