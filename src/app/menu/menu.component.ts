import { GameService } from './../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private gameService: GameService) { }

  public myVar: any = 0;

  ngOnInit(): void {
  }

  onSelectionChange(entry): void {
    this.myVar = entry;
}
}
