import React       from 'react';
import { connect } from 'react-redux';

import ChestLoot        from '../../components/chest-loot';
import EndlessGameStart from '../../components/endless-game-start';
import InventoryDialog  from '../../components/inventory-dialog';
import GameInstructions from '../../components/game-instructions';
import GameTextDialog   from '../../components/game-text-dialog';
import GameSelect       from '../../components/game-select';
import GameWin          from '../../components/game-win';
import GameOver         from '../../components/game-over';
import MainGameStart    from '../../components/main-game-start';
import SettingsDialog   from '../../components/settings-dialog';
import ShopDialog       from '../../components/shop-dialog';

const DialogManager = (props) => {

  const { chest, inventory, gameText, gameOver, gameStart, gameSelect, gameWin, gameInstructions, paused, settings, shop } = props.world;

  let PauseComp = null;
  let SettingsComp = null;

  if(settings) PauseComp = <SettingsDialog />;
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