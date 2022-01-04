export type weatherData = {
    name: string,
    feel: number,
    humidity: number,
    pressure: number,
    temp: number,
    visibility: number,
    weatherDesc: string
    sunRise: string,
    sunSet: string,
    lastUpdateTime: string
}

// checking

interface city{
    city: string;
}

interface validate{
    validate: boolean;
}

interface back{
    back: boolean;
}

export type myState = city | validate | back;

// checking

export interface reducerState {
    city: string,
    data: weatherData | null,
    validate: boolean,
}

export type reducerAction = {
    type: string,
    payload: reducerState
}

export type myDispatchProps = {
    type: string,
    payload: reducerState
}

export type myDispatch = (a: myDispatchProps) => void;

export type myReducer<reducerState, reducerAction> = (state: reducerState, action: reducerAction ) => reducerState;

export type form = {
    state: reducerState,
    timeHour: number,
    myDispatch: myDispatch
}

export type weather = {
    state: reducerState,
    weatherObj: weatherData,
    timeHour: number,
    myDispatch: myDispatch
}

