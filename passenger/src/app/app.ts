import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { TrackingMap } from './components/tracking-map/tracking-map';
import { LocationBanner } from './components/location-banner/location-banner';
import { NearbyBusesSidebar } from './components/nearby-buses-sidebar/nearby-buses-sidebar';
import { BusDetailsPanel } from './components/bus-details-panel/bus-details-panel';
import { LocationPermissionModal } from './components/location-permission-modal/location-permission-modal';
import { CallConfirmationModal } from './components/call-confirmation-modal/call-confirmation-modal';
import { IBusItem } from './models/bus-models';

@Component({
  imports: [CommonModule,
    TrackingMap,
    LocationBanner,
    NearbyBusesSidebar,
    BusDetailsPanel,
    LocationPermissionModal,
    CallConfirmationModal],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  @ViewChild(TrackingMap) private trackingMap?: TrackingMap;

  isLocationAllowed = signal(false);
  selectedBus = signal<IBusItem | null>(null);
  isCallModalOpen = signal(false);
  isTrackingActive = signal(false);

  buses = signal<IBusItem[]>([
    {
      id: '3A', name: 'Campus Loop A', route: 'Shah Makhdum Ave → ADUST Campus', distance: '310 m',
      distanceVal: 310, status: 'Live', statusText: 'Approaching', seats: 40, driverName: 'Rahim Uddin',
      driverId: 'Bus ADUST-12', nextStop: 'Road 6C', busNumber: '3A',
      currentLocationDesc: 'On Sonargaon Janapath, heading to your stop', lat: 23.8759, lng: 90.3995,
      routeStops: [
        { name: 'Shah Makhdum Ave', status: 'Passed' }, { name: 'Road 6C', status: 'Next - your stop' },
        { name: 'Rupayan City', status: 'Upcoming' }, { name: 'ADUST Campus', status: 'Final stop' }
      ]
    },
    {
      id: '1', name: 'North Shuttle', route: 'ADUST Campus → Diabari', distance: '360 m', distanceVal: 360,
      status: 'Live', statusText: 'Moving away', seats: 32, driverName: 'Karim Ahmed', driverId: 'Bus ADUST-04',
      nextStop: 'Diabari Station', busNumber: '1', currentLocationDesc: 'Heading towards Diabari bypass',
      lat: 23.8791, lng: 90.3912,
      routeStops: [
        { name: 'ADUST Campus', status: 'Passed' }, { name: 'Diabari Station', status: 'Next - your stop' },
        { name: 'Uttara Sector 10', status: 'Upcoming' }
      ]
    },
    {
      id: '5', name: 'Hostel Link', route: 'Gausul Azam Ave → ADUST Campus', distance: '480 m', distanceVal: 480,
      status: 'Live', statusText: 'To campus', seats: 40, driverName: 'Rafiqul Islam', driverId: 'Bus ADUST-08',
      nextStop: 'Sector 12', busNumber: '5', currentLocationDesc: 'Passing Sector 12 residential road',
      lat: 23.8712, lng: 90.3970,
      routeStops: [
        { name: 'Gausul Azam Ave', status: 'Passed' }, { name: 'Sector 12', status: 'Next - your stop' },
        { name: 'ADUST Campus', status: 'Final stop' }
      ]
    }
  ]);

  allowLocation(): void {
    const setLocation = (lat: number, lng: number) => {
      this.trackingMap?.setUserLocation(lat, lng);
      this.isLocationAllowed.set(true);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => setLocation(position.coords.latitude, position.coords.longitude),
        error => {
          console.warn('Geolocation fallback:', error.message);
          setLocation(23.8732, 90.3955);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocation(23.8732, 90.3955);
    }
  }

  recenterMap(): void {
    this.trackingMap?.recenter();
  }

  resetPermission(): void {
    this.isLocationAllowed.set(false);
    this.selectedBus.set(null);
    this.isTrackingActive.set(false);
  }

  selectBus(bus: IBusItem): void {
    this.selectedBus.set(bus);
    this.isTrackingActive.set(false);
    this.trackingMap?.focusBus(bus);
  }

  closeBusDetails(): void {
    this.selectedBus.set(null);
    this.isTrackingActive.set(false);
  }

  toggleTracking(): void {
    this.isTrackingActive.update(value => !value);
    const bus = this.selectedBus();
    if (bus) this.trackingMap?.focusBus(bus, 18);
  }

  confirmCall(): void {
    console.log('Connecting call to transport office...');
    this.isCallModalOpen.set(false);
  }
}
