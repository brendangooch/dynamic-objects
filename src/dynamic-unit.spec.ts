/**
 * 
 */

import * as EXPECT from '@brendangooch/jest-expect';
import { DynamicUnit } from "./dynamic-unit.js";

let unit: DynamicUnit
beforeEach(() => {
    unit = new DynamicUnit();
});


testAll();
function testAll(): void {
    describe('DynamicUnit', () => {

        testStartsInactive();
        testIntitialCurrentValueIs0();
        testCannotSetDurationIfUnitIsActive();
        testCannotSetDurationOf0();
        testCannotSetDurationLessThan0();
        testSettingDurationDoesNotMakeTheUnitActive();
        testDurationGoesBackTo0OnceDurationHasElapsed();
        testCannotSetEaseIfUnitIsActive();
        testEaseReturnsToNoEaseOnceDurationHasElapsed();
        testRunDoesNothingIFAlreadyActive();
        testRunDoesNothingIfDurationIs0OrLess();
        testRunStartsTheUnitIDurationSetAndNotActive();
        testClonedObjectIsNotTheSameObjectAsOriginator();
        testClonedObjectHasTheSameEaseAndDurationOfOriginator();
        testValidLoadReturnsTrue();
        testLoadReturnsFalseIfMissingParentProperty();
        testLoadReturnsFalseIfMissingElapsedProperty();
        testLoadReturnsFalseIfMissingCurrentValueProperty();
        testSaveThenLoadDoesNotChangeBehaviour();
        testCanSaveWhetherOnOrOff();
        testCanStopAndStartUpdate();
        testCanBeOffAndActive();
        testCurrentValueIsTheSameWhetherOnOrOff();
        testReturnsExpectedCurrentValuesDuringFullDuration();
        testReturnsExpectedCurrentValuesDuringFullDurationWithEaseApplied();

    });
}

function testStartsInactive(): void {
    test('starts inactive', () => {
        EXPECT.falsy(unit.isActive);
    });
}

function testIntitialCurrentValueIs0(): void {
    test('initial current value is 0', () => {
        EXPECT.toBe(unit.current, 0);
    });
}

function testCannotSetDurationIfUnitIsActive(): void {
    test('cannot set duration if unit is active', () => {
        EXPECT.truthy(unit.duration(1000).run());
        EXPECT.truthy(unit.isActive);
        unit.duration(2000);
        unit.update(100);
        EXPECT.toBe(unit.current, 0.1);
    });
}

function testCannotSetDurationOf0(): void {
    test('cannot set duration of 0', () => {
        EXPECT.falsy(unit.duration(0).run());
    });
}

function testCannotSetDurationLessThan0(): void {
    test('cannot set duration of less than 0', () => {
        EXPECT.falsy(unit.duration(-10).run());
    });
}

function testSettingDurationDoesNotMakeTheUnitActive(): void {
    test('setting duration does not make the unit active', () => {
        unit.duration(1000);
        EXPECT.falsy(unit.isActive);
    });
}

function testDurationGoesBackTo0OnceDurationHasElapsed(): void {
    test('duration goes back to 0 once duration has elapsed', () => {
        unit.duration(1000).run();
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        EXPECT.falsy(unit.isActive);
        EXPECT.falsy(unit.run()); // cannot run if duration 0
    });
}

function testCannotSetEaseIfUnitIsActive(): void {
    test('cannot set ease if unit is active', () => {
        unit.duration(1000).run();
        EXPECT.truthy(unit.isActive);
        unit.ease('easeInElastic');
        unit.update(100);
        EXPECT.toBe(unit.current, 0.1);
    });
}

function testEaseReturnsToNoEaseOnceDurationHasElapsed(): void {
    test('ease returns to "noEase" once duration has elapsed', () => {
        unit.duration(200).ease('easeInQuad').run();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.5, 2));
        unit.update(100);
        EXPECT.falsy(unit.isActive);
        unit.duration(1000).run();
        unit.update(100);
        EXPECT.toBe(unit.current, 0.1); // no ease
    });
}

function testRunDoesNothingIFAlreadyActive(): void {
    test('run() does nothing if already active', () => {
        EXPECT.truthy(unit.duration(1000).run());
        EXPECT.truthy(unit.isActive);
        EXPECT.falsy(unit.run());
    });
}

function testRunDoesNothingIfDurationIs0OrLess(): void {
    test('run() does nothing if duration <= 0', () => {
        EXPECT.falsy(unit.duration(0).run());
        EXPECT.falsy(unit.isActive);
        EXPECT.falsy(unit.duration(-10).run());
        EXPECT.falsy(unit.isActive);
    });
}

function testRunStartsTheUnitIDurationSetAndNotActive(): void {
    test('run() starts the unit if duration set and not active', () => {
        EXPECT.falsy(unit.isActive);
        EXPECT.truthy(unit.duration(1000).run());
        EXPECT.truthy(unit.isActive);
    });
}

function testClonedObjectIsNotTheSameObjectAsOriginator(): void {
    test('cloned object is NOT the same object as originator', () => {
        const clone = unit.clone();
        EXPECT.falsy(clone === unit);
    });
}

