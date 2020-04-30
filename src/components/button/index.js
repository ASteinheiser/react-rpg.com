import React from 'react';

import EmptySlot from '../empty-slot';

import './styles.scss';

const Button = ({
    icon,
    title,
    iconStyle,
    style,
    indicator,
    onClick,
    small,
    tiny,
    image,
    noBorder,
    extraClass,
}) => {
    function handleClick() {
        if (typeof onClick === 'function') {
            onClick();
        }
    }

    if (!title) return null;

    return (
        <button
            className={`button__container ${noBorder ? '' : 'white-border'} ${
                small
                    ? 'button__container--small'
                    : tiny
                    ? 'button__container--tiny'
                    : ''
            } ${extraClass ? extraClass : ''}`}
            style={style || {}}
            onClick={handleClick}
        >
            {icon && (
                <i
                    className={`fa fa-${icon} button__icon`}
                    style={iconStyle || {}}
                >
                    {indicator && <div className="button__indicator" />}
                </i>
            )}
            {image && (
                <EmptySlot className="white-border button__image">
                    <div
                        style={{
                            backgroundImage: `url('${image}')`,
                            width: '40px',
                            height: '40px',
                        }}
                    />
                </EmptySlot>
            )}

            <span>{title}</span>
        </button>
    );
};

export default Button;
