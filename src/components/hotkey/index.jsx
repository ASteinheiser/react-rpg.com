import React from 'react';

import './styles.scss';

const Hotkey = ({ img, label }) => {
    return (
        <>
            <div className="hotkey__container">
                <img src={img} alt="hotkey" width={55} />
                <span className="hotkey__text">{label}</span>
            </div>
        </>
    );
};

export default Hotkey;
