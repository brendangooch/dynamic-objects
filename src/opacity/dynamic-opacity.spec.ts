/**
 * 
 */

import { JestExpect } from "@brendangooch/jest-expect";
import { DynamicOpacity } from "./dynamic-opacity.js";

const EXPECT = new JestExpect();

testAll();
function testAll(): void {
    describe('DynamicOpacity', () => {

        test('default initial value is 1', () => {
            const opacity = new DynamicOpacity();
            EXPECT.toBe(opacity.current, 1);
        });

        test('initial value clamped above 0', () => {
            const opacity = new DynamicOpacity(-0.05);
            EXPECT.toBe(opacity.current, 0);
        });

        test('initial value clamped below 1', () => {
            const opacity = new DynamicOpacity(1.1);
            EXPECT.toBe(opacity.current, 1);
        });

        test('next value clamped above 0', () => {
            const opacity = new DynamicOpacity();
            opacity.next(-0.1).change();
            EXPECT.toBe(opacity.current, 0);
        });

        test('next value clamped below 1', () => {
            const opacity = new DynamicOpacity();
            opacity.next(1.1).change();
            EXPECT.toBe(opacity.current, 1);
        });

        test('fadeOut() sets value to 0, if not active', () => {
            const opacity = new DynamicOpacity();
            opacity.fadeOut().change();
            EXPECT.toBe(opacity.current, 0);
            opacity.duration(1000).next(0.5).change();
            EXPECT.truthy(opacity.isActive);
            opacity.update(100);
            EXPECT.toBeCloseTo(opacity.current, 0.05);
            opacity.fadeOut().change();
            EXPECT.toBeCloseTo(opacity.current, 0.05);
        });

        test('fadeIn() sets value to 1, if not active', () => {
            const opacity = new DynamicOpacity(0);
            opacity.fadeIn().change();
            EXPECT.toBe(opacity.current, 1);
            opacity.duration(1000).next(0.5).change();
            EXPECT.truthy(opacity.isActive);
            opacity.update(100);
            EXPECT.toBeCloseTo(opacity.current, 0.95);
            opacity.fadeIn().change();
            EXPECT.toBeCloseTo(opacity.current, 0.95);
        });


    });
}