import { Routes } from '@angular/router';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { QuantitiesPageComponent } from './pages/quantities-page/quantities-page.component';
import { CostsPageComponent } from './pages/costs-page/costs-page.component';
import { PeoplePageComponent } from './pages/people-page/people-page.component';
import { PreviewPageComponent } from './pages/preview-page/preview-page.component';

export const routes: Routes = [
  { path: 'details', component: DetailsPageComponent },
  { path: 'quantities', component: QuantitiesPageComponent },
  { path: 'costs', component: CostsPageComponent },
  { path: 'people', component: PeoplePageComponent },
  { path: 'preview', component: PreviewPageComponent },
  { path: '', redirectTo: '/details', pathMatch: 'full' },
];
