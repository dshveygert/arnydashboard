import {Component, OnDestroy, OnInit} from '@angular/core';
import {GpioStatusService} from "../../../shared/services/gpio-status.service";
import {GpioConfigurationService} from "../../../shared/services/gpio-configuration.service";

@Component({
  selector: 'app-settings-page-layout',
  templateUrl: './settings-page-layout.component.html',
  styleUrls: ['./settings-page-layout.component.sass']
})
export class SettingsPageLayoutComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    this.gpioStatus.init();
    this.gpioConfig.getOutputPins();
  }

  ngOnDestroy(): void {
    this.gpioStatus.destroy();
  }

  constructor(public gpioStatus: GpioStatusService, private gpioConfig: GpioConfigurationService) { }

}
