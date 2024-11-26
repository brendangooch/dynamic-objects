/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicRotation } from './dynamic-rotation.js';

const EXPECT = new JestExpect();
let rotation: DynamicRotation
beforeEach(() => {
    rotation = new DynamicRotation();
});

testAll();
function testAll(): void {
    describe('DynamicRotation', () => {

        test('dummy', () => { });

    });

}