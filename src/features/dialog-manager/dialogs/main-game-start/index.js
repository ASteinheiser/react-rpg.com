import React, { useEffect } from 'react';

import Button        from '../../../../components/button';
import Dialog        from '../../../../components/dialog';
import maps          from '../../../../data/maps';
import store         from '../../../../config/store';
import exploreTiles  from '../../../../features/player/explore-tiles';
import { START_MAP } from '../../../../config/constants';

import './styles.scss';

const MainGameStart = (props) => {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);  // we pass empty array as the second param to make this only call on mount and not on any updates

  function handleKeyPress(event) {
    // case for 'enter' and 'space' key
    if(event.keyCode === 13 || event.keyCode === 32) {
      handleGameStart();
    }
  }

  function handleGameStart() {
    handleLoadStartMap();
    handleLoadMap();
    handleLoadMonsters();
    handleLoadPlayerSight();
    handleShowStartMessage();
  }

  function handleLoadStartMap() {
    store.dispatch({
      type: 'SET_START_MAP',
      payload: {
        startMap: START_MAP,
        gameMode: 'story'
      }
    });
  }

  function handleShowStartMessage() {
    store.dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameInstructions: true
      }
    });
  }

  function handleLoadPlayerSight() {
    exploreTiles(store.getState().player.position);
  }

  function handleLoadMap() {
    // set map tiles for start map
    store.dispatch({
      type: 'ADD_TILES',
      payload: { tiles: maps[START_MAP].tiles }
    });
  }

  function handleLoadMonsters() {
    // load initial monsters
    store.dispatch({
      type: 'ADD_MONSTERS',
      payload: { monsters: maps[START_MAP].monsters, map: START_MAP }
    });
  }

  function goBack() {
    store.dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameStart: true
      }
    });
  }

  return(
    <Dialog>
      <i onClick={goBack}
        className={`fa fa-arrow-left game-start-back`} />

      <div className='flex-row game-start-title'>
        {'Story Mode'}
      </div>

      <div className='flex-column game-start-text'>
        {'Welcome Adventurer... A world full of monsters and gear awaits!'}
      </div>

      <div className='flex-column game-start-button'>
        <Button
          onClick={handleGameStart}
          icon='compass'
          title={'Explore Dungeon'} />
      </div>
    </Dialog>
  );
}

export default MainGameStart;
