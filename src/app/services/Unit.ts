export enum TokenColour {
  none= 0,
  red= 1,
  yellow= 2
}

export enum PlayerType {
  human= 0,
  computer= 1
}

export enum GameType {
  playerVplayer = 1,
  playerVai = 2
}

export class Players {
  constructor( first: PlayerType, second: PlayerType ){
    this.second = second;
    this.first = first;
    this.isFirstPlayer = true;
  }

  private isFirstPlayer: boolean;



  readonly first: PlayerType;
  readonly second: PlayerType;

  public getCurrent(): PlayerType {
    return this.isFirstPlayer ? this.first : this.second;
  }

  public switch(): void{
    this.isFirstPlayer = !this.isFirstPlayer;
  }

}

export class Unit {
  static readonly Type = TokenColour;
  public isFourInARow: boolean;
  public type: TokenColour;
  constructor() {
    this.type = null;
    this.isFourInARow = false;

  }
}

// tslint:disable-next-line: no-namespace
