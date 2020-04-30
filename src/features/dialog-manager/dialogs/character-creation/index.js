import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import SelectButtonGroup from '../../../../components/select-button-group';
import Button from '../../../../components/button';
import Dialog from '../../../../components/dialog';
import errorMessage from '../../actions/error-message';
import createCharacter from './actions/create-character';
import setClass from './actions/set-class';
import setRace from './actions/set-race';
import mainGameDialog from '../../actions/main-game-dialog';
import endlessGameDialog from '../../actions/endless-game-dialog';

import './styles.scss';
import { ESC_KEY, ENTER_KEY } from '../../../../config/constants';

const CharacterCreation = ({
    dialog,
    createCharacter,
    errorMessage,
    setClass,
    setRace,
    mainGameDialog,
    endlessGameDialog,
}) => {
    const [characterName, setCharacterName] = useState(
        dialog.character.characterName
    );

    function handleContinue() {
        if (characterName) {
            createCharacter(characterName);
        } else {
            errorMessage('Please enter a name');
        }
    }

    const continueRef = useRef(null);

    return (
        <Dialog
            keys={[ENTER_KEY, ESC_KEY]}
            onKeyPress={key => {
                if (key === ENTER_KEY) {
                    // For whatever reason, we have to use a ref othwerwise the component isn't updated correctly
                    continueRef.current.click();
                } else if (key === ESC_KEY) {
                    if (dialog.gameType === 'endless') {
                        endlessGameDialog();
                    } else {
                        mainGameDialog();
                    }
                }
            }}
            goBack={() => {
                if (dialog.gameType === 'endless') {
                    endlessGameDialog();
                } else {
                    mainGameDialog();
                }
            }}
        >
            <div className="character-creation__title">
                {'Character Creation'}
            </div>

            <div className="character-creation__text">
                <span style={{ paddingBottom: '0.5em' }}>
                    {`Your Character's Name`}
                </span>

                <input
                    name="Character name"
                    type="text"
                    maxLength="512"
                    id="characterName"
                    className="white-border character-creation__input"
                    value={characterName}
                    onChange={event =>
                        setCharacterName(event.target.value.trim())
                    }
                />

                <span style={{ paddingTop: 12 }}>{`Your Race`}</span>
                <div className="container space-around">
                    <SelectButtonGroup
                        values={['Human', 'Elf', 'Dwarf']}
                        select={value =>
                            value === dialog.character.characterRace
                        }
                        onClick={setRace}
                    />
                </div>

                <span style={{ paddingTop: 12 }}>{`Your Class`}</span>
                <div className="container space-around">
                    <SelectButtonGroup
                        values={['Fighter', 'Wizard', 'Ranger']}
                        select={value =>
                            value === dialog.character.characterClass
                        }
                        onClick={setClass}
                    />
                </div>
            </div>

            <div className="flex-column character-creation__button">
                <Button onClick={handleContinue} title={'Continue'} />
                <button
                    ref={continueRef}
                    style={{ display: 'none' }}
                    onClick={handleContinue}
                />
            </div>
        </Dialog>
    );
};

const mapStateToProps = ({ dialog }) => ({ dialog });
const actions = {
    createCharacter,
    errorMessage,
    setClass,
    setRace,
    mainGameDialog,
    endlessGameDialog,
};

export default connect(mapStateToProps, actions)(CharacterCreation);
