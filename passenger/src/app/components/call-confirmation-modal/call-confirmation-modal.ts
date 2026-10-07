import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBusItem } from '../../models/bus-models';

@Component({
  selector: 'app-call-confirmation-modal',
  standalone: true,
  templateUrl: './call-confirmation-modal.html',
  styleUrls: ['./call-confirmation-modal.css']
})
export class CallConfirmationModal {
  @Input() bus: IBusItem | null = null;
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
}
