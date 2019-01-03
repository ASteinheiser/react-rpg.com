import React       from 'react';
import { connect } from 'react-redux';
// game components
import GameMusic  from '../../components/game-music';
import GameSelect from '../../components/game-select';
import GameOver   from '../../components/game-over';
import Inventory  from '../inventory';
import Map        from '../map';
import Monsters   from '../monsters';
import Player     from '../player';
import Snackbar   from '../snackbar';
import Stats      from '../stats';
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
    // and there is a current map
    // and it's not the game start
    if(prevProps.world.currentMap !== this.props.world.currentMap
      && prevProps.world.currentMap !== null
      && this.props.world.gameStart !== true) {
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
        component: <GameSelect />,
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
    const { gameOver, gameStart, paused, inventory } = this.props.world;

    return (
      <div className='world-view-container white-border'>

        <Map />
        <Player />
        <Monsters />

        {
          gameOver ?
            <GameOver />
            :
            null
        }
        {
          (paused && !gameOver) ?
            paused
            :
            null
        }

        <div className='flex-row world-stats-container'>
          {
            gameStart || gameOver ?
              null
              :
              <Stats />
          }

          <Inventory disabled={paused && !inventory} />

          <Snackbar />
          <GameMusic />

        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ world }) => {
  return { world };
}

export default connect(mapStateToProps)(World);
