
/// <reference lib="webworker" />
import { PlayerType, TokenColour } from './services/Unit';
import { GameBoard } from './services/game-board';
// import { VictoryCheckService } from './services/victory-check.service';
// import { PlayerAiService } from './services/player-ai.service';

addEventListener('message', ({ data }) => {
  const response = 1;
  postMessage(response);
});

class PlayerAi {
  public gameBoard: GameBoard;
  public tokenColour: TokenColour;
  private map: Map<string, [number, number]> = new Map();

  private assessedVictory = 0;

  private assessVictory(
    gameBoard: GameBoard,
    friendlyToken: TokenColour
  ): number {
    this.assessedVictory++;
    let result;
    // VictoryCheckService.check(gameBoard);
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
    if (this.map.has(JSON.stringify(gameBoard))) {
      console.log('map Hit!');

      return this.map.get(JSON.stringify(gameBoard));
    }
    if (depth <= 0) {
      console.log('depth limit reached, returning.');
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

      let result: number = this.assessVictory(gameBoard, friendlyToken);
      if (result != null) {
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
        expansionResult += this.search(board, friendlyToken, depth - 1)[1];
        // we have to call search, here. then sum the results.
      }
      console.log(`expansionResult=${expansionResult}`);
      results[colIndex] = expansionResult;
    }

    let totalResult = 0;
    let bestResult: number = -Infinity;
    console.log(JSON.stringify(results));

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

    console.log('outputResult: ', JSON.stringify(outputResult));

    this.map.set(JSON.stringify(gameBoard), outputResult);
    return outputResult;
  }
}
