import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {SharedModule} from '../shared/shared.module';
import {LayoutComponent} from './components/layout/layout.component';
import {FooterComponent} from "./components/footer/footer.component";
import {NotFoundPage} from './components/not-found/not-found.page';
import {AlarmSwitcherComponent} from "./components/alarm-switcher/alarm-switcher.component";

const components = [LayoutComponent, FooterComponent, AlarmSwitcherComponent];

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', loadChildren: () => import(`../home/home.module`).then(m => m.HomeModule), pathMatch: 'full'},
      {path: 'settings', loadChildren: () => import(`../settings/settings.module`).then(m => m.SettingsModule)},
      {path: '**', component: NotFoundPage}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'disabled',
      anchorScrolling: 'enabled',
      preloadingStrategy: PreloadAllModules
    }),
    SharedModule],
  exports: [RouterModule],
  declarations: components
})
export class RoutingModule {
}
