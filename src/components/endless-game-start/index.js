import React, { useEffect } from 'react';

import Button           from '../button';
import Dialog           from '../dialog';
import Flame            from '../flame';
import items            from '../../data/items';
import store            from '../../config/store';
import generateMap      from '../../modules/generate-map';
import generateMonsters from '../../modules/generate-monsters';
import exploreTiles     from '../../features/player/explore-tiles';
import { uuidv4 }       from '../../modules/uuid-v4';

import './styles.css';

const EndlessGameStart = (props) => {

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
    const { player, stats } = store.getState();
    const floorNum = 1;
    // generate a random map and id
    const randomMap = generateMap(player.position, floorNum);
    const mapId = uuidv4();

    handleCloseDialog();
    handleLoadMap(mapId, randomMap);
    handleLoadPlayerSight(player);
    handleLoadMonsters(floorNum, mapId, randomMap, player, stats);
    handleLoadStartingItems();
  }

  function handleCloseDialog() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: false }
    });
  }

  function handleLoadMap(mapId, randomMap) {
    // set map tiles for start map
    store.dispatch({
      type: 'SET_START_MAP',
      payload: {
        startMap: mapId,
        gameMode: 'endless'
      }
    });

    store.dispatch({
      type: 'ADD_TILES',
      payload: { tiles: randomMap }
    });
  }

  function handleLoadPlayerSight(player) {
    exploreTiles(player.position);
  }

  function handleLoadMonsters(floorNum, mapId, randomMap, player, stats) {
    // load initial (random) monsters
    store.dispatch({
      type: 'ADD_MONSTERS',
      payload: { monsters: generateMonsters(floorNum, randomMap, player.position, stats.level), map: mapId }
    });
  }

  function handleLoadStartingItems() {
    // give the player a rusty sword
    store.dispatch({
      type: 'GET_ITEM',
      payload: items.weapons.RustySword
    });
  }

  return(
    <Dialog>
      <div className='flex-row endless-start-title'>
        {'Endless Mode'}
      </div>

      <div className='flex-column endless-start-text'>
        <div>
          {'Up for a challenge..? These randomly generated dungeons will run you into oblivion.'}
        </div>

      </div>

      <div className='endless-start-flame-container-1'>
        <Flame />
      </div>
      <div className='endless-start-flame-container-2'>
        <Flame />
      </div>

      <div className='flex-column endless-start-button'>
        <Button
          onClick={handleGameStart}
          icon='compass'
          title={'Explore Dungeon'} />
      </div>
    </Dialog>
  );
}

export default EndlessGameStart;
