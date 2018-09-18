import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Button         from '../button';
import Dialog         from '../dialog';
import resetGameState from '../../modules/reset-game-state';
import store          from '../../config/store';

import './styles.css';

class GameWin extends Component {

  handleCloseDialog() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: false }
    })
  }

  render() {
    const { components } = this.props.monsters;
    let monstersRemain = false;
    // check monsters by map
    Object.keys(components).forEach(mapId => {
      // see if there are any monsters on any maps
      monstersRemain = Object.keys(components[mapId]).length > 0;
    });
    // player has defeated all enemies!
    if(!monstersRemain) {
      return(
        <Dialog>
          <span className='flex-row game-win-title'>
            {'Congratulations!!'}
          </span>
          <span className='flex-column game-win-text'>
            {'You managed to bathe your blade in the blood of each creature that once lurked in this dungeon...'}
          </span>
          <div className='flex-row game-win-button'>
            <Button
              onClick={() => { resetGameState(); }}
              icon='sync'
              title={'Play Again'} />
          </div>
        </Dialog>
      );
    }
    // player hasn't killed all enemies
    return(
      <Dialog>
        <span className='flex-row game-win-title'>
          {'You Are Weak...'}
        </span>
        <span className='flex-column game-win-text'>
          {'The shrine can only recognize you once every monster in the dungeon has been defeated...'}
        </span>
        <div className='flex-row game-win-button'>
          <Button
            onClick={this.handleCloseDialog.bind(this)}
            icon='reply'
            title={'Return to Dungeon'} />
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ monsters }) => {
  return { monsters };
}

export default connect(mapStateToProps)(GameWin);
