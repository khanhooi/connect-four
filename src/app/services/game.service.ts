import { GameBoard } from './game-board';
import { GameSettings, GameType } from './game-settings';
import { VictoryCheckService } from './victory-check.service';
import { Players, Unit, TokenColour, PlayerType } from './Unit';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private nextToken: TokenColour;
  private players: Players;
  private settings: GameSettings;
  board: GameBoard;

  constructor(
  ) {
    this.newGame({ gameType: GameType.playerVplayer });

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
      // Create a new
      const worker = new Worker('../player-ai.worker.ts', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.updateColumnImpl( data );
      };
      worker.postMessage('hello');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
  public newGame(settings: GameSettings): void {
    this.settings = settings;

    switch (settings.gameType) {
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
    this.newGame(this.settings);
  }

  public checkWinner(): TokenColour | null {
    const winner = VictoryCheckService.check(this.board);
    return winner;
  }
}
