import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AuthService } from '../auth/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    // not sure why the double !
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  async submitLogin(event) {
    console.log('​LoginComponent -> submitLogin -> event', event);
    try {
      const auth: any = await this.authService.login({
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      });
      this.authService.token = auth.token;
    } catch (error) {
      console.log('​LoginComponent -> }catch -> error', error);
    }
  }
}
