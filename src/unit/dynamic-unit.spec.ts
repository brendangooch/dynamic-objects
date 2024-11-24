/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicUnit } from "./dynamic-unit.js";

const EXPECT = new JestExpect();
let unit: DynamicUnit
beforeEach(() => {
    unit = new DynamicUnit();
});

testAll();
function testAll(): void {
    describe('DynamicUnit', () => {

        test('dummy', () => { });

        // testStartsInactive();
        // testBecomesActiveOnceDurationSetAndStartCalled();
        // testBecomesInActiveOnceTransitionComplete();
        // testStartsWithCurrentValueOf0();
        // testEndsWithCurrentValueOF1();
        // testCannotSetADurationOf0();
        // testCannotSetADurationLessThan0();
        // testCannotStartWithoutSettingDuration();
        // testCannotSetDurationWhilstActive();
        // testCannotSetEaseWhilstActive();
        // testStartDoesNothingIfAlreadyActive();
        // testUnitCanBeStopped();
        // testUnitCanBeStoppedAndRestarted();
        // testClonedObjectHasTheSameDurationAndEaseAsOriginal();
        // testClonedObjectNOTTheSameObject();
        // testClonedObjectDoesNOTCopyCurrentValue();
        // testFullTransitionBehavesAsExpected();
        // testFullTransitionBehavesAsExpectedWithEaseApplied();
        // testFullTransitionBehavesAsExpectedWithMultipleSaveThenLoad();

    });
}


// function testStartsInactive(): void {
//     test('starts inactive', () => {
//         EXPECT.falsy(unit.isActive);
//     });
// }

// function testBecomesActiveOnceDurationSetAndStartCalled(): void {
//     test('becomes active once duration set and start called', () => {
//         unit.duration(1000).start();
//         EXPECT.truthy(unit.isActive);
//     });
// }

// function testBecomesInActiveOnceTransitionComplete(): void {
//     test('becomes inactive once transition complete', () => {
//         unit.duration(1000).start();
//         EXPECT.truthy(unit.isActive);
//         unit.update(1000);
//         EXPECT.falsy(unit.isActive);
//     });
// }

// function testStartsWithCurrentValueOf0(): void {
//     test('starts with current value of 0', () => {
//         EXPECT.toBe(unit.current, 0);
//     });
// }

// function testEndsWithCurrentValueOF1(): void {
//     test('ends with current value of 1', () => {
//         unit.duration(1000).start();
//         unit.update(1000);
//         EXPECT.toBe(unit.current, 1);
//     });
// }

// function testCannotSetADurationOf0(): void {
//     test('cannot set a duration of 0', () => {
//         unit.duration(0).start();
//         EXPECT.falsy(unit.isActive);
//     });
// }

// function testCannotSetADurationLessThan0(): void {
//     test('cannot set a duration less than 0', () => {
//         unit.duration(-100).start();
//         EXPECT.falsy(unit.isActive);
//     });
// }

// function testCannotStartWithoutSettingDuration(): void {
//     test('cannot start without setting duration', () => {
//         unit.start();
//         EXPECT.falsy(unit.isActive);
//     });
// }

// function testCannotSetDurationWhilstActive(): void {
//     test('cannot set duration whilst active', () => {
//         unit.duration(1000).start();
//         EXPECT.truthy(unit.isActive);
//         unit.duration(2000);
//         unit.update(100);
//         EXPECT.toBeCloseTo(unit.current, 0.1);
//     });
// }

// function testCannotSetEaseWhilstActive(): void {
//     test('cannot set ease whilst active', () => {
//         unit.duration(1000).start();
//         EXPECT.truthy(unit.isActive);
//         unit.ease('easeInCubic');
//         unit.update(100);
//         EXPECT.toBeCloseTo(unit.current, 0.1);
//     });
// }

// function testStartDoesNothingIfAlreadyActive(): void {
//     test('start does nothing if already active', () => {
//         unit.duration(1000).start();
//         EXPECT.truthy(unit.isActive);
//         unit.update(100);
//         EXPECT.toBeCloseTo(unit.current, 0.1);
//         unit.start(); // <--
//         unit.update(100);
//         EXPECT.toBeCloseTo(unit.current, 0.2);
//     });
// }

// function testUnitCanBeStopped(): void {
//     test('unit can be stopped', () => {
//         unit.duration(1000).start();
//         EXPECT.truthy(unit.isActive);
//         unit.stop(); // <--
//         EXPECT.falsy(unit.isActive);
//     });
// }

