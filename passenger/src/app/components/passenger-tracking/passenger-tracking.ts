import { Component, OnInit, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-passenger-tracking',
  styleUrl: './passenger-tracking.css',
  templateUrl: './passenger-tracking.html',
})
export class PassengerTracking implements OnInit {
  isLocationAllowed = signal<boolean>(false);

  ngOnInit(): void {
    // Initial state set with permission modal visible over map
  }

  allowLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location granted:', position.coords);
          this.isLocationAllowed.set(true);
        },
        (error) => {
          console.warn('Geolocation fallback:', error.message);
          this.isLocationAllowed.set(true);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      this.isLocationAllowed.set(true);
    }
  }

  resetModal(): void {
    this.isLocationAllowed.set(false);
  }
}
