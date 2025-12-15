import { Routes } from '@angular/router';
import { LoginComponent } from './compo/login/login.component';
import { RegisterComponent } from './compo/register/register.component';
import { LobbyComponent } from './compo/lobby/lobby.component';
import { GameComponent } from './compo/game/game.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'lobby', component: LobbyComponent },
    { path: 'game/:id', component: GameComponent }
];
