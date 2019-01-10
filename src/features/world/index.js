import React       from 'react';
import { connect } from 'react-redux';
// game components
import EndlessFloorCounter from '../../components/endless-floor-counter';
import Footer              from '../../components/footer';
import GameMusic           from '../../components/game-music';
import GameSettings        from '../../components/game-settings';
import Inventory           from '../inventory';
import Map                 from '../map';
import Monsters            from '../monsters';
import Player              from '../player';
import Snackbar            from '../snackbar';
import Stats               from '../stats';
// game configs
import maps  from '../../data/maps';
import store from '../../config/store';
// game functions
import takeMonstersTurn from '../monsters/take-monsters-turn';
import generateMonsters from '../../modules/generate-monsters';

import './styles.css';

class World extends React.Component {

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
    // if a turn has been taken, and the game hasn't just restarted, and the map didn't change
    else if(prevProps.world.turn !== this.props.world.turn
      && (this.props.world.turn !== 0)
      && (prevProps.world.currentMap === this.props.world.currentMap)) {
      // take monster turn
      takeMonstersTurn();
    }
  }

  handleLoadMap() {
    const { world } = this.props;
    const { gameMode, floorNum, randomMaps } = world;

    if(gameMode === 'endless') {
      // set map tiles for current random map
      store.dispatch({
        type: 'ADD_TILES',
        payload: { tiles: randomMaps[floorNum - 1].tiles }
      });
    } else {
      // set map tiles for current story map
      store.dispatch({
        type: 'ADD_TILES',
        payload: { tiles: maps[world.currentMap].tiles }
      });
    }
  }

  handleLoadMonsters() {
    const { world, monsters, player, stats } = this.props;
    const { gameMode, currentMap, randomMaps, floorNum } = world;

    // if it's endless mode and we don't have monsters for the current map
    if(gameMode === 'endless') {
      if(!monsters.components[currentMap]) {
        // let's generate some monsters and set them!
        store.dispatch({
          type: 'ADD_MONSTERS',
          payload: {
            monsters: generateMonsters(floorNum, randomMaps[floorNum - 1].tiles, player.position, stats.level),
            map: currentMap
          }
        });
      }
    } else {
      // load monsters for the story map
      store.dispatch({
        type: 'ADD_MONSTERS',
        payload: {
          monsters: maps[currentMap].monsters,
          map: currentMap
        }
      });
    }
  }

  render() {
    const { gameOver, gameStart, paused, inventory, gameMode, floorNum, settings } = this.props.world;
    // disable the inventory button when we are in settings or paused and not in the inventory
    const disableInventory = settings || (paused && !inventory);
    // disable the stats view when in game start or game over or settings
    const disableStats = gameStart || gameOver || settings;

    return (
      <div className='world-view-container white-border'>

        {
          gameMode === 'endless' ?
            <EndlessFloorCounter floor={floorNum} />
            :
            null
        }

        <Map />
        <Player />
        <Monsters />

        {/* Show our 'paused' component here - this is the game start screen,
        game over screen, as well as other dialogs throughout the game */}
        { paused }

        { settings }

        <div className='flex-row world-stats-container'
          style={{ justifyContent: disableStats ? 'flex-end' : 'space-between' }}>
          {
            disableStats ?
              null
              :
              <Stats />
          }

          <Inventory disabled={disableInventory} />

          <Snackbar />

          <div className='flex-column'>
            <GameMusic />
            <GameSettings />
          </div>

        </div>

        <Footer />

      </div>
    );
  }
}

const mapStateToProps = ({ world, monsters, player, stats }) => ({ world, monsters, player, stats });

export default connect(mapStateToProps)(World);
