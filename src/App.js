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

const App = ({ appState, world }) => {

  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  let mobileVersion = false;

  const nativeApp = window.location.search === '?nativeApp=true';

  if(nativeApp || isMobile) {
    mobileVersion = true;
  }

  const { optOutDownload } = appState;
  const { gameMode, floorNum } = world;
  const { height, width } = useWindowSize();

  // disable scrolling of the page
  // prevents iOS Safari bouncing during movement
  useEffect(() => {
    disableBodyScroll(document.getElementById('root'));
    return clearAllBodyScrollLocks;
  }, []);

  // if this is not the react native app and they haven't opted out,
  // show the user a dialog to download the app
  useEffect(() => {
    if(!nativeApp && !optOutDownload) {
      setShowDownloadPopup(true);
    }
  }, []);

  let largeView = false;
  let sideMenu = false;
  // if we have a wide screen size
  if(width > 410) {
    largeView = true;
    // if the screen size is too short
    if(height < 680) sideMenu = true;
    if(height <= 410) largeView = false;
  }
  // don't switch to side menu if there's no horizontal room
  if(width < 600) {
    sideMenu = false;
  }

  return(
    <>
      { showDownloadPopup && <DownloadAppPopup onClose={() => setShowDownloadPopup(false)} /> }

      <div className={`centered ${sideMenu ? 'flex-row' : 'flex-column'}`}>

        <Viewport largeView={largeView} sideMenu={sideMenu}>

          <World largeView={largeView} />

          <DialogManager />

          {/* Show the floor counter when playing endless mode */}
          { gameMode === 'endless' && <EndlessFloorCounter floor={floorNum} /> }

        </Viewport>

        <GameMenus sideMenu={sideMenu} largeView={largeView} />

      </div>

      { !mobileVersion && <Footer /> }
    </>
  );
}

const mapStateToProps = ({ appState, world }) => ({ appState, world });

export default connect(mapStateToProps)(App);
