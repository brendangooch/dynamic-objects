/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicWaveForm } from './dynamic-wave-form.js';

const EXPECT = new JestExpect();
let wave: DynamicWaveForm
beforeEach(() => {
    wave = new DynamicWaveForm();
});

testAll();
function testAll(): void {
    describe('DynamicWaveForm', () => {

        test('dummy', () => { });

    });

}