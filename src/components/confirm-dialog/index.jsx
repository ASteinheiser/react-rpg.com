import React, { useEffect } from 'react';

import Button from '../button';
import { ENTER_KEY, ESC_KEY } from '../../config/constants';

import './styles.scss';

const ConfirmDialog = ({
    open,
    text,
    onClose,
    cancelIcon,
    cancelText,
    confirm,
    acceptIcon,
    acceptText,
    className,
}) => {
    const handleKeyPress = event => {
        // check if a key is pressed and bound to an action
        if (event.keyCode === ENTER_KEY) {
            confirm();
        } else if (event.keyCode === ESC_KEY) {
            onClose();
        }
    };

    useEffect(() => {
        if (open) {
            window.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            if (open) {
                window.removeEventListener('keydown', handleKeyPress);
            }
        };
    }, [open]);

    if (!open) return null;

    return (
        <div
            className={`confirm-dialog__container white-border ${className ||
                ''}`}
        >
            <span className="confirm-dialog__text">{text}</span>

            <div className="flex-row confirm-dialog__buttons">
                <Button
                    onClick={onClose}
                    icon={cancelIcon || 'times'}
                    title={cancelText || 'No'}
                />

                <Button
                    onClick={confirm}
                    icon={acceptIcon || 'check'}
                    title={acceptText || 'Yes'}
                />
            </div>
        </div>
    );
};

export default ConfirmDialog;
