import { Routes } from "@angular/router";
import { MeComponent } from "./me/me.component";
import { FaceComponent } from "./face/face.component";

export const ROUTES: Routes = [
  {
    path: 'me',
    component: MeComponent
  },
  {
    path: 'face',
    component: FaceComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
]
