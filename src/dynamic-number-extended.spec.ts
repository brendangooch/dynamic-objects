/**
 * 
 */

import * as EXPECT from '@brendangooch/jest-expect';
import { DynamicNumberExtended } from "./dynamic-number-extended.js";
import { DynamicUnit } from './dynamic-unit.js';

const INITIAL = 50;
const MIN = -100;
const MAX = 100;
let number: DynamicNumberExtended;
beforeEach(() => {
    number = new DynamicNumberExtended(INITIAL, MIN, MAX);
});

testAll();
function testAll(): void {

    describe('DynamicNumberExtended', () => {
        testChangingToANumberBelowMinValueClampsTheValueToMin();
        testChangingToANumberAboveMaxValueClampsTheValueToMax();
        testValueIsRoundedAsExpectedDuringFullDurationCycle();
        testValueIsRoundedUpAsExpectedDuringFullDurationCycle();
        testValueIsRoundedDownAsExpectedDuringFullDurationCycle();
        testChangeToOriginalSetsNumberToOriginalValueProvidedOnInstantiationInstantly();
        testChangeToOriginalSetsNumberToOriginalValueProvidedOnInstantiationDynamically();
        testChangeToMaxSetsNumberToMaxValueProvidedOnInstantiationInstantly();
        testChangeToMaxSetsNumberToMaxValueProvidedOnInstantiationDynamically();
        testChangeToMinSetsNumberToMinValueProvidedOnInstantiationInstantly();
        testChangeToMinSetsNumberToMinValueProvidedOnInstantiationDynamically();
        testChangeToPreviousSetsNumberToPreviousValueInstantly();
        testChangeToPreviousReturnsCurrentValueIfNotYetChanged();
        testChangeToPreviousSetsNumberToPreviousValueDynamically();
        testValidLoadReturnsTrue();
        testLoadReturnsFalseIfMissingParentProperty();
        testLoadReturnsFalseIfMissingMinProperty();
        testLoadReturnsFalseIfMissingMaxProperty();
        testLoadReturnsFalseIfMissingInitialProperty();
        testLoadReturnsFalseIfMissingPRevProperty();
        testNumberContinuesToBehaveAsExpectedAfterSaveThenLoad();

    });

}

function testChangingToANumberBelowMinValueClampsTheValueToMin(): void {
    test('changing to a number below min value clamps the value to min', () => {
        number.changeTo(-200);
        EXPECT.toBe(number.current, MIN);
    });
}

function testChangingToANumberAboveMaxValueClampsTheValueToMax(): void {
    test('changing to a number above max value clamps the value to max', () => {
        number.changeTo(200);
        EXPECT.toBe(number.current, MAX);
    });
}

function testValueIsRoundedAsExpectedDuringFullDurationCycle(): void {
    test('current value is rounded as expected during full duration cycle', () => {
        const duration = 1000;
        const numSteps = 50;
        const stepSize = duration / numSteps;
        number.duration(1000).changeTo(60);
        for (let i = 0; i < numSteps; i++) {
            number.update(stepSize);
            EXPECT.toBe(number.rounded, Math.round(number.current));
        }
    });
}

function testValueIsRoundedUpAsExpectedDuringFullDurationCycle(): void {
    test('current value is rounded up as expected during full duration cycle', () => {
        const duration = 1000;
        const numSteps = 50;
        const stepSize = duration / numSteps;
        number.duration(1000).changeTo(60);
        for (let i = 0; i < numSteps; i++) {
            number.update(stepSize);
            EXPECT.toBe(number.roundedUp, Math.ceil(number.current));
        }
    });
}

function testValueIsRoundedDownAsExpectedDuringFullDurationCycle(): void {
    test('current value is rounded down as expected during full run cycle', () => {
        const duration = 1000;
        const numSteps = 50;
        const stepSize = duration / numSteps;
        number.duration(1000).changeTo(60);
        for (let i = 0; i < numSteps; i++) {
            number.update(stepSize);
            EXPECT.toBe(number.roundedDown, Math.floor(number.current));
        }
    });
}

function testChangeToOriginalSetsNumberToOriginalValueProvidedOnInstantiationInstantly(): void {
    test('changeToOriginal() sets number to original value provided on instantiation instantly', () => {
        for (let i = 0; i < 40; i++) {
            number.changeTo(i);
        }
        number.changeToOriginal();
        EXPECT.toBe(number.current, INITIAL);
    });
}

