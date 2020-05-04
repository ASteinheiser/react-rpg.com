import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from '../../../../components/dialog';
import toggleJournal from '../../actions/toggle-journal';
import setJournalScrolling from '../../actions/set-journal-scrolling';
import { J_KEY, ESC_KEY } from '../../../../config/constants';

import './styles.scss';

class JournalDialog extends Component {
    componentDidMount(_prevProps, _prevState) {
        const journal = document.getElementById('journal');
        if (journal !== null) {
            if (this.props.journal.scroll && journal.scrollHeight > 390) {
                this.props.setJournalScrolling(false);
            }
            journal.scrollTop = journal.scrollHeight;
        }
    }

    render() {
        return (
            <Dialog
                keys={[J_KEY, ESC_KEY]}
                onKeyPress={() => this.props.toggleJournal()}
            >
                <div
                    className="flex-column journal-dialog__container"
                    id="journal"
                    style={{
                        scrollBehavior: this.props.journal.scroll
                            ? 'smooth'
                            : 'auto',
                    }}
                >
                    {this.props.journal.entries.map(entry => {
                        return (
                            <div
                                key={entry.key}
                                className="journal-entry flex-row"
                            >
                                {entry.entry}
                            </div>
                        );
                    })}
                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = ({ journal }) => ({
    journal,
});

const actions = {
    toggleJournal,
    setJournalScrolling,
};

export default connect(mapStateToProps, actions)(JournalDialog);
