import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTimeout from 'react-timeout';
import Sound from 'react-sound';

import MonsterAttack from '../monsters/assets/monster-attack.wav';
import MonsterDeath from '../monsters/assets/monster-death.wav';
import MonsterSlash from '../monsters/assets/monster-slash.png';
import PlayerDeath from './assets/player-death.mp3';
import SwordSlash from './assets/sword-slash.png';
import PlayerStep from './assets/player-step.wav';
import SwordSwish from './assets/player-sword-swish.wav';
import Animation from '../../components/animation';

import PlayerHair from './assets/player-hair.png';
import PlayerEyes from './assets/player-eyes.png';
import PlayerSkin from './assets/player-skin.png';
import PlayerArmour from './assets/player-armour.png';
import PlayerClothes from './assets/player-clothes.png';
import PlayerOutline from './assets/player-outline.png';

import { ANIMATION_SPEED, SPRITE_SIZE, FISTS } from '../../config/constants';

import './styles.scss';

class Player extends Component {
    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
        this.directionMap = {
            SOUTH: 0, // facing down, line 1 of spritesheet
            NORTH: 1, // facinf up, line 2 of spritesheet
            WEST: 2, // facing left, line 3 of spritesheet
            EAST: 3, // facing right, line 4 of spritesheet
        };

