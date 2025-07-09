import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent {
 @Input() hotelName: string | null = null;
  bookingForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.bookingForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]]
    });
  }

  bookRoom() {
    if (this.bookingForm.invalid) return;

    const bookingData = {
      ...this.bookingForm.value,
      hotelName: this.hotelName
    };

    this.http.post('http://localhost:5299/api/booking/book', bookingData).subscribe({
      next: (res) => {
        alert('Room booked successfully!');
      },
      error: (err) => {
        console.error('Booking failed', err);
        alert('Booking failed');
      }
    });
  }
}
