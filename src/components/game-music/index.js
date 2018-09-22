import React, { Component } from 'react';
import Sound                from 'react-sound';

import AmbientMusic from './ambient-music.mp3';

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

  render() {
    const { gameMusic } = this.state;

    return gameMusic;
  }
}
