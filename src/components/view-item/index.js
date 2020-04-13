import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../button';
import ConfirmDialog from '../confirm-dialog';
import EmptySlot from '../empty-slot';
import MicroDialog from '../micro-dialog';
import StatsItem from './stats-item';
import uuidv4 from '../../utils/uuid-v4';

import consumePotion from '../../features/inventory/actions/consume-potion';
import buyItem from '../../features/inventory/actions/buy-item';
import dropItem from '../../features/inventory/actions/drop-item';
import equipItem from '../../features/inventory/actions/equip-item';
import unequipItem from '../../features/inventory/actions/unequip-item';
import sellItem from '../../features/inventory/actions/sell-item';
import calculateModifier from '../../utils/calculate-modifier';
import calculateWisdomPotionBonus from '../../utils/calculate-wisdom-potion-bonus';

import './styles.scss';

const ViewItem = ({
    sell,
    buy,
    onClose,
    data,
    stats,
    unequipItem,
    buyItem,
    equipItem,
    dropItem,
    consumePotion,
    sellItem,
    open,
}) => {
    const [confirmPotion, setConfirmPotion] = useState(false);
    const [confirmDrop, setConfirmDrop] = useState(false);
    const [confirmSell, setConfirmSell] = useState(false);
    const [confirmBuy, setConfirmBuy] = useState(false);

    if (!open) return null;

    const itemStats = [];
    let itemIsEquipped = false;
    const equipped = stats.equippedItems;

    // find the type of item
    switch (data.type) {
        case 'upgrade::backpack':
            itemStats.push(
                <StatsItem
                    stats={{ name: 'slots', value: data.slots }}
                    key={uuidv4()}
                />
            );
            break;

        case 'potion':
            data.hp = data.hpReset;
            let potionRestore = calculateWisdomPotionBonus(
                data.hp,
                calculateModifier(stats.abilities.wisdom)
            );
            data.hp = potionRestore;
            itemStats.push(
                <StatsItem
                    stats={{ name: 'heal', value: potionRestore }}
                    key={uuidv4()}
                />
            );
            break;

        case 'weapon':
            itemIsEquipped =
                JSON.stringify(equipped.weapon) === JSON.stringify(data);
            itemStats.push(
                <StatsItem
                    stats={{ name: 'damage', value: data.damage }}
                    key={uuidv4()}
                />
            );
            // if there's a bonus
            if (data.bonus) {
                const [bonusType] = data.bonus.split('::');
                const bonusMult = parseFloat(data.bonus.split('::')[1], 10);
                itemStats.push(
                    <StatsItem
                        stats={{
                            name: `VS. ${bonusType}`,
                            value: `${bonusMult}x`,
                        }}
                        key={uuidv4()}
                    />
                );
            }
            break;

        case 'ring':
            itemIsEquipped =
                JSON.stringify(equipped.ring) === JSON.stringify(data);
            // find each effect
            Object.keys(data.effect).forEach(name => {
                itemStats.push(
                    <StatsItem
                        stats={{ name, value: data.effect[name] }}
                        key={uuidv4()}
                    />
                );
            });
            break;

        case 'armor::helmet':
            itemIsEquipped =
                equipped.armor &&
                JSON.stringify(equipped.armor.helmet) === JSON.stringify(data);
            itemStats.push(
                <StatsItem
                    stats={{ name: 'defence', value: data.defence }}
                    key={uuidv4()}
                />
            );
            break;

        case 'armor::body':
            itemIsEquipped =
                equipped.armor &&
                JSON.stringify(equipped.armor.body) === JSON.stringify(data);
            itemStats.push(
                <StatsItem
                    stats={{ name: 'defence', value: data.defence }}
                    key={uuidv4()}
                />
            );
            break;

        case 'armor::gloves':
            itemIsEquipped =
                equipped.armor &&
                JSON.stringify(equipped.armor.gloves) === JSON.stringify(data);
            itemStats.push(
                <StatsItem
                    stats={{ name: 'defence', value: data.defence }}
                    key={uuidv4()}
                />
            );
            break;

        case 'armor::boots':
            itemIsEquipped =
                equipped.armor &&
                JSON.stringify(equipped.armor.boots) === JSON.stringify(data);
            itemStats.push(
                <StatsItem
                    stats={{ name: 'defence', value: data.defence }}
                    key={uuidv4()}
                />
            );
            break;

        case 'armor::pants':
            itemIsEquipped =
                equipped.armor &&
                JSON.stringify(equipped.armor.pants) === JSON.stringify(data);
            itemStats.push(
                <StatsItem
                    stats={{ name: 'defence', value: data.defence }}
                    key={uuidv4()}
                />
            );
            break;

        default:
    }

    let ViewItemButtons = null;

    if (buy)
        ViewItemButtons = (
            <Button
                onClick={() => setConfirmBuy(true)}
                icon="coins"
                title={'Buy Item'}
            />
        );
    else if (sell)
        ViewItemButtons = (
            <Button
                onClick={() => setConfirmSell(true)}
                icon="coins"
                title={'Sell Item'}
            />
        );
    else if (itemIsEquipped)
        ViewItemButtons = (
            <Button
                onClick={() => {
                    unequipItem(data);
                    onClose();
                }}
                icon="archive"
                title={'Un-equip'}
            />
        );
    else
        ViewItemButtons = (
            <>
                <Button
                    onClick={() => setConfirmDrop(true)}
                    icon="trash"
                    title={'Drop'}
                />

                {data.type === 'potion' ? (
                    <Button
                        onClick={() => setConfirmPotion(true)}
                        icon="medkit"
                        title={'Heal'}
                    />
                ) : (
                    <Button
                        onClick={() => {
                            equipItem(data);
                            onClose();
                        }}
                        icon="hand-paper"
                        title={'Equip'}
                    />
                )}
            </>
        );

    return (
        <MicroDialog onClose={onClose}>
            <div className="view-item__title">
                <EmptySlot className="white-border view-item__image">
                    <div
                        style={{
                            backgroundImage: `url('${data.image}')`,
                            width: '40px',
                            height: '40px',
                        }}
                    />
                </EmptySlot>

                <span className="view-item__text">{data.name || '-'}</span>
            </div>

            <div className="flex-column view-item__stats">{itemStats}</div>

            <div className="flex-column view-item__button-container">
                <div className="flex-row view-item__button">
                    {ViewItemButtons}
                </div>
            </div>

            <ConfirmDialog
                open={confirmDrop}
                text={'Are you sure!? This item will be gone forever...'}
                cancelText={'Keep'}
                cancelIcon={'archive'}
                acceptText={'Drop'}
                acceptIcon={'trash'}
                confirm={() => {
                    dropItem(data);
                    setConfirmDrop(false);
                    onClose();
                }}
                onClose={() => setConfirmDrop(false)}
            />

            <ConfirmDialog
                open={confirmSell}
                text={`Are you sure you want to sell your ${
                    data.name
                } for ${Math.ceil(data.value / 2)} gold ?`}
                cancelText={'Cancel'}
                acceptText={'Sell'}
                acceptIcon={'coins'}
                confirm={() => {
                    sellItem(data);
                    setConfirmSell(false);
                    onClose();
                }}
                onClose={() => setConfirmSell(false)}
            />

            <ConfirmDialog
                open={confirmBuy}
                text={`Are you sure you want to buy ${data.name} for ${data.value} gold ?`}
                cancelText={'Cancel'}
                acceptText={'Buy'}
                acceptIcon={'coins'}
                confirm={() => {
                    buyItem(data);
                    setConfirmBuy(false);
                    onClose();
                }}
                onClose={() => setConfirmBuy(false)}
            />

            <ConfirmDialog
                open={confirmPotion}
                text={`Are you sure you want to use your ${data.name}?`}
                cancelText={'Cancel'}
                acceptText={'Heal'}
                acceptIcon={'medkit'}
                confirm={() => {
                    consumePotion(data);
                    setConfirmPotion(false);
                    onClose();
                }}
                onClose={() => setConfirmPotion(false)}
            />
        </MicroDialog>
    );
};

const mapStateToProps = ({ stats }) => ({ stats });

const actions = {
    buyItem,
    consumePotion,
    dropItem,
    equipItem,
    unequipItem,
    sellItem,
};

export default connect(mapStateToProps, actions)(ViewItem);
