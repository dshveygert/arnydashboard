import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageLayoutComponent } from './settings-page-layout.component';

describe('SettingsPageLayoutComponent', () => {
  let component: SettingsPageLayoutComponent;
  let fixture: ComponentFixture<SettingsPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPageLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
