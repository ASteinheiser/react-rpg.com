import React       from 'react';
import { connect } from 'react-redux';

import EndlessFloorCounter from './components/endless-floor-counter';
import GameMenus           from './components/game-menus';
import World               from './features/world';
import Viewport            from './components/viewport';

const App = (props) => {

  const { paused, gameMode, floorNum, settings } = props.world;

  return(
    <React.Fragment>

      <Viewport>

        <World />

        {/* Show the 'paused' component here - this is the game start screen,
        game over screen, as well as other dialogs throughout the game */}
        { paused }

        {/* Show the 'settings' component over the 'paused' and 'world' components */}
        { settings }

        {/* Show the floor counter when playing endless mode */}
        { gameMode === 'endless' ? <EndlessFloorCounter floor={floorNum} /> : null }

      </Viewport>

      <GameMenus />

    </React.Fragment>
  );
}

const mapStateToProps = ({ world }) => ({ world });

export default connect(mapStateToProps)(App);
