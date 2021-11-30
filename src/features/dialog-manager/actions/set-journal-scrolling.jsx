export default function setJournalScrolling(on) {
    return dispatch => {
        dispatch({ type: 'SET_JOURNAL_SCROLLING', payload: on });
    };
}
