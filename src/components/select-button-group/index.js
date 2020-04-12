import React from 'react';

import SelectButton from '../select-button';

const SelectButtonGroup = ({
    values,
    select,
    onClick,
    icon,
    iconStyle,
    indicator,
    small,
    tiny,
    noBorder,
    extraClass,
}) => {
    return values.map(value => (
        <SelectButton
            title={value}
            selected={select(value)}
            onClick={onClick}
            extraClass={extraClass}
            icon={icon}
            iconStyle={iconStyle}
            indicator={indicator}
            small={small}
            tiny={tiny}
            noBorder={noBorder}
        />
    ));
};

export default SelectButtonGroup;
