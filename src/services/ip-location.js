import {fetch as fetchCall} from './fetch';

export function getProvince() {
    const resourceURL = 'http://ipinfo.io';
    return fetchCall(resourceURL)
        .then((response) => response.json())
        .catch((error) => Promise.reject(error));
}
