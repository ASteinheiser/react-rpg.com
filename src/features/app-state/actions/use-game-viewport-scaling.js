import { useEffect } from 'react';
import _debounce     from 'lodash.debounce';

import store         from '../../../config/store';
import useWindowSize from '../../../utils/use-window-size';
import {
  SCREEN_SMALL_WIDTH,
  SCREEN_SMALL_HEIGHT,
  SCREEN_MEDIUM_WIDTH,
  SCREEN_MEDIUM_HEIGHT
} from '../../../config/constants';

const VIEWPORT_RESIZE_RATE = 250;

// This function is both a React Hook and a Redux Action
const useGameViewportScaling = () => {

  const { height, width } = useWindowSize();

  const _updateViewportScale = _debounce(updateViewportScale, VIEWPORT_RESIZE_RATE);

  useEffect(() => {
    let largeView = false;
    let sideMenu = false;
    // if we have a wide screen size
    if(width > SCREEN_SMALL_WIDTH) {
      largeView = true;
      // if the screen size is too short
      if(height < SCREEN_MEDIUM_HEIGHT) sideMenu = true;
      if(height <= SCREEN_SMALL_HEIGHT) largeView = false;
    }
    // don't switch to side menu if there's no horizontal room
    if(width < SCREEN_MEDIUM_WIDTH) {
      sideMenu = false;
    }

    _updateViewportScale({ largeView, sideMenu });

  }, [height, width]);

  function updateViewportScale({ largeView, sideMenu }) {
    store.dispatch({
      type: 'SET_SIDE_MENU',
      payload: sideMenu
    });
    store.dispatch({
      type: 'SET_LARGE_VIEW',
      payload: largeView
    });
  }
};

export default useGameViewportScaling;