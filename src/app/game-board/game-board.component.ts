import { GameService } from '../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  constructor(public gameService: GameService) {}
  ngOnInit(): void {}

  /* To ensure that all columns have the same dimensions,
     we need to manually divide the available space to the number of columns.
  */
  getTableWidth(containerOffsetWidth: number, containerOffsetHeight: number): number {
    const numberOfColumns = this.gameService.board.length;
    const numberOfRows = this.gameService.board[0].length;

    let squareSize = Math.floor(containerOffsetWidth / numberOfColumns) + 1;
    let height: number;
    do {
      squareSize--;
      console.log(`something is happening: ${squareSize}`);

      // square size is number of rows + 1 because there is the equivalent of an extra row for the
      // hint token.
      height = squareSize * ( numberOfRows + 1 );
    } while (height > containerOffsetHeight);
    return squareSize * numberOfColumns;
  }
  onResize(event): void{
    event.target.innerWidth;
  }
}
