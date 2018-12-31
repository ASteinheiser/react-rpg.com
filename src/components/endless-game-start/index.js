import React, { useEffect } from 'react';

import Button      from '../button';
import Dialog      from '../dialog';
import Flame       from '../flame';
import store       from '../../config/store';
import generateMap from '../../modules/generate-map';

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
    handleCloseDialog();
    handleLoadMap();
    // handleLoadMonsters();
    // handleLoadPlayerSight();
    // handleLoadStartingItems();
  }

  function handleCloseDialog() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: false }
    });
  }

  function handleLoadMap() {
    console.log(generateMap());
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
