import { Routes } from '@angular/router';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { QuantitiesPageComponent } from './pages/quantities-page/quantities-page.component';

export const routes: Routes = [
  { path: 'details', component: DetailsPageComponent },
  { path: 'quantities', component: QuantitiesPageComponent },
  { path: '', redirectTo: '/details', pathMatch: 'full' },
];
