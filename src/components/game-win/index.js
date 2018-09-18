import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Button       from '../button';
import Dialog       from '../dialog';
import store        from '../../config/store';

import './styles.css';

class GameWin extends Component {

  handleCloseDialog() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: false }
    })
  }

  render() {
    const { world, monsters } = this.props;
    console.log(monsters);
    console.log(world.currentMap);
    // case for when player has not won yet
    return(
      <Dialog>
        {'victory?'}
        <Button
          onClick={this.handleCloseDialog.bind(this)}
          icon='reply'
          title={'Return to Dungeon'} />
      </Dialog>
    );
  }
}

const mapStateToProps = ({ world, monsters }) => {
  return { world, monsters };
}

export default connect(mapStateToProps)(GameWin);
