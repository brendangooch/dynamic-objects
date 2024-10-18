/**
 * 
 */

testAll();
function testAll(): void {
    describe('obj', () => {
        test('DynamicCurvedPath', () => { });
    });
}

// import { QuadraticBezierCurve } from "@brendangooch/maths";
// import { DynamicCurvedPath } from "./dynamic-curved-path.js";
// import { DynamicUnit } from "../unit/dynamic-unit.js";
// import * as EASE from '@brendangooch/ease';

// testAll();
// function testAll(): void {
//     describe('DynamicCurvedPath', () => {

//         test('dummy', () => { });

//         // constructor
//         testInitialValueDefaultsTo10fNotSupplied();
//         testValuesSetInConstructorAreReturnedBeforeObjectMoved();

//         // get isActive()
//         testNotActiveOnInstantiation();
//         testActiveAfterMoveToCalledWithPositiveDuration();
//         testActiveAfterCurveToCalledWithPositiveDuration();
//         testActiveWhilstNotComplete();
//         testNotActiveOnceComplete();
//         testNotActiveAfterMoveToCalledWithDurationOf0();
//         testNotActiveAfterMoveToCalledWithNoDuration();
//         testNotActiveAfterCurveToCalledWithDurationOf0();
//         testNotActiveAfterCurveToCalledWithNoDuration();

//         // getx() / get y()
//         testReturnsInitialValuesUntilMoveToAndUpdateCalled();
//         testReturnsGivenValuesWhenMoveToCalledWithDurationOf0();
//         testReturnsInitialValuesUntilCurveToAndUpdateCalled();
//         testReturnsGivenValuesWhenCurveToCalledWithDurationOf0();
//         testMovesAsExpectedOverTime();
//         testCurvesAsExpectedOverTime();

//         // load(...) / save()
//         testLoadDoesNotThrowErrorIfValidLoad();
//         testLoadThrowsErrorIfInvalidJSON();
//         testContinuesToBehaveAsExpectedAfterSaveAndReload();
//         testLoadThrowsErrorIfMissingUnitProperty();
//         testLoadThrowsErrorIfMissingBezierProperty();
//         testLoadThrowsErrorIfMissingIsOnProperty();

//         // update(...)
//         testOnlyUpdatesWhenTurnedOnAndActive();
//         testMoveToUpdatesCorrectlyWithNoEase();
//         testMoveToUpdatesCorrectlyWithEase();
//         testCurveToUpdatesCorrectlyWithNoEase();
//         testCurveToUpdatesCorrectlyWithEase();
//         testDoesNotUpdateOnceTransitionComplete();

//         // turnOn() / turnOff()
//         testTurnOnTurnOffStopsAndStartsPathFromUpdating();

//         // moveTo(...)
//         testMoveToNegativeDurationDoesNothing();
//         testMoveToDurationOf0InstantlyChangesCurrentValuesAndDoesNotTurnOnOrMakePathActive();
//         testMoveToPostiveDurationChangesCurrentValueOverTimeAndTurnsPathOnAndMakesItActive();
//         testMoveToNothingHappensIfXYValuesAreSameAsCurrentValues();
//         testMoveToCanMoveIfOneOfXOrYIsTheCurrentValue();

//         // curveTo(...)
//         testCurveToNegativeDurationDoesNothing();
//         testCurveToDurationOf0InstantlyChangesCurrentValuesAndDoesNotTurnOnOrMakePathActive();
//         testCurveToPostiveDurationChangesCurrentValueOverTimeAndTurnsPathOnAndMakesItActive();
//         testCurveToNothingHappensIfXYValuesAreSameAsCurrentValues();
//         testCurveToCanMoveIfOneOfXOrYIsTheCurrentValue();


//     });
// }

// function testInitialValueDefaultsTo10fNotSupplied(): void {
//     test('initial value defaults to x: 0, y: 0 if not supplied', () => {
//         const path = new DynamicCurvedPath();
//         expect(path.x).toBe(0);
//         expect(path.y).toBe(0);
//     });
// }

// function testValuesSetInConstructorAreReturnedBeforeObjectMoved(): void {
//     test('values set in the constructor are returned initially until object is moved', () => {
//         const path = new DynamicCurvedPath(100, 500);
//         expect(path.x).toBe(100);
//         expect(path.y).toBe(500);
//     });
// }

