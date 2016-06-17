import test from 'ava';

import {getProvinceList} from '../../../src/factories/province-list';

test('should have all of the provinces', (t) => {
    const provinceList = getProvinceList();
    const numberOfProvinces = 13;

    t.is(provinceList.length, numberOfProvinces);
});
