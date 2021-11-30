export default function loadGameDialog(file) {
    return dispatch => {
        let reader = new FileReader();
        reader.onload = event => {
            const content = event.target.result;
            const data = JSON.parse(content);

            dispatch({
                type: 'LOAD_DATA',
                payload: data,
            });

            // Close the settings dialog, because it would have been saved with it open
            dispatch({
                type: 'CLOSE_SETTINGS',
                payload: null,
            });
        };
        reader.readAsText(file, 'UTF-8');
    };
}
