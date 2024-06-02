/**
 * 
 */

import { DynamicNumber } from "./dynamic-number.js";
import { DynamicUnit } from "./dynamic-unit.js";

let number: DynamicNumber;
beforeEach(() => {
    number = new DynamicNumber();
});

describe('DynamicNumber', () => {
    testAll();
});

function testAll(): void {

    // public get current(): number
    testGetCurrent();

    // public save(): string
    // public load(json: string): void
    testSaveAndLoad();

    // public update(ms: number): void
    testUpdate();

    // public change(next: number, duration: number, options ?: tDynamicUnitOptions): void
    testChange();

}

// public get current(): number
function testGetCurrent(): void {
    describe('get current()', () => {

        // default is return 0
        testDefaultCurrentIs0();

        // returns initial value if set in constructor
        testCurrentIsValueSetInConstructor();

        // returns expected number on 1 full cycle
        testCurrentValueAsExpectedDuringOneFullCycle();

    });
}

// default is return 0
function testDefaultCurrentIs0(): void {
    test('default is return 0', () => {
        expect(number.current).toBe(0);
    });
}

// returns initial value if set in constructor
function testCurrentIsValueSetInConstructor(): void {
    test('returns initial value if set in constructor', () => {
        const numberB = new DynamicNumber(10);
        expect(numberB.current).toBe(10);
    });
}

// returns expected number on 1 full cycle
function testCurrentValueAsExpectedDuringOneFullCycle(): void {
    test('returns expected number on 1 full cycle', () => {
        number.change(10, 1000);
        number.update(200);
        expect(number.current).toBeCloseTo(2);
        number.update(200);
        expect(number.current).toBeCloseTo(4);
        number.update(200);
        expect(number.current).toBeCloseTo(6);
        number.update(200);
        expect(number.current).toBeCloseTo(8);
        number.update(200);
        expect(number.current).toBeCloseTo(10);
        number.update(200);
        expect(number.current).toBeCloseTo(10);
    });
}






// public save(): string
// public load(json: string): void
function testSaveAndLoad(): void {
    describe('save() & load()', () => {

        // EXACT state is restored
        testEXACTStateIsRestored();

        // does not throw error if valid JSON Object with correct properties
        testDoesNotThrowIfValidJSONObjectWithCorrectProperties();

        // throws error if invalid JSON
        testThrowsErrorIfInvalidJSON();

        // throws error if previous property missing
        testThrowsErrorIfPreviousPropertyMissing();

        // throws error if next property missing
        testThrowsErrorIfNextPropertyMissing();

        // throws error if unit property missing
        testThrowsErrorIfUnitPropertyMissing();

    });
}

// EXACT state is restored
function testEXACTStateIsRestored(): void {
    describe('EXACT state is restored', () => {

        // no changes
        test('no changes', () => {
            const init = number.save();
            number.load(init);
            const loaded = number.save();
            expect(init).toBe(loaded);
        });

        // after changes
        test('after changes', () => {
            number.change(10, 1000, 'easeInQuad');
            number.update(100);
            number.update(100);
            number.update(100);
            const state = number.save();
            number.load(state);
            const loaded = number.save();
            expect(state).toBe(loaded);
        });


    });
}

// does not throw error if valid JSON Object with correct properties
function testDoesNotThrowIfValidJSONObjectWithCorrectProperties(): void {
    test('does not throw error if valid JSON Object with correct properties', () => {
        const unit = new DynamicUnit();
        expect(() => {
            number.load(JSON.stringify({
                previous: 10,
                next: 20,
                unit: unit.save()
            }));
        }).not.toThrow();
    });
}

// throws error if invalid JSON
function testThrowsErrorIfInvalidJSON(): void {
    test('throws error if invalid JSON', () => {
        expect(() => { number.load("{[]}") }).toThrow();
    });
}

// throws error if previous property missing
function testThrowsErrorIfPreviousPropertyMissing(): void {
    test('throws error if previous property missing', () => {
        const unit = new DynamicUnit();
        expect(() => {
            number.load(JSON.stringify({
                next: 20,
                unit: unit.save()
            }));
        }).toThrow();
    });
}

// throws error if next property missing
function testThrowsErrorIfNextPropertyMissing(): void {
    test('throws error if next property missing', () => {
        const unit = new DynamicUnit();
        expect(() => {
            number.load(JSON.stringify({
                previous: 10,
                unit: unit.save()
            }));
        }).toThrow();
    });
}

// throws error if unit property missing
function testThrowsErrorIfUnitPropertyMissing(): void {
    test('throws error if unit property missing', () => {
        expect(() => {
            number.load(JSON.stringify({
                previous: 10,
                next: 20,
            }));
        }).toThrow();
    });
}







// public update(ms: number): void
function testUpdate(): void {
    describe('update()', () => {

        // previous === next if unit is complete
        testPreviousEqualsNextOnceUnitIsComplete();

    });
}

