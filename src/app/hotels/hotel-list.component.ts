import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingFormComponent } from '../booking/booking-form.component';
@Component({
  standalone: true,
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookingFormComponent ]
})
export class HotelListComponent {
  locality: string = '';
  hotels: any[] = [];
  selectedHotel: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.locality = params['locality'];
      this.loadHotels(this.locality);
    });
  }

onBookNow(hotelName: string) {
  this.selectedHotel = hotelName;
}

  loadHotels(locality: string) {
    // dummy hotels by locality
    this.hotels = [
      { name: 'OYO Bliss Residency', price: 1499, address: `${locality}, Pune` },
      { name: 'OYO Comfort Stay', price: 1799, address: `${locality}, Pune` }
    ];
  }
}
  