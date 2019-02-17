import React, { useState, useEffect } from 'react';
import Sound                          from 'react-sound';

import store        from '../../../config/store';
import AmbientMusic from './ambient-music.mp3';

import './styles.scss';

const GameMusic = ({ sideMenu }) => {

  const [gameMusic, setGameMusic] = useState(null);

  useEffect(() => {
    window.addEventListener('mousedown', handleKeyPress);
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('mousedown', handleKeyPress);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    }
  }, []); // we pass empty array as the second param to make this only call on mount and not on any updates

  function handleKeyPress() {
    // we have to load music only have user has clicked or pressed a key
    // chrome disables auto play until user has interacted with window
    setGameMusic(
      <Sound
        url={AmbientMusic}
        playStatus={'PLAYING'}
        autoLoad={true}
        loop={true}
        volume={50} />
    );
    store.dispatch({
      type: 'SET_SOUND',
      payload: true
    });
    // now we no longer need our key or mouse event listeners
    window.removeEventListener('mousedown', handleKeyPress);
    window.removeEventListener('keydown', handleKeyPress);
  }

  function toggleMusic() {
    if(gameMusic) {
      turnOffSound();
    } else {
      turnOnSound();
    }
  }

  function handleFocus() {
    turnOnSound();
  }

  function handleBlur() {
    turnOffSound();
  }

  function turnOffSound() {
    setGameMusic(null);
    store.dispatch({
      type: 'SET_SOUND',
      payload: false
    });
  }

  function turnOnSound() {
    setGameMusic(
      <Sound
        url={AmbientMusic}
        playStatus={'PLAYING'}
        autoLoad={true}
        loop={true}
        volume={50} />
    );
    store.dispatch({
      type: 'SET_SOUND',
      payload: true
    });
  }

  return (
    <button className='game-music__button white-border'
      onClick={toggleMusic}
      style={{ marginTop: sideMenu ? 0 : 10 }}>

      <div className='game-music__diagonal-line--1'
        style={{
          width: gameMusic ? 0 : 57,
          top: gameMusic ? 0 : 18,
          left: gameMusic ? 0 : -7
        }}>
      </div>
      <div className='game-music__diagonal-line--2'
        style={{
          width: gameMusic ? 0 : 57,
          top: gameMusic ? 0 : 18,
          right: gameMusic ? 0 : -7
        }}>
      </div>

      <i className={`fa fa-${gameMusic ? 'volume-up' : 'volume-off'} game-music__icon`} />

      { gameMusic }

    </button>
  );
}

export default GameMusic;
