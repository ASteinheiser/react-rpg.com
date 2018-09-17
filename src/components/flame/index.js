import React, { Component } from 'react';
import ReactTimeout         from 'react-timeout';

import Flame1 from './images/flame-1.png';
import Flame2 from './images/flame-2.png';
import Flame3 from './images/flame-3.png';
import Flame4 from './images/flame-4.png';
import Flame5 from './images/flame-5.png';
import Flame6 from './images/flame-6.png';
import Flame7 from './images/flame-7.png';
import Flame8 from './images/flame-8.png';
import { SPRITE_SIZE } from '../../config/constants';

import './styles.css';

const SPEED = 350; // 250 ms

const Flames = [Flame1, Flame2, Flame3, Flame4, Flame5, Flame6, Flame7, Flame8];

class Flame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currFrame: 0
    }

    this.handleNextFrame = this.handleNextFrame.bind(this);
  }

  componentDidMount() {
    this.props.setTimeout(this.handleNextFrame, SPEED);
  }

  handleNextFrame() {
    const { currFrame } = this.state;
    // set the next frame properly
    this.setState({ currFrame: (currFrame < 7) ? (currFrame + 1) : 0});
    // get the next frame
    this.props.setTimeout(this.handleNextFrame, SPEED);
  }


  render() {
    const { currFrame } = this.state;
    const { position } = this.props;

    return (
      <div className='flame-container'
        style={{
          top: position[0] * SPRITE_SIZE,
          left: position[1] * SPRITE_SIZE,
          backgroundImage: `url('${Flames[currFrame]}')`
        }} />
    );
  }
}

export default ReactTimeout(Flame);
