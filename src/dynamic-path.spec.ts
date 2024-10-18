/**
 * 
 */

testAll();
function testAll(): void {
    describe('DynamicPath', () => {
        test('dummy', () => { });
    });
}

// import { Vector2D } from "@brendangooch/maths";
// import { DynamicPath } from "./dynamic-path.js";
// import { DynamicUnit } from "../unit/dynamic-unit.js";
// import * as EASE from "@brendangooch/ease";

// testAll();
// function testAll(): void {
//     describe('DynamicPath', () => {

//         // constructor
//         testInitialValueDefaultsTo00IfNotSupplied();

//         // get isActive()
//         testNotActiveOnInstantiation();
//         testActiveAfterMoveToCalledWithPositiveDuration();
//         testActiveWhilstNotComplete();
//         testNotActiveOnceComplete();
//         testNotActiveAfterMoveToCalledWithDurationOf0();
//         testNotActiveAfterMoveToCalledWithNoDuration();

//         // getx() / get y()
//         testReturnsInitialValuesUntilMoveToAndUpdateCalled();
//         testReturnsGivenValuesWhenChangeCalledWithDurationOf0();
//         testReturnsGivenValuesWhenChangeCalledWithNoDuration();
//         testReturnsCorrectValuesWhenMovedFromPositiveXToHigherX();
//         testReturnsCorrectValuesWhenMovedFromPositiveXToLowerX();
//         testReturnsCorrectValuesWhenChangedFromPositiveYToHigherY();
//         testReturnsCorrectValuesWhenMovedFromPositiveYToLowerY();
//         testReturnsCorrectValuesWhenMovedFromNegativeXToPositiveX();
//         testReturnsCorrectValuesWhenMovedFromNegativeXToLowerX();
//         testReturnsCorrectValuesWhenMovedFromNegativeYToPositiveY();
//         testReturnsCorrectValuesWhenMovedFromNegativeYToLowerY();
//         testReturnsCorrectValuesWhenMovedFrom0ToPositiveX();
//         testReturnsCorrectValuesWhenMovedFrom0ToPositiveY();
//         testReturnsCorrectValuesWhenMoveedFrom0ToNegativeX();
//         testReturnsCorrectValuesWhenMovedFrom0ToNegativeY();

//         // load(...) / save()
//         testLoadDoesNotThrowErrorIfValidLoad();
//         testLoadThrowsErrorIfInvalidJSON();
//         testContinuesToBehaveAsExpectedAfterSaveAndReload();
//         testLoadThrowsErrorIfUnitPropertyMissing();
//         testLoadThrowsErrorIfPreviousPropertyMissing();
//         testLoadThrowsErrorIfNextPropertyMissing();
//         testLoadThrowsErrorIfCurrentPropertyMissing();
//         testLoadThrowsErrorIfDifferencePropertyMissing();
//         testLoadThrowsErrorIfIsOnPropertyMissing();

//         // update(...)
//         testOnlyUpdatesWhenTurnedOnAndActive();
//         testUpdatesCorrectlyWithNoEase();
//         testUpdatesCorrectlyWithEase();
//         testDoesNotUpdateOnceTransitionComplete();

//         // turnOn() / turnOff()
//         testTurnOnTurnOffStopsAndStartsPathFromUpdating();

//         // moveTo(...)
//         testNegativeDurationDoesNothing();
//         testDurationOf0InstantlyChangesCurrentValuesAndDoesNotTurnOnOrMakePathActive();
//         testPostiveDurationChangesCurrentValueOverTimeAndTurnsPathOnAndMakesItActive();
//         testNothingHappensIfXYValuesAreSameAsCurrentValues();
//         testCanMoveIfOneOfXOrYIsTheCurrentValue();

//     });
// }

// function testInitialValueDefaultsTo00IfNotSupplied(): void {
//     test('initial value defaults to (1, 0) if not supplied', () => {
//         const vector = new DynamicPath();
//         expect(vector.x).toBe(0);
//         expect(vector.y).toBe(0);
//     });
// }

