import { GameService } from '../services/game.service';
import { Player } from './../player';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css']
})
export class BoardColumnComponent implements OnInit {

  @Input() x: number;
  @Input() column: Player[];

  constructor(public gameService: GameService) { }

  ngOnInit(): void {}

  columnFull(): boolean {
    return (this.column[this.column.length - 1].type ) ? true  : false;
  }

  click(): void {
    if ( this.columnFull() ) { return; }
    let y = -1;
    this.column.every(player => {
      ++y;
      return player.type;
    });
    this.gameService.updateSquare(this.x, y);
  }
}
