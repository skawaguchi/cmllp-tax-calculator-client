import test from 'tape';

import {getProvinceList} from '../../../src/factories/province-list';

test('# Province List > Given the list of provinces', (t) => {

    const provinceList = getProvinceList();
    const numberOfProvinces = 13;

    t.equal(provinceList.length, numberOfProvinces, `should have all ${numberOfProvinces} provinces`);

    t.end();

});