// function testNotActiveOnInstantiation(): void {
//     test('not active on instantiation', () => {
//         const vector = new DynamicPath();
//         expect(vector.isActive).not.toBeTruthy();
//     });
// }

// function testActiveAfterMoveToCalledWithPositiveDuration(): void {
//     test('active after moveTo() called with positive duration', () => {
//         const vector = new DynamicPath(10, 10);
//         vector.moveTo(20, 20, 1000);
//         expect(vector.isActive).toBeTruthy();
//     });
// }

// function testActiveWhilstNotComplete(): void {
//     test('active whilst not complete', () => {
//         const vector = new DynamicPath(100, 50);
//         vector.moveTo(200, 300, 1000);
//         expect(vector.isActive).toBeTruthy();
//         vector.update(200);
//         expect(vector.isActive).toBeTruthy();
//         vector.update(200);
//         expect(vector.isActive).toBeTruthy();
//         vector.update(200);
//         expect(vector.isActive).toBeTruthy();
//         vector.update(200);
//         expect(vector.isActive).toBeTruthy();
//         vector.update(200);
//         expect(vector.isActive).not.toBeTruthy();
//     });
// }

// function testNotActiveOnceComplete(): void {
//     test('not active once complete', () => {
//         const vector = new DynamicPath(0, 100);
//         vector.moveTo(1000, 500, 1000);
//         vector.update(200);
//         vector.update(200);
//         vector.update(200);
//         vector.update(200);
//         vector.update(200);
//         expect(vector.isActive).not.toBeTruthy();
//     });
// }

// function testNotActiveAfterMoveToCalledWithDurationOf0(): void {
//     test('not active after moveTo() called with duration of 0', () => {
//         const vector = new DynamicPath(10, 10);
//         vector.moveTo(20, 20, 0);
//         expect(vector.isActive).not.toBeTruthy();
//     });
// }

// function testNotActiveAfterMoveToCalledWithNoDuration(): void {
//     test('not active after moveTo() called with no duration', () => {
//         const vector = new DynamicPath(1, 2);
//         vector.moveTo(10, 11);
//         expect(vector.isActive).not.toBeTruthy();
//     });
// }

// function testReturnsInitialValuesUntilMoveToAndUpdateCalled(): void {
//     test('returns initial values until moveTo() AND update called', () => {
//         const vector = new DynamicPath(50, 150);
//         expect(vector.x).toBe(50);
//         expect(vector.y).toBe(150);
//         vector.moveTo(100, 300, 1000); // <--
//         expect(vector.x).toBe(50);
//         expect(vector.y).toBe(150);
//         vector.update(100); // <--
//         expect(vector.x).not.toBe(50);
//         expect(vector.y).not.toBe(150);
//     });
// }

// function testReturnsGivenValuesWhenChangeCalledWithDurationOf0(): void {
//     test('returns given values when change called with duration of 0', () => {
//         const vector = new DynamicPath(10, 20);
//         vector.moveTo(200, 300, 0);
//         expect(vector.x).toBe(200);
//         expect(vector.y).toBe(300);
//     });
// }

// function testReturnsGivenValuesWhenChangeCalledWithNoDuration(): void {
//     test('returns given values when change called with no duration', () => {
//         const vector = new DynamicPath(10, 20);
//         vector.moveTo(200, 300);
//         expect(vector.x).toBe(200);
//         expect(vector.y).toBe(300);
//     });
// }

// function testReturnsCorrectValuesWhenMovedFromPositiveXToHigherX(): void {
//     test('returns correct values when moved from positive x value to higher x value', () => {
//         const vector = new DynamicPath(10, 10);
//         vector.moveTo(20, 20, 1000);
//         vector.update(100);
//         expect(vector.x).toBeCloseTo(11);
//     });
// }

