import { useReducer } from 'react';
import Form from './Form';
import Weather from './Weather';
import { initialState, reducer } from '../Reducer/Reducer';


const Main = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    let time = new Date();
    let hour = time.getHours();

    if (!state.data ) {
        return <Form timeHour={hour} state={state} myDispatch={dispatch} />
    }

    return <Weather weatherObj={state.data} timeHour={hour} state={state} myDispatch={dispatch} /> 
        

}

export default Main;
