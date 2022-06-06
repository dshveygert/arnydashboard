import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LoadingService} from "../../../shared/services/loading.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  constructor(public l: LoadingService) {
  }
}
