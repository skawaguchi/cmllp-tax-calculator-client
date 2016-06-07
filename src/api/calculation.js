import queryString from 'query-string';
import 'isomorphic-fetch';

const serviceURL = 'https://cmllp-tax-calculator-api.herokuapp.com'; // This will be made dynamic later

export function getCalculation(payload = {province: 'on'}) {
    const params = payload ? `?${queryString.stringify(payload)}` : '';
    const resourceURL = `${serviceURL}/calculations${params}`;

    return fetch(resourceURL)
        .then((response) => {
            return response.json();
        });
}
