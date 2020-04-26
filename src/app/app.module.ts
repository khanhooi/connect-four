import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { BoardColumnComponent } from './board-column/board-column.component';
import { BoardSquareComponent } from './board-square/board-square.component';
import { PlayerDisplayComponent } from './player-display/player-display.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    BoardColumnComponent,
    BoardSquareComponent,
    PlayerDisplayComponent,
    NavigationBarComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
