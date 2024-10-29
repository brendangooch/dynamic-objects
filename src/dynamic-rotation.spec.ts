/**
 * 
 */

import * as EXPECT from '@brendangooch/jest-expect';
import * as EASE from '@brendangooch/ease';
import { DynamicRotation } from './dynamic-rotation.js';
import { DynamicNumber } from './dynamic-number.js';

const PI = Math.PI;
const TAU = PI * 2;
const HALF_PI = PI / 2;
let rotation: DynamicRotation;
beforeEach(() => {
    rotation = new DynamicRotation();
});

testAll();
function testAll(): void {
    describe('DynamicRotation', () => {

        testInitialCurrentValueIs0IfNotSetInTheConstructor();
        testInitialCurrentValueIsValueSetInTheConstructor();
        testRotationStartsInactive();
        testDurationCannotBeSetIfRotationIsActive();
        testDurationMustBeGreateThan0ToHaveAnEffect();
        testSettingDurationDoesNotMakeTheRotationActive();
        testDurationIsResetTo0OnceUpdateComplete();
        testEaseCannotBeSetIfRotationIsActive();
        testSettingEaseDoesNotMakeTheRotationActive();
        testEaseIsResetToNoEaseOnceUpdateComplete();
        testCannotRotateIfRotationIsActive();
        testRotatingToTheCurrentValueDoesNothing();
        testRotateToWithNoDurationSetImmediatelyChangesTheCurrentValue();
        testCannotSpinToIfRotationIsActive();
        testNumSpinsMustBeAnInteger();
        testNumSpinsCanBeNegative();
        testDurationMUSTBeSetForSpinToToChangeTheCurrentValue();
        testLoadReturnsTrueOnValidLoad();
        testLoadReturnsFalseIfMissingParentProperty();
        testLoadReturnsFalseIfMissingRotationProperty();
        testLoadReturnsFalseIfMissingSpinProperty();
        testRotateToBehavesAsExpectedDuringFullDuration();
        testRotateToBehavesAsExpectedDuringFullDurationWithEase();
        testSpinToBehavesAsExpectedDuringFullDuration();
        testSpinToBehavesAsExpectedDuringFullDurationWithEase();
        testNegativeSpinToBehavesAsExpectedDuringFullDuration();
        testSpinToThenRotateToReturnsCorrectCurrentValues();
        testRotateToBehavesAsExpectedAfterSaveAndLoad();
        testSpinToBehavesAsExpectedAfterSaveAndLoad();


    });
}

function testInitialCurrentValueIs0IfNotSetInTheConstructor(): void {
    test('initial current valus is 0 if not set in the constructor', () => {
        EXPECT.toBe(rotation.current, 0);

    });
}

function testInitialCurrentValueIsValueSetInTheConstructor(): void {
    test('initial current value is value set in the constructor', () => {
        rotation = new DynamicRotation(-2);
        EXPECT.toBe(rotation.current, -2);
    });
}

function testRotationStartsInactive(): void {
    test('rotation starts inactive', () => {
        EXPECT.falsy(rotation.isActive);
    });
}

function testDurationCannotBeSetIfRotationIsActive(): void {
    test('duration cannot be set if rotation is active', () => {
        EXPECT.toBe(rotation.duration(1000).rotateTo(HALF_PI), 1000);
        EXPECT.truthy(rotation.isActive);
        rotation.duration(2000);
        rotation.update(100); // 10%
        EXPECT.toBeCloseTo(rotation.current, HALF_PI * 0.1);
    });
}

function testDurationMustBeGreateThan0ToHaveAnEffect(): void {
    test('duration must be greater than 0 to have an effect', () => {
        EXPECT.toBe(rotation.duration(0).rotateTo(HALF_PI), 0);
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.current, HALF_PI);
        EXPECT.toBe(rotation.duration(-10).rotateTo(PI), 0);
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.current, PI);
    });
}

function testSettingDurationDoesNotMakeTheRotationActive(): void {
    test('setting duration does not make the rotation active', () => {
        rotation.duration(1000);
        EXPECT.falsy(rotation.isActive);
    });
}

function testDurationIsResetTo0OnceUpdateComplete(): void {
    test('duration is reset to 0 once update complete', () => {
        rotation.duration(500).rotateTo(HALF_PI);
        EXPECT.truthy(rotation.isActive);
        for (let i = 0; i < 5; i++) {
            rotation.update(100);
        }
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.rotateTo(PI), 0);
        EXPECT.toBe(rotation.current, PI);
    });
}

function testEaseCannotBeSetIfRotationIsActive(): void {
    test('ease cannot be set if rotation is active', () => {
        rotation.duration(1000).rotateTo(-HALF_PI);
        EXPECT.truthy(rotation.isActive);
        rotation.ease('easeInOutElastic');
        rotation.update(200);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * 0.2);
    });
}

function testSettingEaseDoesNotMakeTheRotationActive(): void {
    test('setting ease does not make the rotation active', () => {
        rotation.ease('easeInOutBack');
        EXPECT.falsy(rotation.isActive);
    });
}

