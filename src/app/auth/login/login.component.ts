import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const payload = this.loginForm.value;

    this.http.post('http://localhost:5299/api/auth/login', payload).subscribe({
      next: (res: any) => {
        console.log('Login success:', res);
           localStorage.setItem('token', res.token); // ✅ Store token here
         this.router.navigate(['/home']);

        // ✅ Save JWT and user details
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);
        localStorage.setItem('username', res.name);

        // ✅ Navigate to dashboard
        this.router.navigate(['/dashboard']);
       
      },
      error: (err: any) => {
        console.error('Login error:', err);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
