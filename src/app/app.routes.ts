import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing';
import { ProfileComponent } from './profile/profile';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: ':username', component: ProfileComponent }
];
