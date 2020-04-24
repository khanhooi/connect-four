import { GameService } from './game.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private gameService: GameService) {}
  title = 'connect-four';
  newGame(): void { this.gameService.newGame(); }
}
