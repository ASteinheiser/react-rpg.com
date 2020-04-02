import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import MicroDialog from '../../../../components/micro-dialog';
import pickupItem from '../../../inventory/actions/pickup-item';
import openChest from '../../actions/open-chest';
import closeChestDialog from '../../actions/close-chest-dialog';

import './styles.scss';

const ChestLoot = ({ dialog, pickupItem, openChest, closeChestDialog }) => {
    const { chestOpen } = dialog;
    const { gold, exp, item } = chestOpen;

    useEffect(() => {
        if (!chestOpen) openChest();
    }, []);

    function handleContinue() {
        // Do it this way so this dialog is closed first
        closeChestDialog();
        // ... before we actually give them their items, which allows
        //     the level up dialog to occur after this dialog.
        pickupItem();
    }

    return (
        <MicroDialog onClose={closeChestDialog} onKeyPress={handleContinue}>
            <span className="chest-loot__title">{'Chest Loot!'}</span>

            <div className="flex-column chest-loot__contents">
                {gold !== 0 && (
                    <div className="flex-row chest-loot__value--spacing">
                        <span>{'Gold: '}</span>
                        <span>{gold}</span>
                    </div>
                )}

                {exp !== 0 && (
                    <div className="flex-row chest-loot__value--spacing">
                        <span>{'Exp: '}</span>
                        <span>{exp}</span>
                    </div>
                )}

                {item && (
                    <div className="flex-row chest-loot__item">
                        <div
                            style={{
                                backgroundImage: `url('${item.image}')`,
                                width: '40px',
                                height: '40px',
                            }}
                        />
                        <span className="flex-column chest-loot__item-name">
                            {item.name}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-column chest-loot__buttons">
                <Button
                    onClick={handleContinue}
                    title={item ? 'Pick Up' : 'Continue'}
                    icon={item ? 'hand-paper' : 'check'}
                />
            </div>
        </MicroDialog>
    );
};

const mapStateToProps = ({ dialog }) => ({ dialog });

const actions = { pickupItem, openChest, closeChestDialog };

export default connect(mapStateToProps, actions)(ChestLoot);
