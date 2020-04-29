/// <reference lib="webworker" />
import { TokenColour } from './services/Unit';
import { GameBoard } from './services/game-board';
import { AiPlayer } from './ai-player';


let messageData: any = null;

addEventListener('message', ({ data }) => {
  if ( messageData === null ) {
    messageData = data;
  }
  else{
    throw new Error('Requested more than one AI move at once.');
  }
});

// we setup this poll function, because otherwise we cannot terminate the worker properly.
function poll() {
  if (messageData) {
    const gameBoard: GameBoard = messageData.Board;
    const friendlyToken: TokenColour = messageData.Token;
    const ai: AiPlayer = new AiPlayer();
    const response = ai.move(gameBoard, friendlyToken);
    postMessage(response);
    messageData = null;
  }
  setTimeout(poll, 300);
}

poll();