// function testReturnsCorrectValuesWhenMovedFromPositiveXToLowerX(): void {
//     test('returns correct values when moved from positive x value to lower x value', () => {
//         const vector = new DynamicPath(20, 10);
//         vector.moveTo(10, 20, 1000);
//         vector.update(100);
//         expect(vector.x).toBeCloseTo(19);
//     });
// }

// function testReturnsCorrectValuesWhenChangedFromPositiveYToHigherY(): void {
//     test('returns correct values when moved from positive y value to higher y value', () => {
//         const vector = new DynamicPath(10, 10);
//         vector.moveTo(20, 20, 1000);
//         vector.update(100);
//         expect(vector.y).toBeCloseTo(11);
//     });
// }

// function testReturnsCorrectValuesWhenMovedFromPositiveYToLowerY(): void {
//     test('returns correct values when moved from positive y value to lower y value', () => {
//         const vector = new DynamicPath(10, 20);
//         vector.moveTo(20, 10, 1000);
//         vector.update(100);
//         expect(vector.y).toBeCloseTo(19);
//     });
// }

// function testReturnsCorrectValuesWhenMovedFromNegativeXToPositiveX(): void {
//     test('returns correct values when moved from negative x value to positive x value', () => {
//         const vector = new DynamicPath(-10, 20);
//         vector.moveTo(10, 10, 1000);
//         vector.update(100);
//         expect(vector.x).toBeCloseTo(-8);
//     });
// }

// function testReturnsCorrectValuesWhenMovedFromNegativeXToLowerX(): void {
//     test('returns correct values when moved from negative x value to lower x value', () => {
//         const vector = new DynamicPath(-10, 20);
//         vector.moveTo(-20, 10, 1000);
//         vector.update(100);
//         expect(vector.x).toBeCloseTo(-11);
//     });
// }

// function testReturnsCorrectValuesWhenMovedFromNegativeYToPositiveY(): void {
//     test('returns correct values when moved from negative y value to positive y value', () => {
//         const vector = new DynamicPath(-10, -20);
//         vector.moveTo(-20, 20, 1000);
//         vector.update(100);
//         expect(vector.y).toBeCloseTo(-16);
//     });
// }

// function testReturnsCorrectValuesWhenMovedFromNegativeYToLowerY(): void {
//     test('returns correct values when moved from negative y value to lower y value', () => {
//         const vector = new DynamicPath(-10, -20);
//         vector.moveTo(-20, -40, 1000);
//         vector.update(100);
//         expect(vector.y).toBeCloseTo(-22);
//     });
// }

// function testReturnsCorrectValuesWhenMovedFrom0ToPositiveX(): void {
//     test('returns correct values when moved from x value of 0 to a positive x value', () => {
//         const vector = new DynamicPath(0, 20);
//         vector.moveTo(100, 40, 1000);
//         vector.update(100);
//         expect(vector.x).toBeCloseTo(10);
//     });
// }

// function testReturnsCorrectValuesWhenMovedFrom0ToPositiveY(): void {
//     test('returns correct values when moved from y value of 0 to a positive y value', () => {
//         const vector = new DynamicPath(10, 0);
//         vector.moveTo(100, 40, 1000);
//         vector.update(100);
//         expect(vector.y).toBeCloseTo(4);
//     });
// }

// function testReturnsCorrectValuesWhenMoveedFrom0ToNegativeX(): void {
//     test('returns correct values when moved from x value of 0 to a negative x value', () => {
//         const vector = new DynamicPath(0, 10);
//         vector.moveTo(-200, 40, 1000);
//         vector.update(100);
//         expect(vector.x).toBeCloseTo(-20);
//     });
// }

// function testReturnsCorrectValuesWhenMovedFrom0ToNegativeY(): void {
//     test('returns correct values when moved from y value of 0 to a negative y value', () => {
//         const vector = new DynamicPath(50, 0);
//         vector.moveTo(-200, -40, 1000);
//         vector.update(100);
//         expect(vector.y).toBeCloseTo(-4);
//     });
// }

