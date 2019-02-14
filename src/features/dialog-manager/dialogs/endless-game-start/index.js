import React, { useEffect } from 'react';

import Button           from '../../../../components/button';
import Dialog           from '../../../../components/dialog';
import items            from '../../../../data/items';
import store            from '../../../../config/store';
import generateMap      from '../../../../modules/generate-map';
import generateMonsters from '../../../../modules/generate-monsters';
import exploreTiles     from '../../../../features/player/actions/explore-tiles';
import uuidv4           from '../../../../modules/uuid-v4';

import './styles.scss';

const EndlessGameStart = () => {

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

    handleShowStartMessage();
    handleLoadMap(mapId, randomMap, floorNum);
    handleLoadPlayerSight(player);
    handleLoadMonsters(floorNum, mapId, randomMap, player, stats);
    handleLoadStartingItems();
  }

  function handleShowStartMessage() {
    store.dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameText: {
          title: `As you stare into the dark dungeon, it greets you with a cold chill... and a message...`,
          body: `"JOURNEY ONE HUNDRED FLOORS AND ALL WILL BE GRANTED"`
        }
      }
    });
  }

  function handleLoadMap(mapId, randomMap, floorNum) {
    // set map tiles for start map
    store.dispatch({
      type: 'SET_START_MAP',
      payload: {
        startMap: mapId,
        gameMode: 'endless',
        floorNum: floorNum
      }
    });

    store.dispatch({
      type: 'ADD_TILES',
      payload: { tiles: randomMap }
    });

    store.dispatch({
      type: 'ADD_RANDOM_MAP',
      payload: {
        tiles: randomMap,
        id: mapId
      }
    });
  }

  function handleLoadPlayerSight(player) {
    exploreTiles(player.position);
  }

  function handleLoadMonsters(floorNum, mapId, randomMap, player, stats) {
    // load initial (random) monsters
    store.dispatch({
      type: 'ADD_MONSTERS',
      payload: {
        monsters: generateMonsters(floorNum, randomMap, player.position, stats.level),
        map: mapId
      }
    });
  }

  function handleLoadStartingItems() {
    // give the player a rusty sword
    store.dispatch({
      type: 'GET_ITEM',
      payload: items.weapons.RustySword
    });
    // and equip it
    store.dispatch({
      type: 'EQUIP_ITEM',
      payload: store.getState().inventory.items[0]
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
    <Dialog goBack={goBack}>

      <span className='flex-row endless-start__title'>
        {'Endless Mode'}
      </span>

      <span className='flex-column endless-start__text'>
        {'Up for a challenge..? These randomly generated dungeons will run you into oblivion.'}
      </span>

      <div className='flex-column endless-start__button'>
        <Button
          onClick={handleGameStart}
          icon='compass'
          title={'Explore Dungeon'} />
      </div>
    </Dialog>
  );
}

export default EndlessGameStart;
