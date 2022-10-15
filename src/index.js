import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
var debounce = require('lodash.debounce');
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('input'),
    countryMenu: document.querySelector('.country-list'),
    //item: document.querySelector('.country-item'),
countryInfo: document.querySelector('.country-info'),
countryInfolist: document.querySelector('.country-info__list'),
articlesContainer: document.querySelector('.js-articles')

 }

refs.input.addEventListener('input', debounce(onInputCountry),DEBOUNCE_DELAY);
 
function onInputCountry(e) { 
    e.preventDefault();
  
    let name = e.target.value.trim();
    if ((name === '')) {
        refs.countryMenu.innerHTML = '';
        refs.countryInfo.innerHTML = '';
    return
} 
    fetchCountries(name)
        .then((countries) => {
  clearArticlesContainer()
            if (countries.length === 1) {
               refs.countryMenu.insertAdjacentHTML("beforeend", onMarcapList(countries))
                refs.countryInfo.insertAdjacentHTML("beforeend", onMarcapInfo(countries))
            }
           else if (countries.length < 10){
              refs.countryMenu.insertAdjacentHTML("beforeend", onMarcapList(countries))   
    //refs.countryInfo.innerHTML = '' 
            }
 else if (countries.length >= 10 ) {
              Notiflix.Notify.info('Too many matches found. Please enter a more specific name.') 
            }
            })
          
        .catch((error) => {   
            
            if (error.status = 404) {
         refs.countryMenu.innerHTML = '';
            refs.countryInfo.innerHTML = '';   
            }
             
            return Notiflix.Notify.failure("Oops, there is no country with that name")
        })
    
    }
function clearArticlesContainer() {
     refs.countryMenu.innerHTML = ''
    refs.countryInfo.innerHTML = '';
    
}

function onMarcapList(countries) {
    const marcup = countries
        .map(({ name, flags }) => {
            return `<li class = "country-item">
            <img class = "country__flag" src = "${flags.svg}" alt ="flag of ${name.official}" width = 40px height = 30px>
            <h1 class = "country__name">${name.official}</h1>
            </li>
            `
        }).join('');

    return marcup;
}
function onMarcapInfo(countries) {
    const marcup = countries
        .map(({ capital, population, languages}) => {
            return `<ul class ="menu__country-item-inform">
<li class = "country-item-inform"
                   <p><b>Capital: </b>${capital}</p> 
                    <p><b>Population: </b>${population}</p>  
                     <p><b>Languages: </b>${Object.values(languages)}</p> </li> 
          </ul>  `

        }).join('');
    return marcup;
  
}