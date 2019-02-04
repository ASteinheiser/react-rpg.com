import React       from 'react';
import { connect } from 'react-redux';

import GameMusic    from './game-music';
import GameSettings from './game-settings';
import Inventory    from '../inventory';
import Snackbar     from '../snackbar';
import Stats        from '../stats';

import './styles.scss';

const GameMenus = (props) => {

  const { sideMenu, dialog } = props;
  const { gameOver, gameStart, paused, inventory, settings } = dialog;

  // disable the inventory button when we are in settings or paused and not in the inventory
  const disableInventory = settings || (paused && !inventory);
  // disable the stats view when in game start or game over or settings
  const disableStats = gameStart || gameOver || settings;

  return(
    <div className='flex-row centered'>
      <div className={`game-menu-container ${sideMenu ? 'flex-column' : 'flex-row'}`}
        style={{
          paddingLeft: sideMenu ? 8 : 0,
          height: sideMenu ? '380px' : 'unset'
        }}>

        <Stats
          sideMenu={sideMenu}
          disabled={disableStats} />

        <Inventory
          sideMenu={sideMenu}
          disabled={disableInventory} />

        <Snackbar sideMenu={sideMenu} />

        <div className='flex-column'>
          <GameMusic sideMenu={sideMenu} />
          <GameSettings />
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = ({ dialog }) => ({ dialog });

export default connect(mapStateToProps)(GameMenus);