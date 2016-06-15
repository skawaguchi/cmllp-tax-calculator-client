import test from 'tape';

import DevTools from '../../../src/containers/DevTools';

test('# <DevTools /> > Given the component has been imported', (t) => {

    const component = DevTools;

    t.equal(typeof component.instrument, 'function', 'should have an .instrument() method exposed');

    t.end();
});