function testEaseIsResetToNoEaseOnceUpdateComplete(): void {
    test('ease is reset to noEase once update complete', () => {
        rotation.duration(1000).ease('easeInQuart').rotateTo(HALF_PI);
        for (let i = 0; i < 10; i++) {
            rotation.update(100);
        }
        EXPECT.falsy(rotation.isActive);
        rotation.duration(1000).rotateTo(PI);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, HALF_PI + (HALF_PI * 0.1));
    });
}

function testCannotRotateIfRotationIsActive(): void {
    test('cannot rotate if rotation is active', () => {
        rotation.duration(1000).rotateTo(PI);
        EXPECT.truthy(rotation.isActive);
        EXPECT.toBe(rotation.rotateTo(-PI), 0);
        EXPECT.toBe(rotation.current, 0);
    });
}

function testRotatingToTheCurrentValueDoesNothing(): void {
    test('rotating to the current value does nothing', () => {
        rotation.rotateTo(HALF_PI);
        EXPECT.toBe(rotation.current, HALF_PI);
        EXPECT.toBe(rotation.duration(500).rotateTo(HALF_PI), 0);
        EXPECT.falsy(rotation.isActive);
    });
}

function testRotateToWithNoDurationSetImmediatelyChangesTheCurrentValue(): void {
    test('rotateTo with no duration set immediately changes the current value', () => {
        EXPECT.toBe(rotation.rotateTo(PI), 0);
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.current, PI);
    });
}

function testCannotSpinToIfRotationIsActive(): void {
    test('cannot spinTo if rotation is active', () => {
        rotation.duration(1000).rotateTo(HALF_PI);
        EXPECT.truthy(rotation.isActive);
        EXPECT.toBe(rotation.duration(2000).spinTo(1, PI), 0);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, HALF_PI * 0.1);
    });
}

function testNumSpinsMustBeAnInteger(): void {
    test('numSpins must be an integer', () => {
        EXPECT.toBe(rotation.duration(1000).spinTo(0.5, HALF_PI), 0);
        EXPECT.falsy(rotation.isActive);
        rotation.update(100);
        EXPECT.toBe(rotation.current, 0);
    });
}

function testNumSpinsCanBeNegative(): void {
    test('numSpins can be negative - to spin anti-clockwise', () => {
        EXPECT.toBe(rotation.duration(1000).spinTo(-1, -HALF_PI), 1000);
        EXPECT.truthy(rotation.isActive);
    });
}

function testDurationMUSTBeSetForSpinToToChangeTheCurrentValue(): void {
    test('duration MUST be set for spinTo() to change the current value', () => {
        EXPECT.toBe(rotation.spinTo(1, HALF_PI), 0);
        EXPECT.falsy(rotation.isActive);
    });
}

function testLoadReturnsTrueOnValidLoad(): void {
    test('load returns true on valid load', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const rotationObj = new DynamicNumber();
        EXPECT.truthy(
            rotation.load(
                JSON.stringify({
                    parent: parent,
                    rotation: rotationObj.save(),
                    spin: 0
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
        const rotationObj = new DynamicNumber();
        EXPECT.falsy(
            rotation.load(
                JSON.stringify({
                    // parent: parent,
                    rotation: rotationObj.save(),
                    spin: 0
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingRotationProperty(): void {
    test('load returns false if missing "rotation" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        // const rotationObj = new DynamicNumber();
        EXPECT.falsy(
            rotation.load(
                JSON.stringify({
                    parent: parent,
                    // rotation: rotationObj.save(),
                    spin: 0
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingSpinProperty(): void {
    test('load returns false if missing "spin" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const rotationObj = new DynamicNumber();
        EXPECT.falsy(
            rotation.load(
                JSON.stringify({
                    parent: parent,
                    rotation: rotationObj.save(),
                    // spin: 0
                })
            )
        )
    });
}

function testRotateToBehavesAsExpectedDuringFullDuration(): void {
    test('rotateTo() behaves as expected during full duration', () => {
        EXPECT.toBe(rotation.duration(1000).rotateTo(-HALF_PI), 1000);
        EXPECT.truthy(rotation.isActive);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * 0.1);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * 0.2);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * 0.3);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * 0.4);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * 0.5);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * 0.6);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * 0.7);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * 0.8);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * 0.9);
        rotation.update(100);
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.current, -HALF_PI);
    });
}

function testRotateToBehavesAsExpectedDuringFullDurationWithEase(): void {
    test('rotateTo() behaves as expected during full duration with ease', () => {
        EXPECT.toBe(rotation.duration(1000).ease('easeInCubic').rotateTo(-HALF_PI), 1000);
        EXPECT.truthy(rotation.isActive);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * Math.pow(0.1, 3));
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * Math.pow(0.2, 3));
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * Math.pow(0.3, 3));
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * Math.pow(0.4, 3));
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * Math.pow(0.5, 3));
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * Math.pow(0.6, 3));
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * Math.pow(0.7, 3));
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * Math.pow(0.8, 3));
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, -HALF_PI * Math.pow(0.9, 3));
        rotation.update(100);
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.current, -HALF_PI);
    });
}

