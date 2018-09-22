import React       from 'react';
import { connect } from 'react-redux';
// game components
import GameMusic from '../../components/game-music';
import GameStart from '../../components/game-start';
import GameOver  from '../../components/game-over';
import Inventory from '../inventory';
import Map       from '../map';
import Monsters  from '../monsters';
import Player    from '../player';
import Stats     from '../stats';
// game configs
import maps     from '../../data/maps';
import store    from '../../config/store';
// game functions
import takeMonstersTurn from '../monsters/take-monsters-turn';

import './styles.css';

class World extends React.Component {

  componentDidMount() {
    this.handleGameStart();
  }

  componentDidUpdate(prevProps, prevState) {
    // reload the tiles and monsters if it's a new map
    if(prevProps.world.currentMap !== this.props.world.currentMap){
      this.handleLoadMap();
      this.handleLoadMonsters();
    }
    // if the game has been restarted
    if(prevProps.world.gameOver === true && this.props.world.gameOver === false) {
      this.handleGameStart();
    }
    // if a turn has been taken, and the game hasn't just restarted
    if(prevProps.world.turn !== this.props.world.turn
      && (this.props.world.turn !== 0)) {
      // take monster turn
      takeMonstersTurn();
    }
  }

  handleGameStart() {
    store.dispatch({
      type: 'PAUSE',
      payload: {
        component: <GameStart />,
        gameStart: true
      }
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
    const { world } = this.props;

    return (
      <div className='world-view-container white-border'>

        <Map />
        <Player />
        <Monsters />

        {
          world.gameOver ?
            <GameOver />
            :
            <div className='flex-row world-stats-container'>
              {
                world.gameStart ?
                  null
                  :
                  <Stats />
              }
              {
                (world.paused && !world.inventory) ?
                  null
                  :
                  <Inventory />
              }
              <GameMusic />
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
