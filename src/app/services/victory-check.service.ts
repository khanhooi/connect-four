import { Player, Type } from './../player';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VictoryCheckService {
  constructor() {}

  readonly victoryCondition: number = 4;

  check(board: Player[][]): Type {
    let winningPlayer: Type = null;
    winningPlayer = this.checkColumns(board);
    winningPlayer = this.checkRows(board) || winningPlayer;
    winningPlayer = this.checkDiagonals(board) || winningPlayer;
    return winningPlayer;
  }

  private checkDiagonals(board: Player[][]): Type {
    let winner: Type = null;
    for (
      let colIndex = 0;
      colIndex < board.length - this.victoryCondition;
      ++colIndex
    ) {
      for (
        let rowIndex = 0;
        rowIndex < board[0].length - this.victoryCondition;
        ++rowIndex
      ) {
        {
          const testArray: Player[] = [];
          testArray.push(board[0 + colIndex][0 + rowIndex]);
          testArray.push(board[1 + colIndex][1 + rowIndex]);
          testArray.push(board[2 + colIndex][2 + rowIndex]);
          testArray.push(board[3 + colIndex][3 + rowIndex]);
          winner = this.verifyTestArray(testArray) || winner;
        }
        {
          const testArray: Player[] = [];
          testArray.push(board[0 + colIndex][3 + rowIndex]);
          testArray.push(board[1 + colIndex][2 + rowIndex]);
          testArray.push(board[2 + colIndex][1 + rowIndex]);
          testArray.push(board[3 + colIndex][0 + rowIndex]);
          winner = this.verifyTestArray(testArray) || winner;
        }
      }
    }
    return winner;
  }

  private checkColumns(board: Player[][]): Type {
    let winner: Type = null;
    for (const column of board) {
      for (
        let rowIndex = 0;
        rowIndex < column.length - this.victoryCondition;
        ++rowIndex
      ) {
        const testArray: Player[] = column.slice(
          rowIndex,
          rowIndex + this.victoryCondition
        );
        winner = this.verifyTestArray(testArray) || winner;

      }
    }
    return winner;
  }

  private checkRows(frame: Player[][]): Type {
    let winner: Type = null;
    for (let rowIndex = 0; rowIndex < frame[0].length; ++rowIndex) {
      const testArray: Player[] = [];
      for (const column of frame) {
        testArray.push(column[rowIndex]);
        if (testArray.length === this.victoryCondition) {
          winner = this.verifyTestArray(testArray) || winner;
          testArray.shift();
        }
      }
    }
    return winner;
  }

  private verifyTestArray(testArray: Player[]): Type {
    if (testArray.every((val, i, arr) => val.type === arr[0].type)) {
      if (testArray[0].type != null) {
        testArray.forEach((player) => {
          player.isFourInARow = true;
        });
        return testArray[0].type;
      }
    }
  }
}
