import { Injectable } from '@angular/core';
import { filter, finalize, first, map, Observable, SubscriptionLike, tap } from 'rxjs';
import { IAmbientPeriod, IGPIOStatus, ISettings } from '../../api/models';
import { fullUnsubscribe, Collection } from '../../../utils';
import { PiApi } from '../../api/methods';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsStatusService extends Collection<ISettings> {
  private dataSub: SubscriptionLike[] = [];

  private settingsStatus = (): Observable<ISettings> => {
    return this.api.settingsStatus().pipe(filter(d => !!d), tap(d => {
      this.data = { ...d, ambientIds: d.ambientIds === 0 ? [] : d.ambientIds };
    }), finalize(() => this.l.loading = false));
  };

  private settingsGoOut = (): Observable<ISettings> => {
    return this.api.imGoOut().pipe(first(), tap(() => this.refresh()), finalize(() => this.l.loading = false));
  };

  private settingsStatusSet = <T>(key: string, value: T): Observable<T> => {
    return this.api.settingsUpdate({ key, value }).pipe(tap(() => {
      this.refresh();
    }), finalize(() => this.l.loading = false));
  };

  private refresh = (): void => {
    fullUnsubscribe(this.dataSub);
    this.init();
  };

  public statusByName$(name: string): Observable<number | string | string[] | IAmbientPeriod> {
    // @ts-ignore
    return this.data$.pipe(filter(d => !!d), map(d => d[name] === 0 ? '0' : d[name]));
  }

  public statusByName(name: string): number | string {
    // @ts-ignore
    return this.data?.[name];
  }

  public changeStatus(key: string, value: number | string | string[]): void {
    if (this.l.loading) {
      return;
    }
    this.l.loading = true;
    this.dataSub.push(this.settingsStatusSet(key, value).subscribe());
  }

  public imGoOut(): void {
    this.l.loading = true;
    this.dataSub.push(this.settingsGoOut().subscribe());
  }

  init(): void {
    this.l.loading = true;
    this.dataSub.push(this.settingsStatus().subscribe());
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
    this.data = {} as ISettings;
  }

  constructor(private api: PiApi, private l: LoadingService) {
    super();
  }
}
