import React from 'react';

import Button from '../button';
import Dialog from '../dialog';
import Flame  from '../flame';
import store  from '../../config/store';

import './styles.scss';

const GameSelect = (props) => {

  function handleStartMainGame() {
    store.dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameStart: true,
        gameSelect: 'story'
      }
    });
  }

  function handleStartEndless() {
    store.dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameStart: true,
        gameSelect: 'endless'
      }
    });
  }

  return(
    <Dialog>
      <div className='flex-row game-select-title'>
        {'React RPG'}
      </div>

      <div className='flex-column game-select-text'>
        <div>
          {'Greetings, Traveler. Please, explore one of our dungeons...'}
        </div>
      </div>

      <div className='game-select-flame-container-1'>
        <Flame />
      </div>
      <div className='game-select-flame-container-2'>
        <Flame />
      </div>

      <div className='flex-column game-select-button'>
        <Button
          style={{marginBottom: 16}}
          onClick={handleStartMainGame}
          icon='torah'
          title={'Story Mode'} />

        <Button
          onClick={handleStartEndless}
          icon='infinity'
          title={'Endless Mode'} />
      </div>
    </Dialog>
  );
}

export default GameSelect;