// function testNotActiveOnInstantiation(): void {
//     test('not active on instantiation', () => {
//         const path = new DynamicCurvedPath(10, 10);
//         expect(path.isActive).not.toBeTruthy();
//     });
// }

// function testActiveAfterMoveToCalledWithPositiveDuration(): void {
//     test('active after moveTo() called with positive duration', () => {
//         const path = new DynamicCurvedPath(10, 10);
//         path.moveTo(20, 20, 1000);
//         expect(path.isActive).toBeTruthy();
//     });
// }

// function testActiveAfterCurveToCalledWithPositiveDuration(): void {
//     test('active after curveTo() called with positive duration', () => {
//         const path = new DynamicCurvedPath(10, 10);
//         path.curveTo(20, 20, 500, Math.PI, 1000);
//         expect(path.isActive).toBeTruthy();
//     });
// }

// function testActiveWhilstNotComplete(): void {
//     test('active whilst not complete', () => {
//         const path = new DynamicCurvedPath(10, 10);
//         path.moveTo(20, 20, 1000);
//         expect(path.isActive).toBeTruthy();
//         path.update(200);
//         expect(path.isActive).toBeTruthy();
//         path.update(200);
//         expect(path.isActive).toBeTruthy();
//         path.update(200);
//         expect(path.isActive).toBeTruthy();
//         path.update(200);
//         expect(path.isActive).toBeTruthy();
//         path.update(200);
//         expect(path.isActive).not.toBeTruthy();
//     });
// }

// function testNotActiveOnceComplete(): void {
//     test('not active once complete', () => {
//         const path = new DynamicCurvedPath(10, 10);
//         path.moveTo(20, 20, 1000);
//         path.update(200);
//         path.update(200);
//         path.update(200);
//         path.update(200);
//         path.update(200);
//         expect(path.isActive).not.toBeTruthy();
//     });
// }

// function testNotActiveAfterMoveToCalledWithDurationOf0(): void {
//     test('not active after moveTo() called with duration of 0', () => {
//         const path = new DynamicCurvedPath(5, 5);
//         path.moveTo(10, 10, 0);
//         expect(path.isActive).not.toBeTruthy();
//     });
// }

// function testNotActiveAfterMoveToCalledWithNoDuration(): void {
//     test('not active after moveTo() called with no duration', () => {
//         const path = new DynamicCurvedPath(5, 5);
//         path.moveTo(10, 10);
//         expect(path.isActive).not.toBeTruthy();
//     });
// }

// function testNotActiveAfterCurveToCalledWithDurationOf0(): void {
//     test('not active after curveTo() called with duration of 0', () => {
//         const path = new DynamicCurvedPath(5, 5);
//         path.curveTo(10, 10, 1000, -Math.PI / 4, 0);
//         expect(path.isActive).not.toBeTruthy();
//     });
// }

// function testNotActiveAfterCurveToCalledWithNoDuration(): void {
//     test('not active after curveTo() called with no duration', () => {
//         const path = new DynamicCurvedPath(5, 5);
//         path.curveTo(10, 10, 1000, -Math.PI / 4);
//         expect(path.isActive).not.toBeTruthy();
//     });
// }

// function testReturnsInitialValuesUntilMoveToAndUpdateCalled(): void {
//     test('returns initial values until moveTo() and update() called', () => {
//         const path = new DynamicCurvedPath(100, 200);
//         expect(path.x).toBe(100);
//         expect(path.y).toBe(200);
//         path.moveTo(500, 600, 1000);
//         expect(path.x).toBe(100);
//         expect(path.y).toBe(200);
//         path.update(100);
//         expect(path.x).not.toBe(100);
//         expect(path.y).not.toBe(200);
//     });
// }

// function testReturnsGivenValuesWhenMoveToCalledWithDurationOf0(): void {
//     test('returns given values when moveTo() called with duration of 0', () => {
//         const path = new DynamicCurvedPath(-100, -200);
//         path.moveTo(100, 200, 0);
//         expect(path.x).toBe(100);
//         expect(path.y).toBe(200);
//     });
// }

