import React, { Component } from 'react';
import ReactTimeout         from 'react-timeout';

import Button         from '../../../../components/button';
import Dialog         from '../../../../components/dialog';
import randomPhrase   from './random-phrase';
import resetGameState from '../../../../modules/reset-game-state';

import './styles.scss';

class GameOver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phrase: randomPhrase(),
      ready: false
    };
  }

  componentWillMount() {
    // delay the new game button for 1 second to prevent
    // accidental click during double click on mobile
    this.props.setTimeout(() => {
      this.setState({ ready: true });
    }, 1000);
  }

  render() {
    const { phrase, ready } = this.state;

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
}

export default ReactTimeout(GameOver);
