import React       from 'react';
import { connect } from 'react-redux';
// game components
import GameOver  from '../../components/game-over';
import Inventory from '../inventory';
import Map       from '../map';
import Monsters  from '../monsters';
import Player    from '../player';
import Stats     from '../stats';
// game configs
import items    from '../../data/items';
import maps     from '../../data/maps';
import store    from '../../config/store';

import './styles.css';

class World extends React.Component {

  componentDidMount() {
    this.handleLoadMap();
    this.handleLoadMonsters();
    this.handleLoadStartingItems(); // only on initial game load
  }

  componentDidUpdate(prevProps, prevState) {
    // reload the tiles and monsters if it's a new map
    if(prevProps.world.currentMap !== this.props.world.currentMap){
      this.handleLoadMap();
      this.handleLoadMonsters();
    }
    // if the game has been restarted
    if (prevProps.world.gameOver === true && this.props.world.gameOver === false) {
      this.handleLoadMap();
      this.handleLoadMonsters();
      this.handleLoadStartingItems(); // only on initial game load
    }
  }

  handleLoadStartingItems() {
    // give the player a rusty sword
    store.dispatch({
      type: 'RECEIVE_ITEM',
      payload: items.weapons.RustySword
    })
    // and put it on
    store.dispatch({
      type: 'EQUIP_ITEM',
      payload: items.weapons.RustySword
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
      payload: { monsters: maps[world.currentMap].monsters }
    })
  }

  render() {
    const { world } = this.props;

    return (
      <div className='world-view-container'>

        <Map />
        <Player />
        <Monsters />

        {
          world.gameOver ?
            <GameOver />
            :
            <div className='world-stats-container'>
              <Stats />
              <Inventory />
            </div>
        }
        {
          (world.paused && !world.gameOver) ?
            world.paused
            :
            null
        }

      </div>
    );
  }
}

const mapStateToProps = ({ world }) => {
  return { world };
}

export default connect(mapStateToProps)(World);
