import React, { useEffect } from 'react';
import { connect }          from 'react-redux';
import { isMobile }         from 'react-device-detect';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import DialogManager       from './features/dialog-manager';
import EndlessFloorCounter from './components/endless-floor-counter';
import Footer              from './components/footer';
import GameMenus           from './features/game-menus';
import World               from './features/world';
import Viewport            from './components/viewport';
import useWindowSize       from './modules/use-window-size';

const App = (props) => {

  let nativeVersion = false;
  if(window.location.search === '?nativeApp=true' || isMobile) {
    nativeVersion = true;
  }

  const { gameMode, floorNum } = props.world;
  const { height, width } = useWindowSize();

  // disable scrolling of the page
  // prevents iOS Safari bouncing during movement
  useEffect(() => {
    disableBodyScroll(document.getElementById('root'));
    return clearAllBodyScrollLocks;
  }, []);

  let largeView = false;
  let sideMenu = false;
  // if we have a wide screen size
  if(width > 760) {
    largeView = true;
    // if the screen size is too short
    if(height < 625) sideMenu = true;
  } // if we have a normal/small screen size
  else {
    // if the screen size is too short
    if(height < 575) sideMenu = true;
  }
  // don't switch to side menu if there's no horizontal room
  if(width < 550) {
    sideMenu = false;
  }

  return(
    <div className={`centered ${sideMenu ? 'flex-row' : 'flex-column'}`}>

      <Viewport largeView={largeView} sideMenu={sideMenu}>

        <World largeView={largeView} />

        <DialogManager />

        {/* Show the floor counter when playing endless mode */}
        { gameMode === 'endless' ? <EndlessFloorCounter floor={floorNum} /> : null }

      </Viewport>

      <GameMenus sideMenu={sideMenu} />

      { nativeVersion ? null : <Footer /> }

    </div>
  );
}

const mapStateToProps = ({ world }) => ({ world });

export default connect(mapStateToProps)(App);
