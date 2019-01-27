import React from 'react';

import Button from '../button';
import Dialog from '../dialog';

import ArrowKeys from './assets/arrow-keys.png';
// import Swipe     from './assets/swipe.png';
import WASDKeys  from './assets/wasd-keys.png';

import './styles.scss';

const GameInstructions = (props) => {

  const { onContinue } = props;

  return(
    <Dialog>
      <div className='game-instructions-title'>
        {'Game Controls'}
      </div>

      <div className='game-instructions-text'>
        <span>
          {`MOVEMENT`}
        </span>

        <div className='flex-row space-between'>
          {/* <img src={Swipe} alt='swipe' /> */}
          <img src={ArrowKeys} alt='arrow-keys' />
          <img src={WASDKeys} alt='wasd-keys' />
        </div>

        <span style={{paddingTop: 16}}>
          {`ATTACK`}
        </span>

        <div className='flex-row space-between'>
          {/* <img src={ArrowKeys} alt='arrow-keys' />
          <img src={ArrowKeys} alt='arrow-keys' />
          <img src={ArrowKeys} alt='arrow-keys' /> */}
        </div>

      </div>

      <div className='flex-column game-start-button'>
        <Button
          onClick={onContinue}
          title={'Continue'} />
      </div>
    </Dialog>
  );
}

export default GameInstructions;