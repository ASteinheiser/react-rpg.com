import React, { Component } from 'react';

import Stats     from './features/stats';
import Inventory from './features/inventory';
import World     from './features/world';

class App extends Component {
  render() {
    return (
      <div className='flex-column'>
        <World />

        <div className='flex-row'>
          <Stats />
          <Inventory />
        </div>
      </div>
    );
  }
}

export default App;
