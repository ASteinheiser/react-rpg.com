import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../features/dialog-manager/dialogs/journal-dialog/entry-styles.scss';
import './styles.scss';

class JournalSide extends Component {
    componentDidUpdate(_prevProps, _prevState) {
        const journal = document.getElementById('journal-side');
        if (journal !== null) {
            journal.scrollTop = journal.scrollHeight;
        }
    }

    render() {
        if (this.props.disabled) return null;

        return (
            <div className="journal-container white-border">
                <div
                    className="flex-column journal-dialog__container"
                    id="journal-side"
                    style={{
                        scrollBehavior: 'smooth',
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
            </div>
        );
    }
}

const mapStateToProps = ({ journal }) => ({
    journal,
});

const actions = {
    // toggleJournal,
    // setJournalScrolling,
};

export default connect(mapStateToProps, actions)(JournalSide);
