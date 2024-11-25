import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule,MatCardModule,MatIconModule,MatInputModule,MatButtonModule,MatFormFieldModule,ReactiveFormsModule,MatSnackBarModule,CommonModule,RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar 
  ) {
    this.forgotPasswordForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

  ngOnInit(): void {}


  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const { username } = this.forgotPasswordForm.value;

   
      this.authService.getPasswordByUsername(username).subscribe(users => {
        const user = users.find((u: { name: any; email: any; }) => u.name === username || u.email === username);

        if (user) {
          alert(`Your password is: ${user.password}`);
        } else {
          this.snackBar.open('User not found', 'Close', { duration: 3000 });
        }
      });
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}