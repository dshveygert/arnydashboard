import {Component, OnDestroy, OnInit} from '@angular/core';
import {GpioConfigurationService} from "../../../shared/services/gpio-configuration.service";
import {IAmbientPeriod, IGPIOList} from "../../../api/models";
import {combineLatest, map, Observable, startWith, SubscriptionLike, tap} from "rxjs";
import {Collection, fullUnsubscribe} from "../../../../utils";
import {SettingsStatusService} from "../../../shared/services/settings-status.service";

interface IPinList {name: string; value: number, description: string}

@Component({
  selector: 'app-ambient-ids',
  templateUrl: './ambient-ids.component.html',
  styleUrls: ['./ambient-ids.component.sass']
})
export class AmbientIdsComponent extends Collection<IPinList[]> implements OnInit, OnDestroy  {
  private dataSub: SubscriptionLike[] = [];
  public item: IGPIOList;

  get isDisabled$(): Observable<boolean> {
    return this.isAmbientOn$.pipe(map(d => !d));
  }

  get isAmbientOn$(): Observable<boolean> {
    return this.settingsStatus.statusByName$('nightAmbientLightStatus').pipe(map(d => d === 1));
  }

  get ambientPeriod$(): Observable<string> {
    // @ts-ignore
    return this.settingsStatus.statusByName$('ambientLightPeriod').pipe(map((d: IAmbientPeriod) => {
      return `ON: ${d.timeOn[0]}:${d.timeOn[1]} | OFF: ${d.timeOff[0]}:${d.timeOff[1]}`;
    }));
  }

  public toggleAmbient(): void {
    const current = this.settingsStatus.statusByName('nightAmbientLightStatus');
    this.settingsStatus.changeStatus('nightAmbientLightStatus', current === 1 ? 0 : 1);
  }

  get activePins$(): Observable<string[]> {
    // @ts-ignore
    return this.settingsStatus.statusByName$('ambientIds').pipe(startWith([]));
  }

  public toggleAmbientPin(item: IPinList): void {
    if (!this.settingsStatus.statusByName('nightAmbientLightStatus')) {
      return;
    }
    const {name, value} = item
    let newStatus = [...this.data];//.map(item => item.name);
    const index = newStatus.findIndex(item => item.name === name);
    newStatus[index] = {...newStatus[index], value: value === 1 ? 0 : 1};
    this.data = newStatus;
    this.settingsStatus.changeStatus('ambientIds', newStatus.filter(item => item.value === 1).map(item => item.name));
  }

  ngOnInit(): void {
    this.dataSub.push(combineLatest([this.activePins$, this.gpioConfig.data$]).pipe(tap(data => {
      const [activePins = [], allPins = []] = data;
      this.data = allPins?.map(item => {
        return {
          name: item.name,
          value: activePins?.findIndex(v => v === item.name) >= 0 ? 1 : 0,
          description: item.description
        }
      });
    })).subscribe());
  }

  ngOnDestroy(): void {
    fullUnsubscribe(this.dataSub);
  }

  constructor(public gpioConfig: GpioConfigurationService, public settingsStatus: SettingsStatusService) {
    super();
  }
}
