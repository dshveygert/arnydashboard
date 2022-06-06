import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {MaterialDesignModule} from "./material/material.module";
import {NotFoundPage} from "../routing/components/not-found/not-found.page";

const modules = [CommonModule, FormsModule, ReactiveFormsModule, MaterialDesignModule];
const components = [NotFoundPage];

@NgModule({
  declarations: components,
  imports: [
    ...modules,
    AngularSvgIconModule.forRoot(),
  ],
  exports: [
    ...modules,
    AngularSvgIconModule,
  ]
})
export class SharedModule {
}
