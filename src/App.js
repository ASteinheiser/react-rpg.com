import React from 'react';

import World         from './features/world';
import useWindowSize from './modules/use-window-size';

const App = (props) => {

  const { height } = useWindowSize();

  return (
    <div className='game-layout-container'>
      {
        height > 800 ?
          <span className='game-title-text'>
            {'React + Redux RPG'}
          </span>
          :
          null
      }

      <World />

    </div>
  );
}

export default App;
