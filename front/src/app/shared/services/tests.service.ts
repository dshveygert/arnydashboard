import { Injectable } from '@angular/core';
import { first, SubscriptionLike } from 'rxjs';
import { PiApi } from '../../api/methods';

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  private dataSub: SubscriptionLike[] = [];

  public alarmTest = (): void => {
    this.api.testAlarm().pipe(first()).subscribe();
  };

  public testNotification = (): void => {
    this.api.testNotification().pipe(first()).subscribe();
  };

  constructor(private api: PiApi) {
  }
}
