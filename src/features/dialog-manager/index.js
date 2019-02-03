import React       from 'react';
import { connect } from 'react-redux';

import ChestLoot        from './dialogs/chest-loot';
import EndlessGameStart from './dialogs/endless-game-start';
import InventoryDialog  from './dialogs/inventory-dialog';
import GameInstructions from './dialogs/game-instructions';
import GameTextDialog   from './dialogs/game-text-dialog';
import GameSelect       from './dialogs/game-select';
import GameWin          from './dialogs/game-win';
import GameOver         from './dialogs/game-over';
import MainGameStart    from './dialogs/main-game-start';
import SettingsDialog   from './dialogs/settings-dialog';
import ShopDialog       from './dialogs/shop-dialog';

const DialogManager = (props) => {

  const { chest, inventory, gameText, gameOver, gameStart, gameSelect, gameWin, gameInstructions, paused, settings, shop } = props.world;

  let PauseComp = null;
  let SettingsComp = null;

  if(paused) {
    if(chest) PauseComp = <ChestLoot />;
    if(shop) PauseComp = <ShopDialog />;
    if(inventory) PauseComp = <InventoryDialog />;
    if(gameText) PauseComp = <GameTextDialog text1={gameText.title} text2={gameText.body} />;
    if(gameInstructions) PauseComp = <GameInstructions />;
    if(gameOver) PauseComp = <GameOver />;
    if(gameStart) PauseComp = <GameSelect />;
    if(gameSelect) {
      if(gameSelect === 'story') PauseComp = <MainGameStart />;
      if(gameSelect === 'endless') PauseComp = <EndlessGameStart />;
    }
    if(gameWin) PauseComp = <GameWin />;
  }
  if(settings) PauseComp = <SettingsDialog />;

  return(
    <React.Fragment>

      {/* Show the 'paused' component here - this is the game start screen,
        game over screen, as well as other dialogs throughout the game */}
      { PauseComp }

      {/* Show the 'settings' component over the 'paused' components */}
      { SettingsComp }

    </React.Fragment>
  );
}

const mapStateToProps = ({ world }) => ({ world });

export default connect(mapStateToProps)(DialogManager);