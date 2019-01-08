import React from 'react';

import packageJson from '../../../package.json';

import './styles.css';

const Footer = (props) => {
  return(
    <div className='footer-container'>
      <span>
        {`Made with ♥ by Andrew Steinheiser - v${packageJson.version} - `}
      </span>

      <a href='https://github.com/ASteinheiser/react-rpg.com'
        target='_blank'
        rel='noopener noreferrer'>
        {'View Source'}
      </a>

    </div>
  );
}

export default Footer;