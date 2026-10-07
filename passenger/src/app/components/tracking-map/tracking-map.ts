import { AfterViewInit, Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { IBusItem } from '../../models/bus-models';

@Component({
  selector: 'app-tracking-map',
  standalone: true,
  templateUrl: './tracking-map.html',
  styleUrls: ['./tracking-map.css']
})
export class TrackingMap implements AfterViewInit, OnDestroy {
  @Input({ required: true }) buses: IBusItem[] = [];
  @Output() busSelected = new EventEmitter<IBusItem>();

  private map?: L.Map;
  private userMarker?: L.Marker;
  private busMarkers: Record<string, L.Marker> = {};

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 100);
  }

  setUserLocation(lat: number, lng: number): void {
    if (!this.map) return;

    if (this.userMarker) {
      this.userMarker.setLatLng([lat, lng]);
    } else {
      const userIcon = L.divIcon({
        className: 'user-location-pin',
        html: '<div style="width:16px; height:16px; background:#2563eb; border:3px solid #ffffff; border-radius:50%; box-shadow:0 0 10px rgba(37,99,235,0.6);"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      this.userMarker = L.marker([lat, lng], { icon: userIcon }).addTo(this.map);
    }

    this.map.setView([lat, lng], 16, { animate: true });
  }

  recenter(): void {
    if (this.map && this.userMarker) {
      this.map.setView(this.userMarker.getLatLng(), 16, { animate: true });
    }
  }

  focusBus(bus: IBusItem, zoom = 17): void {
    this.map?.setView([bus.lat, bus.lng], zoom, { animate: true });
  }

  private initMap(): void {
    if (this.map) return;

    this.map = L.map('leaflet-map', { zoomControl: false }).setView([23.8732, 90.3955], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);
    this.updateMarkers();
  }

  private updateMarkers(): void {
    if (!this.map) return;
    const map = this.map;

    Object.values(this.busMarkers).forEach(marker => marker.remove());
    this.busMarkers = {};

    this.buses.forEach(bus => {
      const customIcon = L.divIcon({
        className: 'custom-bus-pin',
        html: `<div style="background:#1c2a4a; color:#fff; padding:4px 8px; border-radius:12px; font-size:11px; font-weight:bold; box-shadow:0 4px 6px rgba(0,0,0,0.2); display:flex; align-items:center; gap:4px;">
                <span style="width:8px; height:8px; background:#10b981; border-radius:50%;"></span> Bus ${bus.id}
               </div>`,
        iconSize: [70, 30],
        iconAnchor: [35, 15]
      });

      this.busMarkers[bus.id] = L.marker([bus.lat, bus.lng], { icon: customIcon })
        .addTo(map)
        .on('click', () => this.busSelected.emit(bus));
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
