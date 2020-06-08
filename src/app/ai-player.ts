import { GameBoard } from "./services/game-board";
import { TokenColour } from './services/Unit';
import { VictoryCheck } from './services/victory-check';

export class AiPlayer {
  private map: Map<string, [number, number]> = new Map();

  readonly DEPTH = 3;

  public move(gameBoard: GameBoard, tokenColour: TokenColour): number {
    const columnIndex = this.search(gameBoard, tokenColour, 0)[0];
    return columnIndex;
  }
  private assessVictory(
    gameBoard: GameBoard,
    friendlyToken: TokenColour,
    depth: number
  ): number {
    const result = VictoryCheck.check(gameBoard);
    if (result) {
      if ( result === friendlyToken ) {
        return depth === 0 ? +1000 : 1;
      } else {
        return -5;
      }
    }
    return GameBoard.isBoardFull(gameBoard) ? -1 : null;
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
    if (this.map.has(JSON.stringify(gameBoard))) {
      return this.map.get(JSON.stringify(gameBoard));
    }
    if (depth >= this.DEPTH ) {
      return [0, 0];
    }
    const friendlyToken = tokenColour;
    const antagonist =
      tokenColour === TokenColour.red ? TokenColour.yellow : TokenColour.red;

    let outputResult: [number, number] = [null, 0];
    let results: number[] = [gameBoard.length];

    for (let colIndex = 0; colIndex < gameBoard.length; colIndex++) {
      let newBoard = GameBoard.copy(gameBoard);
      if (GameBoard.isColumnFull(newBoard[colIndex])) {
        results[colIndex] = null;
        continue;
      }

      GameBoard.addToColumn(newBoard, colIndex, friendlyToken);

      let result: number = this.assessVictory(gameBoard, friendlyToken, depth);
      if (result != null) {
        results[colIndex] = result;
        continue;
      }

      // If the game didnt end, we want to expand all the possibilties,
      // so we must expand the available nodes with the antagonist token.
      const newAntagonistBoards = this.populatePossibilities(
        newBoard,
        antagonist
      );

      // take the smallest result
      let minimumResult = +1000;
      for (const board of newAntagonistBoards) {

        let expansionResult: number ;
        const antagonistResult = this.assessVictory(board, antagonist, depth);
        if (antagonistResult != null) {
          expansionResult = -antagonistResult;
          // continue;
        } else {

          expansionResult = -this.search(board, antagonist, depth + 1)[1];
        }
        if ( expansionResult < minimumResult ) { minimumResult = expansionResult; }
        console.log(`expansion result=${expansionResult}`)
      }
      console.log(`minimum result=${minimumResult}`)
      results[colIndex] = minimumResult;
    }

    let totalResult = 0;
    let bestResult: number = -1000;
    if ( depth === 0 ) { console.log(`Results ${JSON.stringify(results)}`); }

    for (let i = 0; i < results.length; ++i) {
      if (results[i] != null) {
        if (results[i] > bestResult) {
          outputResult[0] = i;
          bestResult = results[i];
        }
        totalResult += results[i];
      }
    }
    outputResult[1] = totalResult;

    this.map.set(JSON.stringify(gameBoard), outputResult);
    return outputResult;
  }
}
