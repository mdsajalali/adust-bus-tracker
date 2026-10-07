import { Component, OnInit, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

export interface BusItem {
  id: string;
  name: string;
  route: string;
  distance: string;
  distanceVal: number;
  status: 'Live' | 'Last seen' | 'Offline';
  statusText: string;
  seats: number;
  driverName: string;
  driverId: string;
  nextStop: string;
  busNumber: string;
  currentLocationDesc: string;
  lat: number;
  lng: number;
  routeStops: { name: string; status: 'Passed' | 'Next - your stop' | 'Upcoming' | 'Final stop' }[];
}

@Component({
  selector: 'app-passenger-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './passenger-tracking.html',
  styleUrls: ['./passenger-tracking.css']
})
export class PassengerTracking implements OnInit, AfterViewInit, OnDestroy {
  // Core Application States
  isLocationAllowed = signal<boolean>(false);
  selectedBus = signal<BusItem | null>(null);
  isCallModalOpen = signal<boolean>(false);
  isTrackingActive = signal<boolean>(false);

  // Leaflet Map Instances
  private map!: L.Map;
  private userMarker?: L.Marker;
  private busMarkers: { [key: string]: L.Marker } = {};

  // Mock Bus Data with coordinates around Uttara / Atish Dipankar University area
  buses = signal<BusItem[]>([
    {
      id: '3A',
      name: 'Campus Loop A',
      route: 'Shah Makhdum Ave → ADUST Campus',
      distance: '310 m',
      distanceVal: 310,
      status: 'Live',
      statusText: 'Approaching',
      seats: 40,
      driverName: 'Rahim Uddin',
      driverId: 'Bus ADUST-12',
      nextStop: 'Road 6C',
      busNumber: '3A',
      currentLocationDesc: 'On Sonargaon Janapath, heading to your stop',
      lat: 23.8759,
      lng: 90.3995,
      routeStops: [
        { name: 'Shah Makhdum Ave', status: 'Passed' },
        { name: 'Road 6C', status: 'Next - your stop' },
        { name: 'Rupayan City', status: 'Upcoming' },
        { name: 'ADUST Campus', status: 'Final stop' }
      ]
    },
    {
      id: '1',
      name: 'North Shuttle',
      route: 'ADUST Campus → Diabari',
      distance: '360 m',
      distanceVal: 360,
      status: 'Live',
      statusText: 'Moving away',
      seats: 32,
      driverName: 'Karim Ahmed',
      driverId: 'Bus ADUST-04',
      nextStop: 'Diabari Station',
      busNumber: '1',
      currentLocationDesc: 'Heading towards Diabari bypass',
      lat: 23.8791,
      lng: 90.3912,
      routeStops: [
        { name: 'ADUST Campus', status: 'Passed' },
        { name: 'Diabari Station', status: 'Next - your stop' },
        { name: 'Uttara Sector 10', status: 'Upcoming' }
      ]
    },
    {
      id: '5',
      name: 'Hostel Link',
      route: 'Gausul Azam Ave → ADUST Campus',
      distance: '480 m',
      distanceVal: 480,
      status: 'Live',
      statusText: 'To campus',
      seats: 40,
      driverName: 'Rafiqul Islam',
      driverId: 'Bus ADUST-08',
      nextStop: 'Sector 12',
      busNumber: '5',
      currentLocationDesc: 'Passing Sector 12 residential road',
      lat: 23.8712,
      lng: 90.3970,
      routeStops: [
        { name: 'Gausul Azam Ave', status: 'Passed' },
        { name: 'Sector 12', status: 'Next - your stop' },
        { name: 'ADUST Campus', status: 'Final stop' }
      ]
    }
  ]);

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // Delay map initialization until DOM is ready
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  private initMap(): void {
    if (this.map) return;

    // Initialize Leaflet Map centered around Uttara Sector 12 / ADUST area
    this.map = L.map('leaflet-map', { zoomControl: false }).setView([23.8732, 90.3955], 15);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Add custom zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    // Add initial bus markers to map
    this.updateMapMarkers();
  }

  private updateMapMarkers(): void {
    if (!this.map) return;

    // Clear existing bus markers
    Object.values(this.busMarkers).forEach(marker => marker.remove());
    this.busMarkers = {};

    this.buses().forEach(bus => {
      const customIcon = L.divIcon({
        className: 'custom-bus-pin',
        html: `<div style="background:#1c2a4a; color:#fff; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 4px 6px rgba(0,0,0,0.2); display:flex; align-items:center; gap:4px;">
                <span style="width:8px; height:8px; background:#10b981; border-radius:50%;"></span> Bus ${bus.id}
               </div>`,
        iconSize: [70, 30],
        iconAnchor: [35, 15]
      });

      const marker = L.marker([bus.lat, bus.lng], { icon: customIcon })
        .addTo(this.map)
        .on('click', () => {
          this.selectBus(bus);
        });

      this.busMarkers[bus.id] = marker;
    });
  }

  allowLocation(): void {
    const defaultLat = 23.8732;
    const defaultLng = 90.3955;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location granted:', position.coords);
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.setUserLocationOnMap(lat, lng);
          this.isLocationAllowed.set(true);
        },
        (error) => {
          console.warn('Geolocation fallback:', error.message);
          this.setUserLocationOnMap(defaultLat, defaultLng);
          this.isLocationAllowed.set(true);
        },
        { enableHighAccuracy: true }
      );
    } else {
      this.setUserLocationOnMap(defaultLat, defaultLng);
      this.isLocationAllowed.set(true);
    }
  }

  private setUserLocationOnMap(lat: number, lng: number): void {
    if (!this.map) return;

    if (this.userMarker) {
      this.userMarker.setLatLng([lat, lng]);
    } else {
      const userIcon = L.divIcon({
        className: 'user-location-pin',
        html: `<div style="width:16px; height:16px; background:#2563eb; border:3px solid #ffffff; border-radius:50%; box-shadow:0 0 10px rgba(37,99,235,0.6);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      this.userMarker = L.marker([lat, lng], { icon: userIcon }).addTo(this.map);
    }

    this.map.setView([lat, lng], 16, { animate: true });
  }

  recenterMap(): void {
    if (this.map && this.userMarker) {
      this.map.setView(this.userMarker.getLatLng(), 16, { animate: true });
    }
  }

  resetPermission(): void {
    this.isLocationAllowed.set(false);
    this.selectedBus.set(null);
    this.isTrackingActive.set(false);
  }

  selectBus(bus: BusItem): void {
    this.selectedBus.set(bus);
    this.isTrackingActive.set(false);

    if (this.map) {
      this.map.setView([bus.lat, bus.lng], 17, { animate: true });
    }
  }

  closeBusDetails(): void {
    this.selectedBus.set(null);
    this.isTrackingActive.set(false);
  }

  toggleTracking(): void {
    this.isTrackingActive.update(val => !val);
    const bus = this.selectedBus();
    if (this.map && bus) {
      this.map.setView([bus.lat, bus.lng], 18, { animate: true });
    }
  }

  openCallModal(): void {
    this.isCallModalOpen.set(true);
  }

  closeCallModal(): void {
    this.isCallModalOpen.set(false);
  }

  confirmCall(): void {
    console.log('Connecting call to transport office...');
    this.isCallModalOpen.set(false);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}