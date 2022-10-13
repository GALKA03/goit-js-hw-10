import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
var debounce = require('lodash.debounce');
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
refs = {
    input: document.querySelector('input'),
    countryMenu: document.querySelector('.country-list'),
    //item: document.querySelector('.country-item'),
    countryInfo: document.querySelector('.country-info'),
countryInfolist: document.querySelector('.country-info__list')
    

 }

refs.input.addEventListener('input', debounce(onInputCountry),DEBOUNCE_DELAY);


// if (!String.prototype.trim) {
//   (function() {
//     String.prototype.trim = function() {
//       return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
//     };
//   })();
// }

function onInputCountry(e) { 
    e.preventDefault();
    let name = e.target.value.trim();
    console.log(name)
    if (name === '') {
        return (refs.countryMenu.innerHTML = ''), (refs.countryInfolist.innerHTML = '')
    };

    fetchCountries(name)
        .then((countries) => {
            console.log(countries)
             
            if (countries.length >= 10) {
                console.log('Too many matches found. Please enter a more specific name.')
              refs.countryMenu.innerHTML = ''
             refs.countryInfolist.innerHTML = ''
                return   
            }
            if (countries.length <= 10){
               let listMarcup = refs.countryMenu.insertAdjacentHTML("beforeend", onMarcapList(countries))    
            //      refs.countryMenu.innerHTML = listMarcup.join('')
            //   refs.countryInfolist.innerHTML = ''
                
            }
            if (countries.length === 1) {
                let infoMarkup = refs. countryInfo.insertAdjacentHTML("beforeend", onMarcapInfo(countries)) 
console.log(infoMarkup)
               refs.countryMenu.innerHTML = '';
               refs.countryInfolist.innerHTML = infoMarkup.join('');
               
            }

            //return refs.countryMenu.innerHTML = ''
        //      refs.countryInfolist.innerHTML = '';
            })
          
        .catch((error => {
            console.log("Oops, there is no country with that name")
           return error;
        
        }))
     
}
// function closeMarcupText() {
//     if (countries.length === 1) {
//         let elem = document.querySelector(".country-item");
//         console.log(elem)
//  listMarcup.removeChild(elem);
// }
//     else if (countries.length <= 10) {
//         let elem = document.querySelector(".menu__country-item-inform")
//             console.log(elem);
// infoMarkup.removeChild(elem);
//  }

//             refs.countryMenu.removeChild(document.querySelector('.country-item'));
//            refs.countryMenu.remove();
 //}

function onMarcapList(countries) {
    const marcup = countries
        .map(({ name, flags }) => {
            return `<li class = "country-item">
            <img class = "country__flag" srs = "${flags.svg}" alt ="flag of ${name.official}">
            <h1 class = "country__name">${name.official}</h1>
            </li>
            `
        }).join('');
    return marcup;
}
        

function onMarcapInfo(countries) {
    const marcup = countries
        .map(({ capital, population, languages, name, flags }) => {
            return `
                <ul class ="menu__country-item-inform">
<li class = "country-item-inform">
            <img class = "country__flag" srs = "${flags.svg}" alt ="flag of ${name.official}">
            <h2 class = "country__name">${name.official}</h2>
            
                   <p><b>Capital:</b>${capital}</p> <li> 
                    <p><b>Population:</b>${population}</p>  
                     <p><b>Languages:</b>${languages}</p> <li> 
          </ul>  `

        }).join('');
    return marcup;
  
}