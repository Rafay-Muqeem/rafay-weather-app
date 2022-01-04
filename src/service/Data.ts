import { weatherData } from "../Types/Types";

export const Data = async (city: string) => {

    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_MY_API_KEY}`);
    const data = await api.json();

    console.log(data);

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
        name: data.name,
        feel: Math.round(data.main.feels_like - 273.15),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temp: Math.round(data.main.temp - 273.15),
        visibility: data.visibility / 1000,
        weatherDesc: data.weather[0].main,
        sunRise: timeConverter(data.sys.sunrise),
        sunSet: timeConverter(data.sys.sunset),
        lastUpdateTime: timeConverter(data.dt)
    }

    return weather;

}