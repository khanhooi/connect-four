import { Unit } from './Unit';


export type GameBoard = Unit[][];

// tslint:disable-next-line: no-namespace
export namespace GameBoard{
  export const COLUMNS = 7;
  export const ROWS = 6;


  export function blankBoard(): Unit[][] {
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
      column.every((cell) => cell.type != null)
    );
  }
}



