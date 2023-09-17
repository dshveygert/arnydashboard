import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WaterStatusComponent} from './water-status.component';

describe('DoorStatusComponent', () => {
  let component: WaterStatusComponent;
  let fixture: ComponentFixture<WaterStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaterStatusComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
