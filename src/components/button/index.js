import React from 'react';

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
    noBorder,
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
            }`}
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

            <span>{title}</span>
        </button>
    );
};

export default Button;
