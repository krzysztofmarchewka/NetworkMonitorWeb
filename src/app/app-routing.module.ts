import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonitorComponent } from './monitor/monitor.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { ReversednsComponent } from './reversedns/reversedns.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent},
  { path: 'monitor', component: MonitorComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'reversedns', component: ReversednsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
