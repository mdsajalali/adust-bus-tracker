import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBusItem } from '../../models/bus-models';

@Component({
  selector: 'app-bus-details-panel',
  standalone: true,
  templateUrl: './bus-details-panel.html',
  styleUrls: ['./bus-details-panel.css']
})
export class BusDetailsPanel {
  @Input({ required: true }) bus!: IBusItem;
  @Input() isTracking = false;
  @Output() closed = new EventEmitter<void>();
  @Output() trackingToggled = new EventEmitter<void>();
  @Output() callRequested = new EventEmitter<void>();
}
