import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {IGPIOStatus} from "../../../api/models";

@Component({
  selector: 'app-light-status',
  templateUrl: './light-status.component.html',
  styleUrls: ['./light-status.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightStatusComponent {
  @Input() title = '';
  @Input() status: IGPIOStatus;
  @Output() changeStatus: EventEmitter<0 | 1> = new EventEmitter<0 | 1>();

  get isActive(): boolean {
    return !this.status?.status;
  }

  @HostListener('click', ['$event.target'])
  onClick() {
    this.changeStatus.emit(this.status?.status === 1 ? 0 : 1);
  }

  constructor() {
  }

}
