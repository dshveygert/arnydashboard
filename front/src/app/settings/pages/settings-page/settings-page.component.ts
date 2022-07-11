import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";
import {filter, map, Observable} from "rxjs";
import {GpioStatusService} from "../../../shared/services/gpio-status.service";
import {SettingsStatusService} from "../../../shared/services/settings-status.service";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {

  public statusInfo(pin: string, status: number): string {
    return pin.includes('in') ? status === 1 ? 'Open' : 'Close' : status === 1 ? 'Off' : 'On';
  }

  get settingsArr$(): Observable<any> {
    return this.settingsStatus.data$.pipe(filter(d => !!d), map(d => {
      const a = Object.keys(d)?.map(key => {
        // @ts-ignore
        const value = Array.isArray(d[key]) || d[key] instanceof Object ? JSON.stringify(d[key]) : d[key];
        return {value, key};
      });
      return a;
    }));
  }

  public goToSettings(key: string) {
    this.router.navigate([`settings/${key}`]).then();
  }

  constructor(public status: GpioStatusService, public settingsStatus: SettingsStatusService, private router: Router) {
  }
}
