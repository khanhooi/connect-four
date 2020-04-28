import { Unit, TokenColour  } from './Unit';


export type GameColumn = Unit[];
export type GameBoard = GameColumn[];

// tslint:disable-next-line: no-namespace
export namespace GameBoard{
  export const COLUMNS = 7;
  export const ROWS = 6;


  export function blankBoard(): GameBoard {
    const board = [];
    for (let x = 0; x < COLUMNS; ++x) {
      const column: Unit[] = [];
      for (let y = 0; y < ROWS; ++y) {
        column.push(new Unit());
      }
      board.push(column);
    }
    return board;
  }

  export function isBoardFull(gameBoard: GameBoard): boolean {
    return gameBoard.every((column) =>
      isColumnFull(column)
    );
  }

  export function isColumnFull( gameColumn: GameColumn ): boolean {
    return (gameColumn[gameColumn.length - 1].type ) ? true  : false;
  }

  export function addToColumn(gameBoard: GameBoard, colIndex: number, token: TokenColour  ) {
    const column: GameColumn = gameBoard[colIndex];
    if ( isColumnFull(column) ) { return; }
    let rowIndex = -1;
    column.every(cell => {
      ++rowIndex;
      return cell.type;
    });
    gameBoard[colIndex][rowIndex].type = token;
  }

  export function copy( gameBoard: GameBoard): GameBoard {
    return JSON.parse( JSON.stringify(gameBoard) );
  }
}



