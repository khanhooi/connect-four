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
  private isGameOver_: boolean = true;
  board: GameBoard;

  private aiWorker: Worker;

  // Intended to be called with a delay, so must be static.
  private static updateNextPlayer(
    gameService: GameService,
    nextToken: TokenColour
  ) {
    gameService.nextToken = nextToken;
    gameService.players.switch();
    if (gameService.players.getCurrent() === PlayerType.computer) {
      gameService.playerTurnAI(nextToken);
    }
  }

  public isGameOver(): boolean {
    return this.isGameOver_;
  }
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
    if (this.nextToken === TokenColour.none) {
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
    this.isGameOver_ = false;
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
    this.playAudio();
    const winner = this.checkWinner();
    const boardFull = GameBoard.isBoardFull(this.board);
    if (!winner && !boardFull) {
      this.updateNextPlayerWithDelay();
    } else {
      this.isGameOver_ = true;
      this.nextToken = TokenColour.none;
    }
  }

  private updateNextPlayerWithDelay(): void {
    const nextToken =
      this.nextToken === Unit.Type.yellow ? Unit.Type.red : Unit.Type.yellow;
    this.nextToken = Unit.Type.none;
    setTimeout(GameService.updateNextPlayer, 1500, this, nextToken);
  }

  private playerTurnAI(tokenColour: TokenColour): void {
    const gameData: any = { Board: this.board, Token: tokenColour };
    this.aiWorker.postMessage(gameData);
  }

  private checkWinner(): TokenColour | null {
    const winner = VictoryCheck.check(this.board);
    return winner;
  }

  private playAudio() {
    const audio = new Audio();

    const audioAssets = [
      '../../assets/audio/1355.wav',
      '../../assets/audio/1357.wav',
      '../../assets/audio/1358.wav',
      '../../assets/audio/1362.wav',
      '../../assets/audio/1363.wav',
    ];

    audio.src = audioAssets[Math.floor(Math.random() * audioAssets.length)];
    audio.load();
    audio.play();
  }
}
