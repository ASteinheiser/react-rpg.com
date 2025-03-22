import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/button';
import toggleInventory from '../dialog-manager/actions/toggle-inventory';

import './styles.scss';

class Inventory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newItemIndicator: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { inventory } = this.props.dialog;
        const { itemReceived, itemDropped } = this.props.snackbar;
        const lastItemReceived = prevProps.snackbar.itemReceived;
        const lastItemDropped = prevProps.snackbar.itemDropped;

        if (
            lastItemDropped !== itemDropped &&
            itemDropped &&
            typeof itemDropped !== 'undefined' &&
            !inventory
        ) {
            // see if any items were dropped
            this.setState({ newItemIndicator: true });
        } else if (
            lastItemReceived !== itemReceived &&
            itemReceived &&
            typeof itemReceived !== 'undefined' &&
            !inventory
        ) {
            // see if any items were received
            this.setState({ newItemIndicator: true });
        } else if (inventory && prevState.newItemIndicator) {
            // see if inventory is opened and there was a new item
            this.setState({ newItemIndicator: false });
        }
    }

    _toggleInventory() {
        // We can turn off the indicator if the inventory is opened
        // If we are closing the inventory, it is okay to turn off
        // indicator since it should be false already
        this.setState({ newItemIndicator: false });
        this.props.toggleInventory();
    }

    render() {
        const { newItemIndicator } = this.state;
        const { disabled, dialog, sideMenu } = this.props;

        const open = dialog.inventory;

        return (
            <div className="flex-row inventory__container">
                {!disabled && (
                    <Button
                        small={sideMenu}
                        indicator={newItemIndicator}
                        onClick={this._toggleInventory.bind(this)}
                        icon={'briefcase'}
                        iconRight={open && 'times'}
                        floatIcons={true}
                        title={open ? 'Close' : 'Inventory'}
                        style={{
                            width: 180,
                            transition: 'width .25s ease-out',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            backgroundColor: 'var(--dark-gray)',
                        }}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ snackbar, dialog }) => ({ snackbar, dialog });

const actions = { toggleInventory };

export default connect(mapStateToProps, actions)(Inventory);
