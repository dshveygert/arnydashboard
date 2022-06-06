import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DoorStatusComponent} from './door-status.component';

describe('DoorStatusComponent', () => {
  let component: DoorStatusComponent;
  let fixture: ComponentFixture<DoorStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoorStatusComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
