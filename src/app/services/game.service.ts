import { GameSettings, GameType } from '../game-settings';
import { VictoryCheckService } from './victory-check.service';
import { Player, TokenColour } from '../player';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class GameService {
  private nextToken: TokenColour;
  private settings: GameSettings;
  board: Player[][];

  constructor(private victoryCheckService: VictoryCheckService) {
    this.newGame({ gameType: GameType.playerVplayer } );
  }

  public getTokenColour(): TokenColour {
    return this.nextToken;
  }

  public updateSquare(x: number, y: number) {
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
      this.nextToken === Player.Type.yellow
        ? Player.Type.red
        : Player.Type.yellow;
  }
  public newGame(settings: GameSettings): void {
    this.nextToken = Player.Type.yellow;
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

  private blankBoard(): Player[][] {
    const board = [];
    for (let x = 0; x < 7; ++x) {
      const column: Player[] = [];
      for (let y = 0; y < 6; ++y) {
        column.push(new Player());
      }
      board.push(column);
    }
    return board;
  }
}
