import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errorMsg!: string;
  isLoading!: boolean;

  constructor(private _accountsService: AccountsService, private _Router :Router) {}

  registerForm: FormGroup = new FormGroup(
    {
      // wanna be careful naming the variables, must match JSON keys
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-z].{5}/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      // phone : new FormControl (null, [Validators.minLength(11), Validators.maxLength(11)]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]{11}$/),
      ]),
    },
    this.passwordMatchError
  );

  registerSubmitMethod() {
    // alert("hi");
    // console.log(this.registerForm);

    this.isLoading = true;


    this._accountsService
      .requestRegistration(this.registerForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.errorMsg = '';
          this.isLoading = false;
          this._Router.navigate(['/login']); // replace path after base URL with /login

          if( response.message == 'success'){
            localStorage.setItem('userToken', response.token);
            this._accountsService.decodeUserToken()
          } // is it necessary to have this condition in both login and register?
          // also why decode 
        },
        error: (errorResponse) => {
          this.errorMsg = errorResponse.error.message;
          console.log(errorResponse);
          this.isLoading = false;

        },
      });
  }

  passwordMatchError(g: any) {
    if (g.get('password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { isMatching: true };
    }
  }
}
