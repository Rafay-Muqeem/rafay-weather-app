

export async function Search(cityN: string) {

    try {
        const suggestion = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_WEATHER_KEY}&q=${cityN}`);
        const wordsArray = await suggestion.json();

        return wordsArray;

    }
    catch (e) {
        console.log(e);
    }



}




