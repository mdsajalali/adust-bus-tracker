import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationBanner } from './location-banner';

describe('LocationBanner', () => {
  let fixture: ComponentFixture<LocationBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LocationBanner] }).compileComponents();
    fixture = TestBed.createComponent(LocationBanner);
  });

  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
