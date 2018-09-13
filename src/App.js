import React, { Component } from 'react';

import World from './features/world';

class App extends Component {
  render() {
    return (
      <div className='game-layout-container'>
        <World />
      </div>
    );
  }
}

export default App;
