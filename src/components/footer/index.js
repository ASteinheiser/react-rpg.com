import React from 'react';

import { version } from '../../../package.json';

import './styles.scss';

const Footer = () => {
  return(
    <div className='footer__container'>

      <span>{`Made with ♥ by Andrew Steinheiser - v${version} - `}</span>

      <a className='footer__link'
        href='https://github.com/ASteinheiser/react-rpg.com'
        target='_blank'
        rel='noopener noreferrer'>
        {'View Source'}
      </a>

    </div>
  );
};

export default Footer;