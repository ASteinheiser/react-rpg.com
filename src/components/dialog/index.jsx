import React, { useEffect } from 'react';

import { ENTER_KEY, ESC_KEY } from '../../config/constants';

import './styles.scss';

const Dialog = ({
    className,
    style,
    children,
    goBack,
    onKeyPress,
    keys,
    extraClass,
}) => {
    const handleKeyPress = event => {
        if (onKeyPress && typeof onKeyPress === 'function') {
            if (
                keys
                    ? keys.includes(event.keyCode)
                    : event.keyCode === ENTER_KEY
            ) {
                onKeyPress(event.keyCode);
            }
        }

        if (goBack && typeof goBack === 'function') {
            if (event.keyCode === ESC_KEY) {
                goBack();
            }
        }
    };

    useEffect(() => {
        if (
            (onKeyPress && typeof onKeyPress === 'function') ||
            (goBack && typeof onKeyPress === 'function')
        ) {
            window.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            if (
                (onKeyPress && typeof onKeyPress === 'function') ||
                (goBack && typeof onKeyPress === 'function')
            ) {
                window.removeEventListener('keydown', handleKeyPress);
            }
        };
    });

    return (
        <div
            className={`${extraClass && extraClass}
                ${className || 'dialog__container white-border'}`}
            style={style}
        >
            {goBack && (
                <button onClick={goBack} className="dialog__back-button">
                    <i className={`fa fa-arrow-left`} />
                </button>
            )}
            {children}
        </div>
    );
};

export default Dialog;
