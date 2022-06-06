import {TestBed} from '@angular/core/testing';

import {GpioConfigurationService} from './gpio-configuration.service';

describe('GpioConfigurationService', () => {
  let service: GpioConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpioConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
