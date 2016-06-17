import test from 'ava';

import DevTools from '../../../src/containers/DevTools';

test('should exposed `instrument`', (t) => {
    const component = DevTools;

    t.is(typeof component.instrument, 'function');
});
