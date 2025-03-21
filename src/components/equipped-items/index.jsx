import React from 'react';
import { connect } from 'react-redux';

import EmptySlot, { DarkenSlot } from '../empty-slot';
import unequipItem from '../../features/inventory/actions/unequip-item';

import BootsOutline from './assets/boots-outline.png';
import HelmetOutline from './assets/helmet-outline.png';
import BodyOutline from './assets/body-outline.png';
import GlovesOutline from './assets/gloves-outline.png';
import PantsOutline from './assets/pants-outline.png';
import RingOutline from './assets/ring-outline.png';
import SwordOutline from './assets/sword-outline.png';
import Character from './assets/equipment-character.png';

import './styles.scss';

const EquippedItems = ({ stats, unequipItem }) => {
    const { weapon, ring, armor } = stats.equippedItems;

    return (
        <div
            className="equipped-items__character"
            style={{ backgroundImage: `url(${Character})` }}
        >
            <EmptySlot className="white-border equipped-items__helmet">
                {armor && armor.helmet ? (
                    <button
                        className="equipped-items__slot"
                        onClick={() => unequipItem(armor.helmet)}
                        style={{
                            backgroundImage: `url('${armor.helmet.image}')`,
                        }}
                    >
                        <DarkenSlot />
                    </button>
                ) : (
                    <div
                        className="equipped-items__slot"
                        style={{ backgroundImage: `url('${HelmetOutline}')` }}
                    />
                )}
            </EmptySlot>

            <EmptySlot className="white-border equipped-items__body">
                {armor && armor.body ? (
                    <button
                        className="equipped-items__slot"
                        onClick={() => unequipItem(armor.body)}
                        style={{
                            backgroundImage: `url('${armor.body.image}')`,
                        }}
                    >
                        <DarkenSlot />
                    </button>
                ) : (
                    <div
                        className="equipped-items__slot"
                        style={{ backgroundImage: `url('${BodyOutline}')` }}
                    />
                )}
            </EmptySlot>

            <div className="flex-row flex-end">
                <EmptySlot className="equipped-items__gloves--left">
                    {armor && armor.gloves && (
                        <div
                            style={{
                                height: 40,
                                width: 40,
                                backgroundImage: `url('${armor.gloves.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </div>
                    )}
                </EmptySlot>
                <EmptySlot className="white-border equipped-items__pants">
                    {armor && armor.pants ? (
                        <button
                            className="equipped-items__slot"
                            onClick={() => unequipItem(armor.pants)}
                            style={{
                                backgroundImage: `url('${armor.pants.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </button>
                    ) : (
                        <div
                            className="equipped-items__slot"
                            style={{
                                backgroundImage: `url('${PantsOutline}')`,
                            }}
                        />
                    )}
                </EmptySlot>
                <EmptySlot className="white-border equipped-items__gloves--right">
                    {armor && armor.gloves ? (
                        <button
                            className="equipped-items__slot"
                            onClick={() => unequipItem(armor.gloves)}
                            style={{
                                backgroundImage: `url('${armor.gloves.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </button>
                    ) : (
                        <div
                            className="equipped-items__slot"
                            style={{
                                backgroundImage: `url('${GlovesOutline}')`,
                            }}
                        />
                    )}
                </EmptySlot>
            </div>

            <div className="flex-row space-between">
                <EmptySlot className="white-border equipped-items__ring">
                    {ring ? (
                        <button
                            className="equipped-items__slot"
                            onClick={() => unequipItem(ring)}
                            style={{ backgroundImage: `url('${ring.image}')` }}
                        >
                            <DarkenSlot />
                        </button>
                    ) : (
                        <div
                            className="equipped-items__slot"
                            style={{ backgroundImage: `url('${RingOutline}')` }}
                        />
                    )}
                </EmptySlot>

                <EmptySlot className="white-border equipped-items__weapon">
                    {weapon ? (
                        <button
                            className="equipped-items__slot"
                            onClick={() => unequipItem(weapon)}
                            style={{
                                backgroundImage: `url('${weapon.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </button>
                    ) : (
                        <div
                            className="equipped-items__slot"
                            style={{
                                backgroundImage: `url('${SwordOutline}')`,
                            }}
                        />
                    )}
                </EmptySlot>
            </div>

            <div className="flex-row space-between">
                <EmptySlot className="equipped-items__boots--left">
                    {armor && armor.boots && (
                        <div
                            style={{
                                height: 40,
                                width: 40,
                                backgroundImage: `url('${armor.boots.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </div>
                    )}
                </EmptySlot>
                <EmptySlot className="white-border equipped-items__boots--right">
                    {armor && armor.boots ? (
                        <button
                            className="equipped-items__slot"
                            onClick={() => unequipItem(armor.boots)}
                            style={{
                                backgroundImage: `url('${armor.boots.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </button>
                    ) : (
                        <div
                            className="equipped-items__slot"
                            style={{
                                backgroundImage: `url('${BootsOutline}')`,
                            }}
                        />
                    )}
                </EmptySlot>
            </div>
        </div>
    );
};

const mapStateToProps = ({ stats }) => ({ stats });

export default connect(mapStateToProps, { unequipItem })(EquippedItems);
