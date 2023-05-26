import { enableProdMode, } from '@angular/core';
import { AppComponent } from './app/app.component';
import {  bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/app-routing';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(ROUTES)],
}).catch((err) => console.error(err));

if (environment.production) {
  enableProdMode();
}
