import {Injectable} from '@angular/core';
import {filter, finalize, Observable, SubscriptionLike, tap} from 'rxjs';
import {IGPIOStatus} from "../../api/models";
import {fullUnsubscribe, Collection} from "../../../utils";
import {PiApi} from "../../api/methods";
import {LoadingService} from "./loading.service";

@Injectable({
  providedIn: 'root'
})
export class GpioStatusService extends Collection<IGPIOStatus[] | null> {
  private dataSub: SubscriptionLike[] = [];

  private gpioStatus = (): Observable<IGPIOStatus[]> => {
    return this.api.gpioStatus().pipe(filter(d => !!d), tap(d => {
      this.data = d;
    }), finalize(() => this.l.loading = false));
  }

  private gpioStatusSet = (pinName: string, pinStatus: 0 | 1): Observable<IGPIOStatus[]> => {
    return this.api.gpioStatusUpdate({pinName, pinStatus}).pipe(tap(d => {
      this.refresh();
    }), finalize(() => this.l.loading = false));
  }

  private refresh = (): void => {
    fullUnsubscribe(this.dataSub);
    this.init();
  }

  public statusByName(name: string): IGPIOStatus | undefined {
    return this.data?.find(item => item.key === name);
  }

  public changeStatus(status: 0 | 1, pinName: string): void {
    if (this.l.loading) return;
    this.l.loading = true;
    this.dataSub.push(this.gpioStatusSet(pinName, status).subscribe());
  }

  init(): void {
    this.l.loading = true;
    this.dataSub.push(this.gpioStatus().subscribe());
  }

  destroy(): void {
    fullUnsubscribe(this.dataSub);
    this.data = null;
  }

  constructor(private api: PiApi, private l: LoadingService) {
    super();
  }
}
