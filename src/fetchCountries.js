const filterResponse = '?fields=name,capital,population,flags,languages';

export const fetchCountries = name => {
  return fetch(`https://restcountries.com/v3.1/name/${name}${filterResponse}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    }
  );
};
