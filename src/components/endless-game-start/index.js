import React, { useEffect } from 'react';

import Button           from '../button';
import Dialog           from '../dialog';
import GameSelect       from '../game-select';
import GameTextDialog   from '../game-text-dialog';
import items            from '../../data/items';
import store            from '../../config/store';
import generateMap      from '../../modules/generate-map';
import generateMonsters from '../../modules/generate-monsters';
import exploreTiles     from '../../features/player/explore-tiles';
import { uuidv4 }       from '../../modules/uuid-v4';

import './styles.scss';

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
        component: (
          <GameTextDialog
            text1={`As you stare into the dark dungeon, it greets you with a cold chill... and a message...`}
            text2={`"JOURNEY ONE HUNDRED FLOORS AND ALL WILL BE GRANTED"`} />
        )
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
        component: <GameSelect />,
        gameStart: true
      }
    });
  }

  return(
    <Dialog>
      <i onClick={goBack}
        className={`fa fa-arrow-left endless-start-back`} />

      <div className='flex-row endless-start-title'>
        {'Endless Mode'}
      </div>

      <div className='flex-column endless-start-text'>
        <div>
          {'Up for a challenge..? These randomly generated dungeons will run you into oblivion.'}
        </div>

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
