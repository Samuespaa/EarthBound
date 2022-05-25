import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { HomeComponent } from './home/home.component';
import { BattleComponent } from './battle/battle.component';

const routes: Routes = [
  {path: 'loading', component: LoadingComponent},
  {path: 'home', component: HomeComponent},
  {path: 'battle', component: BattleComponent},
  {path: '', redirectTo: 'loading', pathMatch: 'full'},
  {path: '**', redirectTo: 'loading', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