function testChangeToOriginalSetsNumberToOriginalValueProvidedOnInstantiationDynamically(): void {
    test('changeToOriginal() sets number to original value provided on instantiation dynamically', () => {
        number.changeTo(0); // 0 - 50
        number.duration(1000).changeToOriginal();
        number.update(200);
        EXPECT.toBeCloseTo(number.current, 10);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, 20);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, 30);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, 40);
        number.update(200);
        EXPECT.toBe(number.current, INITIAL);

    });
}

function testChangeToMaxSetsNumberToMaxValueProvidedOnInstantiationInstantly(): void {
    test('changeToMax() sets number to max value provided on instantiation instantly', () => {
        number.changeToMax();
        EXPECT.toBe(number.current, MAX);
    });
}

function testChangeToMaxSetsNumberToMaxValueProvidedOnInstantiationDynamically(): void {
    test('changeToMax() sets number to max value provided on instantiation dynamically', () => {
        number.duration(1000).changeToMax(); // 50 - 100
        number.update(200);
        EXPECT.toBeCloseTo(number.current, 60);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, 70);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, 80);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, 90);
        number.update(200);
        EXPECT.toBe(number.current, MAX);
    });
}

function testChangeToMinSetsNumberToMinValueProvidedOnInstantiationInstantly(): void {
    test('changeToMin() sets number to min value provided on instantiation instantly', () => {
        number.changeToMin();
        EXPECT.toBe(number.current, MIN);
    });
}

function testChangeToMinSetsNumberToMinValueProvidedOnInstantiationDynamically(): void {
    test('changeToMin() sets number to min value provided on instantiation dynamically', () => {
        number.duration(1000).changeToMin(); // 50 - -100 = -150
        number.update(200);
        EXPECT.toBeCloseTo(number.current, 20);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, -10);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, -40);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, -70);
        number.update(200);
        EXPECT.toBe(number.current, MIN);
    });
}

function testChangeToPreviousSetsNumberToPreviousValueInstantly(): void {
    test('changeToPrevious() sets number to the previous value instantly', () => {
        number.changeTo(25);
        number.changeTo(35);
        number.changeToPrevious();
        EXPECT.toBe(number.current, 25);
    });
}

function testChangeToPreviousTogglesBetweenCurrentAndPreviousValue(): void {
    test('changeToPrevious() toggles between current and previous value', () => {
        number.changeTo(25);
        number.changeTo(35);
        number.changeToPrevious();
        EXPECT.toBe(number.current, 25);
        number.changeToPrevious();
        EXPECT.toBe(number.current, 35);
        number.changeToPrevious();
        EXPECT.toBe(number.current, 25);
        number.changeToPrevious();
        EXPECT.toBe(number.current, 35);
    });
}

function testChangeToPreviousReturnsCurrentValueIfNotYetChanged(): void {
    test('changeToPrevious() returns current value if not yet changed', () => {
        number.changeToPrevious();
        EXPECT.toBe(number.current, INITIAL);
    });
}

function testChangeToPreviousSetsNumberToPreviousValueDynamically(): void {
    test('changeToPrevious() sets number to the previous value dynamically', () => {
        number.changeTo(-50);
        number.changeTo(-100);
        number.duration(1000).changeToPrevious(); // -100 - -50 = +50
        number.update(200);
        EXPECT.toBeCloseTo(number.current, -90);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, -80);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, -70);
        number.update(200);
        EXPECT.toBeCloseTo(number.current, -60);
        number.update(200);
        EXPECT.toBe(number.current, -50);
    });
}