// check spin removed
function testSpinToBehavesAsExpectedDuringFullDuration(): void {
    test('spinTo() behaves as expected during full duration', () => {
        EXPECT.toBe(rotation.duration(500).spinTo(1, HALF_PI), 500);
        EXPECT.truthy(rotation.isActive);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + TAU) * 0.1);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + TAU) * 0.2);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + TAU) * 0.3);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + TAU) * 0.4);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + TAU) * 0.5);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + TAU) * 0.6);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + TAU) * 0.7);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + TAU) * 0.8);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + TAU) * 0.9);
        rotation.update(50);
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.current, HALF_PI); // <-- spin removed
    });
}

// check spin removed
function testSpinToBehavesAsExpectedDuringFullDurationWithEase(): void {
    test('spinTo() behaves as expected during full duration with ease', () => {
        EXPECT.toBe(rotation.duration(500).ease('easeOutCubic').spinTo(2, HALF_PI), 500);
        EXPECT.truthy(rotation.isActive);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + (2 * TAU)) * (1 - Math.pow(1 - 0.1, 3)));
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + (2 * TAU)) * (1 - Math.pow(1 - 0.2, 3)));
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + (2 * TAU)) * (1 - Math.pow(1 - 0.3, 3)));
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + (2 * TAU)) * (1 - Math.pow(1 - 0.4, 3)));
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + (2 * TAU)) * (1 - Math.pow(1 - 0.5, 3)));
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + (2 * TAU)) * (1 - Math.pow(1 - 0.6, 3)));
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + (2 * TAU)) * (1 - Math.pow(1 - 0.7, 3)));
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + (2 * TAU)) * (1 - Math.pow(1 - 0.8, 3)));
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (HALF_PI + (2 * TAU)) * (1 - Math.pow(1 - 0.9, 3)));
        rotation.update(50);
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.current, HALF_PI); // <-- spin removed
    });
}

// check spin removed
function testNegativeSpinToBehavesAsExpectedDuringFullDuration(): void {
    test('negative spinTo() behaves as expected during full duration', () => {
        EXPECT.toBe(rotation.duration(500).spinTo(-1, -HALF_PI), 500);
        EXPECT.truthy(rotation.isActive);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (-HALF_PI - TAU) * 0.1);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (-HALF_PI - TAU) * 0.2);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (-HALF_PI - TAU) * 0.3);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (-HALF_PI - TAU) * 0.4);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (-HALF_PI - TAU) * 0.5);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (-HALF_PI - TAU) * 0.6);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (-HALF_PI - TAU) * 0.7);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (-HALF_PI - TAU) * 0.8);
        rotation.update(50);
        EXPECT.toBeCloseTo(rotation.current, (-HALF_PI - TAU) * 0.9);
        rotation.update(50);
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.current, -HALF_PI); // <-- spin removed
    });
}

function testSpinToThenRotateToReturnsCorrectCurrentValues(): void {
    test('spinTo() then rotateTo() returns correct current values', () => {
        rotation.duration(1000).spinTo(1, HALF_PI);
        for (let i = 0; i < 10; i++) {
            rotation.update(100);
        }
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.current, HALF_PI); // <-- spin removed
        rotation.duration(500).rotateTo(-HALF_PI);
        EXPECT.truthy(rotation.isActive);
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, HALF_PI - (PI * 0.2));
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, HALF_PI - (PI * 0.4));
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, HALF_PI - (PI * 0.6));
        rotation.update(100);
        EXPECT.toBeCloseTo(rotation.current, HALF_PI - (PI * 0.8));
        rotation.update(100);
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.current, HALF_PI - PI);
    });
}

function testRotateToBehavesAsExpectedAfterSaveAndLoad(): void {
    test('rotateTo() behaves as expected after save and load', () => {
        EXPECT.toBe(rotation.duration(1000).rotateTo(HALF_PI), 1000);
        rotation.load(rotation.save()); // <--
        EXPECT.truthy(rotation.isActive);
        for (let i = 1; i < 10; i++) {
            rotation.update(100);
            rotation.load(rotation.save()); // <--
            EXPECT.toBe(rotation.current, HALF_PI * i * 0.1);
        }
        rotation.update(100);
        rotation.load(rotation.save()); // <--
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBeCloseTo(rotation.current, HALF_PI);
    });
}

function testSpinToBehavesAsExpectedAfterSaveAndLoad(): void {
    test('SpinTo() behaves as expected after save and load', () => {
        EXPECT.toBe(rotation.duration(1000).spinTo(1, HALF_PI), 1000);
        rotation.load(rotation.save()); // <--
        EXPECT.truthy(rotation.isActive);
        for (let i = 1; i < 10; i++) {
            rotation.update(100);
            rotation.load(rotation.save()); // <--
            EXPECT.toBeCloseTo(rotation.current, (HALF_PI + TAU) * i * 0.1);
        }
        rotation.update(100);
        rotation.load(rotation.save()); // <--
        EXPECT.falsy(rotation.isActive);
        EXPECT.toBe(rotation.current, HALF_PI);
    });
}
