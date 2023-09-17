import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {IGPIOStatus} from "../../../api/models";
import {Observable} from "rxjs";

@Component({
  selector: 'app-water-status',
  templateUrl: './water-status.component.html',
  styleUrls: ['./water-status.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaterStatusComponent {
  @Input() status: IGPIOStatus;
  @Input() setting: Observable<string>;

  get isActive(): boolean {
    return this.status?.status === 0;
  }

  get title(): string {
    return this.status?.status === 1 ? 'Alarmed' : 'OK';
  }

  constructor() {
  }

}
