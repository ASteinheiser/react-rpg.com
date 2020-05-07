import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/button';
import toggleJournal from '../dialog-manager/actions/toggle-journal';

import './styles.scss';

const Journal = ({ disabled, sideMenu, dialog, toggleJournal }) => {
    const open = dialog.journalDialog;

    if (disabled) return null;

    return (
        <div className="flex-row journal__container">
            <Button
                small={sideMenu}
                onClick={toggleJournal}
                icon={open ? 'times' : 'book'}
                title={open ? 'Close' : 'Journal'}
                style={{
                    width: 160,
                    transition: 'width .25s ease-out',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    backgroundColor: 'var(--dark-gray)',
                }}
            />
        </div>
    );
};

const mapStateToProps = ({ dialog }) => ({ dialog });

const actions = { toggleJournal };

export default connect(mapStateToProps, actions)(Journal);
