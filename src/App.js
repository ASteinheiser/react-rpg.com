import React from 'react';

import World    from './features/world';
import Viewport from './components/viewport';

const App = (props) => {
  return(
    <Viewport>

      <World />

    </Viewport>
  );
}

export default App;
