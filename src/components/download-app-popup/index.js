import React from 'react';

import store from '../../config/store';

import './styles.scss';

// - [ ] android https://play.google.com/store/apps/details?id=com.reactrpgnative
// - [ ] ios https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1450907766&mt=8

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
          {'React RPG is also available on mobile!'}
        </span>

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