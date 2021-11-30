import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/button';
import toggleTutorial from '../dialog-manager/actions/toggle-tutorial';

import './styles.scss';

const Tutorial = ({ toggleTutorial }) => {
    return (
        <div className={'tutorial__container'}>
            <Button
                title=" "
                icon="question-circle"
                onClick={toggleTutorial}
                tiny
            ></Button>
        </div>
    );
};

const actions = { toggleTutorial };

export default connect(null, actions)(Tutorial);
