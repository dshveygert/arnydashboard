import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {filter, map, Observable, SubscriptionLike} from "rxjs";
import {fullUnsubscribe} from "../../../../utils";
import {GpioStatusService} from "../../../shared/services/gpio-status.service";
import {SettingsStatusService} from "../../../shared/services/settings-status.service";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent implements OnInit, OnDestroy {

  public statusInfo(pin: string, status: number): string {
    return pin.includes('in') ? status === 1 ? 'Open' : 'Close' : status === 1 ? 'Off' : 'On';
  }

  get settingsArr$(): Observable<any> {
    return this.settingsStatus.data$.pipe(filter(d => !!d), map(d => {
      const a = Object.keys(d)?.map(key => {
        // @ts-ignore
        const value = Array.isArray(d[key]) ? JSON.stringify(d[key]) : d[key];
        return {value, key};
      });
      return a;
    }));
  }

  ngOnInit(): void {
    this.status.init();
  }

  ngOnDestroy(): void {
    this.status.destroy();
  }

  constructor(public status: GpioStatusService, public settingsStatus: SettingsStatusService) {
  }
}
