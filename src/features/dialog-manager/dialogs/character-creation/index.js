import React from 'react';
import { connect } from 'react-redux';

import SelectButtonGroup from '../../../../components/select-button-group';
import Button from '../../../../components/button';
import Dialog from '../../../../components/dialog';
import createCharacter from './actions/create-character';
import setClass from './actions/set-class';
import setRace from './actions/set-race';

import './styles.scss';

const CharacterCreation = ({ dialog, createCharacter, setClass, setRace }) => {
    function handleContinue() {
        dialog.character.characterName = document.getElementById(
            'characterName'
        ).value;
        createCharacter();
    }

    return (
        <Dialog onKeyPress={handleContinue}>
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
            </div>
        </Dialog>
    );
};

const mapStateToProps = ({ dialog }) => ({ dialog });
const actions = { createCharacter, setClass, setRace };

export default connect(mapStateToProps, actions)(CharacterCreation);
