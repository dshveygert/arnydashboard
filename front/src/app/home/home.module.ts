import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LightStatusComponent} from "./components/light-status/light-status.component";
import {HomeStatusComponent} from "./components/home-status/home-status.component";
import {DoorStatusComponent} from "./components/door-status/door-status.component";
import {WaterStatusComponent} from "./components/water-status/water-status.component";

const components = [HomePageComponent, LightStatusComponent, HomeStatusComponent, DoorStatusComponent, WaterStatusComponent];
const routes: Routes = [
  {path: '', component: HomePageComponent}
];

@NgModule({
  declarations: components,
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: []
})
export class HomeModule {
}
