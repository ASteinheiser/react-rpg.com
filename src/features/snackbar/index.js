import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import { connect } from 'react-redux';

import { SNACK_DURATION, E_KEY } from '../../config/constants';
import equipItem from '../inventory/actions/equip-item';
import clearNotification from './actions/clear-notification';
import Dialog from '../../components/dialog';

import './styles.scss';

class Snackbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: '',
            item: null,
            equip: false,
        };

        this.handleHideSnack = this.handleHideSnack.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            itemReceived,
            itemUsed,
            itemDropped,
            notEnoughGold,
            tooManyItems,
            item,
            message,
            itemSold,
        } = this.props.snackbar;

        const lastItemReceived = prevProps.snackbar.itemReceived;
        const lastItemDropped = prevProps.snackbar.itemDropped;
        const lastItemUsed = prevProps.snackbar.itemUsed;
        const lastNotEnoughGold = prevProps.snackbar.notEnoughGold;
        const lastTooManyItems = prevProps.snackbar.tooManyItems;
        const lastMessage = prevProps.snackbar.message;
        const lastItemSold = prevProps.snackbar.itemSold;

        if (lastMessage !== message && message) {
            this.setState({
                show: message.split('-')[0],
                item: null,
                equip: false,
            });
            this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
        } else if (
            lastItemUsed !== itemUsed &&
            itemUsed &&
            typeof itemUsed !== 'undefined'
        ) {
            // see if any items were used
            this.setState({
                show: `USED ITEM: ${itemUsed.split('-')[0]}`,
                item: item,
                equip: false,
            });
            this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
        } else if (
            lastItemDropped !== itemDropped &&
            itemDropped &&
            typeof itemDropped !== 'undefined'
        ) {
            // see if any items were dropped
            this.setState({
                show: `LOST ITEM: ${itemDropped.split('-')[0]}`,
                item: item,
                equip: false,
            });
            this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
        } else if (
            lastItemReceived !== itemReceived &&
            itemReceived &&
            typeof itemReceived !== 'undefined'
        ) {
            // see if any items were received
            this.setState({
                show: `NEW ITEM: ${itemReceived.split('-')[0]}`,
                item: item,
                equip: item.type !== 'potion',
            });
            this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
        } else if (
            lastNotEnoughGold !== notEnoughGold &&
            notEnoughGold &&
            typeof notEnoughGold !== 'undefined'
        ) {
            // see if player tried to buy item without enough gold
            this.setState({
                show: `NOT ENOUGH GOLD`,
                item: item,
                equip: false,
            });
            this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
        } else if (
            lastTooManyItems !== tooManyItems &&
            tooManyItems &&
            typeof tooManyItems !== 'undefined'
        ) {
            // see if player tried to get item with full inventory
            this.setState({
                show: `NO ROOM FOR: ${tooManyItems.split('-')[0]}`,
                item: item,
                equip: false,
            });
            this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
        } else if (
            lastItemSold !== itemSold &&
            itemSold &&
            typeof itemSold !== 'undefined'
        ) {
            this.setState({
                show: `SOLD ITEM: ${itemSold.split('-')[0]}`,
                item: item,
                equip: false,
            });
            this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
        }
    }

    handleHideSnack() {
        this.setState({ show: '' });
        this.props.clearNotification();
    }

    handleEquip() {
        this.props.equipItem(
            this.props.inventory.items[this.props.inventory.items.length - 1]
        );
        this.handleHideSnack();
    }

    render() {
        const { sideMenu, largeView } = this.props;
        const { show, equip } = this.state;

        let width;
        if (sideMenu) width = 400;
        else if (largeView) width = 398;
        else width = 350;

        if (show.length === 0) return null;

        return (
            <Dialog
                className="snackbar__container white-border"
                keys={[E_KEY]}
                onKeyPress={() => {
                    if (this.state.equip) this.handleEquip();
                }}
                style={{
                    marginLeft: sideMenu ? -402 : 0,
                    top: sideMenu ? 360 : -50,
                    width,
                    height: sideMenu ? 40 : 40,
                    fontSize: sideMenu ? 18 : 20,
                    opacity: show === '' ? 0 : 1,
                    zIndex: show === '' ? 0 : 1003,
                    transition:
                        show === ''
                            ? 'opacity .35s ease-in-out, z-index .35s step-end'
                            : 'opacity .35s ease-in-out, z-index .35s step-start',
                }}
            >
                {equip ? (
                    <div>
                        <span className="snackbar__equip__text">
                            {show}
                            <button
                                className="snackbar__equip__button white-border"
                                onClick={() => this.handleEquip()}
                            >
                                <i className="fa fa-hand-paper button__icon" />
                            </button>
                        </span>
                    </div>
                ) : (
                    <span className="snackbar__text">{show}</span>
                )}
            </Dialog>
        );
    }
}

const mapStateToProps = ({ snackbar, inventory }) => ({ snackbar, inventory });

const actions = { equipItem, clearNotification };

export default connect(mapStateToProps, actions)(ReactTimeout(Snackbar));
