/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicNumber } from './dynamic-number.js';

const EXPECT = new JestExpect();
let number: DynamicNumber
beforeEach(() => {
    number = new DynamicNumber();
});

testAll();
function testAll(): void {
    describe('DynamicNumber', () => {

        test('dummy', () => { });

    });

}