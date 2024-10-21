/**
 *
 */

import { DynamicUnit } from "./dynamic-unit.js";
import { FlooredDynamicUnit } from "./floored-dynamic-unit.js";

testAll();
function testAll(): void {
    describe('FlooredDynamicUnit', () => {

        test('output as expected during full duration cycle', () => {

            const unit = new FlooredDynamicUnit(new DynamicUnit());
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
            expect(unit.current).toBe(0);
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

        });

    });
}
