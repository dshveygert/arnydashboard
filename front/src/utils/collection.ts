import {Observable, ReplaySubject} from 'rxjs';
import {ICollection} from "../app/api/models";

export class Collection<T = any> implements ICollection<T> {
  _data: T;
  _data$: ReplaySubject<T> = new ReplaySubject<T>(1);

  get data(): T {
    return this._data;
  }

  set data(data: T) {
    this._data = data;
    this._data$.next(this._data);
  }

  get data$(): Observable<T> {
    return this._data$;
  }

  public trackByFn = (i: number, item: {id: number}): number => item?.id ?? i;
}
