import React, { useEffect } from 'react';

import Button       from '../button';
import Dialog       from '../dialog';
import Flame        from '../flame';
import items        from '../../data/items';
import maps         from '../../data/maps';
import store        from '../../config/store';
import exploreTiles from '../../features/player/explore-tiles';

import './styles.css';

const START_MAP = '1_1';

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
    handleCloseDialog();
    handleLoadMap();
    handleLoadMonsters();
    handleLoadPlayerSight();
    handleLoadStartingItems();
  }

  function handleLoadStartMap() {
    store.dispatch({
      type: 'SET_START_MAP',
      payload: { startMap: START_MAP }
    });
  }

  function handleCloseDialog() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: false }
    });
  }

  function handleLoadPlayerSight() {
    exploreTiles(store.getState().player.position);
  }

  function handleLoadStartingItems() {
    // give the player a rusty sword
    store.dispatch({
      type: 'GET_ITEM',
      payload: items.weapons.RustySword
    });
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

  return(
    <Dialog>
      <div className='flex-row game-start-title'>
        {'Story Mode'}
      </div>

      <div className='flex-column game-start-text'>
        <div>
          {'Welcome Adventurer... A world full of monsters and gear awaits!'}
        </div>

        <div>
          <div className='game-start-instruction-text'>
            {'Use \'WASD\' / Arrow Keys to MOVE'}
          </div>
          <div className='game-start-instruction-text'>
            {'Press \'Enter\' / \'SPACE\' Key to ATTACK'}
          </div>
        </div>
      </div>

      <div className='game-start-flame-container-1'>
        <Flame />
      </div>
      <div className='game-start-flame-container-2'>
        <Flame />
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
