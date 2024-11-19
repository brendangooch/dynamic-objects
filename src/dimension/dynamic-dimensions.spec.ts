/**
 * 
 */

import { JestExpect } from "@brendangooch/jest-expect";
import { DynamicDimension } from "./dynamic-dimension.js";

const EXPECT = new JestExpect();
testAll();
function testAll(): void {
    describe('DynamicDimension', () => {

        test('initial value is 0', () => {
            const dimension = new DynamicDimension();
            EXPECT.toBe(dimension.current, 0);
        });

        test('initial value is clamped above 0', () => {
            const dimension = new DynamicDimension(-1);
            EXPECT.toBe(dimension.current, 0);
        });

        test('next value is clamped above 0', () => {
            const dimension = new DynamicDimension();
            dimension.next(-1).change();
            EXPECT.toBe(dimension.current, 0);
        });

        test('current value is rounded to nearest integer', () => {
            const dimension = new DynamicDimension();
            dimension.duration(1000).next(117.6).change();
            EXPECT.truthy(dimension.isActive);

            dimension.update(100);
            EXPECT.toBe(dimension.current, Math.round(117.6 * 0.1));
            dimension.update(100);
            EXPECT.toBe(dimension.current, Math.round(117.6 * 0.2));
            dimension.update(100);
            EXPECT.toBe(dimension.current, Math.round(117.6 * 0.3));
            dimension.update(100);
            EXPECT.toBe(dimension.current, Math.round(117.6 * 0.4));

        });

    });
}