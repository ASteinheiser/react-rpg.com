import React, { Component } from 'react';

import Button       from '../button';
import Dialog       from '../dialog';
import randomPhrase from './random-phrase';

import './styles.css';

class GameOver extends Component {
  render() {
    return(
      <Dialog>
        <span className='game-over-title'>
          {'Game Over!'}
        </span>

        <span className='game-over-text'>
          { randomPhrase() }
        </span>

        <div className='game-over-button-container'>
          <Button
            title={'New Game'}
            icon='refresh'/>
        </div>
      </Dialog>
    );
  }
}

export default GameOver;
