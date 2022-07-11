import {Component, OnDestroy, OnInit} from '@angular/core';
import {GpioStatusService} from "../../../shared/services/gpio-status.service";
import {LoadingService} from "../../../shared/services/loading.service";
import {IGPIOStatus} from "../../../api/models";
import {SettingsStatusService} from "../../../shared/services/settings-status.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-home-status',
  templateUrl: './home-status.component.html',
  styleUrls: ['./home-status.component.sass']
})
export class HomeStatusComponent implements OnInit, OnDestroy {
  public data: IGPIOStatus[];

  get isNotificationOn$(): Observable<boolean> {
    return this.settingsStatus.statusByName$('notification').pipe(map(d => d === 1));
  }

  public toggleNotification(): void {
    const current = this.settingsStatus.statusByName('notification');
    this.settingsStatus.changeStatus('notification', current === 1 ? 0 : 1);
  }

  get isAmbientOn$(): Observable<boolean> {
    return this.settingsStatus.statusByName$('nightAmbientLightStatus').pipe(map(d => d === 1));
  }

  public toggleAmbient(): void {
    const current = this.settingsStatus.statusByName('nightAmbientLightStatus');
    this.settingsStatus.changeStatus('nightAmbientLightStatus', current === 1 ? 0 : 1);
  }

  ngOnInit(): void {
    this.status.init();
  }

  ngOnDestroy(): void {
    this.status.destroy();
  }

  constructor(public status: GpioStatusService, public l: LoadingService,
              public settingsStatus: SettingsStatusService) {
  }

}
