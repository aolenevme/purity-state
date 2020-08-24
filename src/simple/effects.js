import {regEventFx} from "../lib/registryFx.js";

const fxEventIds = Object.freeze({
    CURRENT_TIME_2_STORAGE: "CURRENT_TIME_2_STORAGE"
});

function changeCurrentTimeEventFx(store, newTime) {
    return ["time", newTime];
}

function changeLocalStorage(DSL) {
    const [itemName, newTime] = DSL;

    // Mutate localStorage
    localStorage.setItem(itemName, newTime);

    return newTime;
}

regEventFx(
    fxEventIds.CURRENT_TIME_2_STORAGE,
    changeCurrentTimeEventFx,
    changeLocalStorage
);

export default fxEventIds;
