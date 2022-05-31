import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from '../home/pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NotFoundPage } from './components/not-found/not-found.page';

const components = [LayoutComponent, NavigationComponent, HomePageComponent, FooterComponent];

const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
      {path: '', component: HomePageComponent, pathMatch: 'full'},
      {path: '**', component: NotFoundPage}
  ]}
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
export class RoutingModule { }
