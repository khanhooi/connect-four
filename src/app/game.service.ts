import { Player } from './player';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private nextPlayer: Player;
  board: Player[][];

  constructor() {
    this.newGame();
  }

  public getPlayer(): Player {
    return this.nextPlayer;
  }

  public updateSquare(x: number, y: number)
  {
    this.board[x][y] = this.getPlayer();
    this.updateNextPlayer();
  }

  public updateNextPlayer(): void {
    this.nextPlayer = this.nextPlayer === Player.yellow ? Player.red : Player.yellow;
  }
  public newGame(): void{
    this.nextPlayer = Player.yellow;
    this.board = this.blankBoard();

  }

  private blankBoard(): Player[][] {
    const board = [];
    for ( let x = 0; x < 7; ++x){
      const column: Player[] = [];
      for ( let y = 0; y < 6; ++y){
        column.push(Player.none);
      }
      board.push(column);
    }
    return board;
  }
}
