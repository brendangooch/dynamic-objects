/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicVector } from './dynamic-vector.js';

const EXPECT = new JestExpect();
let vector: DynamicVector
beforeEach(() => {
    vector = new DynamicVector();
});

testAll();
function testAll(): void {
    describe('DynamicVector', () => {

        test('dummy', () => { });


    });

}