function testValidLoadReturnsTrue(): void {
    test('valid load returns true', () => {
        const greatGrandParent = JSON.stringify({
            isOn: false,
            duration: 100,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const grandParent = JSON.stringify({
            parent: greatGrandParent,
            unit: unit.save(),
            speed: 0
        });
        const parent = JSON.stringify({
            parent: grandParent,
            previous: 0,
            next: 0,
            distanceBetween: 0,
            currentValue: 0
        });
        EXPECT.truthy(
            number.load(
                JSON.stringify({
                    parent: parent,
                    min: 10,
                    max: 50,
                    initial: 20,
                    prev: 20
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingParentProperty(): void {
    test('load returns false if missing "parent" property', () => {
        // const greatGrandParent = JSON.stringify({
        //     isOn: false,
        //     duration: 100,
        //     easeOption: 'noEase'
        // });
        // const unit = new DynamicUnit();
        // const grandParent = JSON.stringify({
        //     parent: greatGrandParent,
        //     unit: unit.save(),
        //     speed: 0
        // });
        // const parent = JSON.stringify({
        //     parent: grandParent,
        //     previous: 0,
        //     next: 0,
        //     distanceBetween: 0,
        //     currentValue: 0
        // });
        EXPECT.falsy(
            number.load(
                JSON.stringify({
                    // parent: parent,
                    min: 10,
                    max: 50,
                    initial: 20,
                    prev: 20
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingMinProperty(): void {
    test('load returns false if missing "min" property', () => {
        const greatGrandParent = JSON.stringify({
            isOn: false,
            duration: 100,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const grandParent = JSON.stringify({
            parent: greatGrandParent,
            unit: unit.save(),
            speed: 0
        });
        const parent = JSON.stringify({
            parent: grandParent,
            previous: 0,
            next: 0,
            distanceBetween: 0,
            currentValue: 0
        });
        EXPECT.falsy(
            number.load(
                JSON.stringify({
                    parent: parent,
                    // min: 10,
                    max: 50,
                    initial: 20,
                    prev: 20
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingMaxProperty(): void {
    test('load returns false if missing "max" property', () => {
        const greatGrandParent = JSON.stringify({
            isOn: false,
            duration: 100,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const grandParent = JSON.stringify({
            parent: greatGrandParent,
            unit: unit.save(),
            speed: 0
        });
        const parent = JSON.stringify({
            parent: grandParent,
            previous: 0,
            next: 0,
            distanceBetween: 0,
            currentValue: 0
        });
        EXPECT.falsy(
            number.load(
                JSON.stringify({
                    parent: parent,
                    min: 10,
                    // max: 50,
                    initial: 20,
                    prev: 20
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingInitialProperty(): void {
    test('load returns false if missing "initial" property', () => {
        const greatGrandParent = JSON.stringify({
            isOn: false,
            duration: 100,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const grandParent = JSON.stringify({
            parent: greatGrandParent,
            unit: unit.save(),
            speed: 0
        });
        const parent = JSON.stringify({
            parent: grandParent,
            previous: 0,
            next: 0,
            distanceBetween: 0,
            currentValue: 0
        });
        EXPECT.falsy(
            number.load(
                JSON.stringify({
                    parent: parent,
                    min: 10,
                    max: 50,
                    // initial: 20,
                    prev: 20
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingPRevProperty(): void {
    test('load returns false if missing "prev" property', () => {
        const greatGrandParent = JSON.stringify({
            isOn: false,
            duration: 100,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const grandParent = JSON.stringify({
            parent: greatGrandParent,
            unit: unit.save(),
            speed: 0
        });
        const parent = JSON.stringify({
            parent: grandParent,
            previous: 0,
            next: 0,
            distanceBetween: 0,
            currentValue: 0
        });
        EXPECT.falsy(
            number.load(
                JSON.stringify({
                    parent: parent,
                    min: 10,
                    max: 50,
                    initial: 20,
                    // prev: 20
                })
            )
        )
    });
}

function testNumberContinuesToBehaveAsExpectedAfterSaveThenLoad(): void {
    test('number continues to behave as expected after save and load', () => {
        EXPECT.toBe(number.duration(1000).changeToMax(), 1000); // 50 - 100
        EXPECT.truthy(number.isActive);
        number.load(number.save()); // <--
        EXPECT.truthy(number.isActive);
        number.update(200);
        number.load(number.save()); // <--
        EXPECT.truthy(number.isActive);
        EXPECT.toBeCloseTo(number.current, 60);
        number.update(200);
        number.load(number.save()); // <--
        EXPECT.truthy(number.isActive);
        EXPECT.toBeCloseTo(number.current, 70);
        number.update(200);
        number.load(number.save()); // <--
        EXPECT.truthy(number.isActive);
        EXPECT.toBeCloseTo(number.current, 80);
        number.update(200);
        number.load(number.save()); // <--
        EXPECT.truthy(number.isActive);
        EXPECT.toBeCloseTo(number.current, 90);
        number.update(200);
        number.load(number.save()); // <--
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, MAX);
    });
}

