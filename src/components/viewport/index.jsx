import React from 'react';
import { connect } from 'react-redux';

import {
    GAME_VIEWPORT_SIZE,
    GAME_VIEWPORT_SIZE_LG,
} from '../../config/constants';

import './viewport.scss';

const Viewport = ({ appState, children }) => {
    const { largeView, sideMenu } = appState;

    const gameSize = largeView ? GAME_VIEWPORT_SIZE_LG : GAME_VIEWPORT_SIZE;
    const margin = sideMenu ? '8px 0 0' : '8px auto 0';

    const styles = {
        width: gameSize,
        height: gameSize,
        margin,
    };

    return (
        <div style={styles} className="viewport__container white-border">
            {children}
        </div>
    );
};

const mapStateToProps = ({ appState }) => ({ appState });

export default connect(mapStateToProps)(Viewport);
