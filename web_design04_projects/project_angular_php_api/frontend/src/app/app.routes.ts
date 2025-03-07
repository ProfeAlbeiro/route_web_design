import { Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'locations', component: HomeComponent, title: 'Home Page' },
    { path: '', redirectTo: '/locations', pathMatch: 'full' },
    { path: 'locations/:id', component: DetailsComponent, title: 'Home Details' }
];