        this.state = {
            attackAnimationPlay: 'paused',
            attackAnimationLoc: [0, 0],
            animationWalkSound: null,
            animationAttackSound: null,
            monsterAttackAnimationPlay: 'paused',
            monsterAnimationAttackSound: null,
            monsterProjectileAnimation: null,
            monsterDeath: null,
            playerDeath: null,
            leftSideStride: true,
            stamp: 0,
        };
    }

    avatar(action, dir = 0) {
        if (this.canvasRef && this.canvasRef.current) {
            const ctx = this.canvasRef.current.getContext('2d');
            const spriteLine = dir * SPRITE_SIZE;

            let currentFrame = this.state.leftSideStride ? 0 : 5;
            let currentTick = 0;
            const ticksPerFrame = 5;

            const {
                hairColour,
                skinColour,
                armourColour,
                clothesColour,
            } = this.props.dialog.appearance;

            const colours = [
                ['hair', `hue-rotate(${hairColour - 10}deg)`],
                ['skin', `hue-rotate(${skinColour - 10}deg)`],
                ['armour', `hue-rotate(${armourColour - 10}deg)`],
                ['clothes', `hue-rotate(${clothesColour - 10}deg)`],
                ['outline', 'none'],
                ['eyes', 'none'],
            ];

            const draw = frame => {
                // don't allow invalid frames
                if (frame > 7 || frame < 0) frame = 0;

                ctx.clearRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

                colours.forEach(colour => {
                    ctx.filter = colour[1];
                    ctx.drawImage(
                        this.sprite[colour[0]],
                        frame * SPRITE_SIZE,
                        spriteLine,
                        SPRITE_SIZE,
                        SPRITE_SIZE,
                        0,
                        0,
                        SPRITE_SIZE,
                        SPRITE_SIZE
                    );
                });
            };

            const update = () => {
                currentTick += 1;

                if (currentTick > ticksPerFrame) {
                    currentTick = 0;
                    currentFrame += 1;
                }
            };

            const main = () => {
                draw(currentFrame);
                update();
                const id = window.requestAnimationFrame(main);
                if (this.state.leftSideStride && currentFrame > 4) {
                    window.cancelAnimationFrame(id);
                }
                if (!this.state.leftSideStride && currentFrame > 8) {
                    window.cancelAnimationFrame(id);
                }
            };

            if (action === 'draw') {
                draw(0);
            }

            if (action === 'animate') {
                main();
            }
        }
    }

    componentDidMount() {
        this.sprite = {
            hair: new Image(),
            eyes: new Image(),
            skin: new Image(),
            armour: new Image(),
            clothes: new Image(),
            outline: new Image(),
        };

        this.sprite.hair.src = PlayerHair;
        this.sprite.eyes.src = PlayerEyes;
        this.sprite.skin.src = PlayerSkin;
        this.sprite.armour.src = PlayerArmour;
        this.sprite.clothes.src = PlayerClothes;
        this.sprite.outline.src = PlayerOutline;

        this.sprite.onload = () => {
            this.avatar('draw', this.directionMap[this.props.player.direction]);
        };
    }

    // this is used to tell when to animate the player
    componentDidUpdate(prevProps, prevState) {
        this.avatar('draw', this.directionMap[this.props.player.direction]);

        // detemine when the player has moved
        if (
            prevProps.player.playerMoved !== this.props.player.playerMoved &&
            this.state.stamp + ANIMATION_SPEED < Date.now()
        ) {
            let animationWalkSound = null;
            if (this.props.gameMenu.sound) {
                animationWalkSound = (
                    <Sound
                        url={PlayerStep}
                        playStatus={'PLAYING'}
                        autoLoad={true}
                        volume={100}
                    />
                );
            }
            this.setState(
                {
                    stamp: Date.now(),
                    animationWalkSound,
                    leftSideStride: !this.state.leftSideStride,
                },
                () => {
                    this.avatar(
                        'animate',
                        this.directionMap[this.props.player.direction]
                    );
                }
            );
        }
        // see if player died
        else if (prevProps.player.playerDied !== this.props.player.playerDied) {
            let playerDeath = null;
            if (this.props.gameMenu.sound) {
                playerDeath = (
                    <Sound
                        url={PlayerDeath}
                        playStatus={'PLAYING'}
                        autoLoad={true}
                        volume={100}
                    />
                );
            }
            // player the player death sound after
            this.props.setTimeout(
                () => this.setState({ playerDeath }),
                ANIMATION_SPEED
            );
            // pause the infinite animation after 1 iteration
            this.props.setTimeout(
                () => this.setState({ playerDeath: null }),
                ANIMATION_SPEED + ANIMATION_SPEED * 4
            );
        }
        // see if a monster died
        else if (
            prevProps.player.monsterDied !== this.props.player.monsterDied
        ) {
            let monsterDeath = null;
            if (this.props.gameMenu.sound) {
                monsterDeath = (
                    <Sound
                        url={MonsterDeath}
                        playStatus={'PLAYING'}
                        autoLoad={true}
                        volume={100}
                    />
                );
            }
            // play the monster death sound after delay
            this.props.setTimeout(
                () => this.setState({ monsterDeath }),
                ANIMATION_SPEED
            );
            // pause the infinite animation after 1 iteration and the delay
            this.props.setTimeout(
                () => this.setState({ monsterDeath: null }),
                ANIMATION_SPEED + ANIMATION_SPEED * 3.5
            );
        }
        // see if a monster attacked the player
        else if (
            prevProps.player.monsterAttacked !==
                this.props.player.monsterAttacked ||
            prevProps.player.monsterUseProjectile !==
                this.props.player.monsterUseProjectile
        ) {
            let monsterAnimationAttackSound = null;
            let monsterProjectileAnimation = null;
            if (this.props.gameMenu.sound) {
                monsterAnimationAttackSound = (
                    <Sound
                        url={MonsterAttack}
                        playStatus={'PLAYING'}
                        autoLoad={true}
                        volume={100}
                    />
                );
            }

            if (
                prevProps.player.monsterUseProjectile !==
                this.props.player.monsterUseProjectile
            ) {
                monsterProjectileAnimation = (
                    <Animation
                        projectile={this.props.player.monsterProjectile}
                        startPosition={
                            this.props.player.monsterProjectileTargetPosition
                        }
                        endPosition={
                            this.props.player.monsterProjectile.target.includes(
                                'self'
                            )
                                ? this.props.player
                                      .monsterProjectileTargetPosition // If they're tartgetting themselves, then use their position
                                : [0, 0] // Otherwise it's targetting the player
                        }
                        direction={this.props.player.monsterProjectileDirection}
                    />
                );
            }

            // animate the player
            this.setState({
                monsterAttackAnimationPlay: 'running',
                monsterAnimationAttackSound,
                monsterProjectileAnimation,
            });
            // pause the infinite animation after 1 iteration plus delay time (250ms)
            this.props.setTimeout(
                () =>
                    this.setState({
                        monsterAttackAnimationPlay: 'paused',
                        monsterAnimationAttackSound: null,
                        monsterProjectileAnimation: null,
                    }),
                ANIMATION_SPEED + 250
            );
        }
        // see if the player attacked
        else if (prevProps.player.spellCast !== this.props.player.spellCast) {
            let attackAnimationLoc = [0, 0];
            // calculate which way the sword should slash
            switch (this.props.player.direction) {
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
            if (this.props.gameMenu.sound) {
                animationAttackSound = (
                    <Sound
                        url={SwordSwish}
                        playStatus={'PLAYING'}
                        autoLoad={true}
                        volume={100}
                    />
                );
            }
            // animate the sword slash
            this.setState({
                attackAnimationPlay: 'spell',
                attackAnimationLoc,
                animationAttackSound,
            });
            // pause the infinite animation after 1 iteration
            this.props.setTimeout(
                () =>
                    this.setState({
                        attackAnimationPlay: 'paused',
                        animationAttackSound: null,
                    }),
                ANIMATION_SPEED
            );
        } else if (
            prevProps.player.playerAttacked !== this.props.player.playerAttacked
        ) {
            let attackAnimationLoc = [0, 0];
            // calculate which way the sword should slash
            switch (this.props.player.direction) {
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
            if (this.props.gameMenu.sound) {
                animationAttackSound = (
                    <Sound
                        url={SwordSwish}
                        playStatus={'PLAYING'}
                        autoLoad={true}
                        volume={100}
                    />
                );
            }

            const weapon = this.props.stats.equippedItems.weapon || FISTS;

            // animate the sword slash
            this.setState({
                attackAnimationPlay: weapon.kind || 'running',
                attackAnimationLoc,
                animationAttackSound,
            });
            // pause the infinite animation after 1 iteration
            this.props.setTimeout(
                () =>
                    this.setState({
                        attackAnimationPlay: 'paused',
                        animationAttackSound: null,
                    }),
                ANIMATION_SPEED
            );
        }
    }

    render() {
        const {
            attackAnimationPlay,
            attackAnimationLoc,
            animationWalkSound,
            animationAttackSound,
            monsterAnimationAttackSound,
            monsterAttackAnimationPlay,
            monsterProjectileAnimation,
            monsterDeath,
            playerDeath,
        } = this.state;
        const { player, dialog, stats } = this.props;

        const { gameStart } = dialog;
        // game start menu open, hide the player
        if (gameStart) return null;

        const projectile =
            attackAnimationPlay === 'spell'
                ? player.spell
                : attackAnimationPlay === 'ranged'
                ? stats.equippedItems.weapon.projectile
                : null;

        return (
            <div
                className="player__animation"
                style={{
                    top: player.position[1],
                    left: player.position[0],
                }}
            >
                <canvas ref={this.canvasRef} width={40} height={40} />

                {animationWalkSound}
                {animationAttackSound}
                {monsterAnimationAttackSound}
                {monsterDeath}
                {playerDeath}
                {monsterProjectileAnimation}

                {monsterAttackAnimationPlay === 'running' && (
                    <div
                        className="monster__slash"
                        style={{ backgroundImage: `url('${MonsterSlash}')` }}
                    />
                )}

                {attackAnimationPlay !== 'paused' && (
                    <div
                        className="sword__slash"
                        style={{
                            top: attackAnimationLoc[1],
                            left: attackAnimationLoc[0],
                            backgroundImage: `url('${SwordSlash}')`,
                        }}
                    />
                )}

                {projectile && (
                    <Animation
                        projectile={projectile}
                        startPosition={attackAnimationLoc}
                        endPosition={[
                            player.targetPosition[0] - player.position[0],
                            player.targetPosition[1] - player.position[1],
                        ]}
                        direction={player.direction}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ gameMenu, player, dialog, stats }) => ({
    gameMenu,
    player,
    dialog,
    stats,
});

export default connect(mapStateToProps)(ReactTimeout(Player));
