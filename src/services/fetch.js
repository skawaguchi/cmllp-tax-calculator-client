import 'isomorphic-fetch';

export function fetch(url, options) {
    const root = typeof global !== 'undefined' ? global : window;

    const combinedOptions = Object.assign({}, options, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return root.fetch(url, combinedOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response;
        });
}
