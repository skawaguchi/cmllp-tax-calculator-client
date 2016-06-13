import 'isomorphic-fetch';

export function fetch(url, options) {
    const root = typeof global !== 'undefined' ? global : window;

    const combinedOptions = Object.assign({}, options, {
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        mode: 'cors'
    });

    return root.fetch(url, combinedOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response;
        });
}
