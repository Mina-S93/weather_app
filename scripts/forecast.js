const key = '3bba488930074539b2380128212604';

let citySearch = (city) => {
    let url = 'https://api.weatherapi.com/v1/current.json';
    let cityApi = `?key=${key}&q=${city}`;

    // let response = await fetch(url + cityApi);
    // let data = await response.json();
    // return data[0];

    let res = fetch(url + cityApi)
    .then((response) => response.json())
    .then((data) => {console.log(data); return data});
    return res;

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
    citySearch(grad).then(obj => {
        imeGrada.innerHTML = obj.location.name;
        temp.innerHTML = obj.current.temp_c;
        description.innerHTML = obj.current.condition.text;
        icon.innerHTML = `<img src="${obj.current.condition.icon.slice(21)}">`;
        deg.style.display = 'inline';
        if(obj.current.is_day == 1){
                container.style.backgroundImage = "url('img/day.svg')";
                container.style.color = '#000';
            } else {
                container.style.backgroundImage = "url('img/night.svg')";
                container.style.color = '#fff';
        }

    });

    form.reset();
});