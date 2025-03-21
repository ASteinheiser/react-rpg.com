import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import Dialog from '../../../../components/dialog';
import randomPhrase from './random-phrase';
import resetGameState from '../../../world/actions/reset-game-state';

import './styles.scss';
import { ENTER_KEY } from '../../../../config/constants';

class GameOver extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phrase: randomPhrase(),
            ready: false,
        };
    }

    componentDidMount() {
        // delay the new game button for 1 second to prevent
        // accidental click during double click on mobile
        this.props.setTimeout(() => {
            this.setState({ ready: true });
        }, 1000);
    }

    render() {
        const { phrase, ready } = this.state;
        const { resetGameState, dialog } = this.props;
        const { entity, from } = dialog.diedFrom;

        const { characterName } = dialog.character;

        return (
            <Dialog keys={[ENTER_KEY]} onKeyPress={resetGameState}>
                <span className="game-over__title">{'Game Over!'}</span>

                <span className="game-over__text">{phrase}</span>

                <p className="game-over__text">
                    Here lies the grave of{' '}
                    <span className="game-over__player">
                        {characterName.length <= 11
                            ? characterName
                            : characterName.substr(0, 9) + '...'}
                    </span>
                    .{' '}
                    {entity ? (
                        <>
                            They were slain by a mighty{' '}
                            <span className="game-over__killer">{entity}</span>
                        </>
                    ) : (
                        <>
                            <span className="game-over__killer">{from}</span>{' '}
                            did them in.
                        </>
                    )}
                </p>

                <div className="game-over__button">
                    <Button
                        onClick={ready && resetGameState}
                        title={'New Game'}
                        icon="sync"
                    />
                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = ({ dialog }) => ({ dialog });
const actions = { resetGameState };

export default connect(mapStateToProps, actions)(ReactTimeout(GameOver));
