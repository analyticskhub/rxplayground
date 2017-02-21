import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { StreamsComponent } from './components/streams/streams.component';
import { StreampgComponent } from './components/streampg/streampg.component';
import { ReportComponent } from './components/streampg/report.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  { path: 'home', component: HomeComponent },
  { path: 'streams', component: StreamsComponent },
  { path: 'streams/:type', component: StreampgComponent },
  { path: 'reports', component: ReportComponent },
];

export const routing = RouterModule.forRoot(routes);

export const routedComponents = [HomeComponent];
