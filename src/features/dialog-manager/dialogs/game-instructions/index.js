import React, { useEffect } from 'react';
import { isMobile }         from 'react-device-detect';

import Button        from '../../../../components/button';
import Dialog        from '../../../../components/dialog';
import items         from '../../../../data/items';
import maps          from '../../../../data/maps';
import store         from '../../../../config/store';
import { START_MAP } from '../../../../config/constants';

import ArrowKeys from './assets/arrow-keys.png';
import DoubleTap from './assets/double-tap.png';
import Enter     from './assets/enter.png';
import Space     from './assets/space.png';
import Swipe     from './assets/swipe.png';
import WASDKeys  from './assets/wasd-keys.png';

import './styles.scss';

const GameInstructions = (props) => {

  let nativeVersion = false;
  if(window.location.search === '?nativeApp=true' || isMobile) {
    nativeVersion = true;
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []); // we pass empty array as the second param to make this only call on mount and not on any updates

  function handleKeyPress(event) {
    // case for 'enter' or 'space' key
    if(event.keyCode === 13 || event.keyCode === 32) {
      handleContinue();
    }
  }

  function handleContinue() {
    handleShowMapMessage();
    handleLoadStartingItems();
  }

  function handleShowMapMessage() {
    const { message } = maps[START_MAP];

    store.dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameText: {
          title: message.title,
          body: message.body
        }
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

  return(
    <Dialog>
      <div className='game-instructions-title'>
        {'Game Controls'}
      </div>

      <div className='game-instructions-text'>
        {
          nativeVersion ?
            null
            :
            <span>
              {`MOVEMENT`}
            </span>
        }

        <div className={`flex-row align-center space-evenly`}>
          {
            nativeVersion ?
              <React.Fragment>
                <img src={Swipe}
                  alt='swipe' />
                <div className='native-text'>
                  {'SWIPE and HOLD to MOVE'}
                </div>
              </React.Fragment>
              :
              <React.Fragment>
                <img src={ArrowKeys} alt='arrow-keys' />
                <img src={WASDKeys} alt='wasd-keys' />
              </React.Fragment>
          }
        </div>

        {
          nativeVersion ?
            null
            :
            <span style={{paddingTop: 12}}>
              {`ATTACK`}
            </span>
        }

        <div className={`flex-row align-center space-evenly`}>
          {
            nativeVersion ?
              <React.Fragment>
                <img src={DoubleTap}
                  alt='double-tap' />
                <div className='native-text'>
                  {'DOUBLE TAP to ATTACK'}
                </div>
              </React.Fragment>
              :
              <React.Fragment>
                <img src={Space} alt='space' />
                <img src={Enter} alt='enter' />
              </React.Fragment>
          }
        </div>

      </div>

      <div className='flex-column game-start-button'>
        <Button
          onClick={handleContinue}
          title={'Continue'} />
      </div>
    </Dialog>
  );
}

export default GameInstructions;