// function testLoadDoesNotThrowErrorIfValidLoad(): void {
//     test('load does not throw error if valid load', () => {
//         const unit = new DynamicUnit();
//         const previous = new Vector2D();
//         const next = new Vector2D();
//         const current = new Vector2D();
//         const difference = new Vector2D();
//         const vector = new DynamicPath();
//         expect(() => {
//             vector.load(JSON.stringify({
//                 unit: unit.save(),
//                 previous: previous.save(),
//                 next: next.save(),
//                 current: current.save(),
//                 difference: difference.save(),
//                 isOn: false
//             }))
//         }).not.toThrow();
//     });
// }

// function testLoadThrowsErrorIfInvalidJSON(): void {
//     test('load throws error if invalid json passed to it', () => {
//         const vector = new DynamicPath();
//         expect(() => {
//             vector.load(JSON.stringify('['));
//         }).toThrow();
//     });
// }

// function testContinuesToBehaveAsExpectedAfterSaveAndReload(): void {
//     test('continues to behave as expected after save and reload', () => {
//         const vector = new DynamicPath(10, 20);
//         expect(vector.isActive).not.toBeTruthy();
//         expect(vector.x).toBe(10);
//         expect(vector.y).toBe(20);
//         vector.load(vector.save()); // <--
//         expect(vector.isActive).not.toBeTruthy();
//         expect(vector.x).toBe(10);
//         expect(vector.y).toBe(20);
//         vector.moveTo(20, 60, 1000);
//         expect(vector.isActive).toBeTruthy();
//         vector.load(vector.save()); // <--
//         expect(vector.isActive).toBeTruthy();
//         vector.update(200);
//         expect(vector.isActive).toBeTruthy();
//         expect(vector.x).toBe(12);
//         expect(vector.y).toBe(28);
//         vector.load(vector.save()); // <--
//         expect(vector.isActive).toBeTruthy();
//         expect(vector.x).toBe(12);
//         expect(vector.y).toBe(28);
//         vector.update(200);
//         expect(vector.isActive).toBeTruthy();
//         expect(vector.x).toBe(14);
//         expect(vector.y).toBe(36);
//         vector.load(vector.save()); // <--
//         expect(vector.isActive).toBeTruthy();
//         expect(vector.x).toBe(14);
//         expect(vector.y).toBe(36);
//         vector.update(600);
//         expect(vector.isActive).not.toBeTruthy();
//         expect(vector.x).toBe(20);
//         expect(vector.y).toBe(60);
//         vector.load(vector.save()); // <--
//         expect(vector.isActive).not.toBeTruthy();
//         expect(vector.x).toBe(20);
//         expect(vector.y).toBe(60);

//     });
// }

// function testLoadThrowsErrorIfUnitPropertyMissing(): void {
//     test('load throws error if "unit" property missing', () => {
//         // const unit = new DynamicUnit();
//         const previous = new Vector2D();
//         const next = new Vector2D();
//         const current = new Vector2D();
//         const difference = new Vector2D();
//         const vector = new DynamicPath();
//         expect(() => {
//             vector.load(JSON.stringify({
//                 // unit: unit.save(),
//                 previous: previous.save(),
//                 next: next.save(),
//                 current: current.save(),
//                 difference: difference.save(),
//                 isOn: false
//             }));
//         }).toThrow();
//     });
// }

// function testLoadThrowsErrorIfPreviousPropertyMissing(): void {
//     test('load throws error if "previous" property missing', () => {
//         const unit = new DynamicUnit();
//         // const previous = new Vector2D();
//         const next = new Vector2D();
//         const current = new Vector2D();
//         const difference = new Vector2D();
//         const vector = new DynamicPath();
//         expect(() => {
//             vector.load(JSON.stringify({
//                 unit: unit.save(),
//                 // previous: previous.save(),
//                 next: next.save(),
//                 current: current.save(),
//                 difference: difference.save(),
//                 isOn: false
//             }));
//         }).toThrow();
//     });
// }

