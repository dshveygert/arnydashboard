import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {SettingsStatusService} from "../../../shared/services/settings-status.service";
import {LoadingService} from "../../../shared/services/loading.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy {

  get started$(): Observable<string> {
    return this.settingsStatus.statusByName$('started').pipe(map(d => d?.toString()));
  }

  get activeGoOut$(): Observable<boolean> {
    return this.settingsStatus.statusByName$('imGoOut').pipe(map(d => d == 1));
  }

  ngOnInit(): void {
    this.settingsStatus.init();
  }

  ngOnDestroy(): void {
    this.settingsStatus.destroy();
  }

  constructor(public settingsStatus: SettingsStatusService, public l: LoadingService) {
  }
}
