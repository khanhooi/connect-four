import { GameBoardComponent } from './game-board/game-board.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: `game`, component: GameBoardComponent },
  { path: '', pathMatch: 'full', redirectTo: `game`}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
