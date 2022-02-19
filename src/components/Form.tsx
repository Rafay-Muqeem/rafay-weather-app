import React, { useState, useReducer, useEffect } from 'react';
import { Data } from '../service/Data';
import { reducerActions, weatherData, wordSuggForm } from '../Types/Types';
import CircularProgress from '@mui/material/CircularProgress';
import { initialState, reducer } from '../Reducer/Reducer';
import Weather from './Weather';
import { Search } from '../service/Search';

const Form = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    let [formload, setFormload] = useState<boolean>(false);
    let [serverErr, setServerErr] = useState<boolean>(false);
    let time = new Date();
    let hour = time.getHours();

    const Setter = (searchCityId: number | undefined, searchCityName: string | undefined) => {
        setFormload(true);

        if (searchCityId !== undefined && searchCityName !== undefined) {

            wthrData(searchCityId, searchCityName);
        }

    }

    // const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         setFormload(true);

    //         console.log(state.city);

    //         // wthrData();
    //     }
    // }


    useEffect(() => {
        const delay = setTimeout( () => {
            async function wordSuggestion() {
                if (state.city !== '') {
    
                    dispatch({ type: reducerActions.RESETWORDSUGG });
    
                    try {
                        let wordsArr = await Search(state.city);

                        if(wordsArr.length === 0){
                            dispatch({ type: reducerActions.SET, payload: { city: state.city, data: state.data, validate: false}})
                        }
                        else{
                            wordsArr.map((wordObj: any, ind: number) => {

                                dispatch({
                                    type: reducerActions.SETWORDSUGG, payload: {
                                        cityId: wordObj.Key,
                                        cityName: wordObj.LocalizedName,
                                        stateName: wordObj.AdministrativeArea.LocalizedName,
                                        countryName: wordObj.Country.LocalizedName
                                    }
        
                                })

                                dispatch({ type: reducerActions.SET, payload: { city: state.city, data: state.data, validate: true}})
        
                            });
                        }
                        
                    }
    
                    catch (e) {
                        setServerErr(true);
                        setTimeout(() => {
                            setServerErr(false);
                        }, 5000)
                    }
    
                }
                else {
                    dispatch({ type: reducerActions.RESETWORDSUGG });
                    dispatch({ type: reducerActions.SET, payload: { city: state.city, data: state.data, validate: true}})
                }
            }
            wordSuggestion();
            
        }, 1200);

        return () => clearTimeout(delay)
        

    }, [state.city]);

    async function wthrData(getCityId: number , getCityName: string ) {
        
        if (getCityId !== undefined && getCityName !== undefined) {
            try {
                const temp: weatherData = await Data(getCityId, getCityName);
                dispatch({ type: reducerActions.SET, payload: { city: getCityName, data: temp, validate: true } });
                
            }
            catch (e) {
                dispatch({ type: reducerActions.SET, payload: { city: '', data: null, validate: false } });
            }
        }
        setFormload(false);

    }

    if (state.data) {
        return <Weather weatherObj={state.data} dispatch={dispatch} />
    }

    return (
        <div id={hour > 4 && hour < 18 ? 'displayMainMorn' : 'displayMainNight'} className='display'>
            <div>
                <div className='img1'></div>
            </div>
            <h1>Weather App</h1>
            {formload ? <div> <CircularProgress color='info' /> </div> :
                <div className='form'>
                    <div >
                        <input type={"text"} value={state.city} onChange={(e) => dispatch({ type: reducerActions.SET, payload: { city: e.target.value, data: state.data, validate: true } })} placeholder='City...' />

                        {state.wordSuggArray ?

                            <div>
                                <ul>
                                    {state.wordSuggArray.map((wordObj: wordSuggForm, ind: number) => {

                                        return (
                                            <li key={wordObj.cityId} onClick={() => Setter(wordObj.cityId, wordObj.cityName)} >{wordObj.cityName}, {wordObj.stateName}, {wordObj.countryName} </li>
                                        );

                                    })}

                                </ul>
                            </div>

                            : null}
                    </div>
                    {!state.validate ? <p>No Results Found</p> : null}
                    {serverErr? <p>Internal Server Error</p> : null}
                </div>
            }

        </div>
    );
}

export default Form;