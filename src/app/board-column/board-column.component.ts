import { GameService } from '../services/game.service';
import { Unit } from '../services/Unit';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css']
})
export class BoardColumnComponent implements OnInit {

  @Input() x: number;
  @Input() column: Unit[];

  constructor(public gameService: GameService) { }

  ngOnInit(): void {}

  columnFull(): boolean {
    return (this.column[this.column.length - 1].type ) ? true  : false;
  }

  click(): void {
    //@todo Move this to game.service
    if ( this.columnFull() ) { return; }
    let y = -1;
    this.column.every(player => {
      ++y;
      return player.type;
    });
    this.gameService.updateSquare(this.x, y);
  }
}
