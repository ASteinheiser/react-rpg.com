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
          {'You did it!'}
          <Button
            onClick={() => { resetGameState(); }}
            icon='question'
            title={'Play Again'} />
        </Dialog>
      );
    }
    // player hasn't killed all enemies
    return(
      <Dialog>
        {'You need to kill all enemies'}
        <Button
          onClick={this.handleCloseDialog.bind(this)}
          icon='reply'
          title={'Return to Dungeon'} />
      </Dialog>
    );
  }
}

const mapStateToProps = ({ monsters }) => {
  return { monsters };
}

export default connect(mapStateToProps)(GameWin);