// previous === next if unit is complete
function testPreviousEqualsNextOnceUnitIsComplete(): void {
    test('previous === next if unit is complete', () => {

        const numberB = new DynamicNumber(10);
        expect(JSON.parse(numberB.save()).previous).toBe(JSON.parse(numberB.save()).next);

        numberB.change(20, 100);

        numberB.update(20);
        expect(JSON.parse(numberB.save()).previous).not.toBe(JSON.parse(numberB.save()).next);
        numberB.update(20);
        expect(JSON.parse(numberB.save()).previous).not.toBe(JSON.parse(numberB.save()).next);
        numberB.update(20);
        expect(JSON.parse(numberB.save()).previous).not.toBe(JSON.parse(numberB.save()).next);
        numberB.update(20);
        expect(JSON.parse(numberB.save()).previous).not.toBe(JSON.parse(numberB.save()).next);
        numberB.update(20);
        expect(JSON.parse(numberB.save()).previous).toBe(JSON.parse(numberB.save()).next);

    });
}







// public change(next: number, duration: number, options ?: tDynamicUnitOptions): void
function testChange(): void {
    describe('change()', () => {

        // can only change if isComplete is true
        testCanOnlyChangeIfIsComplete();

        // does not change if duration < 0
        testDoesNotChangeIfDurationLessThan0();

        // duration of 0 changes current value immediately
        testDurationOf0ChangesCurrentValueImmediately();

        // sets the correct ease function
        testSetsCorrectEaseFunction();

        // works when next > previous
        testWorksWhenNextGreaterThanPrevious();

        // works when next < previous
        testWorksWhenNextLessThanPrevious();

        // works when next is negative
        testWorksWhenNextIsNegative();

        // works when previous is negative
        testWorksWhenPreviousIsNegative();

        // works when both numbers are negative
        testWorksWhenPreviousAndNextAreNegative();

    });
}

// can only change if isComplete is true
function testCanOnlyChangeIfIsComplete(): void {
    test('can only change if isComplete is true', () => {
        number.change(100, 100);
        number.change(200, 100);
        const stateA = JSON.parse(number.save());
        expect(stateA.next).toBe(100);
        number.update(20);
        number.update(20);
        number.update(20);
        number.update(20);
        number.update(20);
        number.change(200, 100);
        const stateB = JSON.parse(number.save());
        expect(stateB.next).toBe(200);
    });
}

// does not change if duration < 0
function testDoesNotChangeIfDurationLessThan0(): void {
    test('does not change if duration < 0', () => {
        expect(number.current).toBe(0);
        number.change(100, -1);
        number.update(10);
        expect(number.current).toBe(0);
    });
}

// duration of 0 changes current value immediately
function testDurationOf0ChangesCurrentValueImmediately(): void {
    test('duration of 0 changes current value immediately', () => {
        number.change(100, 0);
        const state = JSON.parse(number.save());
        expect(state.next).toBe(100);
        expect(state.previous).toBe(100);
        expect(number.isOn).toBe(false);
    });
}

// sets the correct ease function
function testSetsCorrectEaseFunction(): void {
    test('sets the correct ease function', () => {
        number.change(100, 1000, 'easeInQuint');
        number.update(100);
        expect(number.current).toBeCloseTo(Math.pow(100 / 1000, 5) * 100);
    });
}

// works when next > previous
function testWorksWhenNextGreaterThanPrevious(): void {
    test('works when next > previous', () => {
        const numberB = new DynamicNumber(10);
        numberB.change(20, 100);
        numberB.update(20);
        expect(numberB.current).toBeCloseTo(12);
    });
}

// works when next < previous
function testWorksWhenNextLessThanPrevious(): void {
    test('works when next < previous', () => {
        const numberB = new DynamicNumber(20);
        numberB.change(10, 100);
        numberB.update(20);
        expect(numberB.current).toBeCloseTo(18);
    });
}

// works when next is negative
function testWorksWhenNextIsNegative(): void {
    test('works when next is negative', () => {
        const numberB = new DynamicNumber(10);
        numberB.change(-10, 100);
        numberB.update(20);
        expect(numberB.current).toBeCloseTo(6);
    });
}

// works when previous is negative
function testWorksWhenPreviousIsNegative(): void {
    test('works when previous is negative', () => {
        const numberB = new DynamicNumber(-10);
        numberB.change(10, 100);
        numberB.update(20);
        expect(numberB.current).toBeCloseTo(-6);
    });
}

// works when both numbers are negative
function testWorksWhenPreviousAndNextAreNegative(): void {
    describe('works when both numbers are negative', () => {
        test('next < previous', () => {
            const numberB = new DynamicNumber(-10);
            numberB.change(-20, 100);
            numberB.update(20);
            expect(numberB.current).toBeCloseTo(-12);
        });
        test('next > previous', () => {
            const numberB = new DynamicNumber(-20);
            numberB.change(-10, 100);
            numberB.update(20);
            expect(numberB.current).toBeCloseTo(-18);
        });
    });

}