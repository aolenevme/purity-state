import React from "react";
import {observer} from "mobx-react-lite";

import {dispatch} from "../lib/registry.js";
import {dispatchFx} from "../lib/registryFx.js";

import queries from "./queries.js";
import storeEventIds from "./events.js";
import fxEventIds from "./effects.js";
import {ClockS, UIS} from "./styled.js";

const CHANGE_TIME_TIMEOUT = 1000;

function Clock({time, timeColor}) {
    return <ClockS timeColor={timeColor}>{time}</ClockS>;
}

function ColorInput({timeColor}) {
    return (
        <div>
            <input
                type="text"
                value={timeColor}
                onChange={changeEvent =>
                    dispatch(storeEventIds.TIME_COLOR, changeEvent.target.value)
                }
            />
        </div>
    );
}

function UI() {
    dispatch(storeEventIds.CURRENT_TIME, new Date().toString());

    // Side effects, initialization events, and onMount events, and etc
    setTimeout(
        () =>
            dispatchFx(
                fxEventIds.CURRENT_TIME_2_STORAGE,
                new Date().toString(),
                (store, newDate) => dispatch(storeEventIds.CURRENT_TIME, newDate)
            ),
        CHANGE_TIME_TIMEOUT
    );

    // Get queries
    const {time, timeColor} = queries();

    // Return view
    return (
        <UIS>
            <h1>Hello World, it is now!</h1>
            <Clock time={time} timeColor={timeColor}/>
            <ColorInput timeColor={timeColor}/>
        </UIS>
    );
}

export default observer(UI);
