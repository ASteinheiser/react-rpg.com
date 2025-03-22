import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import Dialog from '../../../../components/dialog';
import resetGameState from '../../../world/actions/reset-game-state';
import closeDialog from '../../actions/close-dialog';

import './styles.scss';

const GameWin = ({ monsters, resetGameState, closeDialog }) => {
    const { components } = monsters;
    let numMonstersRemain = 0;
    // get total monsters by map
    Object.keys(components).forEach(mapId => {
        numMonstersRemain += Object.keys(components[mapId]).length;
    });

    return (
        <Dialog>
            <span className="flex-column game-win__title">
                {'Congratulations on reaching the sword!'}
            </span>
            <span className="flex-column game-win__text">
                {
                    'The old sword speaks: "Greetings warrior! I cannot thank you enough for freeing me from the evil spirits. Now I may finally rest..."'
                }
            </span>
            {numMonstersRemain ? (
                <span className="flex-column game-win__text">
                    {`${numMonstersRemain} monster${
                        numMonstersRemain === 1 ? '' : 's'
                    } escaped your wrath`}
                </span>
            ) : (
                <span className="flex-column game-win__text">
                    {`You killed all of the monsters!`}
                </span>
            )}

            <div className="flex-row game-win__button">
                <Button onClick={closeDialog} icon="reply" title={'Return'} />
                <Button
                    onClick={resetGameState}
                    icon="sync"
                    title={'Play Again'}
                />
            </div>
        </Dialog>
    );
};

const mapStateToProps = ({ monsters }) => ({ monsters });

const actions = { resetGameState, closeDialog };

export default connect(mapStateToProps, actions)(GameWin);
