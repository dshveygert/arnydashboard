import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {IGPIOStatus} from "../../../api/models";
import {Observable} from "rxjs";

@Component({
  selector: 'app-door-status',
  templateUrl: './door-status.component.html',
  styleUrls: ['./door-status.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoorStatusComponent {
  @Input() status: IGPIOStatus;
  @Input() setting: Observable<string>;

  get isActive(): boolean {
    return this.status?.status === 1;
  }

  get title(): string {
    return this.status?.status === 0 ? 'Closed' : 'Opened';
  }

  constructor() {
  }

}
