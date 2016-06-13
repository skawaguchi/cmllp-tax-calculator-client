import 'isomorphic-fetch';

export function fetch(url, options = {}) {
    const root = global !== undefined ? global : window !== undefined ? window : this;

    const combinedOptions = Object.assign({}, options, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    return root.fetch(url, combinedOptions)
        .then((response) => {
            if(!response.ok) {
                Promise.reject(response);
            }
            return response;
        });
}
