import React from 'react';

import packageJson from '../../../package.json';

import './styles.scss';

const Footer = () => {
  return(
    <div className='footer__container'>

      {`Made with ♥ by Andrew Steinheiser - v${packageJson.version} - `}

      <a className='footer__link'
        href='https://github.com/ASteinheiser/react-rpg.com'
        target='_blank'
        rel='noopener noreferrer'>
        {'View Source'}
      </a>

    </div>
  );
}

export default Footer;