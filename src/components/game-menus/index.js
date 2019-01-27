import React       from 'react';
import { connect } from 'react-redux';

import GameMusic    from '../game-music';
import GameSettings from '../game-settings';
import Inventory    from '../../features/inventory';
import Snackbar     from '../../features/snackbar';
import Stats        from '../../features/stats';

import './styles.scss';

const GameMenus = (props) => {

  const { sideMenu, world } = props;
  const { gameOver, gameStart, paused, inventory, settings } = world;

  // disable the inventory button when we are in settings or paused and not in the inventory
  const disableInventory = settings || (paused && !inventory);
  // disable the stats view when in game start or game over or settings
  const disableStats = gameStart || gameOver || settings;

  return(
    <div className='flex-row centered'>
      <div className={`game-menu-container ${sideMenu ? 'flex-column' : 'flex-row'}`}
        style={{
          height: sideMenu ? '395px' : 'unset',
          justifyContent: disableStats ? 'flex-end' : 'space-between'
        }}>

        <Stats
          sideMenu={sideMenu}
          disabled={disableStats} />

        <Inventory
          sideMenu={sideMenu}
          disabled={disableInventory} />

        <Snackbar sideMenu={sideMenu} />

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