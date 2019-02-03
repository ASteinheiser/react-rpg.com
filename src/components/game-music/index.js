import React, { useState, useEffect } from 'react';
import Sound                          from 'react-sound';

import store        from '../../config/store';
import AmbientMusic from './ambient-music.mp3';

import './styles.scss';

const GameMusic = (props) => {

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
      payload: { sound: true }
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

  function handleFocus(e) {
    turnOnSound();
  }

  function handleBlur(e) {
    turnOffSound();
  }

  function turnOffSound() {
    setGameMusic(null);
    store.dispatch({
      type: 'SET_SOUND',
      payload: { sound: false }
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
      payload: { sound: true }
    });
  }

  return (
    <div className='game-music-toggle-button white-border'
      onClick={toggleMusic}
      style={{ marginTop: props.sideMenu ? 0 : 10 }}>

      <div className='line1'
        style={{
          width: gameMusic ? 0 : 60,
          top: gameMusic ? 0 : 19,
          left: gameMusic ? 0 : -7
        }}>
      </div>
      <div className='line2'
        style={{
          width: gameMusic ? 0 : 60,
          top: gameMusic ? 0 : 19,
          right: gameMusic ? 0 : -7
        }}>
      </div>

      <i className={`fa fa-${gameMusic ? 'volume-up' : 'volume-off'} game-music-button`} />

      { gameMusic }

    </div>
  );
}

export default GameMusic;
