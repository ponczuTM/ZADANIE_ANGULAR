import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'list-of-smart-guys',
        loadChildren: () => import('./list-of-smart-guys/list-of-smart-guys.module').then(m => m.ListOfSmartGuysModule)
    },
    { 
        path: '**',
        component: HomeComponent,
    },
];