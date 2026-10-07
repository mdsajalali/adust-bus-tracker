import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallConfirmationModal } from './call-confirmation-modal';

describe('CallConfirmationModal', () => {
  let fixture: ComponentFixture<CallConfirmationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CallConfirmationModal] }).compileComponents();
    fixture = TestBed.createComponent(CallConfirmationModal);
  });

  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
