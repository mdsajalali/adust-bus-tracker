import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBusItem } from '../../models/bus-models';

@Component({
  selector: 'app-nearby-buses-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nearby-buses-sidebar.html',
  styleUrls: ['./nearby-buses-sidebar.css']
})
export class NearbyBusesSidebar {
  @Input({ required: true }) buses: IBusItem[] = [];
  @Input() selectedBus: IBusItem | null = null;
  @Output() busSelected = new EventEmitter<IBusItem>();
  @Output() settingsRequested = new EventEmitter<void>();
}
