import React from 'react';

import Button from '../button';
import Dialog from '../dialog';

import './styles.scss';

const GameInstructions = (props) => {

  const { onContinue } = props;

  return(
    <Dialog>
      <div className='game-instructions-title'>
        {'Game Controls'}
      </div>

      <div className='game-instructions-text'>
        {`ATTACK >> Double-tap / 'Space' / 'Enter'`}
        <br />
        <br />
        {`MOVE >> Swipe / 'WASD' / Arrow Keys`}
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