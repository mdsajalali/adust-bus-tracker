import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengerTracking } from './passenger-tracking';

describe('PassengerTracking', () => {
  let component: PassengerTracking;
  let fixture: ComponentFixture<PassengerTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerTracking],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerTracking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
