export enum TokenColour {
  none= 0,
  red= 1,
  yellow= 2
}

export enum PlayerType {
  human= 0,
  computer= 1
}

export class Unit {
  static readonly Type = TokenColour;
  public isFourInARow: boolean;
  public type: TokenColour;
  Player() {
    this.type = null;
    this.isFourInARow = false;

  }
}

// tslint:disable-next-line: no-namespace
