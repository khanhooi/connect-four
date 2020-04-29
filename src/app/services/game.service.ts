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

  private setupAiWorker() {
    if (typeof Worker !== 'undefined') {
      this.aiWorker = new Worker('../player-ai.worker.ts', { type: 'module' });
      this.aiWorker.onmessage = ({ data }) => {
        this.updateColumnImpl(data);
      };
    }
    else {
      console.log('AI Not supported');
    }
  }

  public getTokenColour(): TokenColour {
    return this.nextToken;
  }

  public updateColumn(colIndex: number): void {
    if (this.players.getCurrent() !== PlayerType.human) {
      return;
    }
    this.updateColumnImpl(colIndex);
  }

  private updateColumnImpl(colIndex: number): void {
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

  private aiWorker: Worker;

  private playerTurnAI(): void {
    const gameData: any = { Board: this.board, Token: this.getTokenColour() };
    this.aiWorker.postMessage(gameData);
  }
  public newGame(): void {
    if ( this.aiWorker ) { console.log(`terminating`); this.aiWorker.terminate(); this.aiWorker = null; }
    switch (this.settings.gameType) {
      case GameType.playerVplayer:
        this.players = new Players(PlayerType.human, PlayerType.human);
        break;
      case GameType.playerVai:
      default:
        this.players = new Players(PlayerType.human, PlayerType.computer);
        this.setupAiWorker();
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
