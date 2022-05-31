import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { SubscriptionLike } from "rxjs";
import { fullUnsubscribe } from "../../../../utils";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnDestroy {
  private dataSub: SubscriptionLike[] = [];

  ngOnDestroy(): void {
    fullUnsubscribe(this.dataSub);
  }

  constructor(private router: Router) { }
}
