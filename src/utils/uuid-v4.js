/**
 * Basic uuidv4 implementation
 *
 * Works fine from testing, however future use may see this phased out
 * in favour of a dedicated library.
 */
export default function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        // eslint-disable-next-line
        let r = (Math.random() * 16) | 0,
            // eslint-disable-next-line
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
