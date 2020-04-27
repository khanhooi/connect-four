import { GameBoardComponent } from './game-board/game-board.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';


const routes: Routes = [
  { path: `game`, component: GameBoardComponent },
  { path: `menu`, component: MenuComponent },
  { path: '', pathMatch: 'full', redirectTo: `menu`}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
