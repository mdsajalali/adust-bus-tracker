import { Component } from '@angular/core';
import { PassengerTracking } from './components/passenger-tracking/passenger-tracking';

@Component({
  imports: [PassengerTracking],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

}
