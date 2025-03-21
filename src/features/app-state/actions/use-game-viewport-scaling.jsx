import { useEffect } from 'react';
import _debounce from 'lodash.debounce';

import store from '../../../config/store';
import useWindowSize from '../../../utils/use-window-size';
import { isMobile } from 'react-device-detect';
import {
    SCREEN_SMALL_WIDTH,
    SCREEN_SMALL_HEIGHT,
    SCREEN_MEDIUM_WIDTH,
    SCREEN_MEDIUM_HEIGHT,
    MIN_WIDTH_FOR_JOURNAL,
    MIN_SIDESCREEN_WIDTH_FOR_JOURNAL,
} from '../../../config/constants';

const VIEWPORT_RESIZE_RATE = 250;

// This function is both a React Hook and a Redux Action
const useGameViewportScaling = () => {
    const { height, width } = useWindowSize();

    const nativeApp = window.location.search === '?nativeApp=true';
    const _updateViewportScale = _debounce(
        updateViewportScale,
        VIEWPORT_RESIZE_RATE
    );

    useEffect(() => {
        let largeView = false;
        let sideMenu = false;
        let journalSideMenu = false;
        // if we have a wide screen size
        if (width > SCREEN_SMALL_WIDTH) {
            largeView = true;
            // if the screen size is too short
            if (height < SCREEN_MEDIUM_HEIGHT) sideMenu = true;
            if (height <= SCREEN_SMALL_HEIGHT) largeView = false;
        }
        // don't switch to side menu if there's no horizontal room
        if (width < SCREEN_MEDIUM_WIDTH) {
            sideMenu = false;
        }
        if (!(isMobile || nativeApp)) {
            if (sideMenu) {
                if (width > MIN_SIDESCREEN_WIDTH_FOR_JOURNAL)
                    journalSideMenu = true;
            } else {
                if (width > MIN_WIDTH_FOR_JOURNAL) journalSideMenu = true;
            }
        }

        _updateViewportScale({ largeView, sideMenu, journalSideMenu });
    }, [height, width]);

    function updateViewportScale({ largeView, sideMenu, journalSideMenu }) {
        store.dispatch({
            type: 'SET_SIDE_MENU',
            payload: sideMenu,
        });
        store.dispatch({
            type: 'SET_LARGE_VIEW',
            payload: largeView,
        });
        store.dispatch({
            type: 'SET_SHOW_JOURNAL',
            payload: journalSideMenu,
        });

        const { paused, journalDialog } = store.getState().dialog;
        if (journalSideMenu && paused && journalDialog) {
            store.dispatch({
                type: 'PAUSE',
                payload: { pause: false, journal: false },
            });
        }
    }
};

export default useGameViewportScaling;
