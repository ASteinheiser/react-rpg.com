import React, { useEffect, useState }                 from 'react';
import { connect }                                    from 'react-redux';
import { isMobile }                                   from 'react-device-detect';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import DownloadAppPopup    from './components/download-app-popup';
import DialogManager       from './features/dialog-manager';
import EndlessFloorCounter from './components/endless-floor-counter';
import Footer              from './components/footer';
import GameMenus           from './features/game-menus';
import World               from './features/world';
import Viewport            from './components/viewport';
import useWindowSize       from './modules/use-window-size';

const App = (props) => {

  const [showDl, setShowDl] = useState(false);

  let mobileVersion = false;

  const nativeApp = window.location.search === '?nativeApp=true';

  if(nativeApp || isMobile) {
    mobileVersion = true;
  }

  const { optOutDownload } = props.appState;
  const { gameMode, floorNum } = props.world;
  const { height, width } = useWindowSize();

  // disable scrolling of the page
  // prevents iOS Safari bouncing during movement
  useEffect(() => {
    disableBodyScroll(document.getElementById('root'));
    return clearAllBodyScrollLocks;
  }, []);

  // check if we are on the webView version, and if not
  // show the user a dialog to download the app
  useEffect(() => {
    if(!nativeApp && !optOutDownload) {
      setShowDl(true);
    }
  }, []);

  let largeView = false;
  let sideMenu = false;
  // if we have a wide screen size
  if(width > 760) {
    largeView = true;
    // if the screen size is too short
    if(height < 680) sideMenu = true;
  } // if we have a normal/small screen size
  else {
    // if the screen size is too short
    if(height < 630) sideMenu = true;
  }
  // don't switch to side menu if there's no horizontal room
  if(width < 550) {
    sideMenu = false;
  }

  return(
    <React.Fragment>

      { showDl ? <DownloadAppPopup onClose={() => setShowDl(false)} /> : null }

      <div className={`centered ${sideMenu ? 'flex-row' : 'flex-column'}`}>

        <Viewport largeView={largeView} sideMenu={sideMenu}>

          <World largeView={largeView} />

          <DialogManager />

          {/* Show the floor counter when playing endless mode */}
          { gameMode === 'endless' ? <EndlessFloorCounter floor={floorNum} /> : null }

        </Viewport>

        <GameMenus sideMenu={sideMenu} />

      </div>

      { mobileVersion ? null : <Footer /> }

    </React.Fragment>
  );
}

const mapStateToProps = ({ appState, world }) => ({ appState, world });

export default connect(mapStateToProps)(App);