// function testLoadThrowsErrorIfNextPropertyMissing(): void {
//     test('load throws error if "next" property missing', () => {
//         const unit = new DynamicUnit();
//         const previous = new Vector2D();
//         // const next = new Vector2D();
//         const current = new Vector2D();
//         const difference = new Vector2D();
//         const vector = new DynamicPath();
//         expect(() => {
//             vector.load(JSON.stringify({
//                 // unit: unit.save(),
//                 previous: previous.save(),
//                 // next: next.save(),
//                 current: current.save(),
//                 difference: difference.save(),
//                 isOn: false
//             }));
//         }).toThrow();
//     });
// }

// function testLoadThrowsErrorIfCurrentPropertyMissing(): void {
//     test('load throws error if "current" property missing', () => {
//         const unit = new DynamicUnit();
//         const previous = new Vector2D();
//         const next = new Vector2D();
//         // const current = new Vector2D();
//         const difference = new Vector2D();
//         const vector = new DynamicPath();
//         expect(() => {
//             vector.load(JSON.stringify({
//                 // unit: unit.save(),
//                 previous: previous.save(),
//                 next: next.save(),
//                 // current: current.save(),
//                 difference: difference.save(),
//                 isOn: false
//             }));
//         }).toThrow();
//     });
// }

// function testLoadThrowsErrorIfDifferencePropertyMissing(): void {
//     test('load throws error if "difference" property missing', () => {
//         const unit = new DynamicUnit();
//         const previous = new Vector2D();
//         const next = new Vector2D();
//         const current = new Vector2D();
//         // const difference = new Vector2D();
//         const vector = new DynamicPath();
//         expect(() => {
//             vector.load(JSON.stringify({
//                 // unit: unit.save(),
//                 previous: previous.save(),
//                 next: next.save(),
//                 current: current.save(),
//                 // difference: difference.save(),
//                 isOn: false
//             }));
//         }).toThrow();
//     });
// }

// function testLoadThrowsErrorIfIsOnPropertyMissing(): void {
//     test('load throws error if "isOn" property missing', () => {
//         const unit = new DynamicUnit();
//         const previous = new Vector2D();
//         const next = new Vector2D();
//         const current = new Vector2D();
//         const difference = new Vector2D();
//         const vector = new DynamicPath();
//         expect(() => {
//             vector.load(JSON.stringify({
//                 // unit: unit.save(),
//                 previous: previous.save(),
//                 next: next.save(),
//                 current: current.save(),
//                 difference: difference.save()
//                 // isOn: false
//             }));
//         }).toThrow();
//     });
// }

// function testOnlyUpdatesWhenTurnedOnAndActive(): void {
//     test('only updates when turned on and active', () => {
//         const vector = new DynamicPath(100, 200);
//         expect(vector.x).toBe(100);
//         expect(vector.y).toBe(200);
//         vector.update(100);
//         expect(vector.x).toBe(100);
//         expect(vector.y).toBe(200);
//         vector.moveTo(200, 300);
//         expect(vector.x).toBe(200);
//         expect(vector.y).toBe(300);
//         vector.moveTo(100, 200, 1000);
//         vector.update(100);
//         expect(vector.x).toBe(190);
//         expect(vector.y).toBe(290);
//         vector.turnOff();
//         vector.update(100);
//         expect(vector.x).toBe(190);
//         expect(vector.y).toBe(290);

//     });
// }

// function testUpdatesCorrectlyWithNoEase(): void {
//     test('updates correctly with no ease applied', () => {

//         let prev = new Vector2D(13, 27);
//         let next = new Vector2D(13, 27);
//         let current = new Vector2D(13, 27);
//         let diff = new Vector2D(0, 0);
//         let progress = 0;

//         const vector = new DynamicPath(13, 27);
//         vector.moveTo(77, -186.2, 659);
//         next.setXY(77, -186.2);
//         // next.x = 77;
//         // next.y = -186.2;
//         diff = next.subtract(prev);

