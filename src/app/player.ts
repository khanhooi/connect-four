export enum Type {
  none= 0,
  red= 1,
  yellow= 2
}
export class Player {
  static readonly Type = Type;
  public type: Type;
  Player() {
    this.type = null;
  }
}

// tslint:disable-next-line: no-namespace
