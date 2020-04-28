import { Unit } from '../services/Unit';
import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../services/game.service';
@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.css']
})
export class BoardSquareComponent implements OnInit {

  constructor(private game: GameService) { }

  @Input() player: Unit;
  @Input() x: number;
  @Input() y: number;

  ngOnInit(): void {
  }

  click(): void {
    if ( this.player.type ) { return; }
    // this.game.updateSquare(this.x, this.y);
  }

}
