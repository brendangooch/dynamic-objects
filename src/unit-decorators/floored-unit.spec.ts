/**
 * 
 */

import { JestExpect } from "@brendangooch/jest-expect";
import { DynamicUnit } from "../unit/dynamic-unit.js";
import { FlooredUnit } from "./floored-unit.js";
import { InvertedUnit } from "./inverted-unit.js";

const EXPECT = new JestExpect();

let unit: FlooredUnit;
beforeEach(() => {
    unit = new FlooredUnit(new DynamicUnit());
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
        EXPECT.toBe(unit.current, 0);
        unit.update(100);
        EXPECT.falsy(unit.isActive);
        EXPECT.toBe(unit.current, 1);
    });
}

function testCurrentValueAsExpectedDuringFullTransitionWithEaseApplied(): void {
    test('current values as expected during full transition with ease applied', () => {
        unit.duration(1000).ease('easeInQuad').start();
        EXPECT.truthy(unit.isActive);
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
        EXPECT.toBe(unit.current, 0);
        unit.update(100);
        EXPECT.falsy(unit.isActive);
        EXPECT.toBe(unit.current, 1);
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
        EXPECT.toBe(unit.current, 0);
        EXPECT.toBe(clone.current, 0);

        unit.update(100);
        clone.update(100);
        EXPECT.toBe(unit.current, 0);
        EXPECT.toBe(clone.current, 0);

        unit.update(100);
        clone.update(100);
        EXPECT.toBe(unit.current, 0);
        EXPECT.toBe(clone.current, 0);

        unit.update(100);
        clone.update(100);
        EXPECT.toBe(unit.current, 0);
        EXPECT.toBe(clone.current, 0);

        unit.update(100);
        clone.update(100);
        EXPECT.toBe(unit.current, 0);
        EXPECT.toBe(clone.current, 0);

        unit.update(100);
        clone.update(100);
        EXPECT.toBe(unit.current, 0);
        EXPECT.toBe(clone.current, 0);

        unit.update(100);
        clone.update(100);
        EXPECT.toBe(unit.current, 0);
        EXPECT.toBe(clone.current, 0);

        unit.update(100);
        clone.update(100);
        EXPECT.toBe(unit.current, 0);
        EXPECT.toBe(clone.current, 0);

        unit.update(100);
        clone.update(100);
        EXPECT.toBe(unit.current, 0);
        EXPECT.toBe(clone.current, 0);

        unit.update(100);
        clone.update(100);
        EXPECT.toBe(unit.current, 0);
        EXPECT.toBe(clone.current, 0);

        unit.update(100);
        clone.update(100);
        EXPECT.falsy(unit.isActive);
        EXPECT.falsy(clone.isActive);
        EXPECT.toBe(unit.current, 1);
        EXPECT.toBe(clone.current, 1);

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
