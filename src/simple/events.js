import {regEventStore} from "../lib/registry.js";

const storeEventIds = Object.freeze({
    CURRENT_TIME: "CURRENT_TIME",
    TIME_COLOR: "TIME_COLOR"
});

function changeCurrentTimeStoreEvent(store, newTime) {
    return [["time"], newTime];
}

function changeTimeColorStoreEvent(store, newTimeColor) {
    return [["timeColor"], newTimeColor];
}

regEventStore(storeEventIds.CURRENT_TIME, changeCurrentTimeStoreEvent);
regEventStore(storeEventIds.TIME_COLOR, changeTimeColorStoreEvent);

export default storeEventIds;
