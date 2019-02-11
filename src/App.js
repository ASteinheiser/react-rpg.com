import React, { useEffect, useState }                 from 'react';
import { connect }                                    from 'react-redux';
import { isMobile }                                   from 'react-device-detect';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import DownloadAppPopup       from './components/download-app-popup';
import DialogManager          from './features/dialog-manager';
import EndlessFloorCounter    from './components/endless-floor-counter';
import Footer                 from './components/footer';
import GameMenus              from './features/game-menus';
import World                  from './features/world';
import Viewport               from './components/viewport';
import useGameViewportScaling from './features/app-state/use-game-viewport-scaling';

const App = ({ appState, world }) => {

  useGameViewportScaling();

  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  let showFooter = true;

  const nativeApp = window.location.search === '?nativeApp=true';
  // don't show the footer if on a mobile device
  // or using the native app query param
  if(nativeApp || isMobile) {
    showFooter = false;
  }

  const { optOutDownload, sideMenu } = appState;
  const { gameMode, floorNum } = world;

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

  return(
    <>
      { showDownloadPopup && <DownloadAppPopup onClose={() => setShowDownloadPopup(false)} /> }

      <div className={`centered ${sideMenu ? 'flex-row' : 'flex-column'}`}>

        <Viewport>

          <World />

          <DialogManager />

          {/* Show the floor counter when playing endless mode */}
          { gameMode === 'endless' && <EndlessFloorCounter floor={floorNum} /> }

        </Viewport>

        <GameMenus />

      </div>

      { showFooter && <Footer /> }
    </>
  );
}

const mapStateToProps = ({ appState, world }) => ({ appState, world });

export default connect(mapStateToProps)(App);
