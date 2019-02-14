import React, { Component } from 'react';
import { connect }          from 'react-redux';
import ReactTimeout         from 'react-timeout';
import Sound                from 'react-sound';
// player/monster sounds
import MonsterDeath   from '../monsters/assets/monster-death.wav';
import PlayerDeath    from './assets/player-death.mp3';
import PlayerStep     from './assets/player-step.wav';
import SwordSwish     from './assets/player-sword-swish.wav';
import MonsterAttack  from '../monsters/assets/monster-attack.wav';
// player/monster animation spritesheets
import WalkSprite     from './assets/player_walk.png';
import SwordSlash     from './assets/sword-slash.png';
import MonsterSlash   from '../monsters/assets/monster-slash.png';
// other local imports
import playerControls from './controls';
import store          from '../../config/store';
import { ANIMATION_SPEED, SPRITE_SIZE } from '../../config/constants';

import './styles.scss';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationPlay: 'paused',
      attackAnimationPlay: 'paused',
      attackAnimationLoc: [0, 0],
      animationWalkSound: null,
      animationAttackSound: null,
      monsterAttackAnimationPlay: 'paused',
      monsterAnimationAttackSound: null,
      monsterDeath: null,
      playerDeath: null
    };
  }

  // this is used to tell when to animate the player
  componentDidUpdate(prevProps, prevState) {
    // detemine when the player has moved
    if(prevProps.player.playerMoved !== this.props.player.playerMoved) {
      let animationWalkSound = null;
      if(store.getState().world.sound) {
        animationWalkSound = (
          <Sound
            url={PlayerStep}
            playStatus={'PLAYING'}
            autoLoad={true}
            volume={100} />
        );
      }
      // animate the player
      this.setState({ animationPlay: 'running', animationWalkSound });
      // pause the infinite animation after 1 iteration
      this.props.setTimeout(() => this.setState({ animationPlay: 'paused', animationWalkSound: null }), ANIMATION_SPEED);
    }
    // see if player died
    else if(prevProps.player.playerDied !== this.props.player.playerDied) {
      let playerDeath = null;
      if(store.getState().world.sound) {
        playerDeath = (
          <Sound
            url={PlayerDeath}
            playStatus={'PLAYING'}
            autoLoad={true}
            volume={100} />
        );
      }
      // player the player death sound after
      this.props.setTimeout(() => this.setState({ playerDeath }), ANIMATION_SPEED);
      // pause the infinite animation after 1 iteration
      this.props.setTimeout(() => this.setState({ playerDeath: null }), ANIMATION_SPEED + (ANIMATION_SPEED * 4));
    }
    // see if a monster died
    else if(prevProps.player.monsterDied !== this.props.player.monsterDied) {
      let monsterDeath = null;
      if(store.getState().world.sound) {
        monsterDeath = (
          <Sound
            url={MonsterDeath}
            playStatus={'PLAYING'}
            autoLoad={true}
            volume={100} />
        );
      }
      // play the monster death sound after delay
      this.props.setTimeout(() => this.setState({ monsterDeath }), ANIMATION_SPEED);
      // pause the infinite animation after 1 iteration and the delay
      this.props.setTimeout(() => this.setState({ monsterDeath: null }), ANIMATION_SPEED + (ANIMATION_SPEED * 3.5));
    }
    // see if a monster attacked the player
    else if(prevProps.player.monsterAttacked !== this.props.player.monsterAttacked) {
      let monsterAnimationAttackSound = null;
      if(store.getState().world.sound) {
        monsterAnimationAttackSound = (
          <Sound
            url={MonsterAttack}
            playStatus={'PLAYING'}
            autoLoad={true}
            volume={100} />
        );
      }
      // animate the player
      this.setState({ monsterAttackAnimationPlay: 'running', monsterAnimationAttackSound });
      // pause the infinite animation after 1 iteration plus delay time (250ms)
      this.props.setTimeout(() => this.setState({ monsterAttackAnimationPlay: 'paused', monsterAnimationAttackSound: null }), ANIMATION_SPEED + 250);
    }
    // see if the player attacked
    else if(prevProps.player.playerAttacked !== this.props.player.playerAttacked) {
      let attackAnimationLoc = [0, 0];
      // calculate which way the sword should slash
      switch(this.props.player.direction) {
        case 'SOUTH':
          attackAnimationLoc = [0, SPRITE_SIZE];
          break;
        case 'EAST':
          attackAnimationLoc = [SPRITE_SIZE, 0];
          break;
        case 'WEST':
          attackAnimationLoc = [-SPRITE_SIZE, 0];
          break;
        case 'NORTH':
          attackAnimationLoc = [0, -SPRITE_SIZE];
          break;
        default:
      }
      let animationAttackSound = null;
      if(store.getState().world.sound) {
        animationAttackSound = (
          <Sound
            url={SwordSwish}
            playStatus={'PLAYING'}
            autoLoad={true}
            volume={100} />
        );
      }
      // animate the sword slash
      this.setState({ attackAnimationPlay: 'running', attackAnimationLoc, animationAttackSound });
      // pause the infinite animation after 1 iteration
      this.props.setTimeout(() => this.setState({ attackAnimationPlay: 'paused', animationAttackSound: null }), ANIMATION_SPEED);
    }
  }

  render() {
    const { animationPlay, attackAnimationPlay, attackAnimationLoc, animationWalkSound, animationAttackSound, monsterAnimationAttackSound, monsterAttackAnimationPlay, monsterDeath, playerDeath } = this.state;
    const { player, dialog } = this.props;

    const { gameStart } = dialog;
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
      <div className='player__animation'
        style={{
          top: player.position[1],
          left: player.position[0],
          backgroundImage: `url('${WalkSprite}')`,
          backgroundPositionY: spriteLocation,
          animationPlayState: animationPlay
        }}>

        { animationWalkSound }
        { animationAttackSound }
        { monsterAnimationAttackSound }
        { monsterDeath }
        { playerDeath }

        {
          monsterAttackAnimationPlay === 'running' &&
            <div className='monster__slash'
              style={{ backgroundImage: `url('${MonsterSlash}')` }} />
        }

        {
          attackAnimationPlay === 'running' &&
            <div className='sword__slash'
              style={{
                top: attackAnimationLoc[1],
                left: attackAnimationLoc[0],
                backgroundImage: `url('${SwordSlash}')`
              }} />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ player, dialog }) => ({ player, dialog });

export default connect(mapStateToProps)(playerControls(ReactTimeout(Player)));
