import React, { Component } from 'react';
import { connect }          from 'react-redux';
import ReactTimeout         from 'react-timeout';

import Controls                 from '../player/controls';
import exploreTiles             from '../player/actions/explore-tiles';
import Player                   from '../player';
import GameMap                  from '../map';
import Monsters                 from '../monsters';
import loadMonsters             from '../monsters/actions/load-monsters';
import takeMonstersTurn         from '../monsters/actions/take-monsters-turn';
import { MAP_TRANSITION_DELAY } from '../../config/constants';

import './styles.scss';

// animation time is 500(ms), adding +100 makes it smoother
const MAP_TRANSITION = MAP_TRANSITION_DELAY + 100;

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
    if(prevProps.world.mapTransition !== this.props.world.mapTransition
      && prevProps.world.currentMap !== null
      && this.props.dialog.gameStart !== true) {
      this.handleMapTransition();
    }
    // if a turn has been taken, and the game hasn't just restarted, and the map didn't change
    else if(prevProps.world.turn !== this.props.world.turn
      && (this.props.world.turn !== 0)
      && (prevProps.world.currentMap === this.props.world.currentMap)) {
      // take monster turn
      this.props.takeMonstersTurn();
    }
  }

  handleMapTransition() {
    const { player, exploreTiles } = this.props;
    // fade the map transition component to black
    this.setState({ opacity: 1 }, () => {
      // after a delay, fade the map transition with the new map loaded
      this.props.setTimeout(() => {
        exploreTiles(player.position);
        this.props.loadMonsters();
        this.setState({ opacity: 0 });
      },
      MAP_TRANSITION);
    });
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

          <Controls />

          <GameMap />

          <Player />

          <Monsters />

        </div>

        <div className='world__map-transition' style={{ opacity }} />
      </>
    );
  }
}

const mapStateToProps = ({ appState, world, player, dialog }) => ({ appState, world, player, dialog });

const actions = { exploreTiles, loadMonsters, takeMonstersTurn };

export default connect(mapStateToProps, actions)(ReactTimeout(World));
