import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth.component';
import { MainComponent } from './components/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'auth/:action', component: AuthComponent },
  { path: 'callback', redirectTo: 'auth/authenticate', pathMatch: 'full'},
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);