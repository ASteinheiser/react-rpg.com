import React, { Component } from 'react';
import { connect }          from 'react-redux';
import ReactTimeout         from 'react-timeout';

import WalkSprite     from './player_walk.png';
import handleMovement from './movement';
import {
  ANIMATION_SPEED,
  SPRITE_SIZE
} from '../../config/constants';

import './styles.css';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationPlay: 'paused'
    };

    this.stopAnimation = this.stopAnimation.bind(this);
  }

  // this is used to tell when to animate the player
  componentDidUpdate(prevProps, prevState) {
    // detemine when the player has moved
    if(prevProps.player.playerMoved !== this.props.player.playerMoved) {
      // animate the player
      this.setState({ animationPlay: 'running' });
      // pause the infinite animation after 1 iteration
      this.props.setTimeout(this.stopAnimation, ANIMATION_SPEED);
    }
  }

  stopAnimation() {
    this.setState({ animationPlay: 'paused' });
  }

  render() {
    const { animationPlay } = this.state;
    const { player, stats, world } = this.props;

    const { gameStart } = world;
    // game start menu open, hide the player
    if(gameStart) return null;

    // calculate pixel offset for the correct facing direction sprite
    let spriteLocation;
    switch(player.direction) {
      case 'SOUTH':
        spriteLocation = `${SPRITE_SIZE*0}px`;
        break;
      case 'EAST':
        spriteLocation = `${SPRITE_SIZE*1}px`;
        break;
      case 'WEST':
        spriteLocation = `${SPRITE_SIZE*2}px`;
        break;
      case 'NORTH':
        spriteLocation = `${SPRITE_SIZE*3}px`;
        break;
      default:
    }

    return (
      <div className='player-animation'
        style={{
          top: player.position[1],
          left: player.position[0],
          backgroundImage: `url('${WalkSprite}')`,
          backgroundPositionY: spriteLocation,
          animationPlayState: animationPlay
        }} />
    );
  }
}

const mapStateToProps = ({ player, stats, world }) => {
  return { player, stats, world };
}

export default connect(mapStateToProps)(handleMovement(ReactTimeout(Player)));
