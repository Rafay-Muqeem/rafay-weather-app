// https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_MY_API_KEY}


import { weatherData } from "../Types/Types";

export const Data = async (dataCityKey: number, dataCityName: string) => {

    const api = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${dataCityKey}?apikey=${process.env.REACT_APP_WEATHER_KEY}&details=true`);
    const data = await api.json();

    function getcurrentHour(eTime: number) {
        var b = new Date(eTime * 1000);
        var hour = b.getHours();

        return hour;
    }

    function timeConverter(UNIX_timestamp: number) {
        var a = new Date(UNIX_timestamp * 1000);
        var hour = a.getHours();
        var min = a.getMinutes();
        var time;

        if (hour > 11) {
            if (hour === 12) {
                if (min < 10) {
                    time = hour + ':' + '0' + min + ' PM ';
                }
                else {
                    time = hour + ':' + min + ' PM ';
                }
            }
            else {
                if (min < 10) {
                    time = hour - 12 + ':' + '0' + min + ' PM ';
                }
                else {
                    time = hour - 12 + ':' + min + ' PM ';
                }
            }

        }
        else {
            if (hour === 0) {
                if (min < 10) {
                    time = hour + 12 + ':' + '0' + min + ' AM ';
                }
                else {
                    time = hour + 12 + ':' + min + ' AM ';
                }
            }
            else {
                if (min < 10) {
                    time = hour + ':' + '0' + min + ' AM ';
                }
                else {
                    time = hour + ':' + min + ' AM ';
                }
            }

        }

        return time;
    }

    let weather: weatherData = {
        id: dataCityKey,
        name: dataCityName,
        weatherCond: data[0].WeatherText,
        feel: Math.round(data[0].RealFeelTemperature.Metric.Value),
        humidity: data[0].RelativeHumidity,
        pressure: data[0].Pressure.Metric.Value,
        temp: Math.round(data[0].Temperature.Metric.Value),
        wind: data[0].Wind.Speed.Metric.Value,
        Time: timeConverter(data[0].EpochTime),
        timeHour: getcurrentHour(data[0].EpochTime),
        UVindex: data[0].UVIndex,
        precipitation: data[0].PrecipitationSummary.Precipitation.Metric.Value,
        isDay: data[0].IsDayTime,
        weatherIcon: data[0].WeatherIcon
    }

    return weather;

}