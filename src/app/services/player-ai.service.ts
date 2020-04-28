import { TokenColour } from './Unit';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameBoard } from './game-board';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlayerAiService {
  constructor() {}

  nextMove(gameBoard: GameBoard, tokenColour: TokenColour): Observable<number> {
    let col;
    do {
      col = Math.floor( Math.random() * GameBoard.COLUMNS );
    } while ( GameBoard.isColumnFull(gameBoard[col]) );

    const randomDelay: number =  500 + Math.random() * 1000;

    return of(col).pipe(delay(randomDelay));
  }
}
