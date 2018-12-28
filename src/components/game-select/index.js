import React from 'react';

import Button        from '../button';
import Dialog        from '../dialog';
import Flame         from '../flame';
import MainGameStart from '../main-game-start';
import store         from '../../config/store';

import './styles.css';

const GameSelect = (props) => {

  function handleStartMainGame() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: <MainGameStart />, gameStart: true }
    });
  }

  return(
    <Dialog>
      <div className='flex-row game-select-title'>
        {'React + Redux RPG'}
      </div>

      <div className='flex-column game-select-text'>
        <div>
          {'Greetings, Traveler. Please, explore one of our lovely dungeons...'}
        </div>
      </div>

      <div className='game-select-flame-container-1'>
        <Flame />
      </div>
      <div className='game-select-flame-container-2'>
        <Flame />
      </div>
      <div className='game-select-flame-container-3'>
        <Flame />
      </div>
      <div className='game-select-flame-container-4'>
        <Flame />
      </div>

      <div className='flex-column game-select-button'>
        <Button
          style={{marginBottom: 25}}
          onClick={handleStartMainGame}
          icon='torah'
          title={'Story Mode'} />

        <Button
          onClick={() => console.log('endless')}
          icon='infinity'
          title={'Endless Mode'} />
      </div>
    </Dialog>
  );
}

export default GameSelect;
