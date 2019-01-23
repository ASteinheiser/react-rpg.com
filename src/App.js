import React from 'react';

import World  from './features/world';
// import Footer from './components/footer';

const App = (props) => {

  return(
    <div className='game-layout-container'>

      {/* <span className='game-title-text'>
        {'React-RPG.com'}
      </span> */}

      <World />

      {/* <Footer /> */}

    </div>
  );
}

export default App;
