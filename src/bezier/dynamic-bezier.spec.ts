/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicBezier } from './dynamic-bezier.js';

const EXPECT = new JestExpect();
let bezier: DynamicBezier
beforeEach(() => {
    bezier = new DynamicBezier();
});

testAll();
function testAll(): void {
    describe('DynamicBezier', () => {

        test('dummy', () => { });

    });
}