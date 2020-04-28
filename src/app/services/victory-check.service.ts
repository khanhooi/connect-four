import { Player, TokenColour } from './../player';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VictoryCheckService {
  constructor() {}

  readonly victoryCondition: number = 4;

  check(board: Player[][]): TokenColour {
    let winningPlayer: TokenColour = null;
    winningPlayer = this.checkColumns(board);
    winningPlayer = this.checkRows(board) || winningPlayer;
    winningPlayer = this.checkDiagonals(board) || winningPlayer;
    return winningPlayer;
  }

  private checkDiagonals(board: Player[][]): TokenColour {
    let winner: TokenColour = null;
    for (
      let colOffset = 0;
      colOffset <= board.length - this.victoryCondition;
      ++colOffset
    ) {
      for (
        let rowOffset = 0;
        rowOffset <= board[0].length - this.victoryCondition;
        ++rowOffset
      ) {
        {
          const testArray: Player[] = [];
          testArray.push(board[0 + colOffset][0 + rowOffset]);
          testArray.push(board[1 + colOffset][1 + rowOffset]);
          testArray.push(board[2 + colOffset][2 + rowOffset]);
          testArray.push(board[3 + colOffset][3 + rowOffset]);
          winner = this.verifyTestArray(testArray) || winner;
        }
        {
          const testArray: Player[] = [];
          testArray.push(board[0 + colOffset][3 + rowOffset]);
          testArray.push(board[1 + colOffset][2 + rowOffset]);
          testArray.push(board[2 + colOffset][1 + rowOffset]);
          testArray.push(board[3 + colOffset][0 + rowOffset]);
          winner = this.verifyTestArray(testArray) || winner;
        }
      }
    }
    return winner;
  }

  private checkColumns(board: Player[][]): TokenColour {
    let winner: TokenColour = null;
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

  private checkRows(frame: Player[][]): TokenColour {
    let winner: TokenColour = null;
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

  private verifyTestArray(testArray: Player[]): TokenColour {
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
