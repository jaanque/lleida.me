import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing';
import { ProfileComponent } from './profile/profile';
import { HomeComponent } from './home/home';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: ':username', component: ProfileComponent }
];
