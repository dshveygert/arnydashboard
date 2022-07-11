import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbientIdsComponent } from './ambient-ids.component';

describe('AmbientIdsComponent', () => {
  let component: AmbientIdsComponent;
  let fixture: ComponentFixture<AmbientIdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbientIdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbientIdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
