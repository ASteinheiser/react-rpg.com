import React from 'react';

import './styles.scss';

const StatsItem = ({ stats }) => {
    let { name } = stats;

    function getColor(name) {
        switch (name) {
            case 'DMG over time':
            case 'damage':
                return 'light-red';
            case 'effect':
            case 'damage range':
            case 'defence':
                return 'purple';
            case 'hp':
            case 'heal':
            case 'health':
                return 'green';
            case 'mana cost':
            case 'mana':
                return 'blue';
            case 'chance':
            case 'slots':
            case 'VS. dragon':
            case 'VS. lich':
            case 'value':
                return 'orange';
            default:
        }
    }

    if (name === 'description') {
        return (
            <span className="flex-row stats-item__description">
                "{stats.value}"
            </span>
        );
    }

    return (
        <div className="flex-row stats-item__container stats-item__container">
            <span>{name}</span>

            <span style={{ color: `var(--${getColor(stats.name)})` }}>
                {`${stats.value}`}
            </span>
        </div>
    );
};

export default StatsItem;
