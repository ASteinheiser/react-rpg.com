import React, { useEffect, useState } from 'react';
import ReactTimeout from 'react-timeout';

import Button         from '../../../../components/button';
import Dialog         from '../../../../components/dialog';
import randomPhrase   from './random-phrase';
import resetGameState from '../../../../modules/reset-game-state';

import './styles.scss';

const GameOver = (props) => {

  const [phrase] = useState(randomPhrase());
  const [ready, setReady] = useState(false);
  // delay the new game button for 1 second to prevent
  // accidental click during double click on mobile
  useEffect(() => props.setTimeout(() => setReady(true), 1000), []);

  return(
    <Dialog>
      <span className='game-over-title'>
        {'Game Over!'}
      </span>

      <span className='game-over-text'>
        { phrase }
      </span>

      <div className='game-over-button-container'>
        <Button
          onClick={ready && resetGameState}
          title={'New Game'}
          icon='sync'/>
      </div>
    </Dialog>
  );
}

export default ReactTimeout(GameOver);
