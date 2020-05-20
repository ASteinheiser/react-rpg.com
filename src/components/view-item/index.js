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
            data.amount = data.kind === 'health' ? data.hpReset : data.mpReset;
            const potionRestore = calculateWisdomPotionBonus(
                data.amount,
                calculateModifier(stats.abilities.wisdom)
            );
            data.amount = potionRestore;

            itemStats.push(
                <StatsItem
                    stats={{ name: data.kind, value: potionRestore }}
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
            break;

        case 'armor::helmet':
            itemIsEquipped =
                equipped.armor &&
                JSON.stringify(equipped.armor.helmet) === JSON.stringify(data);
            break;

        case 'armor::body':
            itemIsEquipped =
                equipped.armor &&
                JSON.stringify(equipped.armor.body) === JSON.stringify(data);
            break;

        case 'armor::gloves':
            itemIsEquipped =
                equipped.armor &&
                JSON.stringify(equipped.armor.gloves) === JSON.stringify(data);
            break;

        case 'armor::boots':
            itemIsEquipped =
                equipped.armor &&
                JSON.stringify(equipped.armor.boots) === JSON.stringify(data);
            break;

        case 'armor::pants':
            itemIsEquipped =
                equipped.armor &&
                JSON.stringify(equipped.armor.pants) === JSON.stringify(data);
            break;

        case 'spell':
            if (data.target.includes('self')) {
                itemStats.push(
                    <StatsItem
                        stats={{ name: 'heal', value: data.damage }}
                        key={uuidv4()}
                    />
                );
            } else {
                itemStats.push(
                    <StatsItem
                        stats={{ name: 'damage', value: data.damage }}
                        key={uuidv4()}
                    />
                );
            }

            itemStats.push(
                <StatsItem
                    stats={{ name: 'mana cost', value: data.manaCost }}
                    key={uuidv4()}
                />
            );

            if (data.effects && data.effects.changeAI) {
                itemStats.push(
                    <StatsItem
                        stats={{
                            name: 'effect',
                            value: data.effects.changeAI.effect,
                        }}
                        key={uuidv4()}
                    />
                );

                if (data.effects.changeAI.proc) {
                    itemStats.push(
                        <StatsItem
                            stats={{
                                name: 'chance',
                                value: data.effects.changeAI.chance,
                            }}
                            key={uuidv4()}
                        />
                    );
                }

                if (data.effects.changeAI.extraDamage) {
                    const { damage, times } = data.effects.changeAI.extraDamage;
                    itemStats.push(
                        <StatsItem
                            stats={{
                                name: 'DMG over time',
                                value: times + ' * ' + damage,
                            }}
                            key={uuidv4()}
                        />
                    );
                }
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

    if (data.effect) {
        // find each effect
        Object.keys(data.effect).forEach(name => {
            itemStats.push(
                <StatsItem
                    stats={{ name, value: data.effect[name] }}
                    key={uuidv4()}
                />
            );
        });
    }

    if (data.value) {
        itemStats.push(
            <StatsItem
                stats={{
                    name: 'price',
                    value: sellPrice,
                }}
                key={uuidv4()}
            />
        );
    }

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
            <Button onClick={onKeyPress} icon="coins" title={'Sell Item'} />
        );
    } else if (itemIsEquipped) {
        onKeyPress = () => {
            unequipItem(data);
            onClose();
        };
        ViewItemButtons = (
            <Button onClick={onKeyPress} icon="archive" title={'Un-equip'} />
        );
    } else if (data.type === 'spell') {
        const unlocked = data.unlockLevel <= stats.level;
        onKeyPress = () => {
            if (player.spell && player.spell.name === data.name) {
                setActiveSpell(null);
            } else if (unlocked) {
                setActiveSpell(data);
            }
        };
        ViewItemButtons = (
            <>
                {player.spell && player.spell.name === data.name ? (
                    <Button
                        onClick={onKeyPress}
                        title={'Remove Active Spell'}
                    />
                ) : (
                    <Button
                        extraClass={unlocked ? '' : 'selected'}
                        onClick={onKeyPress}
                        title={
                            unlocked
                                ? 'Set Active Spell'
                                : `Unlocked at level ${data.unlockLevel}`
                        }
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
                        title={data.kind === 'health' ? 'Heal' : 'Restore'}
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
                acceptText={data.kind === 'health' ? 'Heal' : 'Restore'}
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