function testClonedObjectHasTheSameEaseAndDurationOfOriginator(): void {
    test('cloned object has the same ease and duration of originator', () => {
        unit.duration(1000).ease('easeInOutSine');
        const clone = unit.clone();
        unit.run();
        clone.run();
        unit.update(200);
        clone.update(200);
        EXPECT.toBe(unit.current, clone.current);
    });
}

function testValidLoadReturnsTrue(): void {
    test('valid load returns true', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        EXPECT.truthy(
            unit.load(
                JSON.stringify({
                    parent: parent,
                    elapsed: 0,
                    currentValue: 0
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingParentProperty(): void {
    test('load returns false if missing "parent" property', () => {
        // const parent = JSON.stringify({
        //     isOn: false,
        //     duration: 0,
        //     easeOption: 'noEase'
        // });
        EXPECT.falsy(
            unit.load(
                JSON.stringify({
                    // parent: parent,
                    elapsed: 0,
                    currentValue: 0
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingElapsedProperty(): void {
    test('load returns false if missing "elapsed" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        EXPECT.falsy(
            unit.load(
                JSON.stringify({
                    parent: parent,
                    // elapsed: 0,
                    currentValue: 0
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingCurrentValueProperty(): void {
    test('load returns false if missing "currentValue" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        EXPECT.falsy(
            unit.load(
                JSON.stringify({
                    parent: parent,
                    elapsed: 0,
                    // currentValue: 0
                })
            )
        )
    });
}

function testSaveThenLoadDoesNotChangeBehaviour(): void {
    test('save then load does not change behaviour', () => {
        unit.duration(1000).ease('easeInCubic').run();
        EXPECT.truthy(unit.isActive);
        unit.load(unit.save()); // <--
        EXPECT.truthy(unit.isActive);
        unit.update(200);
        unit.load(unit.save()); // <--
        EXPECT.truthy(unit.isActive);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.2, 3));
        unit.update(200);
        unit.load(unit.save()); // <--
        EXPECT.truthy(unit.isActive);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.4, 3));
        unit.update(200);
        unit.load(unit.save()); // <--
        EXPECT.truthy(unit.isActive);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.6, 3));
        unit.update(200);
        unit.load(unit.save()); // <--
        EXPECT.truthy(unit.isActive);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.8, 3));
        unit.update(200);
        unit.load(unit.save()); // <--
        EXPECT.falsy(unit.isActive);
        EXPECT.toBe(unit.current, 1);
    });
}

function testCanSaveWhetherOnOrOff(): void {
    test('can save whether unit is on or off', () => {
        unit.duration(1000).run();
        unit.turnOff();
        unit.load(unit.save());
        unit.turnOn();
        unit.update(100);
        EXPECT.toBe(unit.current, 0.1);
    });
}

function testCanStopAndStartUpdate(): void {
    test('can stop and start update', () => {
        unit.duration(1000).run();
        unit.update(200);
        EXPECT.toBe(unit.current, 0.2);
        unit.turnOff();
        unit.update(200);
        EXPECT.toBe(unit.current, 0.2);
        unit.turnOn();
        unit.update(200);
        EXPECT.toBe(unit.current, 0.4);
    });
}

function testCanBeOffAndActive(): void {
    test('can be off and active', () => {
        unit.duration(1000).run();
        EXPECT.truthy(unit.isActive);
        unit.turnOff();
        EXPECT.truthy(unit.isActive);
    });
}

function testCurrentValueIsTheSameWhetherOnOrOff(): void {
    test('current value is the same whether on or off', () => {
        unit.duration(1000).run();
        EXPECT.toBe(unit.current, 0);
        unit.turnOff();
        EXPECT.toBe(unit.current, 0);
        unit.turnOn();
        unit.update(200);
        EXPECT.toBe(unit.current, 0.2);
        unit.turnOff();
        EXPECT.toBe(unit.current, 0.2);
    });
}

function testReturnsExpectedCurrentValuesDuringFullDuration(): void {
    test('returns expected current values during full duration', () => {
        EXPECT.truthy(unit.duration(1000).run());
        EXPECT.truthy(unit.isActive);
        unit.update(100);
        EXPECT.toBe(unit.current, 0.1);
        unit.update(100);
        EXPECT.toBe(unit.current, 0.2);
        unit.update(100);
        EXPECT.toBe(unit.current, 0.3);
        unit.update(100);
        EXPECT.toBe(unit.current, 0.4);
        unit.update(100);
        EXPECT.toBe(unit.current, 0.5);
        unit.update(100);
        EXPECT.toBe(unit.current, 0.6);
        unit.update(100);
        EXPECT.toBe(unit.current, 0.7);
        unit.update(100);
        EXPECT.toBe(unit.current, 0.8);
        unit.update(100);
        EXPECT.toBe(unit.current, 0.9);
        unit.update(100);
        EXPECT.falsy(unit.isActive);
        EXPECT.toBe(unit.current, 1);
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationWithEaseApplied(): void {
    test('returns expected current values during full duration with ease applied', () => {
        EXPECT.truthy(unit.duration(1000).ease('easeInQuint').run());
        EXPECT.truthy(unit.isActive);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.1, 5));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.2, 5));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.3, 5));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.4, 5));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.5, 5));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.6, 5));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.7, 5));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.8, 5));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.9, 5));
        unit.update(100);
        EXPECT.falsy(unit.isActive);
        EXPECT.toBeCloseTo(unit.current, 1);
    });
}