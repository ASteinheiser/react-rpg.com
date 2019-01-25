import React       from 'react';
import { connect } from 'react-redux';

import GameMusic    from '../game-music';
import GameSettings from '../game-settings';
import Inventory    from '../../features/inventory';
import Snackbar     from '../../features/snackbar';
import Stats        from '../../features/stats';

import './styles.scss';

const GameMenus = (props) => {

  const { gameOver, gameStart, paused, inventory, settings } = props.world;

  // disable the inventory button when we are in settings or paused and not in the inventory
  const disableInventory = settings || (paused && !inventory);
  // disable the stats view when in game start or game over or settings
  const disableStats = gameStart || gameOver || settings;

  return(
    <div className='flex-row centered'>
      <div className='flex-row game-menu-container'
        style={{ justifyContent: disableStats ? 'flex-end' : 'space-between' }}>

        <Stats disabled={disableStats} />

        <Inventory disabled={disableInventory} />

        <Snackbar />

        <div className='flex-column'>
          <GameMusic />
          <GameSettings />
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = ({ world }) => ({ world });

export default connect(mapStateToProps)(GameMenus);