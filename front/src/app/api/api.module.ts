import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PiApi} from './methods';

const api = [PiApi];

@NgModule({
  imports: [HttpClientModule],
  providers: [...api]
})
export class ApiModule {
}
