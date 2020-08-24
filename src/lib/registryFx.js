import store from "../store.js";

const effectsEventsRegistry = {};

async function dispatchFx(id, payload) {
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

    const { preEffect, effect, postEffect } = effectsEventsRegistry[id];

    await postEffect(store, await effect(preEffect(store, payload)));
}

function regEventFx(id, preEffect, effect, postEffect) {
    if (!id) {
        console.error("Unable to register the side-effect event without its id");
    }

    if (!preEffect && !effect && !postEffect) {
        console.error(
            "Unable to register the side-effect event without its handlers"
        );
    }

    if (effectsEventsRegistry[id]) {
        console.error(
            `Unable to register the side-effect event 
            because it is already registered: ${effectsEventsRegistry[id]}`
        );
    }

    effectsEventsRegistry[id] = { preEffect, effect, postEffect };
}

export { dispatchFx, regEventFx };
