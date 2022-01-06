import React, { useState, useReducer } from 'react';
import { Data } from '../service/Data';
import { weatherData } from '../Types/Types';
import CircularProgress from '@mui/material/CircularProgress';
import { initialState, reducer } from '../Reducer/Reducer';
import Weather from './Weather';

const Form = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    let [formload, setFormload] = useState<boolean>(false);

    const Setter = () => {
        setFormload(true);
        wthrData();
    }

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setFormload(true);
            wthrData();
        }
    }

    async function wthrData() {

        if (state.city !== "") {
            try {
                const temp: weatherData = await Data(state.city);
                dispatch({ type: 'SET', payload: { city: '', data: temp, validate: true } });
            }
            catch (e) {

                dispatch({ type: 'SET', payload: { city: '', data: null, validate: false } });
            }
        }
        setFormload(false);

    }

    let time = new Date();
    let hour = time.getHours();

    if (state.data) {
        return <Weather weatherObj={state.data} state={state} myDispatch={dispatch} />
    }

    return (
        <div id={hour > 4 && hour < 18 ? 'displayMainMorn' : 'displayMainNight'} className='display'>
            <div>
                <div className='img1'>

                </div>
                <div className='img2'>

                </div>
            </div>
            <h1>Weather App</h1>
            {formload ? <div> <CircularProgress color='info' /> </div> :
                <div>
                    <input onKeyPress={(e) => onEnter(e)} type={"text"} value={state.city} onChange={(e) => dispatch({ type: 'SET', payload: { city: e.target.value, data: null, validate: state.validate } })} placeholder='City...' autoFocus />
                    <button onClick={() => Setter()} >Get Weather</button>
                    {!state.validate ? <p>No results found</p> : null}
                </div>
            }

        </div>
    );
}

export default Form;