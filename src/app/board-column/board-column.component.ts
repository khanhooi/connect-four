import { GameService } from './../game.service';
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

  constructor(private gameService: GameService) { }

  ngOnInit(): void {}

  click(): void {
    let y = -1;
    this.column.every(player => {
      ++y;
      return player.type;
    });
    this.gameService.updateSquare(this.x, y);



  }
}
