import {fetch as fetchCall} from './fetch';

const canadaCountryCode = 'CA';

export function processLocation(body) {
    if (body.country === canadaCountryCode) {
        return {
            country: body.country,
            province: body.region
        };
    }
    return {
        error: `The country returned was ${ body.country }. To find the Canadian province, you must be in Canada.`
    };

}

export function getProvince() {
    const resourceURL = 'http://ipinfo.io';

    return fetchCall(resourceURL)
        .then((response) => response.json())
        .catch((error) => Promise.reject(error));
}
