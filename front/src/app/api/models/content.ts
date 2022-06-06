import {Observable} from "rxjs";

export interface ICollection<T = any> {
  data: T;
  data$: Observable<T>;

  init?(...params: any): void;

  destroy?(): void;
}
