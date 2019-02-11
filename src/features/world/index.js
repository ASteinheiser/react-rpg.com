import React, { Component } from 'react';
import { connect }          from 'react-redux';
import ReactTimeout         from 'react-timeout';

import Map              from '../map';
import Monsters         from '../monsters';
import takeMonstersTurn from '../monsters/take-monsters-turn';
import Player           from '../player';
import exploreTiles     from '../player/explore-tiles';
import generateMonsters from '../../modules/generate-monsters';
import store            from '../../config/store';

import './styles.scss';

class World extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // reload the tiles and monsters if it's a new map
    // and there is a current map
    // and it's not the game start
    if(prevProps.world.currentMap !== this.props.world.currentMap
      && prevProps.world.currentMap !== null
      && this.props.dialog.gameStart !== true) {
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
    const { world, player } = this.props;
    const { gameMode, floorNum, randomMaps, storyMaps } = world;

    // fade the map transition to black
    this.setState({ opacity: 1 }, () => {
      // after (1 transition + 100ms), show the map again, with the new map loaded
      this.props.setTimeout(() => {
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
            payload: { tiles: storyMaps[world.currentMap].tiles }
          });
        }

        exploreTiles(player.position);

        this.setState({ opacity: 0 });
      }, 600);
    });
  }

  handleLoadMonsters() {
    const { world, monsters, player, stats } = this.props;
    const { gameMode, currentMap, randomMaps, floorNum, storyMaps } = world;

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
          monsters: storyMaps[currentMap].monsters,
          map: currentMap
        }
      });
    }
  }

  render() {
    const { opacity } = this.state;
    const { appState, player } = this.props;
    const { largeView } = appState;
    const { position } = player;
    // calculate the offset for the world map according to player position
    // so that the viewport is always centered
    const mapOffset = largeView ? 180 : 155;
    const worldTop = mapOffset - position[1];
    const worldLeft = mapOffset - position[0];

    return (
      <>
        <div className='world__container'
          style={{
            top: worldTop,
            left: worldLeft
          }}>

          <Map />

          <Player />

          <Monsters />

        </div>

        <div className='world__map-transition' style={{ opacity }} />
      </>
    );
  }
}

const mapStateToProps = ({ appState, world, monsters, player, stats, dialog }) => ({ appState, world, monsters, player, stats, dialog });

export default connect(mapStateToProps)(ReactTimeout(World));
