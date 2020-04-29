import { Unit, TokenColour } from './Unit';

export class VictoryCheckService {
  constructor() {}

  static readonly victoryCondition: number = 4;

  static check(board: Unit[][]): TokenColour {
    let winningPlayer: TokenColour = null;
    winningPlayer = this.checkColumns(board);
    winningPlayer = this.checkRows(board) || winningPlayer;
    winningPlayer = this.checkDiagonals(board) || winningPlayer;
    return winningPlayer;
  }

  private static checkDiagonals(board: Unit[][]): TokenColour {
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
          const testArray: Unit[] = [];
          testArray.push(board[0 + colOffset][0 + rowOffset]);
          testArray.push(board[1 + colOffset][1 + rowOffset]);
          testArray.push(board[2 + colOffset][2 + rowOffset]);
          testArray.push(board[3 + colOffset][3 + rowOffset]);
          winner = this.verifyTestArray(testArray) || winner;
        }
        {
          const testArray: Unit[] = [];
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

  private static checkColumns(board: Unit[][]): TokenColour {
    let winner: TokenColour = null;
    for (const column of board) {
      for (
        let rowIndex = 0;
        rowIndex < column.length - this.victoryCondition;
        ++rowIndex
      ) {
        const testArray: Unit[] = column.slice(
          rowIndex,
          rowIndex + this.victoryCondition
        );
        winner = this.verifyTestArray(testArray) || winner;
      }
    }
    return winner;
  }

  private static checkRows(frame: Unit[][]): TokenColour {
    let winner: TokenColour = null;
    for (let rowIndex = 0; rowIndex < frame[0].length; ++rowIndex) {
      const testArray: Unit[] = [];
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

  private static verifyTestArray(testArray: Unit[]): TokenColour {
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
