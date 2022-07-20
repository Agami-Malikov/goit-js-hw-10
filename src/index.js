import './css/styles.css';

import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inp = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

function onCountrySearchInput() {
  const inpVal = inp.value.trim();
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';

  fetchCountries(inpVal)
    .then(countries => {
      console.log(countries);
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        onRenderCountries(countries);
      }
      onRenderCountry(countries);
    })
    .catch(() => {
      Notiflix.Notify.failure('Oopsie, there is no country with that name ');
    });
}

inp.addEventListener('input', debounce(onCountrySearchInput, DEBOUNCE_DELAY));

function onRenderCountries(countries) {
  const card = countries
    .map(country => {
      return `<li class = country-list__item>
      <img class = country-list__img src="${country.flags.svg}" alt="${country.name.common} flag" width=50 height=50/>
      <p class = country-list__text>${country.name.official}</p>
      </li>`;
    })
    .join('');
  return (countryList.innerHTML = card);
}

function onRenderCountry(country) {
  const markup = country
    .map(country => {
      return `
      <div class = country-info__flag>
        <img src="${country.flags.svg}" alt="${
        country.name.common
      }" height = 60 width = 60>
        <h1 class = country-info__title> ${country.name.official}</h1>
      </div>
      <p class = country-info__text><strong>Capital:</strong> ${
        country.capital
      }</p>
      <p class = country-info__text><strong>Population:</strong> ${
        country.population
      }</p>
      <p><strong>Languages:</strong> ${Object.values(country.languages)}</p>`;
    })
    .join('');
  return (countryInfo.innerHTML = markup);
}