// function testReturnsInitialValuesUntilCurveToAndUpdateCalled(): void {
//     test('returns initial values until curveTo() and update() called', () => {
//         const path = new DynamicCurvedPath(11, 12);
//         expect(path.x).toBe(11);
//         expect(path.y).toBe(12);
//         path.curveTo(111, 112, 100, 3.14, 500);
//         expect(path.x).toBe(11);
//         expect(path.y).toBe(12);
//         path.update(50);
//         expect(path.x).not.toBe(11);
//         expect(path.y).not.toBe(12);
//     });
// }

// function testReturnsGivenValuesWhenCurveToCalledWithDurationOf0(): void {
//     test('returns given values when curveTo() called with duration of 0', () => {
//         const path = new DynamicCurvedPath(11, 12);
//         expect(path.x).toBe(11);
//         expect(path.y).toBe(12);
//         path.curveTo(111, 112, 100, 3.14, 0);
//         expect(path.x).toBe(111);
//         expect(path.y).toBe(112);
//         path.update(50);
//         expect(path.x).toBe(111);
//         expect(path.y).toBe(112);
//     });
// }

// // use a quadratic bezier object to compare against
// function testMovesAsExpectedOverTime(): void {
//     test('moves as expected over time', () => {

//         const startX = 100;
//         const startY = 100;
//         const endX = 1000;
//         const endY = 1200;
//         const duration = 1000;
//         const update1 = 17;
//         const update2 = 16;
//         const update3 = 18;
//         const bezier = new QuadraticBezierCurve();
//         let elapsed = 0;
//         let progress = 0;
//         bezier.setStart(startX, startY);
//         bezier.setEnd(endX, endY);
//         bezier.makeStraight();

//         const path = new DynamicCurvedPath(startX, startY);
//         path.moveTo(endX, endY, duration);

//         path.update(update1);
//         elapsed += update1;
//         progress = elapsed / duration;
//         expect(path.x).toBe(bezier.x(progress));
//         expect(path.y).toBe(bezier.y(progress));

//         path.update(update2);
//         elapsed += update2;
//         progress = elapsed / duration;
//         expect(path.x).toBe(bezier.x(progress));
//         expect(path.y).toBe(bezier.y(progress));

//         path.update(update3);
//         elapsed += update3;
//         progress = elapsed / duration;
//         expect(path.x).toBe(bezier.x(progress));
//         expect(path.y).toBe(bezier.y(progress));


//     });
// }

// // use a quadratic bezier object to compare against
// function testCurvesAsExpectedOverTime(): void {
//     test('curves as expected over time', () => {

//         const startX = 100;
//         const startY = 100;
//         const endX = 1000;
//         const endY = 1200;
//         const anchorDistance = 500;
//         const anchorAngle = Math.PI / 4;
//         const duration = 800;
//         const update1 = 17;
//         const update2 = 16;
//         const update3 = 18;
//         const bezier = new QuadraticBezierCurve();
//         let elapsed = 0;
//         let progress = 0;
//         bezier.setStart(startX, startY);
//         bezier.setEnd(endX, endY);
//         bezier.setControlByDistanceAndAngleFromStart(anchorDistance, anchorAngle);

//         const path = new DynamicCurvedPath(startX, startY);
//         path.curveTo(endX, endY, anchorDistance, anchorAngle, duration);

//         path.update(update1);
//         elapsed += update1;
//         progress = elapsed / duration;
//         expect(path.x).toBe(bezier.x(progress));
//         expect(path.y).toBe(bezier.y(progress));

//         path.update(update2);
//         elapsed += update2;
//         progress = elapsed / duration;
//         expect(path.x).toBe(bezier.x(progress));
//         expect(path.y).toBe(bezier.y(progress));

//         path.update(update3);
//         elapsed += update3;
//         progress = elapsed / duration;
//         expect(path.x).toBe(bezier.x(progress));
//         expect(path.y).toBe(bezier.y(progress));

//     });
// }

