import React from 'react';
import { connect } from 'react-redux';

import Dialog from '../../../../components/dialog';
import Button from '../../../../components/button';
import spells from '../../../../data/spells';
import setActiveSpell from '../../actions/set-active-spell';
import { B_KEY } from '../../../../config/constants';
import toggleSpellbookDialog from '../../actions/toggle-spellbook-dialog';

import './styles.scss';

const SpellbookDialog = ({ player, setActiveSpell, toggleSpellbookDialog }) => {
    return (
        <Dialog keys={[B_KEY]} onKeyPress={toggleSpellbookDialog}>
            <span className="spellbook-dialog__title">{'Spellbook'}</span>
            {spells.map(spell => (
                <div
                    key={spell.name}
                    className={`spellbook-spell ${
                        player.spell !== null &&
                        player.spell.name === spell.name
                            ? 'selected-spell'
                            : ''
                    }`}
                >
                    <Button
                        title={spell.name}
                        onClick={() => setActiveSpell(spell)}
                    />
                </div>
            ))}
        </Dialog>
    );
};

const mapStateToProps = ({ player }) => ({ player });
const actions = { setActiveSpell, toggleSpellbookDialog };

export default connect(mapStateToProps, actions)(SpellbookDialog);
