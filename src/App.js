import React, { Component } from 'react';

import Stats     from './features/stats';
import Inventory from './features/inventory';
import World     from './features/world';

class App extends Component {
  render() {
    return (
      <div className='game-layout-container'>
        {/* <span className='game-title-text'>
          {'React + Redux RPG'}
        </span> */}

        <World />

        <div className='game-stats-container'>
          <Stats />
          <Inventory />
        </div>
      </div>
    );
  }
}

export default App;
