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
  settings: GameSettings;

  ngOnInit(): void {
  }

  onSelectionChange(entry): void {
    this.myVar = entry;
}

click():void {
  console.log("pressd new game.");
  this.router.navigateByUrl('game');
}
}
