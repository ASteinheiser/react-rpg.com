import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/button';
import abilityScoreDialog from '../dialog-manager/actions/ability-score-dialog';

import './styles.scss';

const Abilities = ({ abilityScoreDialog }) => {
    return (
        <div className={'abilities__container'}>
            <Button
                title=" "
                icon="angle-double-up"
                onClick={() => abilityScoreDialog(false)}
                tiny
            ></Button>
        </div>
    );
};

//const mapStateToProps = ({}) => ({});
const actions = { abilityScoreDialog };

export default connect(null, actions)(Abilities);
