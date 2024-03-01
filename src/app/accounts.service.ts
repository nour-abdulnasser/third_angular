import { Injectable } from '@angular/core';
import { AccountInfo } from './account-info';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ResetCode } from './reset-code';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private _httpClient: HttpClient) {}
  baseUrl: string = `https://ecommerce.routemisr.com`;
  userToken: BehaviorSubject <any> = new BehaviorSubject(null); // continuously update globally (we want to observe this variable)
  userTokenDecoded: BehaviorSubject <any> = new BehaviorSubject(null); // continuously update globally (we want to observe this variable)

  requestRegistration(regData: AccountInfo): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      regData
    );
  }

  requestLogin(loginData: AccountInfo): Observable<any> {
    return this._httpClient.post(
      `${this.baseUrl}/api/v1/auth/signin`,
      loginData
    ); // dont forget we need http client for methods
  }

  decodeUserToken() {
    // if (localStorage.getItem('userToken') != null) {
    //   this.userToken = localStorage.getItem('userToken');
    //   this.userTokenDecoded = jwtDecode(this.userToken); // user data in object form
    // }

    // userToken as behaviorSubject
    if (localStorage.getItem('userToken') != null) {
      this.userToken.next(localStorage.getItem('userToken'));
      this.userTokenDecoded.next( jwtDecode(this.userToken.getValue())); 
    }
    else {
      this.userToken.next(null);
      this.userTokenDecoded.next( null); 

    }
  }

  requestForgotPass(emailToVerify: AccountInfo): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      emailToVerify
    );
  }

  requestVerifyCode(codeData: ResetCode): Observable<any> {
    return this._httpClient.post(
      `${this.baseUrl}/api/v1/auth/verifyResetCode`,
      codeData
    );
  }

  requestNewPassword(newData: AccountInfo): Observable<any> {
    return this._httpClient.put(
      `${this.baseUrl}/api/v1/auth/resetPassword`,
      newData
    );
  }
}
