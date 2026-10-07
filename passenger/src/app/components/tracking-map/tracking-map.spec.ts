import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingMap } from './tracking-map';

describe('TrackingMap', () => {
  let fixture: ComponentFixture<TrackingMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TrackingMap] }).compileComponents();
    fixture = TestBed.createComponent(TrackingMap);
  });

  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
