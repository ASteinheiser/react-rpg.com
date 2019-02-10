import React from 'react';

import Button from '../../../../components/button';
import Dialog from '../../../../components/dialog';
import Flame  from '../../../../components/flame';
import store  from '../../../../config/store';

import './styles.scss';

const GameSelect = () => {

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
      <span className='flex-row game-select__title'>
        {'React RPG'}
      </span>

      <span className='flex-column game-select__text'>
        {'Greetings, Traveler. Please, explore one of our dungeons...'}
      </span>

      <div className='game-select__flame--1'>
        <Flame />
      </div>
      <div className='game-select__flame--2'>
        <Flame />
      </div>

      <div className='flex-column game-select__button'>
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
