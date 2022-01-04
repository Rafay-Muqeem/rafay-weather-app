import React,{ useReducer } from "react";
import { reducerState, reducerAction, myReducer } from "../Types/Types";

export const initialState: reducerState = {
    city: '',
    data: null,
    validate: true,
}

export const reducer: myReducer<reducerState, reducerAction> = (state: reducerState, action: reducerAction) => {
    switch(action.type){
        case 'SET':
            return ({
                city: action.payload.city,
                data: action.payload.data,
                validate: action.payload.validate,
            });

        // case 'SETCITY':
        //     return {
        //         city: action.payload
        //     }
                
        default:
            return state               

    }
}




