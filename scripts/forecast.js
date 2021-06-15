const key = '1z6PHo7fc4thwKBwpvAGOIisVGnUArVF';

let citySearch = async (city) => {
    let url = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    let cityApi = `?apikey=${key}&q=${city}`

    let response = await fetch(url + cityApi);
    let data = await response.json();
    return data[0];
}

let temperature = async (cityKey) => {
    let url = 'http://dataservice.accuweather.com/currentconditions/v1/';
    let cityApi = `${cityKey}?apikey=${key}`;

    let response = await fetch(url + cityApi);
    let data = await response.json();
    return data[0];
}


let form = document.querySelector('.search');
let imeGrada = document.querySelector('.imeGrada');
let temp = document.querySelector('#temperature');
let description = document.querySelector('#description');
let icon = document.querySelector('.icon');
let container = document.querySelector('.container');
let deg = document.querySelector('.deg');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let grad = form.city.value.trim();
    let cityKey;
    citySearch(grad).then(obj => {
        imeGrada.innerHTML = obj.EnglishName;
        console.log(obj);
        cityKey = obj.Key;
        temperature(cityKey).then(obj =>{
            console.log(obj);
            temp.innerHTML = obj.Temperature.Metric.Value;
            description.innerHTML = obj.WeatherText;
            icon.innerHTML = `<img src="img/icons/${obj.WeatherIcon}.svg">`;
            deg.style.display = 'inline';
            if(obj.IsDayTime == true){
                container.style.backgroundImage = "url('img/day.svg')";
                container.style.color = '#000';
            } else {
                container.style.backgroundImage = "url('img/night.svg')";
                container.style.color = '#fff';
            }
        })
    });

    form.reset();
})