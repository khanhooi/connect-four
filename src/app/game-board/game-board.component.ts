import { GameService } from './../game.service';
import { Player } from './../player';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit(): void {

  }

}
