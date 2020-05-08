import React from 'react';

import './styles.scss';

const StatsItem = ({ stats }) => {
    let { name } = stats;

    function getColor(name) {
        switch (name) {
            case 'damage':
                return 'light-red';
            case 'range':
            case 'defence':
                return 'purple';
            case 'hp':
            case 'heal':
                return 'green';
            case 'mana cost':
            case 'mana':
                return 'blue';
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
            <>
                <div
                    className="flex-row stats-item__container"
                    style={{ paddingTop: '20px' }}
                >
                    <span>{name}:</span>
                </div>

                <span className="flex-row stats-item__description">
                    {stats.value}
                </span>
            </>
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
