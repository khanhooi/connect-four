import { Player } from './../player';
import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.css']
})
export class BoardSquareComponent implements OnInit {

  constructor(private game: GameService) { }

  @Input() player: Player;
  @Input() x: number;
  @Input() y: number;

  ngOnInit(): void {
  }

  click(): void {
    if ( this.player.type ) { return; }
    this.game.updateSquare(this.x, this.y);
  }

}
