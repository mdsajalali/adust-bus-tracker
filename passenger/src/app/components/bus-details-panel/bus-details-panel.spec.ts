import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusDetailsPanel } from './bus-details-panel';

describe('BusDetailsPanel', () => {
  let fixture: ComponentFixture<BusDetailsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BusDetailsPanel] }).compileComponents();
    fixture = TestBed.createComponent(BusDetailsPanel);
  });

  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
