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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlayingBoardComponent } from './playing-board/playing-board.component';
import { TitleLogoComponent } from './title-logo/title-logo.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    BoardColumnComponent,
    BoardSquareComponent,
    PlayerDisplayComponent,
    NavigationBarComponent,
    MenuComponent,
    PlayingBoardComponent,
    TitleLogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
