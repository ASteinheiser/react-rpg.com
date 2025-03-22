import React from 'react';

import Button from '../button';

// import './styles.scss';

const SelectButton = ({
    icon,
    title,
    selected,
    iconStyle,
    indicator,
    onClick,
    small,
    tiny,
    noBorder,
    extraClass,
}) => {
    function handleClick() {
        if (typeof onClick === 'function') {
            onClick(title);
        }
    }

    if (!title) return null;

    return (
        <Button
            title={title}
            extraClass={`select-button ${selected ? 'selected ' : ''} 
                ${extraClass ? extraClass : ''}`}
            onClick={handleClick}
            icon={icon}
            iconStyle={iconStyle}
            indicator={indicator}
            small={small}
            tiny={tiny}
            noBorder={noBorder}
        />
    );
};

export default SelectButton;
