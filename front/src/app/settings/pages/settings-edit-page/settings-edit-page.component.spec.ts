import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEditPageComponent } from './settings-edit-page.component';

describe('SettingsEditPageComponent', () => {
  let component: SettingsEditPageComponent;
  let fixture: ComponentFixture<SettingsEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
