import React, { useState } from 'react';
import { connect } from 'react-redux';

import Dialog from '../../../../components/dialog';
import SpellButtom from './spell-button';
import spells from '../../../../data/spells';
import { B_KEY, ESC_KEY } from '../../../../config/constants';
import toggleSpellbookDialog from '../../actions/toggle-spellbook-dialog';
import ViewItem from '../../../../components/view-item';

import './styles.scss';

const SpellbookDialog = ({ player, toggleSpellbookDialog }) => {
    const [viewSpell, setViewSpell] = useState(false);

    return (
        <Dialog keys={[B_KEY, ESC_KEY]} onKeyPress={toggleSpellbookDialog}>
            <ViewItem
                open={Boolean(viewSpell)}
                data={viewSpell}
                onClose={() => setViewSpell(false)}
            />
            <span className="spellbook-dialog__title">{'Spellbook'}</span>
            <div className="spellbook_dialog__container">
                {spells.map(spell => (
                    <div key={spell.name} className="spellbook-spell">
                        <SpellButtom
                            title={spell.name}
                            onClick={() => setViewSpell(spell)}
                            image={spell.image}
                            selected={
                                player.spell !== null &&
                                player.spell.name === spell.name
                            }
                        />
                    </div>
                ))}
            </div>
        </Dialog>
    );
};

const mapStateToProps = ({ player }) => ({ player });
const actions = { toggleSpellbookDialog };

export default connect(mapStateToProps, actions)(SpellbookDialog);
