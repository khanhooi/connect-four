import { GameSettingsService } from './game-settings.service';
import { GameBoard } from './game-board';
import { VictoryCheck } from './victory-check';
import { Players, Unit, TokenColour, PlayerType, GameType } from './Unit';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private nextToken: TokenColour;
  private players: Players;
  board: GameBoard;

  constructor(private settings: GameSettingsService) {
    this.newGame();
  }

  public getTokenColour(): TokenColour {
    return this.nextToken;
  }

  public updateColumn(colIndex: number) {
    if (this.players.getCurrent() !== PlayerType.human) {
      return;
    }
    this.updateColumnImpl(colIndex);
  }

  private updateColumnImpl(colIndex: number) {
    GameBoard.addToColumn(this.board, colIndex, this.getTokenColour());
    const winner = this.checkWinner();
    const boardFull = GameBoard.isBoardFull(this.board);
    if (!winner && !boardFull) {
      this.updateNextPlayer();
    } else {
      this.nextToken = null;
    }
  }

  public updateNextPlayer(): void {
    this.nextToken =
      this.nextToken === Unit.Type.yellow ? Unit.Type.red : Unit.Type.yellow;
    this.players.switch();

    if (this.players.getCurrent() === PlayerType.computer) {
      // I think we need an observable which links changes to the player to the ai.
      this.playerTurnAI();
    }
  }

  private playerTurnAI(): void {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('../player-ai.worker.ts', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.updateColumnImpl(data);
      };

      const gameData: any = { Board: this.board, Token: this.getTokenColour() };
      worker.postMessage(gameData);
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
  public newGame(): void {

    switch (this.settings.gameType) {
      case GameType.playerVplayer:
        this.players = new Players(PlayerType.human, PlayerType.human);
        break;
      case GameType.playerVai:
      default:
        this.players = new Players(PlayerType.human, PlayerType.computer);
        break;
    }

    this.nextToken = Unit.Type.yellow;

    this.board = GameBoard.blankBoard();
  }

  public restart(): void {
    this.newGame();
  }

  public checkWinner(): TokenColour | null {
    const winner = VictoryCheck.check(this.board);
    return winner;
  }
}
