import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';
import { AccountInfo } from '../account-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMsg!: string;
  isLoading!: boolean;
  emailVerificationMsg!: string;
  emailVerificationStatus!: string;
  codeVerificationStatus!: string;
  codeVerificationMsg!: string;

  forgotFormFlag: boolean = true;
  verifyCodeFormFlag: boolean = false;
  newPassFormFlag: boolean = false;
  passwordChangedFlag: boolean = false;

  forgetPassEmail!: AccountInfo;
  // userToken!: string;

  constructor(
    private _accountsService: AccountsService,
    private _Router: Router
  ) {}

  // ******************* logging in forms *******************

  loginForm: FormGroup = new FormGroup({
    // wanna be careful naming the variables, must match JSON keys
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-z].{5}/),
    ]),
  });

  // ******************* forgotten password forms *******************



  emailVerificationForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
  });

  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-z].{5}/),
    ]),
  });

  // ******************* logging in methods  *******************

  loginSubmitMethod() {
    // alert("hi");
    // console.log(this.registerForm);

    this.isLoading = true;

    this._accountsService.requestLogin(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.errorMsg = '';
        this.isLoading = false;
        this._Router.navigate(['/home']);
        if (response.message == 'success') {
          // this.userToken = response.token;
          // console.log(this.userToken);
          // localStorage.setItem('userToken', this.userToken);
          localStorage.setItem('userToken', response.token);
          this._accountsService.decodeUserToken();
        }
      },
      error: (errorResponse) => {
        this.errorMsg = errorResponse.error.message;
        console.log(errorResponse);
        this.isLoading = false;
      },
    });
  }

  // ******************* forgotten password methods *******************

  resetVars(){
    
    this.forgotFormFlag = true;
    this.verifyCodeFormFlag = false;
    this.newPassFormFlag = false;
  }

  sendCodeToEmail() {
    this._accountsService
      .requestForgotPass(this.emailVerificationForm.value)
      .subscribe({
        next: (res: any) => {
          this.emailVerificationStatus = res.statusMsg;
          this.emailVerificationMsg = res.message;
          // if (this.emailVerificationStatus == 'success'){
          //   this.emailVerificationForm.get('email')?.value == '';
          // }

          this.forgotFormFlag = false;
          this.verifyCodeFormFlag = true;

          console.log(res);
        },
        error: (errorResponse) => {
          this.emailVerificationStatus = errorResponse.error.statusMsg;
          console.log(errorResponse);

          this.emailVerificationMsg = errorResponse.error.message;
        },
      });
  }

  verifyCode() {
    this._accountsService
      .requestVerifyCode(this.verifyCodeForm.value)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.codeVerificationStatus = res.statusMsg;
          // this.forgotFormFlag = false;
          this.verifyCodeFormFlag = false;
          this.newPassFormFlag = true;
        },
        error: (errorResponse: any) => {
          this.codeVerificationStatus = errorResponse.error.statusMsg;
          this.codeVerificationMsg = errorResponse.error.message;

          console.log(this.verifyCodeForm.value);
          console.log(errorResponse);
        },
      });
  }

  resetPassword() {
    this._accountsService
      .requestNewPassword(this.newPasswordForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.forgotFormFlag = false;
          //  this.verifyCodeFormFlag = false;
          this.newPassFormFlag = false;
          this.passwordChangedFlag = true;
        },
        error: (errorResponse) => {
          console.log(errorResponse);
        },
      });
  } // p.s. only can be changed once
}
