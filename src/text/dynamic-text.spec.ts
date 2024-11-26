/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicText } from './dynamic-text.js';

const EXPECT = new JestExpect();
let text: DynamicText
beforeEach(() => {
    text = new DynamicText();
});

testAll();
function testAll(): void {
    describe('DynamicText', () => {

        test('dummy', () => { });



    });

}