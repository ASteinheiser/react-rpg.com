import React, { useEffect } from 'react';

import { ENTER_KEY, ESC_KEY } from '../../config/constants';

import './styles.scss';

const MicroDialog = ({
    noButton,
    onClose,
    children,
    fullsize,
    className,
    onKeyPress,
}) => {
    const handleKeyPress = event => {
        if (event.keyCode === ENTER_KEY) {
            onKeyPress();
        } else if (event.keyCode === ESC_KEY) {
            onClose();
        }
    };

    useEffect(() => {
        if (onKeyPress && typeof onKeyPress === 'function') {
            window.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            if (onKeyPress && typeof onKeyPress === 'function') {
                window.removeEventListener('keydown', handleKeyPress);
            }
        };
    });

    const noSpacing = { top: 0, bottom: 0, left: 0, right: 0 };

    return (
        <div
            style={fullsize ? noSpacing : {}}
            className={`micro-dialog__container white-border ${className ||
                ''}`}
        >
            {!noButton && (
                <button className="micro-dialog__close" onClick={onClose}>
                    <i className={`fa fa-times`} />
                </button>
            )}

            {children}
        </div>
    );
};

export default MicroDialog;
