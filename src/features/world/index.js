import React       from 'react';
import { connect } from 'react-redux';
import Sound       from 'react-sound';
// game components
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
// game files
import AmbientMusic from './ambient-music.mp3';

import './styles.css';

class World extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMusic: null
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.handleGameStart();

    window.addEventListener('mousedown', this.handleKeyPress);
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleKeyPress);
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress() {
    // we have to load music only have user has clicked or pressed a key
    this.setState({ gameMusic: (
        <Sound
          url={AmbientMusic}
          playStatus={'PLAYING'}
          autoLoad={true}
          loop={true}
          volume={100} />
      )
    });
    window.removeEventListener('mousedown', this.handleKeyPress);
    window.removeEventListener('keydown', this.handleKeyPress);
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
    const { gameMusic } = this.state;

    return (
      <div className='world-view-container white-border'>

        { gameMusic }

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
