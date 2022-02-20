import React, { useReducer } from "react";
import { reducerState, reducerState2, reducerAction, myReducer, reducerActions, wordSuggForm } from "../Types/Types";

export const initialState: reducerState = {
    cityID: 0,
    city: '',
    data: null,
    validate: true,
    wordSuggArray: []
}

export const reducer = (state: reducerState = initialState, action: reducerAction): reducerState => {
    switch (action.type) {
        case reducerActions.SET:
            return ({
                city: action.payload.city,
                data: action.payload.data,
                validate: action.payload.validate,
                wordSuggArray: state.wordSuggArray
            });

        case reducerActions.SETWORDSUGG:
            return ({
                city: state.city,
                data: state.data,
                validate: state.validate,
                wordSuggArray: [action.payload, ...state.wordSuggArray!]
            });

        case reducerActions.RESETWORDSUGG:
            return ({
                city: state.city,
                data: state.data,
                validate: state.validate,
                wordSuggArray: []
            })
        default:
            return state

    }
}




// myReducer<reducerState, reducerAction>