import { Routes } from '@angular/router';
import { LoginComponent } from './compo/login/login.component';
import { RegisterComponent } from './compo/register/register.component';
import { LobbyComponent } from './compo/lobby/lobby.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'lobby', component: LobbyComponent }
];
