import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './views/auth.component';
import { MainComponent } from './views/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'auth/:action', component: AuthComponent },
  { path: 'callback', redirectTo: 'auth/authenticate', pathMatch: 'full'},
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);