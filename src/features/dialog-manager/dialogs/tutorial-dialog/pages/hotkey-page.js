import React from 'react';

import BKey from './assets/keyboard/b_key.png';
import HKey from './assets/keyboard/h_key.png';
import IKey from './assets/keyboard/i_key.png';
import JKey from './assets/keyboard/j_key.png';
import UKey from './assets/keyboard/u_key.png';

import Hotkey from '../../../../../components/hotkey';

import './styles.scss';

const HotkeyPage = () => {
    return (
        <div className="flex-column tutorial-hotkeys__container">
            <div className="tutorial-page__title">{'MENU HOTKEYS'}</div>
            <div className="tutorial-page__hotkeys">
                <Hotkey img={BKey} label={'Spellbook'} />
                <Hotkey img={HKey} label={'Tutorial'} />
                <Hotkey img={IKey} label={'Inventory'} />
                <Hotkey img={JKey} label={'Journal'} />
                <Hotkey img={UKey} label={'Abilities'} />
            </div>
        </div>
    );
};

export default HotkeyPage;
