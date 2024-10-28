/**
 *
 */

import { DynamicUnit } from "./dynamic-unit.js";
import { RoundedDynamicUnit } from "./rounded-dynamic-unit.js";

testAll();
function testAll(): void {
    describe('RoundedDynamicUnit', () => {
        testOutputAsExpectedDuringFullDurationCycle();
        testCloneBehavesSameAsOriginal();


    });
}

function testOutputAsExpectedDuringFullDurationCycle(): void {
    test('output as expected during full duration cycle', () => {

        const unit = new RoundedDynamicUnit(new DynamicUnit());
        expect(unit.current).toBe(0);

        unit.duration(1000).run();
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);

        expect(unit.current).toBe(1);

    });
}

function testCloneBehavesSameAsOriginal(): void {
    test('cloned unit behaves same as original', () => {

        const unit = new RoundedDynamicUnit(new DynamicUnit());
        expect(unit.current).toBe(0);

        unit.duration(1000).run();
        const clone = unit.clone();

        // original
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);

        expect(unit.current).toBe(1);

        // clone
        clone.run();
        clone.update(100);
        expect(clone.current).toBe(0);
        clone.update(100);
        expect(clone.current).toBe(0);
        clone.update(100);
        expect(clone.current).toBe(0);
        clone.update(100);
        expect(clone.current).toBe(0);
        clone.update(100);
        expect(clone.current).toBe(1);
        clone.update(100);
        expect(clone.current).toBe(1);
        clone.update(100);
        expect(clone.current).toBe(1);
        clone.update(100);
        expect(clone.current).toBe(1);
        clone.update(100);
        expect(clone.current).toBe(1);
        clone.update(100);

        expect(clone.current).toBe(1);


    });
}