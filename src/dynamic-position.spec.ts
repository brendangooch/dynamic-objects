/**
 * 
 */

import { DynamicPosition } from "./dynamic-position.js";
import { DynamicUnit } from "./dynamic-unit.js";

let position: DynamicPosition;
beforeEach(() => {
    position = new DynamicPosition();
});

describe('DynamicPosition', () => {
    testAll();
});

function testAll(): void {
    testGetXY();
    testSaveAndLoad();
    testUpdate();
    testMoveTo();
    testCurveTo();
}

// public get x(): number / public get x(): number
function testGetXY(): void {
    describe('get current()', () => {

        // default is return 0,0
        testDefaultCurrentIs00();

        // returns initial values if set in constructor
        testCurrentIsValuesSetInConstructor();

        // returns expected x & y values on 1 full cycle
        testXAndYValuesAsExpectedDuringOneFullCycle();

    });
}

// default is return 0,0
function testDefaultCurrentIs00(): void {
    test('default is return 0,0', () => {
        expect(position.x).toBe(0);
        expect(position.y).toBe(0);
    });
}

// returns initial values if set in constructor
function testCurrentIsValuesSetInConstructor(): void {
    test('returns initial values if set in constructor', () => {
        const positionB = new DynamicPosition(100, 200);
        expect(positionB.x).toBe(100);
        expect(positionB.y).toBe(200);
    });
}

// returns expected x & y values on 1 full cycle
function testXAndYValuesAsExpectedDuringOneFullCycle(): void {
    test('returns expected x & y values on 1 full cycle', () => {
        position.moveTo(100, 50, 500);
        position.update(100);
        expect(position.x).toBeCloseTo(20);
        expect(position.y).toBeCloseTo(10);
        position.update(100);
        expect(position.x).toBeCloseTo(40);
        expect(position.y).toBeCloseTo(20);
        position.update(100);
        expect(position.x).toBeCloseTo(60);
        expect(position.y).toBeCloseTo(30);
        position.update(100);
        expect(position.x).toBeCloseTo(80);
        expect(position.y).toBeCloseTo(40);
        position.update(100);
        expect(position.x).toBeCloseTo(100);
        expect(position.y).toBeCloseTo(50);
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

        // throws error if start property missing
        testThrowsErrorIfStartPropertyMissing();

        // throws error if end property missing
        testThrowsErrorIfEndPropertyMissing();

        // throws error if control property missing
        testThrowsErrorIfControlPropertyMissing();

        // throws error if unit property missing
        testThrowsErrorIfUnitPropertyMissing();

    });
}

// EXACT state is restored
function testEXACTStateIsRestored(): void {
    describe('EXACT state is restored', () => {
        test('initial state', () => {
            const initialState = position.save();
            position.load(initialState);
            const loadedState = position.save();
            expect(initialState).toBe(loadedState);
        });
        test('altered state', () => {
            position.curveTo(500, 1000, -Math.PI / 2, 500, 800, 'easeInCirc');
            position.update(50);
            position.update(50);
            position.update(50);
            position.update(50);
            const savedState = position.save();
            position.load(savedState);
            const reloadedState = position.save();
            expect(reloadedState).toBe(savedState);
        });
    });
}

// does not throw error if valid JSON Object with correct properties
function testDoesNotThrowIfValidJSONObjectWithCorrectProperties(): void {
    const unit = new DynamicUnit();
    test('does not throw error if valid JSON Object with correct properties', () => {
        expect(() => {
            position.load(JSON.stringify({
                start: { X: 100, y: 200 },
                end: { X: 110, y: 210 },
                control: { X: 120, y: 220 },
                unit: unit.save()
            }));
        }).not.toThrow();
    });
}

// throws error if invalid JSON
function testThrowsErrorIfInvalidJSON(): void {
    test('throws error if invalid JSON', () => {
        expect(() => { position.load('{[]}') }).toThrow();
    });
}

// throws error if start property missing
function testThrowsErrorIfStartPropertyMissing(): void {
    const unit = new DynamicUnit();
    test('throws error if start property missing', () => {
        expect(() => {
            position.load(JSON.stringify({
                end: { X: 110, y: 210 },
                control: { X: 120, y: 220 },
                unit: unit.save()
            }));
        }).toThrow();
    });
}

// throws error if end property missing
function testThrowsErrorIfEndPropertyMissing(): void {
    const unit = new DynamicUnit();
    test('throws error if end property missing', () => {
        expect(() => {
            position.load(JSON.stringify({
                start: { X: 100, y: 200 },
                control: { X: 120, y: 220 },
                unit: unit.save()
            }));
        }).toThrow();
    });
}

// throws error if control property missing
function testThrowsErrorIfControlPropertyMissing(): void {
    const unit = new DynamicUnit();
    test('throws error if control property missing', () => {
        expect(() => {
            position.load(JSON.stringify({
                start: { X: 100, y: 200 },
                end: { X: 110, y: 210 },
                unit: unit.save()
            }));
        }).toThrow();
    });
}

// throws error if unit property missing
function testThrowsErrorIfUnitPropertyMissing(): void {
    test('throws error if unit property missing', () => {
        expect(() => {
            position.load(JSON.stringify({
                start: { X: 100, y: 200 },
                end: { X: 110, y: 210 },
                control: { X: 120, y: 220 },
            }));
        }).toThrow();
    });
}





//public update(ms: number): void
function testUpdate(): void {
    describe('update()', () => {

        // start === end === control if unit is complete
        testStartEqualsEndEqualsControlOnceUnitIsComplete();

    });
}

