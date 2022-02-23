import React, { useEffect, useState, useReducer } from 'react';
import { reducerActions, weather, weatherData } from '../Types/Types';
import { Data } from '../service/Data';
import SearchIcon from '@mui/icons-material/Search';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import CircularProgress from '@mui/material/CircularProgress';
import { initialState, reducer } from '../Reducer/Reducer';

const Weather: React.FC<weather> = (data) => {

    const [state] = useReducer(reducer, initialState);
    let [background, setBackground] = useState<string>('');
    let [wthrload, setWthrload] = useState<boolean>(false);

    useEffect(() => {
        if (data.weatherObj.isDay) {
            if (data.weatherObj.weatherCond === 'Sunny' || data.weatherObj.weatherCond === 'Mostly sunny') {
                setBackground('weatherSunnyMorn');
            }
            else if (data.weatherObj.weatherCond === 'Hazy sunshine') {
                setBackground('weatherHazzySunshineMorn');
            }
            else if (data.weatherObj.weatherCond === 'Partly Sunny' || data.weatherObj.weatherCond === 'Intermittent clouds' || data.weatherObj.weatherCond === 'Clouds and sun') {
                setBackground('weatherPartlySunnyMorn');
            }
            else if (data.weatherObj.weatherCond === 'Mostly cloudy') {
                setBackground('weatherMostlyCloudyMorn');
            }
            else if (data.weatherObj.weatherCond === 'Cloudy') {
                setBackground('weatherCloudyMorn');
            }
            else if (data.weatherObj.weatherCond === 'Overcast') {
                setBackground('weatherOvercastMorn');
            }
            else if (data.weatherObj.weatherCond === 'Shower' || data.weatherObj.weatherCond === 'Rain') {
                setBackground('weatherRainMorn');
            }
            else if (data.weatherObj.weatherCond === 'Foggy' || data.weatherObj.weatherCond === 'Light fog') {
                setBackground('weatherFogMorn');
            }
            else if (data.weatherObj.weatherCond === 'Snow' || data.weatherObj.weatherCond === 'Light snow') {
                setBackground('weatherSnowMorn');
            }
            else {
                setBackground('weatherSunnyMorn');
            }
        }
        else {
            if (data.weatherObj.weatherCond === 'Clear' || data.weatherObj.weatherCond === 'Mostly clear') {
                setBackground('weatherClearNight');
            }
            else if (data.weatherObj.weatherCond === 'Partly cloudy' || data.weatherObj.weatherCond === 'Intermittent clouds') {
                setBackground('weatherPartlyClearNight');
            }
            else if (data.weatherObj.weatherCond === 'Mostly cloudy') {
                setBackground('weatherMostlyClearNight');
            }
            else if (data.weatherObj.weatherCond === 'Cloudy') {
                setBackground('weatherCloudyNight');
            }
            else if (data.weatherObj.weatherCond === 'Overcast') {
                setBackground('weatherOvercastNight');
            }
            else if (data.weatherObj.weatherCond === 'Shower' || data.weatherObj.weatherCond === 'Rain') {
                setBackground('weatherRainNight');
            }
            else if (data.weatherObj.weatherCond === 'Foggy' || data.weatherObj.weatherCond === 'Light fog') {
                setBackground('weatherFogNight');
            }
            else if (data.weatherObj.weatherCond === 'Snow') {
                setBackground('weatherSnowNight');
            }
            else {
                setBackground('weatherClearNight');
            }
        }

    }, [data.weatherObj.timeHour]);

    const back = () => {
        data.dispatch({ type: reducerActions.SET, payload: { city: '', data: null, validate: true } });
        data.dispatch({ type: reducerActions.RESETWORDSUGG })
    }
    async function refresh() {

        setWthrload(true);
        const temp: weatherData = await Data(data.weatherObj.id!, data.weatherObj.name!);
        data.dispatch({ type: reducerActions.SET, payload: { city: state.city, data: temp, validate: true } });
        setTimeout(() => {
            setWthrload(false);
        }, 1000);

    }


    return (
        <div>
            {wthrload ?
                <div id={background} className='weatherMain'>
                    <div className='weatherLoader'>
                        <CircularProgress color='info' />
                    </div>
                </div>
                :

                <div id={background} className='weatherMain' >
                    <div className='weatherMainUpper'>
                        <div className='weatherIcons'>
                            <SearchIcon fontSize='inherit' onClick={() => back()} />
                            <YoutubeSearchedForIcon fontSize='inherit' onClick={() => refresh()} />
                        </div>

                        <div className='weatherMainData'>
                            <h1>{data.weatherObj.name}</h1>
                            <span>{data.weatherObj.weatherCond}</span>
                            <h2>{data.weatherObj.temp}<span>&#176;</span></h2>
                            <span>Last Updated</span>
                            <span>{data.weatherObj.Time}</span>
                        </div>
                    </div>

                    <div className='weatherMainBottom'>
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
                                <span>WIND</span>
                                <span>{data.weatherObj.wind} km/h</span>
                            </div>

                            <div>
                                <span>PRESSURE</span>
                                <span>{data.weatherObj.pressure} hPa</span>
                            </div>
                        </div>

                        <div>
                            <div>
                                <span>PRECIPITATION</span>
                                <span>{data.weatherObj.precipitation} cm</span>
                            </div>

                            <div>
                                <span>UV INDEX</span>
                                <span>{data.weatherObj.UVindex}</span>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>

    );
}

export default Weather;
