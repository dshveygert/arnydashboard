import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from "@angular/material/checkbox";


const modules = [MatToolbarModule, MatIconModule, MatButtonModule, MatButtonToggleModule, MatMenuModule,
  MatDialogModule, MatGridListModule, MatCardModule, MatInputModule, MatProgressBarModule, MatDividerModule,
  MatCheckboxModule];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class MaterialDesignModule {
}
