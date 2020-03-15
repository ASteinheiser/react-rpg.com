import React from 'react';

import { version } from '../../../package.json';

import './styles.scss';

const Footer = () => {
  return(
    <div className='footer__container'>

      <span>{`Adapted from React-RPG with ♥ by Matt Eden, Kimberley Evans-Parker, Josh Hill & Kelvin Ngor - v${version} - `}</span>

      <a className='footer__link'
        href='https://github.com/Matteas-Eden/roll-for-reaction'
        target='_blank'
        rel='noopener noreferrer'>
        {'View Source'}
      </a>

    </div>
  );
};

export default Footer;
