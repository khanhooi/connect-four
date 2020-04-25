export enum Type {
  none= 0,
  red= 1,
  yellow= 2
}
export class Player {
  static readonly Type = Type;
  public isFourInARow: boolean;
  public type: Type;
  Player() {
    this.type = null;
    this.isFourInARow = false;

  }
}

// tslint:disable-next-line: no-namespace
