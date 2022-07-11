import {Injectable} from '@angular/core';
import {IGPIO, IGPIOList, TGPIO, TGPIOCategory} from 'src/app/api/models';
import {Collection} from "../../../utils";
import {filter, finalize, first, Observable, startWith, SubscriptionLike, tap} from "rxjs";
import {PiApi} from "../../api/methods";
import {LoadingService} from "./loading.service";

@Injectable({
  providedIn: 'root'
})
export class GpioConfigurationService extends Collection<IGPIOList[]> {
  private dataSub: SubscriptionLike[] = [];

  get data$(): Observable<IGPIOList[]> {
    return this._data$.pipe(startWith([]));
  }

  private _gpioConfig: IGPIO[] = [
    {id: 4, name: 'out4', type: 'out', description: 'Toilet, W_LED', category: ['toilet']},
    {id: 5, name: 'out5', type: 'out', description: 'Kids, relay, W_LED', category: ['kids']},
    {id: 16, name: 'out16', type: 'out', description: 'Hall, relay, W_LED', category: ['hall']},
    {id: 22, name: 'out22', type: 'out', description: 'Kids, relay, R_LED', category: ['kids']},
    {id: 23, name: 'in23', type: 'in', description: 'Hall, door reed switch', category: ['hall']},
    {id: 24, name: 'in24', type: 'in', description: 'Hall, door bell button', category: ['hall']},
    {id: 25, name: 'out25', type: 'out', description: 'Hall, relay, night-light', category: ['hall']},
    {id: 26, name: 'out26', type: 'out', description: 'Hall, relay, light', category: ['hall']}
  ];

  public getGPIOByName(name: string): IGPIO {
    const index = this._gpioConfig.findIndex(i => i.name === name);
    return this._gpioConfig[index] || null;
  }

  public getGPIOByCategoryAndType(cat: TGPIOCategory, type: TGPIO): IGPIO[] {
    return this._gpioConfig.filter(i => i.type === type && i.category.findIndex(n => n === cat) >= 0);
  }

  private settingsStatus = (): Observable<IGPIOList[]> => {
    return this.api.gpioList().pipe(filter(d => !!d), tap(d => {
      this.data = d;
    }), finalize(() => this.l.loading = false));
  }

  public getOutputPins(): void {
    this.dataSub.push(this.settingsStatus().pipe(first()).subscribe())
  }

  constructor(private api: PiApi, private l: LoadingService) {
    super();
  }
}
