import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/button';
import toggleSpellbookDialog from '../dialog-manager/actions/toggle-spellbook-dialog';
import castSpell from '../player/actions/cast-spell';

import './styles.scss';

const Spellbook = ({ player, toggleSpellbookDialog, castSpell }) => {
    return (
        <div className={'spellbook__container'}>
            <Button
                title=" "
                icon="book-open"
                onClick={toggleSpellbookDialog}
                tiny
            ></Button>

            {player.spell && (
                <button
                    className={'white-border spell'}
                    style={{
                        backgroundImage: `url('${player.spell.image}')`,
                    }}
                    onClick={castSpell}
                ></button>
            )}
        </div>
    );
};

const mapStateToProps = ({ player }) => ({ player });
const actions = { toggleSpellbookDialog, castSpell };

export default connect(mapStateToProps, actions)(Spellbook);
