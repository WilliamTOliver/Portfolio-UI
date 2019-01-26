import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new LoginErrorStateMatcher();
  invalidLogin = false;
  loggingIn = false;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.authService.logout();
    }
  }
  async submitLogin(event) {
    this.loggingIn = true;
    try {
      const auth: any = await this.authService.login({
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      });
      this.authService.setAuth(auth.data.token);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.loggingIn = false;
      this.invalidLogin = true;
      console.log('authService.submitLogin -> catch -> error', JSON.stringify(error, null, 2));
    }
  }
}
