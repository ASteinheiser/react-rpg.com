import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import optOutDownload from '../../features/app-state/actions/opt-out-download';
import iosStore       from './assets/ios-store.png';
import androidStore   from './assets/android-store.png';

import './styles.scss';

const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.reactrpgnative';
const IOS_URL = 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1450907766&mt=8';

const DownloadAppPopup = ({ onClose, optOutDownload, open }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setReady(true), 5000);
    }
  }, [open]);

  function handleOptOutDownload() {
    optOutDownload();
    onClose();
  }

  if(!open || !ready) return null;

  return(
    <div className='download-app__container'>

      <div onClick={onClose} className='background-close' />

      <div className='download-app__box white-border'>

        <span className='download-app__title'>
          {'React RPG is now on iOS and Android!'}
        </span>

        <div className='download-app__buttons'>

          <a href={IOS_URL} target='_blank' rel='noopener noreferrer'>
            <img className='ios-icon' src={iosStore} alt='ios-store' />
          </a>

          <a href={ANDROID_URL} target='_blank' rel='noopener noreferrer'>
            <img className='android-icon' src={androidStore} alt='android-store' />
          </a>

        </div>

        <div className='flex-row space-between'>
          <button className='close-option' onClick={handleOptOutDownload}>
            {`Don't show again`}
          </button>

          <button className='close-option' onClick={onClose}>
            {`Close`}
          </button>
        </div>

      </div>

    </div>
  );
};

export default connect(null, { optOutDownload })(DownloadAppPopup);