import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AlarmSwitcherComponent} from './alarm-switcher.component';

describe('AlarmSwitcherComponent', () => {
  let component: AlarmSwitcherComponent;
  let fixture: ComponentFixture<AlarmSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmSwitcherComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
