import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
   imports: [CommonModule, ReactiveFormsModule, ReactiveFormsModule ], 
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
  this.profileForm = this.fb.group({
    name: [''],
    phoneNumber: [''],
     address: [''],
  gender: [''],
  dateOfBirth: ['']
  });

  const token = localStorage.getItem('token');

  this.http.get<any>('http://localhost:5299/api/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).subscribe({
    next: (data) => {
      this.profileForm.patchValue(data);
    },
    error: (err) => {
      console.error('❌ Profile fetch failed:', err);
    }
  });
}

  saveProfile() {
    this.http.put('http://localhost:5299/api/user/profile', this.profileForm.value).subscribe({
      next: () => alert('Profile updated'),
      error: err => console.error('Update failed', err)
    });
  }
}
