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
import calculatePrices from '../../utils/calculate-prices';
import setActiveSpell from '../../features/dialog-manager/actions/set-active-spell';
import { calculateDamageRange } from '../../utils/dice';

import './styles.scss';

const ViewItem = ({
    sell,
    buy,
    onClose,
    data,
    stats,
    player,
    unequipItem,
    buyItem,
    equipItem,
    dropItem,
    consumePotion,
    sellItem,
    open,
    setActiveSpell,
}) => {
    const [confirmPotion, setConfirmPotion] = useState(false);
    const [confirmDrop, setConfirmDrop] = useState(false);
    const [confirmSell, setConfirmSell] = useState(false);
    const [confirmBuy, setConfirmBuy] = useState(false);

    if (!open) return null;

    const itemStats = [];
    let itemIsEquipped = false;
    const equipped = stats.equippedItems;

    const { sellPrice, buyPrice } = calculatePrices(
        data.value,
        calculateModifier(stats.abilities.charisma)
    );

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

            const damageRange = calculateDamageRange(data.damage);
            itemStats.push(
                <StatsItem
                    stats={{
                        name: 'range',
                        value: damageRange[0] + ' - ' + damageRange[1],
                    }}
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

        case 'spell':
            if (data.target.includes('self')) {
                const healRange = calculateDamageRange(data.damage);
                itemStats.push(
                    <StatsItem
                        stats={{ name: 'heal', value: data.damage }}
                        key={uuidv4()}
                    />
                );
                itemStats.push(
                    <StatsItem
                        stats={{
                            name: 'range',
                            value: healRange[0] + ' - ' + healRange[1],
                        }}
                        key={uuidv4()}
                    />
                );
            } else {
                const damageRange = calculateDamageRange(data.damage);
                itemStats.push(
                    <StatsItem
                        stats={{ name: 'damage', value: data.damage }}
                        key={uuidv4()}
                    />
                );
                itemStats.push(
                    <StatsItem
                        stats={{
                            name: 'range',
                            value: damageRange[0] + ' - ' + damageRange[1],
                        }}
                        key={uuidv4()}
                    />
                );
            }

            itemStats.push(
                <StatsItem
                    stats={{ name: 'description', value: data.description }}
                    key={uuidv4()}
                />
            );
            break;

        default:
    }

    itemStats.push(
        <StatsItem
            stats={{
                name: 'value',
                value: sellPrice,
            }}
            key={uuidv4()}
        />
    );

    let ViewItemButtons = null;
    let onKeyPress = null;

    if (buy) {
        onKeyPress = () => setConfirmBuy(true);
        ViewItemButtons = (
            <Button
                onClick={() => setConfirmBuy(true)}
                icon="coins"
                title={'Buy Item'}
            />
        );
    } else if (sell) {
        onKeyPress = () => setConfirmSell(true);
        ViewItemButtons = (
            <Button
                onClick={() => setConfirmSell(true)}
                icon="coins"
                title={'Sell Item'}
            />
        );
    } else if (itemIsEquipped) {
        onKeyPress = () => {
            unequipItem(data);
            onClose();
        };
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
    } else if (data.type === 'spell') {
        onKeyPress = () => setActiveSpell(data);
        ViewItemButtons = (
            <>
                {player.spell && player.spell.name === data.name ? (
                    <Button
                        onClick={() => setActiveSpell(null)}
                        title={'Remove Active Spell'}
                    />
                ) : (
                    <Button
                        onClick={() => setActiveSpell(data)}
                        title={'Set Active Spell'}
                    />
                )}
            </>
        );
    } else {
        onKeyPress = () => {
            if (data.type === 'potion') {
                setConfirmPotion(true);
            } else {
                equipItem(data);
                onClose();
            }
        };

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
    }

    return (
        <MicroDialog
            onClose={onClose}
            onKeyPress={() => {
                if (!confirmDrop) {
                    // Removing this check means that if we're on the drop/equip item, then if we selected the
                    // drop option, on the next screen if we hit 'enter', we'll equip the item.
                    onKeyPress();
                }
            }}
        >
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
                acceptKeys
                onClose={() => setConfirmDrop(false)}
            />

            <ConfirmDialog
                open={confirmSell}
                text={`Are you sure you want to sell your ${data.name} for ${sellPrice} gold ?`}
                cancelText={'Cancel'}
                acceptText={'Sell'}
                acceptIcon={'coins'}
                confirm={() => {
                    sellItem(data);
                    setConfirmSell(false);
                    onClose();
                }}
                acceptKeys
                onClose={() => setConfirmSell(false)}
            />

            <ConfirmDialog
                open={confirmBuy}
                text={`Are you sure you want to buy ${data.name} for ${buyPrice} gold ?`}
                cancelText={'Cancel'}
                acceptText={'Buy'}
                acceptIcon={'coins'}
                confirm={() => {
                    buyItem(data);
                    setConfirmBuy(false);
                    onClose();
                }}
                acceptKeys
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
                acceptKeys
                onClose={() => setConfirmPotion(false)}
            />
        </MicroDialog>
    );
};

const mapStateToProps = ({ stats, player }) => ({ stats, player });

const actions = {
    buyItem,
    consumePotion,
    dropItem,
    equipItem,
    unequipItem,
    sellItem,
    setActiveSpell,
};

export default connect(mapStateToProps, actions)(ViewItem);