//         vector.update(17);
//         progress = 17 / 659;
//         current = prev.add(diff.multiply(progress));
//         expect(vector.x).toBeCloseTo(current.x);
//         expect(vector.y).toBeCloseTo(current.y);

//         vector.update(16);
//         progress = (17 + 16) / 659;
//         current = prev.add(diff.multiply(progress));
//         expect(vector.x).toBeCloseTo(current.x);
//         expect(vector.y).toBeCloseTo(current.y);

//         vector.update(18);
//         progress = (17 + 16 + 18) / 659;
//         current = prev.add(diff.multiply(progress));
//         expect(vector.x).toBeCloseTo(current.x);
//         expect(vector.y).toBeCloseTo(current.y);

//     });
// }

// function testUpdatesCorrectlyWithEase(): void {
//     test('updates correctly with ease applied', () => {

//         const x = -13.658;
//         const y = 273.9;
//         const moveToX = 77.333;
//         const moveToY = 1086.001;
//         const update1 = 16.26;
//         const update2 = 17.33;
//         const update3 = 18.17;
//         const update4 = 15.90;
//         const vector = new DynamicPath(x, y);
//         const duration = 359.26;
//         const easeOption: EASE.tEaseOption = 'easeInQuad';
//         const ease = EASE.load(easeOption);

//         let prev = new Vector2D(x, y);
//         let next = new Vector2D(x, y);
//         let current = new Vector2D(x, y);
//         let diff = new Vector2D(0, 0);
//         let progress = 0;
//         let elapsed = 0;

//         vector.moveTo(moveToX, moveToY, duration, easeOption);
//         next.setXY(moveToX, moveToY);
//         diff = next.subtract(prev);

//         vector.update(update1);
//         elapsed += update1;
//         progress = ease(elapsed / duration);
//         current = prev.add(diff.multiply(progress));
//         expect(vector.x).toBeCloseTo(current.x);
//         expect(vector.y).toBeCloseTo(current.y);

//         vector.update(update2);
//         elapsed += update2;
//         progress = ease(elapsed / duration);
//         current = prev.add(diff.multiply(progress));
//         expect(vector.x).toBeCloseTo(current.x);
//         expect(vector.y).toBeCloseTo(current.y);

//         vector.update(update3);
//         elapsed += update3;
//         progress = ease(elapsed / duration);
//         current = prev.add(diff.multiply(progress));
//         expect(vector.x).toBeCloseTo(current.x);
//         expect(vector.y).toBeCloseTo(current.y);

//         vector.update(update4);
//         elapsed += update4;
//         progress = ease(elapsed / duration);
//         current = prev.add(diff.multiply(progress));
//         expect(vector.x).toBeCloseTo(current.x);
//         expect(vector.y).toBeCloseTo(current.y);

//     });
// }


// function testDoesNotUpdateOnceTransitionComplete(): void {
//     test('does not update once transition complete', () => {
//         const vector = new DynamicPath(100, 200);
//         vector.moveTo(500, 600, 1000);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         expect(vector.x).toBe(460);
//         expect(vector.y).toBe(560);
//         vector.update(100);
//         expect(vector.x).toBe(500);
//         expect(vector.y).toBe(600);
//         vector.update(100);
//         expect(vector.x).toBe(500);
//         expect(vector.y).toBe(600);
//     });
// }

// function testTurnOnTurnOffStopsAndStartsPathFromUpdating(): void {
//     test('turnOn() and turnOff() stop and start vector from updating', () => {
//         const vector = new DynamicPath(1, 10);
//         vector.moveTo(2, 30, 1000);
//         vector.update(100);
//         expect(vector.x).toBe(1.1);
//         expect(vector.y).toBe(12);
//         vector.update(100);
//         expect(vector.x).toBe(1.2);
//         expect(vector.y).toBe(14);
//         vector.turnOff();
//         vector.update(100);
//         expect(vector.x).toBe(1.2);
//         expect(vector.y).toBe(14);
//         vector.turnOn();
//         vector.update(100);
//         expect(vector.x).toBe(1.3);
//         expect(vector.y).toBe(16);

