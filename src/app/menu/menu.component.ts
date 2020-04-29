import { GameSettingsService } from './../services/game-settings.service';
import { GameService } from './../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router, public settings: GameSettingsService) { }

  public myVar: any = 0;

  ngOnInit(): void {}

  onSelectionChange(entry): void {
    this.settings.gameType = entry;
}

startGame(): void {
  this.gameService.newGame();
  this.router.navigateByUrl('game');
}
}
