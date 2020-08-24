/* eslint eslint-comments/no-use: 0 no-console: 0 */
/* eslint lodash/prefer-lodash-method: 0 */

import store from "../store.js";

/**
 * General function to mutate the store
 * It is dirty function
 * @param {Object} currentStore
 * @param {*} payload
 * @returns void
 */
function updateIn(currentStore, payload) {
    // Get path and value
    const [path, value] = payload;

    // Mutate state
    // eslint-disable-next-line array-callback-return
    path.reduce((acc, key, index) => {
        if (index === path.length - 1) {
            // eslint-disable-next-line fp/no-mutation,no-param-reassign
            acc[key] = value;
        } else {
            return acc[key];
        }
    }, currentStore);
}

/**
 * Registry of events to mutate store
 */
const storeEventsRegistry = {};

/**
 * Function to trigger a mutation of the state
 * @param {String} id - An unique id of the event
 * @param {*} payload - Payload that is added into the store
 * @returns void
 */
function dispatch(id, payload) {
    if (!id) {
        console.error(
            "Enable to dispatch a store event without its id"
        );

        return;
    }

    if (!storeEventsRegistry[id]) {
        console.error(
            `There isn\`t a registered handler for this store event id: ${id}`
        );

        return;
    }

    // Emit a handler and mutate the store
    updateIn(store, storeEventsRegistry[id](store, payload));
}

/**
 * Register an event that mutates the store
 * @param {String} id - An unique id of the event
 * @param {Function} storeEvent - Function that returns instructions
 * for the store mutations
 */
function regEventStore(id, storeEvent) {
    if (!id) {
        console.error("Unable to register the event without its id");
    }

    if (!storeEvent) {
        console.error("Unable to register the store event without its handler");
    }

    if (storeEventsRegistry[id]) {
        console.error(
            `Unable to register the store event because it is already 
            registered: ${storeEventsRegistry[id]}`
        );
    }

    // Register an event
    // eslint-disable-next-line fp/no-mutation
    storeEventsRegistry[id] = storeEvent;
}

export {
    dispatch,
    regEventStore
};