// function testLoadDoesNotThrowErrorIfValidLoad(): void {
//     test('load does not throw error if valid load', () => {
//         const unit = new DynamicUnit();
//         const bezier = new QuadraticBezierCurve();
//         const path = new DynamicCurvedPath();
//         expect(() => {
//             path.load(JSON.stringify({
//                 unit: unit.save(),
//                 bezier: bezier.save(),
//                 isOn: false
//             }));
//         }).not.toThrow();
//     });
// }

// function testLoadThrowsErrorIfInvalidJSON(): void {
//     test('load throws error if invalid JSON', () => {
//         const path = new DynamicCurvedPath();
//         expect(() => {
//             path.load(JSON.stringify('{'));
//         }).toThrow();
//     });
// }

// function testContinuesToBehaveAsExpectedAfterSaveAndReload(): void {
//     test('continues to behave as expected after save and reload', () => {
//         const path = new DynamicCurvedPath(55, 66);
//         path.curveTo(190, 257, 450, -Math.PI / 2, 300, 'easeInCirc');
//         path.update(20);
//         let x = path.x;
//         let y = path.y;
//         path.load(path.save()); // <--
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.update(20);
//         x = path.x;
//         y = path.y;
//         path.load(path.save()); // <--
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.update(18);
//         x = path.x;
//         y = path.y;
//         path.load(path.save()); // <--
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.turnOff();
//         path.update(19);
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.load(path.save()); // <--
//         path.update(19);
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.turnOn();
//         path.update(19);
//         x = path.x;
//         y = path.y;
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.load(path.save()); // <--
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//     });
// }

// function testLoadThrowsErrorIfMissingUnitProperty(): void {
//     test('load throws error if missing "unit" property', () => {
//         // const unit = new DynamicUnit();
//         const bezier = new QuadraticBezierCurve();
//         const path = new DynamicCurvedPath();
//         expect(() => {
//             path.load(JSON.stringify({
//                 // unit: unit.save(),
//                 bezier: bezier.save(),
//                 isOn: false
//             }));
//         }).toThrow();
//     });
// }

// function testLoadThrowsErrorIfMissingBezierProperty(): void {
//     test('load throws error if missing "bezier" property', () => {
//         const unit = new DynamicUnit();
//         // const bezier = new QuadraticBezierCurve();
//         const path = new DynamicCurvedPath();
//         expect(() => {
//             path.load(JSON.stringify({
//                 unit: unit.save(),
//                 // bezier: bezier.save(),
//                 isOn: false
//             }));
//         }).toThrow();
//     });
// }

// function testLoadThrowsErrorIfMissingIsOnProperty(): void {
//     test('load throws error if missing "isOn" property', () => {
//         const unit = new DynamicUnit();
//         const bezier = new QuadraticBezierCurve();
//         const path = new DynamicCurvedPath();
//         expect(() => {
//             path.load(JSON.stringify({
//                 unit: unit.save(),
//                 bezier: bezier.save(),
//                 // isOn: false
//             }));
//         }).toThrow();
//     });
// }

// function testOnlyUpdatesWhenTurnedOnAndActive(): void {
//     test('only updates when turned on and active', () => {
//         const path = new DynamicCurvedPath();
//         expect(path.isActive).not.toBeTruthy();
//         let x = path.x;
//         let y = path.y;
//         path.update(20);
//         expect(path.isActive).not.toBeTruthy();
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.moveTo(50, 60, 100);
//         expect(path.isActive).toBeTruthy();
//         path.update(20);
//         expect(path.x).not.toBe(x);
//         expect(path.y).not.toBe(y);
//         x = path.x;
//         y = path.y;
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.turnOff();
//         expect(path.isActive).toBeTruthy();
//         path.update(20);
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.turnOn();
//         expect(path.isActive).toBeTruthy();
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.update(19);
//         x = path.x;
//         y = path.y;
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.update(62);
//         expect(path.isActive).not.toBeTruthy();
//         path.curveTo(500, 600, 700, 1.5, 200);
//         expect(path.isActive).toBeTruthy();
//         x = path.x;
//         y = path.y;
//         path.update(50);
//         expect(path.x).not.toBe(x);
//         expect(path.y).not.toBe(y);
//         x = path.x;
//         y = path.y;
//         path.turnOff();
//         expect(path.isActive).toBeTruthy();
//         path.update(60);
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.turnOn();
//         x = path.x;
//         y = path.y;
//         path.update(60);
//         expect(path.x).not.toBe(x);
//         expect(path.y).not.toBe(y);
//     });
// }

