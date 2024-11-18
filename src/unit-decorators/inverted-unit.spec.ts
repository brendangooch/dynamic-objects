/**
 * 
 */

import { JestExpect } from "@brendangooch/jest-expect";
import { DynamicUnit } from "../unit/dynamic-unit.js";
import { InvertedUnit } from "./inverted-unit.js";
import { FlooredUnit } from "./floored-unit.js";

const EXPECT = new JestExpect();

let unit: InvertedUnit;
beforeEach(() => {
    unit = new InvertedUnit(new DynamicUnit());
});

testAll();
function testAll(): void {
    describe('InvertedUnit', () => {

        testCurrentValueAsExpectedDuringFullTransition();
        testCurrentValueAsExpectedDuringFullTransitionWithEaseApplied();
        testCloneBehavesAsExpectedDuringFullTransition();
        testCanBeCombinedWithOtherDecorators();

    });
}

function testCurrentValueAsExpectedDuringFullTransition(): void {
    test('current values as expected during full transition', () => {
        unit.duration(1000).start();
        EXPECT.truthy(unit.isActive);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.9);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.8);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.7);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.6);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.5);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.4);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.3);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.2);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
        unit.update(100);
        EXPECT.falsy(unit.isActive);
        EXPECT.toBe(unit.current, 0);
    });
}

function testCurrentValueAsExpectedDuringFullTransitionWithEaseApplied(): void {
    test('current values as expected during full transition with ease applied', () => {
        unit.duration(1000).ease('easeInQuad').start();
        EXPECT.truthy(unit.isActive);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 1 - (Math.pow(0.1, 2)));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 1 - (Math.pow(0.2, 2)));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 1 - (Math.pow(0.3, 2)));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 1 - (Math.pow(0.4, 2)));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 1 - (Math.pow(0.5, 2)));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 1 - (Math.pow(0.6, 2)));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 1 - (Math.pow(0.7, 2)));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 1 - (Math.pow(0.8, 2)));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 1 - (Math.pow(0.9, 2)));
        unit.update(100);
        EXPECT.falsy(unit.isActive);
        EXPECT.toBe(unit.current, 0);
    });
}

function testCloneBehavesAsExpectedDuringFullTransition(): void {
    test('clone behaves as expected during full transition', () => {

        unit.duration(1000);
        const clone = unit.clone();

        unit.start();
        clone.start();

        EXPECT.truthy(unit.isActive);
        EXPECT.truthy(clone.isActive);
        EXPECT.toBe(unit.current, 1);
        EXPECT.toBe(clone.current, 1);

        unit.update(100);
        clone.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.9);
        EXPECT.toBeCloseTo(clone.current, 0.9);

        unit.update(100);
        clone.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.8);
        EXPECT.toBeCloseTo(clone.current, 0.8);

        unit.update(100);
        clone.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.7);
        EXPECT.toBeCloseTo(clone.current, 0.7);

        unit.update(100);
        clone.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.6);
        EXPECT.toBeCloseTo(clone.current, 0.6);

        unit.update(100);
        clone.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.5);
        EXPECT.toBeCloseTo(clone.current, 0.5);

        unit.update(100);
        clone.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.4);
        EXPECT.toBeCloseTo(clone.current, 0.4);

        unit.update(100);
        clone.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.3);
        EXPECT.toBeCloseTo(clone.current, 0.3);

        unit.update(100);
        clone.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.2);
        EXPECT.toBeCloseTo(clone.current, 0.2);

        unit.update(100);
        clone.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
        EXPECT.toBeCloseTo(clone.current, 0.1);

        unit.update(100);
        clone.update(100);
        EXPECT.falsy(unit.isActive);
        EXPECT.falsy(clone.isActive);
        EXPECT.toBe(unit.current, 0);
        EXPECT.toBe(clone.current, 0);

    });
}

function testCanBeCombinedWithOtherDecorators(): void {
    test('can be combined with other decorators', () => {

        unit = new FlooredUnit(new InvertedUnit(new DynamicUnit()));
        unit.duration(1000).start();
        EXPECT.truthy(unit.isActive);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 0);
        unit.update(100);
        EXPECT.toBe(unit.current, 0);
        unit.update(100);
        EXPECT.toBe(unit.current, 0);
        unit.update(100);
        EXPECT.toBe(unit.current, 0);
        unit.update(100);
        EXPECT.toBe(unit.current, 0);
        unit.update(100);
        EXPECT.toBe(unit.current, 0);
        unit.update(100);
        EXPECT.toBe(unit.current, 0);
        unit.update(100);
        EXPECT.toBe(unit.current, 0);
        unit.update(100);
        EXPECT.toBe(unit.current, 0);
        unit.update(100);
        EXPECT.falsy(unit.isActive);
        EXPECT.toBe(unit.current, 0);

        unit = new InvertedUnit(new FlooredUnit(new DynamicUnit()));
        unit.duration(1000).start();
        EXPECT.truthy(unit.isActive);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.falsy(unit.isActive);
        EXPECT.toBe(unit.current, 0);

    });
}

