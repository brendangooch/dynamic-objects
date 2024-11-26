/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicPosition } from './dynamic-position.js';

const EXPECT = new JestExpect();
let position: DynamicPosition
beforeEach(() => {
    position = new DynamicPosition();
});

testAll();
function testAll(): void {
    describe('DynamicPosition', () => {

        test('dummy', () => { });

    });

}