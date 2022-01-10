import React, { useEffect, useState, useReducer } from 'react';
import { weather, weatherData } from '../Types/Types';
import { Data } from '../service/Data';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import { initialState, reducer } from '../Reducer/Reducer';

const Weather: React.FC<weather> = (data) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    let [background, setBackground] = useState<string>('');
    let [wthrload, setWthrload] = useState<boolean>(false);

    useEffect(() => {
        console.log("here");
        console.log(data.weatherObj.timezoneHour);
        if (data.weatherObj.timezoneHour > 4 && data.weatherObj.timezoneHour < 18) {
            if (data.weatherObj.weatherDesc === 'Clear') {
                setBackground('weatherClearMorn');
            }
            else if(data.weatherObj.weatherDesc === 'Clouds') {
                setBackground('weatherCloudyMorn');
            }
            else if(data.weatherObj.weatherDesc === 'Rain') {
                setBackground('weatherRainMorn');
            }
            else{
                setBackground('weatherFoggyMorn');
            }
        }
        else {
            if (data.weatherObj.weatherDesc === 'Clear') {
                setBackground('weatherClearNight');
            }
            else if(data.weatherObj.weatherDesc === 'Clouds') {
                setBackground('weatherCloudyNight');
            }
            else if(data.weatherObj.weatherDesc === 'Rain') {
                setBackground('weatherRainNight');
            }
            else{
                setBackground('weatherFoggyNight');
            }
        }
    }, [data.weatherObj.timezoneHour]);

    async function refresh() {
        setWthrload(true);
        const temp: weatherData = await Data(data.weatherObj.name);
        data.myDispatch({type : 'SET', payload: { city: data.state.city, data: temp, validate: true}});
        setInterval( () => {
            setWthrload(false);
        }, 1000);
        
    }

    return (
        <div>
            {wthrload? 
            <div id={background}>
                <div className='weatherLoader'>
                    <CircularProgress color='info' />
                </div>
            </div>
            :    

            <div id={background} className='weatherMain' >
                <div className='weatherMainUpper'>
                    <div className='weatherIcons'>
                        <ArrowBackIcon fontSize='inherit' onClick={() => data.myDispatch({type: 'SET', payload: {city: '', data: null , validate: true  }}) } />
                        <RefreshIcon fontSize='inherit' onClick={() => refresh()} />
                    </div>
                    
                    <div className='weatherMainData'>
                        <h1>{data.weatherObj.name}</h1>
                        <span>{data.weatherObj.weatherDesc}</span>
                        <h2>{data.weatherObj.temp}<span>&#176;</span></h2>
                        <span>Last Updated</span>
                        <span>{data.weatherObj.lastUpdateTime}</span>
                    </div>
                </div>

                <div className='weatherMainBottom'>
                    <div>
                        <div>
                            <span>SUNRISE</span>
                            <span>{data.weatherObj.sunRise}</span>
                        </div>

                        <div>
                            <span>SUNSET</span>
                            <span>{data.weatherObj.sunSet}</span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <span>FEELS LIKE</span>
                            <span>{data.weatherObj.feel}<span>&#176;</span></span>
                        </div>

                        <div>
                            <span>HUMIDITY</span>
                            <span>{data.weatherObj.humidity}%</span>
                        </div>
                    </div>    

                    <div>
                        <div>
                            <span>PRESSURE</span>
                            <span>{data.weatherObj.pressure} hPa</span>
                        </div>

                        <div>
                            <span>VISIBILITY</span>
                            <span>{data.weatherObj.visibility} km</span>
                        </div>
                    </div>
                </div>
            </div>
            
            }
        </div>
        
    );
}

export default Weather;
