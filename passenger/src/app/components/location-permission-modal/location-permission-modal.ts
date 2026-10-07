import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-location-permission-modal',
  standalone: true,
  templateUrl: './location-permission-modal.html',
  styleUrls: ['./location-permission-modal.css']
})
export class LocationPermissionModal {
  @Output() locationRequested = new EventEmitter<void>();
}
