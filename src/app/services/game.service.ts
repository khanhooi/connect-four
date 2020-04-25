import { Player, Type } from '../player';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private nextPlayer: Type;
  board: Player[][];

  constructor() {
    this.newGame();
  }

  public getPlayer(): Type {
    return this.nextPlayer;
  }

  public updateSquare(x: number, y: number) {
    if (this.board[x][y].type) {
      throw new Error('bad');
    }
    this.board[x][y].type = this.getPlayer();
    const winner = this.checkWinner();
    const boardFull = this.isBoardFull();
    if (!winner && !boardFull) {
      this.updateNextPlayer();
    }
  }

  public updateNextPlayer(): void {
    this.nextPlayer =
      this.nextPlayer === Player.Type.yellow
        ? Player.Type.red
        : Player.Type.yellow;
  }
  public newGame(): void {
    this.nextPlayer = Player.Type.yellow;
    this.board = this.blankBoard();
  }

  public checkWinner(): Type | null {
    this.board[0][0].isFourInARow = true;
    this.board[1][1].isFourInARow = true;
    this.board[2][2].isFourInARow = true;
    this.board[3][3].isFourInARow = true;
    return null;
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
