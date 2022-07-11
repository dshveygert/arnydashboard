import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable, ReplaySubject, SubscriptionLike, switchMap, tap} from 'rxjs';
import { fullUnsubscribe } from 'src/utils';
import {SettingsStatusService} from "../../../shared/services/settings-status.service";
import {combineLatest, map} from "rxjs/operators";

@Component({
  selector: 'app-settings-edit-page',
  templateUrl: './settings-edit-page.component.html',
  styleUrls: ['./settings-edit-page.component.sass']
})
export class SettingsEditPageComponent implements OnInit {
  private dataSub: SubscriptionLike[] = [];
  private _settingsKey$: ReplaySubject<string> = new ReplaySubject<string>(1);

  get key$(): Observable<string> {
    return this._settingsKey$;
  }
  set key(name: string) {
    this._settingsKey$.next(name);
  }

  get defaultData$(): Observable<string> {
    // @ts-ignore
    return this.key$.pipe(switchMap(k => {
      return this.settingsStatus.statusByName$(k).pipe(map(d => (!!d && JSON.stringify(d)) ?? 'No data'));
    }))
  }

  ngOnInit(): void {
    this.dataSub.push(this.route.params.pipe(tap(({settingsKey}) => {
      this.key = settingsKey ?? 'default';
    })).subscribe());
  }
  ngOnDestroy(): void {
    fullUnsubscribe(this.dataSub);
  }

  constructor(private route: ActivatedRoute, public settingsStatus: SettingsStatusService) { }

}
