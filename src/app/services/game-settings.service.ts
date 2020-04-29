import { Injectable } from '@angular/core';
import { GameType } from './Unit';

@Injectable({
  providedIn: 'root'
})

export class GameSettingsService {



  constructor() {
    this.gameType = GameType.playerVai;
  }

  gameType: GameType;
}
