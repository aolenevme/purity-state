/* eslint eslint-comments/no-use: 0 no-console: 0 */

import store from "../store.js";

/**
 * Registry of events to do side-effects
 */
const effectsEventsRegistry = {};

/**
 * Function to trigger side-effects
 * @param {String} id - An unique id of the side-effect event
 * @param {*} payload - Payload that is used for the side-effect
 * @param {Function} afterFn - An optional function that gets a result
 * of the side-effect execution
 * @returns void
 */
async function dispatchFx(id, payload, afterFn) {
    if (!id) {
        console.error("Enable to dispatch a side-effect event without its id");

        return;
    }

    if (!effectsEventsRegistry[id]) {
        console.error(
            `There isn\`t a registered handler for this side-effect 
            event id: ${id}`
        );

        return;
    }

    // Emit a handler and pass a result into the afterFn
    const {eventFx, handlerFx} = effectsEventsRegistry[id];

    await afterFn(store, await handlerFx(eventFx(store, payload)));
}

/**
 * Register an event that do side-effects
 * @param {String} id - An unique id of the side-effect event
 * @param {Function} eventFx - Function that returns instructions
 * for the store mutations
 * @param {Function} handlerFx - A function that accepts instructions
 * as a DSL to execute side-effects
 */
function regEventFx(id, eventFx, handlerFx) {
    if (!id) {
        console.error(
            "Unable to register the side-effect event without its id"
        );
    }

    if (!eventFx) {
        console.error(
            "Unable to register the side-effect event without its handler"
        );
    }

    if (effectsEventsRegistry[id]) {
        console.error(
            `Unable to register the side-effect event 
            because it is already registered: ${effectsEventsRegistry[id]}`
        );
    }

    // Register an event
    // eslint-disable-next-line fp/no-mutation
    effectsEventsRegistry[id] = {eventFx, handlerFx};
}

export {
    dispatchFx,
    regEventFx
};
