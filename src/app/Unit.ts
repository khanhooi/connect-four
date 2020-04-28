export enum TokenColour {
  none= 0,
  red= 1,
  yellow= 2
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
