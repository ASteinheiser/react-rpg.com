import React from 'react';

import World from './features/world';

const App = (props) => {

  return(
    <div className='game-layout-container'>

      <span className='game-title-text'>
        {'React-RPG.com'}
      </span>

      <World />

    </div>
  );
}

export default App;
