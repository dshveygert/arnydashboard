import { FormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import {debounceTime, Subject, SubscriptionLike, tap } from 'rxjs';

export function formGroupValidate(formGroup: FormGroup): void {
  for (const item in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(item)) {
      formGroup.controls[item].markAsDirty();
      formGroup.controls[item].updateValueAndValidity();
    }
  }
}

export function formGroupTrim(formGroup: FormGroup): void {
  for (const item in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(item)) {
      const {value} = formGroup.controls[item];
      if (typeof value === 'string') {
        formGroup.controls[item].setValue((value as string)?.trim());
      }
    }
  }
}

export function formGroupStatusChanges(formGroup: FormGroup, errors: { [k: string]: Subject<string[]> }, list: Params): SubscriptionLike {
  return formGroup.statusChanges.pipe(debounceTime(150), tap(() => {
    const keys = Object.keys(formGroup.controls);
    for (const key of keys) {
      if (errors[key]) {
        // @ts-ignore
        errors[key].next(Object.keys(formGroup.get(key).errors || {}).map(data => list[data]));
      }
    }
  })).subscribe();
}
