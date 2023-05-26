import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/app-routing';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(ROUTES)],
}).catch((err) => console.error(err));
