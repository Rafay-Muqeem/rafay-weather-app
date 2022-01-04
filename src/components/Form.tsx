import React, { useState } from 'react';
import { Data } from '../service/Data';
import { form, weatherData } from '../Types/Types';
import CircularProgress from '@mui/material/CircularProgress';

const Form: React.FC<form> = (info) => {


    let [formload, setFormload] = useState<boolean>(false);

    const Setter = () => {
        setFormload(true);
        wthrData();
    }

    const onEnter = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            setFormload(true);
            wthrData();
        }
    }

    async function wthrData() {
        
        if (info.state.city !== "") {
            try{
                const temp: weatherData = await Data(info.state.city);
                info.myDispatch({type: 'SET', payload: {city: '', data: temp, validate: true} });
            }
            catch(e){
                
                info.myDispatch({type: 'SET', payload: {city: '', data: null, validate: false} });
            }
        }
        setFormload(false);
    }  

    return (
        <div id={info.timeHour > 4 && info.timeHour < 18 ? 'displayMainMorn' : 'displayMainNight'} className='display'>
 
            <h1>Weather App</h1>
            {formload? <div> <CircularProgress color='info' /> </div>:
            <div>
                <input onKeyPress={ (e) => onEnter(e)} type={"text"} value={info.state.city} onChange={(e) => info.myDispatch({type : 'SET', payload: { city: e.target.value, data: null, validate: info.state.validate} })} placeholder='City...' autoFocus />
                <button onClick={() => Setter()} >Get Weather</button>
                {!info.state.validate? <p>No results found</p>: null}
            </div>
            }

        </div>
    );
}

export default Form;