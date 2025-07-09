// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
     
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
  }

  register() {
  if (this.registerForm.invalid) return;

  const payload = this.registerForm.value;
  console.log(payload); // 🔍 CHECK THIS

  this.authService.register(payload).subscribe({
    next: () => {
      alert('Registration successful. Please log in.');
      this.router.navigate(['/auth/login']);
    },
    error: (err) => {
      alert('Registration failed');
      console.error(err); // 🔍 ALSO CHECK THIS RESPONSE
    }
  });
  }
}
