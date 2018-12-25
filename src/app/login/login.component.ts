import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    // not sure why the !!
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new LoginErrorStateMatcher();

  constructor(private authService: AuthService, private router: Router) {}
  async submitLogin(event) {
    try {
      const auth: any = await this.authService.login({
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      });
      sessionStorage.setItem('authorization', auth.data.token);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log('authService.submitLogin -> catch -> error', JSON.stringify(error, null, 2));
    }
  }
}
