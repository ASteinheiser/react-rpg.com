import React, { useEffect } from 'react';
import { connect }          from 'react-redux';

import Button       from '../button';
import Dialog       from '../dialog';
import Flame        from '../flame';
import items        from '../../data/items';
import maps         from '../../data/maps';
import store        from '../../config/store';
import exploreTiles from '../../features/player/explore-tiles';

import './styles.css';

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
    handleCloseDialog();
    handleLoadMap();
    handleLoadMonsters();
    handleLoadPlayerSight();
    handleLoadStartingItems();
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
    const { world } = props;
    // set map tiles for current map
    store.dispatch({
      type: 'ADD_TILES',
      payload: { tiles: maps[world.currentMap].tiles }
    });
  }

  function handleLoadMonsters() {
    const { world } = props;
    // load initial monsters
    store.dispatch({
      type: 'ADD_MONSTERS',
      payload: { monsters: maps[world.currentMap].monsters, map: world.currentMap }
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

const mapStateToProps = ({ world }) => {
  return { world };
}

export default connect(mapStateToProps)(MainGameStart);
