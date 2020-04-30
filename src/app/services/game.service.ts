import { GameSettingsService } from './game-settings.service';
import { GameBoard } from './game-board';
import { VictoryCheck } from './victory-check';
import { Players, Unit, TokenColour, PlayerType, GameType } from './Unit';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  constructor(private settings: GameSettingsService) {
    this.newGame();
  }
  private nextToken: TokenColour;
  private players: Players;
  board: GameBoard;

  private aiWorker: Worker;

  public getPlayer(): PlayerType {
    return this.players.getCurrent();
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

  public newGame(): void {
    if (this.aiWorker) {
      this.aiWorker.terminate();
      this.aiWorker = null;
    }
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

  private setupAiWorker() {
    if (typeof Worker !== 'undefined') {
      this.aiWorker = new Worker('../ai.worker.ts', { type: 'module' });
      this.aiWorker.onmessage = ({ data }) => {
        this.updateColumnImpl(data);
      };
    } else {
      console.log('AI Not supported');
    }
  }

  private updateColumnImpl(colIndex: number): void {
    GameBoard.addToColumn(this.board, colIndex, this.getTokenColour());
    const winner = this.checkWinner();
    const boardFull = GameBoard.isBoardFull(this.board);
    if (!winner && !boardFull) {
      this.updateNextPlayer();
    } else {
      this.nextToken = TokenColour.none;
    }
  }

  private updateNextPlayer(): void {
    this.nextToken =
      this.nextToken === Unit.Type.yellow ? Unit.Type.red : Unit.Type.yellow;
    this.players.switch();

    if (this.players.getCurrent() === PlayerType.computer) {
      this.playerTurnAI();
    }
  }

  private playerTurnAI(): void {
    const gameData: any = { Board: this.board, Token: this.getTokenColour() };
    this.aiWorker.postMessage(gameData);
  }

  private checkWinner(): TokenColour | null {
    const winner = VictoryCheck.check(this.board);
    return winner;
  }
}
