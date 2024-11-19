/**
 * 
 */

import { JestExpect } from "@brendangooch/jest-expect";
import { DynamicScale } from "./dynamic-scale.js";

const EXPECT = new JestExpect();
testAll();
function testAll(): void {
    describe('DynamicScale', () => {

        test('initial value is 1', () => {
            const scale = new DynamicScale();
            EXPECT.toBe(scale.current, 1);
        });

        test('initial value is clamped above 0', () => {
            const scale = new DynamicScale(-1);
            EXPECT.toBe(scale.current, 0);
        });

        test('next value is clamped above 0', () => {
            const scale = new DynamicScale();
            scale.next(-1).change();
            EXPECT.toBe(scale.current, 0);
        });


    });
}