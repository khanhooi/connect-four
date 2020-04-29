import { VictoryCheckService } from './victory-check.service';
import { TokenColour } from './Unit';
import { Injectable } from '@angular/core';
import { Observable, of, defer } from 'rxjs';
import { GameBoard } from './game-board';

@Injectable({
  providedIn: 'root',
})
export class PlayerAiService {
  public gameBoard: GameBoard;
  public tokenColour: TokenColour;

  constructor() {}
}
