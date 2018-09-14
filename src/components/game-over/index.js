import React, { Component } from 'react';

import Dialog from '../dialog';

import './styles.css';

class GameOver extends Component {
  render() {
    return(
      <Dialog>
        {'game over'}
      </Dialog>
    );
  }
}

export default GameOver;
