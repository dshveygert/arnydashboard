import {TestBed} from '@angular/core/testing';

import {GpioStatusService} from './gpio-status.service';

describe('GpioStatusService', () => {
  let service: GpioStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpioStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