// function testUnitCanBeStoppedAndRestarted(): void {
//     test('unit can be stopped and restarted', () => {
//         unit.duration(1000).start();
//         EXPECT.truthy(unit.isActive);
//         unit.stop(); // <--
//         EXPECT.falsy(unit.isActive);
//         unit.duration(1000).start();
//         EXPECT.truthy(unit.isActive);
//         unit.update(100);
//         EXPECT.toBeCloseTo(unit.current, 0.1);
//     });
// }

// function testClonedObjectHasTheSameDurationAndEaseAsOriginal(): void {
//     test('cloned object has same duration and ease as original', () => {
//         unit.duration(1000).ease('easeInCubic');
//         const clone = unit.clone();
//         unit.start();
//         clone.start();
//         unit.update(100);
//         clone.update(100);
//         EXPECT.toBe(unit.current, clone.current);
//     });
// }

// function testClonedObjectNOTTheSameObject(): void {
//     test('cloned object NOT the same object', () => {
//         unit.duration(1000).ease('easeInCubic');
//         const clone = unit.clone();
//         EXPECT.falsy(unit === clone);
//     });
// }

// function testClonedObjectDoesNOTCopyCurrentValue(): void {
//     test('cloned object does NOT copy current value', () => {
//         unit.duration(1000).ease('easeInCubic').start();
//         unit.update(100);
//         const clone = unit.clone();
//         clone.start();
//         unit.update(100);
//         clone.update(100);
//         EXPECT.not.toBe(unit.current, clone.current);
//     });
// }

// function testFullTransitionBehavesAsExpected(): void {
//     test('full transition behaves as expected', () => {
//         unit.duration(1000).start();
//         EXPECT.truthy(unit.isActive);
//         EXPECT.toBe(unit.current, 0);
//         unit.update(200);
//         EXPECT.toBeCloseTo(unit.current, 0.2);
//         unit.update(200);
//         EXPECT.toBeCloseTo(unit.current, 0.4);
//         unit.update(200);
//         EXPECT.toBeCloseTo(unit.current, 0.6);
//         unit.update(200);
//         EXPECT.toBeCloseTo(unit.current, 0.8);
//         unit.update(200);
//         EXPECT.toBe(unit.current, 1);
//         EXPECT.falsy(unit.isActive);
//     });
// }

// function testFullTransitionBehavesAsExpectedWithEaseApplied(): void {
//     test('full transition behaves as expected with ease applied', () => {
//         unit.duration(1000).ease('easeInCubic').start();
//         EXPECT.truthy(unit.isActive);
//         EXPECT.toBe(unit.current, 0);
//         unit.update(200);
//         EXPECT.toBeCloseTo(unit.current, Math.pow(0.2, 3));
//         unit.update(200);
//         EXPECT.toBeCloseTo(unit.current, Math.pow(0.4, 3));
//         unit.update(200);
//         EXPECT.toBeCloseTo(unit.current, Math.pow(0.6, 3));
//         unit.update(200);
//         EXPECT.toBeCloseTo(unit.current, Math.pow(0.8, 3));
//         unit.update(200);
//         EXPECT.toBe(unit.current, 1);
//         EXPECT.falsy(unit.isActive);
//     });
// }

// function testFullTransitionBehavesAsExpectedWithMultipleSaveThenLoad(): void {
//     test('full transition behaves as expected with multiple save then load', () => {
//         unit.duration(1000).start();
//         unit.load(unit.save()); // <--
//         EXPECT.truthy(unit.isActive);
//         EXPECT.toBe(unit.current, 0);
//         unit.update(200);
//         unit.load(unit.save()); // <--
//         EXPECT.toBeCloseTo(unit.current, 0.2);
//         unit.update(200);
//         unit.load(unit.save()); // <--
//         EXPECT.toBeCloseTo(unit.current, 0.4);
//         unit.update(200);
//         unit.load(unit.save()); // <--
//         EXPECT.toBeCloseTo(unit.current, 0.6);
//         unit.update(200);
//         unit.load(unit.save()); // <--
//         EXPECT.toBeCloseTo(unit.current, 0.8);
//         unit.update(200);
//         unit.load(unit.save()); // <--
//         EXPECT.toBe(unit.current, 1);
//         EXPECT.falsy(unit.isActive);
//     });
// }