// // use bezier object to compare
// function testMoveToUpdatesCorrectlyWithNoEase(): void {
//     test('moveTo() updates correctly with no ease', () => {

//         const start = { x: -150, y: 788 };
//         const end = { x: 400, y: 200 };
//         const duration = 567;
//         const bezier = new QuadraticBezierCurve();
//         bezier.setStart(start.x, start.y);
//         bezier.setEnd(end.x, end.y);
//         bezier.makeStraight();
//         const update1 = 16.2;
//         const update2 = 18.1;
//         const update3 = 16.8;

//         let elapsed = 0;
//         let progress = 0;
//         const path = new DynamicCurvedPath(start.x, start.y);
//         path.moveTo(end.x, end.y, duration);

//         path.update(update1);
//         elapsed += update1;
//         progress = elapsed / duration;
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//         path.update(update2);
//         elapsed += update2;
//         progress = elapsed / duration;
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//         path.update(update3);
//         elapsed += update3;
//         progress = elapsed / duration;
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//     });
// }

// // use bezier object to compare
// function testMoveToUpdatesCorrectlyWithEase(): void {
//     test('moveTo() updates correctly with ease', () => {

//         const start = { x: 1029, y: 11 };
//         const end = { x: 52.3, y: -66.89 };
//         const duration = 211.34;
//         const bezier = new QuadraticBezierCurve();
//         bezier.setStart(start.x, start.y);
//         bezier.setEnd(end.x, end.y);
//         bezier.makeStraight();
//         const update1 = 19.6;
//         const update2 = 18.2;
//         const update3 = 16.9;
//         const easeOption: EASE.tEaseOption = 'easeInOutQuad';
//         const easeFn: EASE.tEaseFunction = EASE.load(easeOption);
//         let elapsed = 0;
//         let progress = 0;
//         const path = new DynamicCurvedPath(start.x, start.y);
//         path.moveTo(end.x, end.y, duration, easeOption);

//         path.update(update1);
//         elapsed += update1;
//         progress = easeFn(elapsed / duration);
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//         path.update(update2);
//         elapsed += update2;
//         progress = easeFn(elapsed / duration);
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//         path.update(update3);
//         elapsed += update3;
//         progress = easeFn(elapsed / duration);
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//     });
// }

// // use bezier object to compare
// function testCurveToUpdatesCorrectlyWithNoEase(): void {
//     test('curveTo() updates correctly with no ease', () => {

//         const start = { x: 109, y: 207.6 };
//         const end = { x: 50.2, y: 101.99 };
//         const duration = 495.2;
//         const distance = 235.1;
//         const angle = 3.02;
//         const bezier = new QuadraticBezierCurve();
//         bezier.setStart(start.x, start.y);
//         bezier.setEnd(end.x, end.y);
//         bezier.setControlByDistanceAndAngleFromStart(distance, angle);
//         const update1 = 19.26;
//         const update2 = 18.45;
//         const update3 = 16.99;

//         let elapsed = 0;
//         let progress = 0;
//         const path = new DynamicCurvedPath(start.x, start.y);
//         path.curveTo(end.x, end.y, distance, angle, duration);

//         path.update(update1);
//         elapsed += update1;
//         progress = elapsed / duration;
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//         path.update(update2);
//         elapsed += update2;
//         progress = elapsed / duration;
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//         path.update(update3);
//         elapsed += update3;
//         progress = elapsed / duration;
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//     });
// }

// // use bezier object to compare
// function testCurveToUpdatesCorrectlyWithEase(): void {
//     test('curveTo() updates correctly with ease', () => {

//         const start = { x: 5.5, y: 207.6 };
//         const end = { x: 50, y: 1123.23 };
//         const duration = 510.4;
//         const distance = 305.66;
//         const angle = -Math.PI / 5;
//         const bezier = new QuadraticBezierCurve();
//         bezier.setStart(start.x, start.y);
//         bezier.setEnd(end.x, end.y);
//         bezier.setControlByDistanceAndAngleFromStart(distance, angle);
//         const easeOption: EASE.tEaseOption = 'easeInOutElastic';
//         const easeFn: EASE.tEaseFunction = EASE.load(easeOption);
//         const update1 = 19.2;
//         const update2 = 18.3;
//         const update3 = 16.45;
//         let elapsed = 0;
//         let progress = 0;

