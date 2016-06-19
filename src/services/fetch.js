import 'isomorphic-fetch';

export function fetch(url, options) {

    const combinedOptions = Object.assign({}, options, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return global.fetch(url, combinedOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response;
        });
}