// start === end === control if unit is complete
function testStartEqualsEndEqualsControlOnceUnitIsComplete(): void {

    test('start === end === control if unit is complete', () => {

        position.curveTo(500, 500, -Math.PI / 4, 250, 500, 'easeInOutExpo');

        position.update(100);
        position.update(100);
        position.update(100);
        position.update(100);

        expect(JSON.parse(position.save()).start.x).toBe(0);
        expect(JSON.parse(position.save()).start.y).toBe(0);
        expect(JSON.parse(position.save()).control.x).not.toBe(500);
        expect(JSON.parse(position.save()).control.y).not.toBe(500);
        expect(JSON.parse(position.save()).end.x).toBe(500);
        expect(JSON.parse(position.save()).end.y).toBe(500);

        // last update, now complete
        position.update(100);
        expect(JSON.parse(position.save()).start.x).toBe(500);
        expect(JSON.parse(position.save()).start.y).toBe(500);
        expect(JSON.parse(position.save()).control.x).toBe(500);
        expect(JSON.parse(position.save()).control.y).toBe(500);
        expect(JSON.parse(position.save()).end.x).toBe(500);
        expect(JSON.parse(position.save()).end.y).toBe(500);

    });

}






// public moveTo(x: number, y: number, duration: number, ease?: tEaseOption): void
function testMoveTo(): void {
    describe('moveTo()', () => {

        // can only change if isComplete is true
        testMoveToCanOnlyChangeIfIsComplete();

        // does not change if duration < 0
        testMoveToDoesNotChangeIfDurationLessThan0();

        // duration of 0 changes current value immediately
        testMoveToDurationOf0ChangesCurrentValueImmediately();

        // sets the correct ease function
        testMoveToSetsCorrectEaseFunction();

    });
}

// can only change if isComplete is true
function testMoveToCanOnlyChangeIfIsComplete(): void {
    test('can only change if isComplete is true', () => {
        position.moveTo(100, 100, 1000);
        position.update(100);
        position.moveTo(500, 500, 800);
        position.update(100);
        expect(position.x).toBeCloseTo(20);
        expect(position.y).toBeCloseTo(20);
    });
}

// does not change if duration < 0
function testMoveToDoesNotChangeIfDurationLessThan0(): void {
    test('does not change if duration < 0', () => {
        const positionB = new DynamicPosition(100, 100);
        positionB.moveTo(500, 500, -100, 'easeInBounce');
        positionB.update(10);
        positionB.update(10);
        expect(positionB.x).toBe(100);
        expect(positionB.y).toBe(100);

    });
}

// duration of 0 changes current value immediately
function testMoveToDurationOf0ChangesCurrentValueImmediately(): void {
    test('duration of 0 changes current value immediately', () => {
        position.moveTo(800, 400, 0);
        expect(position.isOn).toBe(false);
        expect(position.x).toBe(800);
        expect(position.y).toBe(400);
    });
}

// sets the correct ease function
function testMoveToSetsCorrectEaseFunction(): void {
    test('sets the correct ease function', () => {
        position.moveTo(500, 600, 1000, 'easeInCubic');
        const state = JSON.parse(position.save());
        const unit = new DynamicUnit();
        unit.load(state.unit);
        expect(JSON.parse(unit.save()).ease).toBe('easeInCubic');

    });
}






// public curveTo(x: number, y: number, rotation: number, distance: number, duration: number, ease ?: tEaseOption): void
function testCurveTo(): void {
    describe('curveTo()', () => {

        // can only change if isComplete is true
        testCurveToCanOnlyChangeIfIsComplete();

        // does not change if duration <= 0
        testCurveToDoesNotChangeIfDurationLessThanOrEqualTo0();

        // sets the correct ease function
        testCurveToSetsCorrectEaseFunction();

    });
}

// can only change if isComplete is true
function testCurveToCanOnlyChangeIfIsComplete(): void {
    test('can only change if isComplete is true', () => {
        position.curveTo(100, 100, 3, 50, 1000);
        position.curveTo(500, 500, 3, 50, 1500); // <-- no change
        position.update(200);
        position.update(200);
        position.update(200);
        position.update(200);
        position.update(200);
        // current position should be 100, 100
        expect(position.x).toBe(100);
        expect(position.y).toBe(100);
    });
}

// does not change if duration <= 0
function testCurveToDoesNotChangeIfDurationLessThanOrEqualTo0(): void {
    describe('does not change if duration <= 0', () => {
        test('< 0', () => {
            const positionB = new DynamicPosition(100, 100);
            positionB.curveTo(500, 500, 2, 250, -1, 'easeInBounce');
            positionB.update(10);
            positionB.update(10);
            expect(positionB.x).toBe(100);
            expect(positionB.y).toBe(100);
        });
        test('0', () => {
            const positionB = new DynamicPosition(100, 100);
            positionB.curveTo(500, 500, 2, 250, 0, 'easeInBounce');
            positionB.update(10);
            positionB.update(10);
            expect(positionB.x).toBe(100);
            expect(positionB.y).toBe(100);
        });
    });
}

// sets the correct ease function
function testCurveToSetsCorrectEaseFunction(): void {
    test('sets the correct ease function', () => {
        position.curveTo(500, 500, Math.PI * 1.5, 100, 1000, 'easeInElastic');
        const state = JSON.parse(position.save());
        const unit = new DynamicUnit();
        unit.load(state.unit);
        expect(JSON.parse(unit.save()).ease).toBe('easeInElastic');

    });
}