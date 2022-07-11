import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { SettingsEditPageComponent } from './pages/settings-edit-page/settings-edit-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import {SettingsPageLayoutComponent} from "./pages/settings-page-layout/settings-page-layout.component";
import {AmbientIdsComponent} from "./components/ambient-ids/ambient-ids.component";

const components = [SettingsPageComponent, SettingsEditPageComponent, SettingsPageLayoutComponent,
AmbientIdsComponent];
const routes: Routes = [
  {path: '', component: SettingsPageLayoutComponent, children: [
      {path: '', component: SettingsPageComponent, pathMatch: 'full'},
      {path: ':settingsKey', component: SettingsEditPageComponent}
  ]}
];

@NgModule({
  declarations: components,
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: []
})
export class SettingsModule {
}
