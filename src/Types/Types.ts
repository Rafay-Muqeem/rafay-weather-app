
export type weatherData = {
    name?: string,
    weatherCond: string,
    feel: number,
    humidity: number,
    pressure: number,
    temp: number,
    wind: number,
    Time: string,
    timeHour: number,
    UVindex: number,
    precipitation: number,
    isDay: boolean,
    weatherIcon: number
}

// checking

interface city {
    city: string;
}

interface data {
    data: weatherData | null
}

interface validate {
    validate: boolean;
}

// export type myState = city | validate | data;

// checking

export type reducerState = {
    cityID?: number,
    city: string ,
    data: weatherData | null,
    validate: boolean,
    wordSuggArray? : wordSuggForm[]
}

export type reducerState2 = {
    wordSuggArray : wordSuggForm[]
}

export enum reducerActions {
    SET = 'SET',
    SETWORDSUGG = 'SETWORDSUGG',
    RESETWORDSUGG = 'RESETWORDSUGG',
}

interface reducerSetAction {
    type: reducerActions.SET,
    payload: reducerState
}

interface reducerSetWordSuggAction {
    type: reducerActions.SETWORDSUGG,
    payload: wordSuggForm
}

interface resetWordSugg {
    type: reducerActions.RESETWORDSUGG,
}


export type reducerAction = reducerSetAction | reducerSetWordSuggAction | resetWordSugg 

// export type reducerAction = {
//     type: reducerActions, 
//     payload: reducerState
// }


export type myDispatchProps = reducerSetAction | reducerSetWordSuggAction | resetWordSugg 




export type myDispatch = (a: myDispatchProps) => void;

export type myReducer<reducerState, reducerAction> = (state: reducerState, action: reducerAction) => reducerState;

export type wordSuggForm = {
    cityId?: number,
    cityName?: string,
    stateName?: string,
    countryName?: string
}

export type weather = {
    weatherObj: weatherData,
    dispatch: myDispatch
}

