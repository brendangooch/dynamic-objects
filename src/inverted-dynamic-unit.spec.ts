/**
 *
 */

import { DynamicUnit } from "./dynamic-unit.js";
import { InvertedDynamicUnit } from "./inverted-dynamic-unit.js";

testAll();
function testAll(): void {
    describe('InvertedDynamicUnit', () => {

        test('output as expected during full duration cycle', () => {

            const unit = new InvertedDynamicUnit(new DynamicUnit());
            expect(unit.current).toBe(1);

            unit.duration(1000).run();
            unit.update(100);
            expect(unit.current).toBeCloseTo(0.9);
            unit.update(100);
            expect(unit.current).toBeCloseTo(0.8);
            unit.update(100);
            expect(unit.current).toBeCloseTo(0.7);
            unit.update(100);
            expect(unit.current).toBeCloseTo(0.6);
            unit.update(100);
            expect(unit.current).toBeCloseTo(0.5);
            unit.update(100);
            expect(unit.current).toBeCloseTo(0.4);
            unit.update(100);
            expect(unit.current).toBeCloseTo(0.3);
            unit.update(100);
            expect(unit.current).toBeCloseTo(0.2);
            unit.update(100);
            expect(unit.current).toBeCloseTo(0.1);
            unit.update(100);

            expect(unit.current).toBe(0);

        });

    });
}
