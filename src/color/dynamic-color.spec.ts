/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicColor } from './dynamic-color.js';

const EXPECT = new JestExpect();
let color: DynamicColor
beforeEach(() => {
    color = new DynamicColor();
});

testAll();
function testAll(): void {
    describe('DynamicColor', () => {

        test('dummy', () => { });

    });

}