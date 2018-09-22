import React, { Component } from 'react';
import Sound                from 'react-sound';

import AmbientMusic from './ambient-music.mp3';

import './styles.css';

export default class GameMusic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMusic: null
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleKeyPress);
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleKeyPress);
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress() {
    // we have to load music only have user has clicked or pressed a key
    // chrome disables auto play until user has interacted with window
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

  toggleMusic() {
    const { gameMusic } = this.state;
    if(gameMusic) {
      this.setState({ gameMusic: null });
    } else {
      this.setState({ gameMusic: (
          <Sound
            url={AmbientMusic}
            playStatus={'PLAYING'}
            autoLoad={true}
            loop={true}
            volume={100} />
        )
      });
    }
  }

  render() {
    const { gameMusic } = this.state;

    return (
      <div className='game-music-toggle-button white-border'
        onClick={this.toggleMusic.bind(this)}>

        <div className='line1'
          style={{
            width: gameMusic ? 0 : 60,
            top: gameMusic ? 0 : 19,
            left: gameMusic ? 0 : -7
          }}>
        </div>
        <div className='line2'
          style={{
            width: gameMusic ? 0 : 60,
            top: gameMusic ? 0 : 19,
            right: gameMusic ? 0 : -7
          }}>
        </div>

        <i className={`fa fa-${gameMusic ? 'volume-up' : 'volume-off'} game-music-button`} />

        { gameMusic }

      </div>
    );
  }
}
