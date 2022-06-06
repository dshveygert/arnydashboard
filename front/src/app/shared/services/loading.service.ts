import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading: boolean;
  private _loading$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  get loading(): boolean {
    return this._loading;
  }

  set loading(status: boolean) {
    this._loading = status;
    this._loading$.next(this._loading);
  }

  get loading$(): Observable<boolean> {
    return this._loading$;
  }

  constructor() {
  }
}
