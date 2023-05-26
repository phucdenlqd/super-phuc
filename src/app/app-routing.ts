import { Routes } from "@angular/router";
import { MeComponent } from "./me/me.component";

export const ROUTES: Routes = [
  {
    path: 'me',
    component: MeComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
]
