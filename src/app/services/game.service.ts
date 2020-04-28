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
  board: Unit[][];

  constructor(private victoryCheckService: VictoryCheckService) {
    this.newGame({ gameType: GameType.playerVplayer } );
  }

  public getTokenColour(): TokenColour {
    return this.nextToken;
  }

  public updateSquare(x: number, y: number) {
    if ( this.players.getCurrent() !==  PlayerType.human ) { return; }
    this.updateSquareImpl( x, y);
  }

  private updateSquareImpl(x: number, y: number) {
    if (this.board[x][y].type) {
      throw new Error('bad');
    }
    this.board[x][y].type = this.getTokenColour();
    const winner = this.checkWinner();
    const boardFull = this.isBoardFull();
    if (!winner && !boardFull) {
      this.updateNextPlayer();
    }
    else{
      this.nextToken = null;
    }
  }

  public updateNextPlayer(): void {
    this.nextToken =
      this.nextToken === Unit.Type.yellow
        ? Unit.Type.red
        : Unit.Type.yellow;
    this.players.switch();
  }
  public newGame(settings: GameSettings): void {

    this.settings = settings;

    switch (settings.gameType) {
      case GameType.playerVplayer:
        this.players = new Players( PlayerType.human, PlayerType.human );
        break;
      case GameType.playerVai:
      default:
        this.players = new Players( PlayerType.human, PlayerType.computer );
        break;
    }


    this.nextToken = Unit.Type.yellow;
    this.board = this.blankBoard();
  }

  public restart(): void {
    this.newGame( this.settings );
  }

  public checkWinner(): TokenColour | null {
    const winner =  this.victoryCheckService.check( this.board );
    return winner;
  }

  private isBoardFull(): boolean {
    return this.board.every((column) =>
      column.every((player) => player.type != null)
    );
  }

  private blankBoard(): Unit[][] {
    const board = [];
    for (let x = 0; x < 7; ++x) {
      const column: Unit[] = [];
      for (let y = 0; y < 6; ++y) {
        column.push(new Unit());
      }
      board.push(column);
    }
    return board;
  }
}
