import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NearbyBusesSidebar } from './nearby-buses-sidebar';

describe('NearbyBusesSidebar', () => {
  let fixture: ComponentFixture<NearbyBusesSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NearbyBusesSidebar] }).compileComponents();
    fixture = TestBed.createComponent(NearbyBusesSidebar);
  });

  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
