import { GameType, GameSettings } from './../game-settings';
import { GameService } from './../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  public myVar: any = 0;
  public settings: GameSettings;

  ngOnInit(): void {
    this.settings = new GameSettings();
    this.settings.gameType= GameType.playerVplayer;
  }

  onSelectionChange(entry): void {
    this.settings.gameType = entry;
}

startGame():void {
  this.gameService.newGame(this.settings);
  this.router.navigateByUrl('game');
}
}
