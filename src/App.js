import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import DialogManager from './features/dialog-manager';
import EndlessFloorCounter from './components/endless-floor-counter';
import Footer from './components/footer';
import GameMenus from './features/game-menus';
import World from './features/world';
import Viewport from './components/viewport';
import useGameViewportScaling from './features/app-state/actions/use-game-viewport-scaling';
import Spellbook from './features/spellbook';

const App = ({ appState, world }) => {
    useGameViewportScaling();

    // disable scrolling of the page
    // prevents iOS Safari bouncing during movement
    useEffect(() => {
        disableBodyScroll(document.getElementById('roll-for-reaction'));
        return clearAllBodyScrollLocks;
    }, []);

    const { sideMenu } = appState;
    const { gameMode, floorNum } = world;

    let showFooter = true;

    const nativeApp = window.location.search === '?nativeApp=true';
    // don't show the footer if on a mobile device
    // or using the native app query param
    if (nativeApp || isMobile) {
        showFooter = false;
    }

    return (
        <>
            <div
                className={`centered ${sideMenu ? 'flex-row' : 'flex-column'}`}
            >
                <Viewport>
                    <World />
                    <DialogManager />
                    <Spellbook />

                    {/* Show the floor counter when playing endless mode */}
                    {gameMode === 'endless' && (
                        <EndlessFloorCounter floor={floorNum} />
                    )}
                </Viewport>

                <GameMenus />
            </div>

            {showFooter && <Footer />}
        </>
    );
};

const mapStateToProps = ({ appState, world }) => ({ appState, world });

export default connect(mapStateToProps)(App);