//     });
// }

// function testNegativeDurationDoesNothing(): void {
//     test('moveTo() with a negative duration does nothing', () => {
//         const vector = new DynamicPath(5, 5);
//         vector.moveTo(10, 10, -100);
//         expect(vector.isActive).not.toBeTruthy();
//         expect(vector.x).toBe(5);
//         expect(vector.y).toBe(5);
//     });
// }

// function testDurationOf0InstantlyChangesCurrentValuesAndDoesNotTurnOnOrMakePathActive(): void {
//     test('moveTo() with a duration of 0 instantly changes current values and does not turn path on or make it active', () => {
//         const vector = new DynamicPath(5, 5);
//         vector.moveTo(10, 10, 0);
//         expect(vector.isActive).not.toBeTruthy();
//         expect(vector.x).toBe(10);
//         expect(vector.y).toBe(10);
//     });
// }

// function testPostiveDurationChangesCurrentValueOverTimeAndTurnsPathOnAndMakesItActive(): void {
//     test('moveTo() with a positive duration changes current value over time, turns it on and makes it active', () => {
//         const vector = new DynamicPath(500, 300);
//         vector.moveTo(-500, -300, 500);
//         expect(vector.isActive).toBeTruthy();
//         vector.update(50);
//         expect(vector.x).toBe(400);
//         expect(vector.y).toBe(240);
//     });
// }

// function testNothingHappensIfXYValuesAreSameAsCurrentValues(): void {
//     test('nothing happens if moveTo() is called with current x AND y values (same position)', () => {
//         const vector = new DynamicPath(5, -5);
//         vector.moveTo(5, -5, 1000);
//         expect(vector.isActive).not.toBeTruthy();
//         vector.update(100);
//         expect(vector.x).toBe(5);
//         expect(vector.y).toBe(-5);
//     });
// }

// function testCanMoveIfOneOfXOrYIsTheCurrentValue(): void {
//     test('path CAN move if one of x or y is its current value (different position)', () => {

//         const vector = new DynamicPath(10, 10);

//         expect(vector.x).toBe(10);
//         expect(vector.y).toBe(10);
//         vector.moveTo(10, 20);
//         expect(vector.x).toBe(10);
//         expect(vector.y).toBe(20);
//         vector.moveTo(20, 20);
//         expect(vector.x).toBe(20);
//         expect(vector.y).toBe(20);
//         vector.moveTo(20, 10);
//         expect(vector.x).toBe(20);
//         expect(vector.y).toBe(10);
//         vector.moveTo(10, 10);
//         expect(vector.x).toBe(10);
//         expect(vector.y).toBe(10);

//         vector.moveTo(20, 10, 1000);
//         expect(vector.isActive).toBeTruthy();
//         expect(vector.x).toBe(10);
//         expect(vector.y).toBe(10);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         expect(vector.x).toBe(20);
//         expect(vector.y).toBe(10);

//         vector.moveTo(20, 20, 1000);
//         expect(vector.isActive).toBeTruthy();
//         expect(vector.x).toBe(20);
//         expect(vector.y).toBe(10);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         expect(vector.x).toBe(20);
//         expect(vector.y).toBe(20);

//         vector.moveTo(20, 10, 1000);
//         expect(vector.isActive).toBeTruthy();
//         expect(vector.x).toBe(20);
//         expect(vector.y).toBe(20);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         expect(vector.x).toBe(20);
//         expect(vector.y).toBe(10);

//         vector.moveTo(10, 10, 1000);
//         expect(vector.isActive).toBeTruthy();
//         expect(vector.x).toBe(20);
//         expect(vector.y).toBe(10);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         vector.update(100);
//         expect(vector.x).toBe(10);
//         expect(vector.y).toBe(10);


//     });
// }
