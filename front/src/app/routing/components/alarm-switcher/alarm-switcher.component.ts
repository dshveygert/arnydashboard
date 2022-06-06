import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SettingsStatusService} from "../../../shared/services/settings-status.service";
import {ISettings} from "../../../api/models";

@Component({
  selector: 'app-alarm-switcher',
  templateUrl: './alarm-switcher.component.html',
  styleUrls: ['./alarm-switcher.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlarmSwitcherComponent implements OnInit {
  public settings: ISettings;

  public changeStatus(): void {
    this.settingsStatus.changeStatus('alarm', this.settingsStatus.statusByName('alarm') === 1 ? 0 : 1);
  }

  ngOnInit(): void {
  }

  constructor(public settingsStatus: SettingsStatusService) {
  }

}
