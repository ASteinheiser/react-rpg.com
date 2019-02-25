import React        from 'react';
import { connect }  from 'react-redux';
import { isMobile } from 'react-device-detect';

import Button                from '../../../../components/button';
import Dialog                from '../../../../components/dialog';
import loadStartingItems     from '../../../inventory/actions/load-starting-items';
import showFirstStoryMessage from '../../actions/show-first-story-message';

import ArrowKeys from './assets/arrow-keys.png';
import DoubleTap from './assets/double-tap.png';
import Enter     from './assets/enter.png';
import Space     from './assets/space.png';
import Swipe     from './assets/swipe.png';
import WASDKeys  from './assets/wasd-keys.png';

import './styles.scss';

const GameInstructions = ({ loadStartingItems, showFirstStoryMessage }) => {

  let mobileVersion = false;
  if(window.location.search === '?nativeApp=true' || isMobile) {
    mobileVersion = true;
  }

  function handleContinue() {
    loadStartingItems();
    showFirstStoryMessage();
  }

  return(
    <Dialog onKeyPress={handleContinue}>

      <div className='game-instructions__title'>
        {'Game Controls'}
      </div>

      <div className='game-instructions__text'>
        {
          !mobileVersion &&
            <span style={{paddingBottom: 12}}>
              {`MOVEMENT`}
            </span>
        }

        <div className={`flex-row align-center space-evenly`}>
          {
            mobileVersion ?
              <>
                <img src={Swipe}
                  alt='swipe' />
                <div className='game-instructions__native-text'>
                  {'SWIPE and HOLD to MOVE'}
                </div>
              </>
              :
              <>
                <img src={ArrowKeys} alt='arrow-keys' />
                <img src={WASDKeys} alt='wasd-keys' />
              </>
          }
        </div>

        {
          !mobileVersion &&
            <span style={{paddingTop: 12}}>
              {`ATTACK`}
            </span>
        }

        <div className={`flex-row align-center space-evenly`}>
          {
            mobileVersion ?
              <>
                <img src={DoubleTap}
                  alt='double-tap' />
                <div className='game-instructions__native-text'>
                  {'DOUBLE TAP to ATTACK'}
                </div>
              </>
              :
              <>
                <img src={Space} alt='space' />
                <img src={Enter} alt='enter' />
              </>
          }
        </div>

      </div>

      <div className='flex-column game-instructions__button'>
        <Button
          onClick={handleContinue}
          title={'Continue'} />
      </div>

    </Dialog>
  );
};

const actions = { loadStartingItems, showFirstStoryMessage };

export default connect(null, actions)(GameInstructions);