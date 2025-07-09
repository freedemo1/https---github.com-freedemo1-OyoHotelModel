import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingFormComponent } from '../booking/booking-form.component'; // adjust the path if needed

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookingFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  localities = ['Baner', 'Hadapsar', 'Wakad', 'Kharadi', 'Shivaji Nagar'];
  selectedLocality = '';
  selectedHotel: string | null = null;  // ✅ Add this line
  hotels: any[] = [];

  dummyHotels: Record<string, { name: string; price: number; rating: number; image: string; address: string }[]> = {
    Baner: [
      {
        name: 'Hotel Sunshine',
        price: 1200,
        rating: 4.2,
        address: '123 Baner Road',
        image: 'assets/image1.jpeg'  
      },
      {
        name: 'The Orchid Baner',
        price: 1500,
        rating: 4.5,
        address: '456 Orchid Avenue',
        image: 'assets/image2.jpeg'  
      }
    ],
    Kharadi: [
      {
        name: 'Hotel Bliss Kharadi', 
        price: 1300, 
        address: 'The Space',
        rating: 4.3,
        image: 'assets/image2.jpeg'  
      },
      {
       name: 'SN Grand Hotel', 
       price: 1600, 
      address: 'Gera Building',
       rating: 4.6 ,
       image: 'assets/image2.jpeg'  
      }
    ],
    Wakad: [
      {
        name: 'Wakad Residency',
        price: 1000,
        rating: 4.0,
        address: '88 Wakad Lane',
         image: 'assets/image1.jpeg'  
      }
    ]
    // Add other localities as needed
  };

  onLocalitySelect(locality: string) {
    this.selectedLocality = locality;
    this.hotels = this.dummyHotels[locality] || [];
    this.selectedHotel = null; // Reset previously selected hotel
  }

  onBookNow(hotelName: string) {
    this.selectedHotel = hotelName;
  }
}
