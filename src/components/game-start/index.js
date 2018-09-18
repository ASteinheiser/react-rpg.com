import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Button       from '../button';
import Dialog       from '../dialog';
import Flame        from '../flame';
import items        from '../../data/items';
import maps         from '../../data/maps';
import store        from '../../config/store';
import exploreTiles from '../../features/player/explore-tiles';

import './styles.css';

class GameStart extends Component {

  handleGameStart() {
    this.handleCloseDialog();
    this.handleLoadMap();
    this.handleLoadMonsters();
    this.handleLoadPlayerSight();
    this.handleLoadStartingItems();
  }

  handleCloseDialog() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: false }
    })
  }

  handleLoadPlayerSight() {
    exploreTiles(store.getState().player.position);
  }

  handleLoadStartingItems() {
    // give the player a rusty sword
    store.dispatch({
      type: 'GET_ITEM',
      payload: items.weapons.RustySword
    })
    // and put it on
    store.dispatch({
      type: 'EQUIP_ITEM',
      payload: store.getState().inventory.items[0]
    })
  }

  handleLoadMap() {
    const { world } = this.props;
    // set map tiles for current map
    store.dispatch({
      type: 'ADD_TILES',
      payload: { tiles: maps[world.currentMap].tiles }
    })
  }

  handleLoadMonsters() {
    const { world } = this.props;
    // load initial monsters
    store.dispatch({
      type: 'ADD_MONSTERS',
      payload: { monsters: maps[world.currentMap].monsters, map: world.currentMap }
    })
  }

  render() {
    return(
      <Dialog>
        <div className='flex-row game-start-title'>
          {'React + Redux RPG'}
        </div>
        <div className='flex-column game-start-text'>
          {'Welcome Adventurer... A world full of monsters and gear awaits!'}
        </div>

        <div className='game-start-flame-container-1'>
          <Flame />
        </div>
        <div className='game-start-flame-container-2'>
          <Flame />
        </div>

        <div className='flex-column game-start-button'>
          <Button
            onClick={this.handleGameStart.bind(this)}
            icon='compass'
            title={'Explore Dungeon'} />
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ world }) => {
  return { world };
}

export default connect(mapStateToProps)(GameStart);
