import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../features/dialog-manager/dialogs/journal-dialog/entry-styles.scss';
import './styles.scss';

class JournalSide extends Component {
    componentDidUpdate(_prevProps, _prevState) {
        const journal = document.getElementById('journal-side');
        if (journal !== null) {
            // Automatically scroll the journal when new content is added
            journal.scrollTop = journal.scrollHeight;
        }
    }

    render() {
        return (
            <div
                className="journal-container white-border"
                style={{
                    visibility: this.props.disabled ? 'hidden' : 'visible',
                }}
            >
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

export default connect(mapStateToProps)(JournalSide);
