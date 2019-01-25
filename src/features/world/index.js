import React       from 'react';
import { connect } from 'react-redux';
// game components
import Map      from '../map';
import Monsters from '../monsters';
import Player   from '../player';
// game configs
import maps  from '../../data/maps';
import store from '../../config/store';
// game functions
import takeMonstersTurn from '../monsters/take-monsters-turn';
import generateMonsters from '../../modules/generate-monsters';

import './styles.scss';

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
    const { position } = this.props.player;
    // calculate the offset for the world map according to player position
    // so that the viewport is always centered
    const worldTop = 155 - position[1];
    const worldLeft = 155 - position[0];

    return (
      <div className='world-view-container'
        style={{
          top: worldTop,
          left: worldLeft
        }}>

        <Map />

        <Player />

        <Monsters />

      </div>
    );
  }
}

const mapStateToProps = ({ world, monsters, player, stats }) => ({ world, monsters, player, stats });

export default connect(mapStateToProps)(World);
