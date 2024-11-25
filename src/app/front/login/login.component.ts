import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MatCardModule,MatIconModule,MatInputModule,MatButtonModule,MatFormFieldModule,ReactiveFormsModule,MatSnackBarModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe((role) => {  // Get the role here
        console.log('Login Success:', role);  // Log the role (admin or other)
        if (role) {
          if (role === 'admin') {
            console.log('Navigating to admin dashboard...');
            this.router.navigate(['/admin-dashboard']);  // Navigate to admin dashboard
          } else {
            console.log('Navigating to course list...');
            this.router.navigate(['/course']);  // Navigate to normal course list
          }
        } else {
          this.snackBar.open('Invalid credentials, please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  redirectToSignup() {
    this.router.navigate(['/signup']);
  }
  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}