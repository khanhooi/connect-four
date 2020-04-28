import { VictoryCheckService } from './victory-check.service';
import { TokenColour } from './Unit';
import { Injectable } from '@angular/core';
import { Observable, of, defer } from 'rxjs';
import { GameBoard } from './game-board';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlayerAiService {
  constructor(private victoryCheckService: VictoryCheckService) {}

  nextMove(gameBoard: GameBoard, tokenColour: TokenColour): Observable<number> {
    // let col;
    // do {
    //   col = Math.floor(Math.random() * GameBoard.COLUMNS);
    // } while (GameBoard.isColumnFull(gameBoard[col]));

    // const randomDelay: number = 500 + Math.random() * 1000;

    // return of(col).pipe(delay(randomDelay));

    // const result = this.search(gameBoard, tokenColour, 2)[0];
    // console.log(`result=${result};`);


    // return of( result );
    return  of(this.search(gameBoard, tokenColour, 2)[0]);
  }

  private assessVictory(
    gameBoard: GameBoard,
    friendlyToken: TokenColour
  ): number {
    const result = this.victoryCheckService.check(gameBoard);
    if (result) {
      return result === friendlyToken ? 10 : -50;
    }
    return GameBoard.isBoardFull(gameBoard) ? -10 : null;
  }

  private populatePossibilities(
    gameBoard: GameBoard,
    tokenColour: TokenColour
  ): GameBoard[] {
    const boards: GameBoard[] = [];
    for (let colIndex = 0; colIndex < gameBoard.length; colIndex++) {
      if (GameBoard.isColumnFull(gameBoard[colIndex])) {
        continue;
      }
      const newBoard = GameBoard.copy(gameBoard);

      GameBoard.addToColumn(newBoard, colIndex, tokenColour);
      boards.push(newBoard);
    }
    return boards;
  }

  /*
   *
   * Returns, a tuple, < best column index, total score >
   */
  private search(
    gameBoard: GameBoard,
    tokenColour: TokenColour,
    depth: number
  ): [number, number] {

    if ( depth <= 0 ) { console.log("depth limit reached, returning.");
     return [ 0, 0]; }
    const friendlyToken = tokenColour;
    const antagonist =
      tokenColour === TokenColour.red ? TokenColour.yellow : TokenColour.red;

    let outputResult: [number, number] = [null, null];
    let results: number[] = [gameBoard.length];


    // const newBoards = this.populatePossibilities(
    //   gameBoard,
    //   friendlyToken
    // );

    for (let colIndex = 0; colIndex < gameBoard.length; colIndex++) {
      let newBoard = GameBoard.copy(gameBoard);
      if (GameBoard.isColumnFull(newBoard[colIndex])) {
        results[colIndex] = null;
        continue;
      }


      GameBoard.addToColumn(newBoard, colIndex, friendlyToken);

      let result: number = this.assessVictory(gameBoard, friendlyToken);
      if (result) {
        results[colIndex] = result;
        continue;
      }

      let expansionResult = 0;
      // If the game didnt end, we want to expand all the possibilties,
      // so we must expand the available nodes with the antagonist token.
      const newAntagonistBoards = this.populatePossibilities(
        newBoard,
        antagonist
      );

      for (const board of newAntagonistBoards) {
        const antagonistResult = this.assessVictory(board, friendlyToken);
        if (antagonistResult != null) {
          expansionResult += antagonistResult;
          continue;
        }
        expansionResult += this.search( board, friendlyToken, depth - 1)[1];
        // we have to call search, here. then sum the results.
      }
      results[colIndex] = expansionResult;
    }

    let totalResult = 0;
    let bestResult: number = -Infinity;
    console.log(JSON.stringify(results));

    for (let i = 0; i < results.length; ++i) {
      if (results[i] != null ) {
        console.log(`for index ${i}, result[i]=${results[i]} and best result=${bestResult}`)
        if (results[i] > bestResult) {
          outputResult[0] = i;
          bestResult = results[i];
        }
        totalResult += results[i];
      }
    }
    outputResult[1] = totalResult;

    console.log(JSON.stringify(outputResult));
    return outputResult;
  }
}
