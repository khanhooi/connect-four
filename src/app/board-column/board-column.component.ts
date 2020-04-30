import { GameBoard } from './../services/game-board';
import { GameService } from '../services/game.service';
import { Unit, PlayerType } from '../services/Unit';
import { Component, OnInit, Input } from '@angular/core';
import { GameColumn } from '../services/game-board';
@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css']
})
export class BoardColumnComponent implements OnInit {

  @Input() x: number;
  @Input() column: GameColumn;

  constructor(public gameService: GameService) { }

  ngOnInit(): void {}

  columnFull(): boolean {
    return GameBoard.isColumnFull(this.column);
  }

  localPlayer(): boolean {
    return this.gameService.getPlayer() === PlayerType.human;
  }

  click(): void {
    this.gameService.updateColumn(this.x, );
  }
}
