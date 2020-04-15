import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import { connect } from 'react-redux';

import { SNACK_DURATION } from '../../config/constants';
import equipItem from '../inventory/actions/equip-item';

import './styles.scss';

class Snackbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: '',
            item: null,
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
            errorMessage,
        } = this.props.snackbar;

        const lastItemReceived = prevProps.snackbar.itemReceived;
        const lastItemDropped = prevProps.snackbar.itemDropped;
        const lastItemUsed = prevProps.snackbar.itemUsed;
        const lastNotEnoughGold = prevProps.snackbar.notEnoughGold;
        const lastTooManyItems = prevProps.snackbar.tooManyItems;
        const lastErrorMessage = prevProps.snackbar.errorMessage;

        if (lastErrorMessage !== errorMessage && errorMessage) {
            this.setState({
                show: errorMessage.split('-')[0],
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
            });
            this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
        }
    }

    handleHideSnack() {
        this.setState({ show: '' });
    }

    render() {
        const { sideMenu, largeView } = this.props;
        const { show, item } = this.state;

        let width;
        if (sideMenu) width = 400;
        else if (largeView) width = 398;
        else width = 350;

        let showType = show ? show.substring(0, show.indexOf(':')) : show;

        return (
            <div
                className="snackbar__container white-border"
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
                {showType === 'NEW ITEM' && item.type !== 'potion' ? (
                    <div>
                        <span className="snackbar__equip__text">
                            {show}
                            <button
                                className="snackbar__equip__button white-border"
                                onClick={() => {
                                    this.props.equipItem(
                                        this.props.inventory.items[
                                            this.props.inventory.items.length -
                                                1
                                        ]
                                    );
                                    this.handleHideSnack();
                                }}
                            >
                                <i class="fa fa-hand-paper button__icon" />
                            </button>
                        </span>
                    </div>
                ) : (
                    <span className="snackbar__text">{show}</span>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ snackbar, inventory }) => ({ snackbar, inventory });

const actions = { equipItem };

export default connect(mapStateToProps, actions)(ReactTimeout(Snackbar));
