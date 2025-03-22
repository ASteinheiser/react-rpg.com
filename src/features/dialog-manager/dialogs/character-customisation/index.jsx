import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import Dialog from '../../../../components/dialog';
import Character from './character';
import finishCustomisation from './actions/finish-customisation';

import setHairColour from './actions/set-hair-colour';
import setEyeColour from './actions/set-eye-colour';
import setSkinColour from './actions/set-skin-colour';
import setArmourColour from './actions/set-armour-colour';
import setClothesColour from './actions/set-clothes-colour';
import backToCharacterCreation from '../../actions/back-to-character-creation';

import SelectColour from '../../../../components/select-colour';

import './styles.scss';
import { ENTER_KEY, ESC_KEY } from '../../../../config/constants';

const CharacterCustomisation = ({
    dialog,
    finishCustomisation,
    setHairColour,
    setEyeColour,
    setSkinColour,
    setArmourColour,
    setClothesColour,
    backToCharacterCreation,
}) => {
    const {
        hairColour,
        eyeColour,
        skinColour,
        armourColour,
        clothesColour,
    } = dialog.appearance;

    return (
        <>
            <Dialog
                keys={[ENTER_KEY, ESC_KEY]}
                onKeyPress={key => {
                    if (key === ENTER_KEY) {
                        finishCustomisation();
                    } else {
                        backToCharacterCreation();
                    }
                }}
                goBack={backToCharacterCreation}
            >
                <div className="flex-column character-customisation__container">
                    <div className="flex-column character-customisation__title">
                        Customise Character
                    </div>
                    <Character
                        hairColour={hairColour}
                        eyeColour={eyeColour}
                        skinColour={skinColour}
                        armourColour={armourColour}
                        clothesColour={clothesColour}
                    />
                    <div className="flex-column character-customisation__options-container">
                        <SelectColour name="Hair" onChange={setHairColour} />
                        <SelectColour name="Skin" onChange={setSkinColour} />
                        <SelectColour
                            name="Armour"
                            onChange={setArmourColour}
                        />
                        <SelectColour
                            name="Clothes"
                            onChange={setClothesColour}
                        />
                    </div>
                    <Button
                        title="Continue"
                        onClick={finishCustomisation}
                        small={true}
                        icon="angle-double-right"
                    />
                </div>
            </Dialog>
        </>
    );
};

const mapStateToProps = ({ dialog }) => ({ dialog });

const actions = {
    finishCustomisation,
    setHairColour,
    setEyeColour,
    setSkinColour,
    setArmourColour,
    setClothesColour,
    backToCharacterCreation,
};

export default connect(mapStateToProps, actions)(CharacterCustomisation);
