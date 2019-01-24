import React       from 'react';
import { connect } from 'react-redux';

import EndlessFloorCounter from './components/endless-floor-counter';
import GameMusic           from './components/game-music';
import GameSettings        from './components/game-settings';
import Inventory           from './features/inventory';
import Snackbar            from './features/snackbar';
import Stats               from './features/stats';
import World               from './features/world';
import Viewport            from './components/viewport';

const App = (props) => {

  const { gameOver, gameStart, paused, inventory, gameMode, floorNum, settings } = props.world;

  // disable the inventory button when we are in settings or paused and not in the inventory
  const disableInventory = settings || (paused && !inventory);
  // disable the stats view when in game start or game over or settings
  const disableStats = gameStart || gameOver || settings;

  return(
    <React.Fragment>
      {
        gameMode === 'endless' ?
          <EndlessFloorCounter floor={floorNum} />
          :
          null
      }

      <Viewport>

        <World />

        {/* Show the 'paused' component here - this is the game start screen,
        game over screen, as well as other dialogs throughout the game */}
        { paused }

        {/* Show the 'settings' component over the 'paused' and 'world' components */}
        { settings }

      </Viewport>

      <div className='flex-row game-menu-section'
        style={{ justifyContent: disableStats ? 'flex-end' : 'space-between' }}>

        { !disableStats ? <Stats /> : null }

        <Inventory disabled={disableInventory} />

        <Snackbar />

        <div className='flex-column'>
          <GameMusic />
          <GameSettings />
        </div>

      </div>
    </React.Fragment>
  );
}

const mapStateToProps = ({ world }) => ({ world });

export default connect(mapStateToProps)(App);
