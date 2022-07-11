import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IGPIOList, IGPIOStatus} from "../models";

@Injectable()
export class PiApi {
  private api = `${environment.api.host}/api`;
  private gpio = `${this.api}/gpio`;
  private settings = `${this.api}/settings`;

  public gpioStatusUpdate(data: { pinName: string, pinStatus: 0 | 1 }): Observable<any> {
    return this.http.put<any>(`${this.gpio}/status`, data);
  }

  public gpioStatus(): Observable<IGPIOStatus[]> {
    return this.http.get<IGPIOStatus[]>(`${this.gpio}/status`);
  }

  public gpioList(): Observable<IGPIOList[]> {
    return this.http.get<IGPIOList[]>(`${this.gpio}/list`);
  }

  public settingsUpdate(data: { key: string, value: any }): Observable<any> {
    return this.http.put<any>(`${this.settings}`, data);
  }

  public settingsStatus(): Observable<any> {
    return this.http.get<any>(`${this.settings}`);
  }

  public settingsStatusByKey(key: string): Observable<any> {
    return this.http.get<any>(`${this.settings}/${key}`);
  }

  public imGoOut(): Observable<any> {
    return this.http.put<any>(`${this.settings}/goout`, {});
  }

  constructor(private http: HttpClient) {
  }
}
