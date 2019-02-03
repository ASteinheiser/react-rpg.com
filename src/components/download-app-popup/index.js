import React from 'react';

import store from '../../config/store';

import iosStore     from './ios-store.png';
import androidStore from './android-store.png';

import './styles.scss';

const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.reactrpgnative';
const IOS_URL = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1450907766&mt=8';

const DownloadAppPopup = (props) => {

  const { onClose } = props;

  function handleOptOut() {
    store.dispatch({
      type: 'OPT_OUT_DOWNLOAD',
      payload: {}
    });
    onClose();
  }

  return(
    <div className='download-app-container'>

      <div onClick={onClose} className='background-close' />

      <div className='download-app-box white-border'>
        <span>
          {'React RPG is now on iOS and Android!'}
        </span>

        <a href={IOS_URL} target='_blank' rel="noopener noreferrer">
          <img className='ios-store-icon' src={iosStore} alt='ios-store' />
        </a>

        <a href={ANDROID_URL} target='_blank' rel="noopener noreferrer">
          <img className='android-store-icon' src={androidStore} alt='android-store' />
        </a>

        <div className='flex-row space-between'>
          <div className='close-option' onClick={handleOptOut}>
            {`Don't show again`}
          </div>
          <div className='close-option' onClick={onClose}>
            {`Close`}
          </div>
        </div>
      </div>

    </div>
  );
}

export default DownloadAppPopup;