//         const path = new DynamicCurvedPath(start.x, start.y);
//         path.curveTo(end.x, end.y, distance, angle, duration, easeOption);

//         path.update(update1);
//         elapsed += update1;
//         progress = easeFn(elapsed / duration);
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//         path.update(update2);
//         elapsed += update2;
//         progress = easeFn(elapsed / duration);
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//         path.update(update3);
//         elapsed += update3;
//         progress = easeFn(elapsed / duration);
//         expect(path.x).toBeCloseTo(bezier.x(progress));
//         expect(path.y).toBeCloseTo(bezier.y(progress));

//     });
// }

// function testDoesNotUpdateOnceTransitionComplete(): void {
//     test('does not update once transition complete', () => {
//         const path = new DynamicCurvedPath(250, 350);
//         expect(path.x).toBe(250);
//         expect(path.y).toBe(350);
//         path.moveTo(900, 800, 600);
//         expect(path.isActive).toBeTruthy();
//         for (let i = 60; i < 600; i += 60) {
//             path.update(60);
//             expect(path.isActive).toBeTruthy();
//         }
//         path.update(60);
//         expect(path.isActive).not.toBeTruthy();
//         expect(path.x).toBe(900);
//         expect(path.y).toBe(800);
//         for (let i = 60; i < 600; i += 60) {
//             path.update(60);
//             expect(path.isActive).not.toBeTruthy();
//             expect(path.x).toBe(900);
//             expect(path.y).toBe(800);
//         }
//     });
// }

// function testTurnOnTurnOffStopsAndStartsPathFromUpdating(): void {
//     test('turnOn() and turnOff() stop and start path from updating', () => {
//         const path = new DynamicCurvedPath();
//         path.moveTo(600, 600, 600);
//         let x = path.x;
//         let y = path.y;
//         path.update(300);
//         expect(path.x).not.toBe(x);
//         expect(path.x).not.toBe(y);
//         x = path.x;
//         y = path.y;
//         path.turnOff(); // <--
//         path.update(300);
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.turnOn(); // <--
//         path.update(300);
//         expect(path.x).not.toBe(x);
//         expect(path.y).not.toBe(y);
//         expect(path.x).toBe(600);
//         expect(path.y).toBe(600);
//         expect(path.isActive).not.toBeTruthy();
//         path.curveTo(800, 500, 300, 1.5, 500);
//         expect(path.isActive).toBeTruthy();
//         x = path.x;
//         y = path.y;
//         path.update(100);
//         expect(path.x).not.toBe(x);
//         expect(path.y).not.toBe(y);
//         x = path.x;
//         y = path.y;
//         path.turnOff(); // <--
//         path.update(100);
//         expect(path.x).toBe(x);
//         expect(path.y).toBe(y);
//         path.turnOn(); // <--
//         path.update(100);
//         expect(path.x).not.toBe(x);
//         expect(path.y).not.toBe(y);

//     });
// }

// function testMoveToNegativeDurationDoesNothing(): void {
//     test('moveTo() negative duration does nothing', () => {
//         const path = new DynamicCurvedPath(10, 20);
//         expect(path.isActive).not.toBeTruthy();
//         path.moveTo(66, 77, -10);
//         expect(path.isActive).not.toBeTruthy();
//     });
// }

// function testMoveToDurationOf0InstantlyChangesCurrentValuesAndDoesNotTurnOnOrMakePathActive(): void {
//     test('moveTo() duration of 0 instantly changes current values and does not make Path active', () => {
//         const path = new DynamicCurvedPath(10, 20);
//         path.moveTo(66, 77, 0);
//         expect(path.isActive).not.toBeTruthy();
//         expect(path.x).toBe(66);
//         expect(path.y).toBe(77);
//     });
// }

