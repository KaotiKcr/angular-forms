import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormPoster } from './services/form-poster.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RatingModule } from 'ngx-bootstrap/rating';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    RatingModule.forRoot()
  ],
  providers: [FormPoster],
  bootstrap: [AppComponent]
})
export class AppModule {}
