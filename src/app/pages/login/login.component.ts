import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide = true;

  constructor(private router: Router, private toast: NgToastService) {}

  /**
   * @purpose Toggle password show or hide on click of the button
   * @input Event of the input field
   * @return void
   */
  showHidePassword(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  fb = inject(FormBuilder);

  /**
   * @purpose - Validate all the login form fields
   */

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[a-z][a-z0-9]*(.[a-z0-9]+)*@[a-z0-9]+(\.[a-z0-9]+)*\.[a-z]{2,}$/
        ),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
    ],
  });

  handleLogin(): void {
    const email = this.loginForm.value.email?.trim();
    const password = this.loginForm.value.password?.trim();

    if (email === 'haresh@gmail.com' && password === '123456') {
      localStorage.setItem('userData', JSON.stringify({ email, password }));
      this.router.navigate(['/']);
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Logged In Successfully',
        duration: 3000,
      });
    } else {
      this.toast.error({
        detail: 'ALERT',
        summary: 'Wrong Email or Password',
        duration: 3000,
      });
      console.log('error');
    }
  }
}
