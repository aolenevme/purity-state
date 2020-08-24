/* eslint eslint-comments/no-use: 0 no-shadow: 0 */
/* eslint react-hooks/rules-of-hooks: 0 */
/* eslint fp/no-get-set: 0 */

import {useLocalStore} from "mobx-react-lite";

import store from "../store.js";

function timeColor(store) {
    return store.timeColor;
}

function time(store) {
    return store.time.toString();
}

function queries() {
    return useLocalStore(() => ({
        get timeColor() {
            return timeColor(store);
        },

        get time() {
            return time(store);
        }
    }));
}

export default queries;
