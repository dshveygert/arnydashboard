import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const components = [SettingsPageComponent];
const routes: Routes = [
  {path: '', component: SettingsPageComponent}
];

@NgModule({
  declarations: components,
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: []
})
export class SettingsModule {
}
