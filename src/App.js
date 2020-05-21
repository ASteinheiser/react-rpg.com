import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import DialogManager from './features/dialog-manager';
import FloorCounter from './components/floor-counter';
import Footer from './components/footer';
import GameMenus from './features/game-menus';
import World from './features/world';
import Viewport from './components/viewport';
import useGameViewportScaling from './features/app-state/actions/use-game-viewport-scaling';
import Spellbook from './features/spellbook';
import Tutorial from './features/tutorial';
import Abilities from './features/abilities';

import JournalSide from './components/journal-side';

const App = ({ appState, world, dialog }) => {
    useGameViewportScaling();

    // disable scrolling of the page
    // prevents iOS Safari bouncing during movement
    useEffect(() => {
        disableBodyScroll(document.getElementById('roll-for-reaction'));
        return clearAllBodyScrollLocks;
    }, []);

    const { sideMenu, journalSideMenu } = appState;
    const { gameMode, floorNum, currentMap } = world;
    const { gameStart, gameOver, journalSideMenuOpen } = dialog;

    const disableJournal =
        gameStart || gameOver || !journalSideMenu || !journalSideMenuOpen;

    let showFooter = true;

    const nativeApp = window.location.search === '?nativeApp=true';
    // don't show the footer if on a mobile device
    // or using the native app query param
    if (nativeApp || isMobile) {
        showFooter = false;
    }

    if (sideMenu) {
        return (
            <>
                <div className={`centered flex-row`}>
                    <JournalSide disabled={disableJournal} />
                    <div
                        className={`centered ${
                            sideMenu ? 'flex-row' : 'flex-column'
                        }`}
                    >
                        <div className={'centered flex-row'}>
                            <Viewport>
                                <World />
                                <DialogManager />
                                <Tutorial />
                                <Abilities />
                                <Spellbook />

                                {gameMode === 'endless' ? (
                                    <FloorCounter floor={floorNum} />
                                ) : (
                                    currentMap && (
                                        <FloorCounter
                                            floor={currentMap.replace('_', '-')}
                                        />
                                    )
                                )}
                            </Viewport>
                        </div>

                        <GameMenus />
                    </div>
                </div>
                {showFooter && <Footer />}
            </>
        );
    }

    return (
        <>
            <div
                style={{
                    float: 'left',
                    marginLeft: '100px',
                    marginRight: '-300px',
                    display: disableJournal ? 'none' : 'block',
                }}
            >
                <JournalSide disabled={disableJournal} />
            </div>
            <div className={`centered flex-row`}>
                <div
                    className={`centered ${
                        sideMenu ? 'flex-row' : 'flex-column'
                    }`}
                >
                    <div className={'centered flex-row'}>
                        <Viewport>
                            <World />
                            <DialogManager />
                            <Tutorial />
                            <Abilities />
                            <Spellbook />

                            {gameMode === 'endless' ? (
                                <FloorCounter floor={floorNum} />
                            ) : (
                                currentMap && (
                                    <FloorCounter
                                        floor={currentMap.replace('_', '-')}
                                    />
                                )
                            )}
                        </Viewport>
                    </div>

                    <GameMenus />
                </div>
            </div>
            {showFooter && <Footer />}
        </>
    );
};

const mapStateToProps = ({ appState, world, dialog }) => ({
    appState,
    world,
    dialog,
});

export default connect(mapStateToProps)(App);
