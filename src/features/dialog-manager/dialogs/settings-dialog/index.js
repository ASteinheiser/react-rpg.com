import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Dialog from '../../../../components/dialog';
import closeSettings from '../../actions/close-settings';
import resetGameState from '../../../world/actions/reset-game-state';

import './settings-dialog.scss';

const SettingsDialog = ({ state, resetGameState, closeSettings }) => {
    const [confirmQuit, setConfirmQuit] = useState(false);

    const saveGame = () => {
        const blob = new Blob([JSON.stringify(state)]);
        const filename = state.dialog.character.characterName + '.json';

        if (window.navigator.msSaveBlob) {
            // Internet Explorer/Edge
            window.navigator.msSaveBlob(blob, filename);
        } else {
            // Chrome/Firefox
            const save = document.getElementById('save-game-dialog');
            const url = window.URL.createObjectURL(blob, {
                type: 'octet/stream',
            });
            save.href = url;
            save.download = filename;
            save.click();
            window.URL.revokeObjectURL(url);
        }
    };

    const playerCreated =
        state.dialog.character.characterName ||
        state.dialog.character.characterName.length > 0;

    return (
        <Dialog>
            <div className="flex-column settings-dialog__container">
                <span className="settings-dialog__title">{'Settings'}</span>

                <Button
                    onClick={() => setConfirmQuit(true)}
                    icon="caret-square-left"
                    title="Return to Menu"
                />

                {playerCreated && (
                    <>
                        <Button
                            onClick={saveGame}
                            icon="save"
                            title="Save Game"
                        />
                        <a
                            href="#save"
                            id="save-game-dialog"
                            style={{ display: 'none' }}
                        >
                            Save
                        </a>
                    </>
                )}

                <Button onClick={closeSettings} icon="times" title="Close" />
            </div>

            <ConfirmDialog
                open={confirmQuit}
                text="Are you sure you want to quit? You will lose all progress..."
                onClose={() => setConfirmQuit(false)}
                confirm={resetGameState}
            />
        </Dialog>
    );
};

const mapStateToProps = state => ({
    state,
});
const actions = { resetGameState, closeSettings };

export default connect(mapStateToProps, actions)(SettingsDialog);
