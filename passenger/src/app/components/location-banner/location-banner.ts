import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-location-banner',
  standalone: true,
  templateUrl: './location-banner.html',
  styleUrls: ['./location-banner.css']
})
export class LocationBanner {
  @Output() recenterRequested = new EventEmitter<void>();
}