// function testMoveToPostiveDurationChangesCurrentValueOverTimeAndTurnsPathOnAndMakesItActive(): void {
//     test('moveTo() positive duration changes current value over time and makes path active', () => {
//         const path = new DynamicCurvedPath(1, 999);
//         path.moveTo(2, 888, 200);
//         expect(path.isActive).toBeTruthy();
//         path.update(20);
//         expect(path.isActive).toBeTruthy();
//         expect(path.x).toBeCloseTo(1.1);
//         expect(path.y).toBeCloseTo(999 - 11.1);
//     });
// }

// function testMoveToNothingHappensIfXYValuesAreSameAsCurrentValues(): void {
//     test('moveTo() nothing happens if x and y values are the same as current values (same position)', () => {
//         const path = new DynamicCurvedPath(10, 12);
//         path.moveTo(10, 12, 500);
//         expect(path.isActive).not.toBeTruthy();
//         path.moveTo(20, 20);
//         expect(path.isActive).not.toBeTruthy();
//         path.moveTo(20, 20, 500);
//         expect(path.isActive).not.toBeTruthy();
//         path.moveTo(10, 12, 500);
//         expect(path.isActive).toBeTruthy();

//     });
// }

// function testMoveToCanMoveIfOneOfXOrYIsTheCurrentValue(): void {
//     test('moveTo() CAN move if one of x or y is the current value', () => {
//         const path = new DynamicCurvedPath(100, 200);
//         path.moveTo(200, 200);
//         expect(path.x).toBe(200);
//         expect(path.y).toBe(200);
//         path.moveTo(200, 100);
//         expect(path.x).toBe(200);
//         expect(path.y).toBe(100);
//         path.moveTo(100, 100);
//         expect(path.x).toBe(100);
//         expect(path.y).toBe(100);
//         path.moveTo(100, 200, 100);
//         path.update(100);
//         expect(path.x).toBe(100);
//         expect(path.y).toBe(200);
//         path.moveTo(100, 100, 100);
//         path.update(100);
//         expect(path.x).toBe(100);
//         expect(path.y).toBe(100);
//     });
// }

// function testCurveToNegativeDurationDoesNothing(): void {
//     test('curveTo() negative duration does nothing', () => {
//         const path = new DynamicCurvedPath(10, 20);
//         expect(path.isActive).not.toBeTruthy();
//         path.curveTo(66, 77, 100, 1.5, -1);
//         expect(path.isActive).not.toBeTruthy();
//     });
// }

// function testCurveToDurationOf0InstantlyChangesCurrentValuesAndDoesNotTurnOnOrMakePathActive(): void {
//     test('curveTo() duration of 0 instantly changes current values and does not make path active (edge case)', () => {
//         const path = new DynamicCurvedPath(10, 10);
//         path.curveTo(20, 20, 100, 50);
//         expect(path.isActive).not.toBeTruthy();
//     });
// }

// function testCurveToPostiveDurationChangesCurrentValueOverTimeAndTurnsPathOnAndMakesItActive(): void {
//     test('curveTo() positive duration changes current values over time and makes path active', () => {
//         const path = new DynamicCurvedPath(10, 10);
//         path.curveTo(20, 20, 100, 50, 10);
//         expect(path.isActive).toBeTruthy();
//     });
// }

// function testCurveToNothingHappensIfXYValuesAreSameAsCurrentValues(): void {
//     test('curveTo() nothing happens if x and y values are the same as current values (same position) (edge case)', () => {
//         const path = new DynamicCurvedPath(1000, 2000);
//         path.curveTo(1000, 2000, 100, 1, 200);
//         expect(path.isActive).not.toBeTruthy();
//     });
// }

// function testCurveToCanMoveIfOneOfXOrYIsTheCurrentValue(): void {
//     test('curveTo() CAN move if one of x or y has the same current value', () => {

//         let path = new DynamicCurvedPath(100, 200);
//         path.curveTo(100, 300, 300, 1.5, 1000);
//         expect(path.isActive).toBeTruthy();

//         path = new DynamicCurvedPath(100, 200);
//         path.curveTo(300, 200, 300, 1.5, 1000);
//         expect(path.isActive).toBeTruthy();

//         path = new DynamicCurvedPath(100, 200);
//         path.curveTo(100, 200, 300, 1.5, 1000);
//         expect(path.isActive).not.toBeTruthy();

//     });
// }