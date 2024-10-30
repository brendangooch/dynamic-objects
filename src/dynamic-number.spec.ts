/**
 * 
 */

import * as EXPECT from '@brendangooch/jest-expect';
import { DynamicNumber } from './dynamic-number.js';
import { DynamicUnit } from './dynamic-unit.js';
import * as EASE from '@brendangooch/ease';

type tFullDurationTestParams = {
    start: number;
    end: number;
    speed?: number;
    duration?: number;
    ease: EASE.tEaseOption;
}

let number: DynamicNumber;
beforeEach(() => {
    number = new DynamicNumber()
});

testAll();
function testAll(): void {
    describe('DynamicNumber', () => {

        testStartsInactive();
        testInitialCurrentValueIs0IfNotSetInConstructor();
        testInitialCurrentValusIsValueSetInConstructor();
        testInitialRoundedValueIs0IfNotSetInConstructor();
        testInitialRoundedValusIsValueSetInConstructorRounded();
        testGetRoundedReturnsExpectedValues();
        testCannotSetDurationIfNumberIsActive();
        testCannotSetDurationOf0();
        testCannotSetDurationOfLessThan0();
        testSettingDurationDoesNotMakeTheNumberActive();
        testDurationGoesBackTo0OnceDurationHasElapsed();
        testCannotSetSpeedIfNumberIsActive();
        testCannotSetSpeedOf0();
        testCannotSetSpeedOfLessThan0();
        testSettingSpeedDoesNotMakeTheNumberActive();
        testSpeedGoesBackTo0OnceDurationHasElapsed();
        testSettingSpeedAfterDurationUpdatesDurationToRelfectSpeed();
        testCannotSetEaseIfNumberIsActive();
        testEaseReturnsToNoEaseOnceDurationHasElapsed();
        testCannotChangeIfNumberIsActive();
        testChangingToTheSameNumberDoesNothing();
        testChangingWithoutSettingTheDurationChangesTheCurrentValueImmediately();
        testChangingInstantlyResetsTheEase();
        testValidLoadReturnsTrue();
        testThrowsErrorIfMissingParentProperty();
        testThrowsErrorIfMissingPreviousProperty();
        testThrowsErrorIfMissingNextProperty();
        testThrowsErrorIfMissingDistanceBetweenProperty();
        testThrowsErrorIfMissingCurrentValueProperty();
        testSaveThenLoadDoesNotChangeBehaviour();
        testCanSaveWhetherNumberIsOnOrOff();
        testCanStopAndStartUpdate();
        testCanBeOffAndActive();
        testCurrentValueIsTheSameWhetherOnOrOff();
        testReturnsExpectedCurrentValuesDuringFullDuration();
        testReturnsExpectedCurrentValuesDuringFullDurationWithEaseApplied();
        testReturnsExpectedCurrentValuesDuringFullDurationAfterSettingSpeed();
        testReturnsExpectedCurrentValuesDuringFullDurationAfterSettingSpeedAndANegativeNumber();
        testReturnsExpectedCurrentValuesDuringFullDurationAfterSettingSpeedWithEaseApplied();
        testWorksCorrectlyPositiveToHigherNumber();
        testWorksCorrectlyPositiveToLowerNumber();
        testWorksCorrectlyPositiveToNegativeNumber();
        testWorksCorrectlyNegativeToHigherNumber();
        testWorksCorrectlyNegativeToLowerNumber();
        testWorksCorrectlyNegativeToPositiveNumber();

    });

}

function testStartsInactive(): void {
    test('starts inactive', () => {
        EXPECT.falsy(number.isActive);
    });
}

function testInitialCurrentValueIs0IfNotSetInConstructor(): void {
    test('initial current value is 0 if not set in constructor', () => {
        EXPECT.toBe(number.current, 0);
    });
}

function testInitialCurrentValusIsValueSetInConstructor(): void {
    test('initial current value is value set in constructor', () => {
        number = new DynamicNumber(10);
        EXPECT.toBe(number.current, 10);
    });
}

function testInitialRoundedValueIs0IfNotSetInConstructor(): void {
    test('initial rounded value is 0 if not set in constructor', () => {
        EXPECT.toBe(number.rounded, 0);
    });
}

function testInitialRoundedValusIsValueSetInConstructorRounded(): void {
    test('initial rounded value is value set in constructor - rounded', () => {
        number = new DynamicNumber(10.4);
        EXPECT.toBe(number.rounded, 10);
        number = new DynamicNumber(0.6);
        EXPECT.toBe(number.rounded, 1);
        number = new DynamicNumber(-99.7);
        EXPECT.toBe(number.rounded, -100);
    });
}

function testGetRoundedReturnsExpectedValues(): void {
    test('get rounded() returns expected values', () => {
        number.duration(1000).changeTo(95.6);
        for (let i = 1; i < 20; i++) {
            number.update(50);
            EXPECT.toBe(number.rounded, Math.round(95.6 * i * 0.05));
        }
    });
}


function testCannotSetDurationIfNumberIsActive(): void {
    test('cannot set duration if number is active', () => {
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.duration(1000).changeTo(100), 1000);
        EXPECT.truthy(number.isActive);
        number.duration(2000);
        number.update(200);
        EXPECT.toBe(number.current, 20);
    });
}

function testCannotSetDurationOf0(): void {
    test('cannot set duration of 0', () => {
        number.duration(0).changeTo(100);
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, 100);
    });
}

function testCannotSetDurationOfLessThan0(): void {
    test('cannot set duration of less than 0', () => {
        number.duration(-10).changeTo(100);
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, 100);
    });
}

function testSettingDurationDoesNotMakeTheNumberActive(): void {
    test('setting duration does not make the number active', () => {
        number.duration(1000);
        EXPECT.falsy(number.isActive);
    });
}

function testDurationGoesBackTo0OnceDurationHasElapsed(): void {
    test('duration goes back to 0 once duration has elapsed', () => {
        number.duration(1000).changeTo(100);
        number.update(200);
        number.update(200);
        number.update(200);
        number.update(200);
        number.update(200);
        number.changeTo(200);
        EXPECT.toBe(number.current, 200);
    });
}

function testCannotSetSpeedIfNumberIsActive(): void {
    test('cannot set speed if number is active', () => {
        number.duration(1000).changeTo(100);
        EXPECT.truthy(number.isActive);
        number.speed(2); // duration = 100 / 2 = 50ms
        number.update(50);
        EXPECT.truthy(number.isActive);
        EXPECT.toBe(number.current, 5);
    });
}

function testCannotSetSpeedOf0(): void {
    test('cannot set speed of 0', () => {
        number.speed(0).changeTo(100);
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, 100);
    });
}

function testCannotSetSpeedOfLessThan0(): void {
    test('cannot set speed of less than 0', () => {
        number.speed(-1).changeTo(100);
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, 100);
    });
}

function testSettingSpeedDoesNotMakeTheNumberActive(): void {
    test('setting speed does not make the number active', () => {
        number.speed(5);
        EXPECT.falsy(number.isActive);
    });
}

function testSpeedGoesBackTo0OnceDurationHasElapsed(): void {
    test('speed goes back to 0 once duration has elapsed', () => {
        number.speed(2).changeTo(500); // duration = 250ms
        number.update(50);
        number.update(50);
        number.update(50);
        number.update(50);
        number.update(50);
        number.changeTo(1000);
        EXPECT.toBe(number.current, 1000);
    });
}

function testSettingSpeedAfterDurationUpdatesDurationToRelfectSpeed(): void {
    test('setting speed after setting duration updates duration to reflect speed', () => {
        number.duration(1000).speed(2).changeTo(1000); // duration now 500ms
        number.update(100);
        EXPECT.toBeCloseTo(number.current, 200);
    });
}

function testCannotSetEaseIfNumberIsActive(): void {
    test('cannot set ease if number is active', () => {
        number.duration(1000).changeTo(200);
        EXPECT.truthy(number.isActive);
        number.ease('easeInQuint');
        number.update(100);
        EXPECT.toBe(number.current, 20);

    });
}

function testEaseReturnsToNoEaseOnceDurationHasElapsed(): void {
    test('ease returns to "noEase" once duration has elapsed', () => {
        number.duration(1000).ease('easeOutCubic').changeTo(500);
        number.update(200);
        number.update(200);
        number.update(200);
        number.update(200);
        number.update(200);
        number.duration(1000).changeTo(1000);
        number.update(200);
        EXPECT.toBe(number.current, 600);
    });
}

function testCannotChangeIfNumberIsActive(): void {
    test('cannot change if number is active', () => {
        EXPECT.toBe(number.duration(1000).changeTo(100), 1000);
        EXPECT.truthy(number.isActive);
        EXPECT.toBe(number.changeTo(200), 0);
    });
}

function testChangingToTheSameNumberDoesNothing(): void {
    test('changing to the same number does nothing', () => {
        number = new DynamicNumber(10);
        EXPECT.toBe(number.duration(1000).changeTo(10), 0);
        EXPECT.falsy(number.isActive);
    });
}

function testChangingWithoutSettingTheDurationChangesTheCurrentValueImmediately(): void {
    test('changing without setting the duration changes the current value immediately', () => {
        EXPECT.toBe(number.changeTo(100), 0);
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, 100);
    });
}

// otherwise, ease will be applied the next time the numebr is changed dynamically
function testChangingInstantlyResetsTheEase(): void {
    test('changing instantly resets the ease', () => {
        number.ease('easeInCubic');
        EXPECT.toBe(number.changeTo(100), 0);
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, 100);
        number.duration(1000).changeTo(200);
        number.update(100);
        EXPECT.toBeCloseTo(number.current, 110);
    });
}

function testValidLoadReturnsTrue(): void {
    test('valid load returns true', () => {
        const grandParent = JSON.stringify({
            isOn: true,
            duration: 1000,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const parent = JSON.stringify({
            parent: grandParent,
            unit: unit.save(),
            speed: 0
        });
        EXPECT.truthy(
            number.load(
                JSON.stringify({
                    parent: parent,
                    previous: 10,
                    next: 20,
                    distanceBetween: 10,
                    currentValue: 15
                })
            )
        );
    });
}

function testThrowsErrorIfMissingParentProperty(): void {
    test('throws error if missing "parent" property', () => {
        // const grandParent = JSON.stringify({
        //     isOn: true,
        //     duration: 1000,
        //     easeOption: 'noEase'
        // });
        // const unit = new DynamicUnit();
        // const parent = JSON.stringify({
        //     parent: grandParent,
        //     unit: unit.save(),
        //     speed: 0
        // });
        EXPECT.falsy(
            number.load(
                JSON.stringify({
                    // parent: parent,
                    previous: 10,
                    next: 20,
                    distanceBetween: 10,
                    currentValue: 15
                })
            )
        );
    });
}

function testThrowsErrorIfMissingPreviousProperty(): void {
    test('throws error if missing "previous" property', () => {
        const grandParent = JSON.stringify({
            isOn: true,
            duration: 1000,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const parent = JSON.stringify({
            parent: grandParent,
            unit: unit.save(),
            speed: 0
        });
        EXPECT.falsy(
            number.load(
                JSON.stringify({
                    parent: parent,
                    // previous: 10,
                    next: 20,
                    distanceBetween: 10,
                    currentValue: 15
                })
            )
        );
    });
}

function testThrowsErrorIfMissingNextProperty(): void {
    test('throws error if missing "next" property', () => {
        const grandParent = JSON.stringify({
            isOn: true,
            duration: 1000,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const parent = JSON.stringify({
            parent: grandParent,
            unit: unit.save(),
            speed: 0
        });
        EXPECT.falsy(
            number.load(
                JSON.stringify({
                    parent: parent,
                    previous: 10,
                    // next: 20,
                    distanceBetween: 10,
                    currentValue: 15
                })
            )
        );
    });
}

function testThrowsErrorIfMissingDistanceBetweenProperty(): void {
    test('throws error if missing "distanceBetween" property', () => {
        const grandParent = JSON.stringify({
            isOn: true,
            duration: 1000,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const parent = JSON.stringify({
            parent: grandParent,
            unit: unit.save(),
            speed: 0
        });
        EXPECT.falsy(
            number.load(
                JSON.stringify({
                    parent: parent,
                    previous: 10,
                    next: 20,
                    // distanceBetween: 10,
                    currentValue: 15
                })
            )
        );
    });
}

function testThrowsErrorIfMissingCurrentValueProperty(): void {
    test('throws error if missing "currentValue" property', () => {
        const grandParent = JSON.stringify({
            isOn: true,
            duration: 1000,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const parent = JSON.stringify({
            parent: grandParent,
            unit: unit.save(),
            speed: 0
        });
        EXPECT.falsy(
            number.load(
                JSON.stringify({
                    parent: parent,
                    previous: 10,
                    next: 20,
                    distanceBetween: 10,
                    // currentValue: 15
                })
            )
        );
    });
}

function testSaveThenLoadDoesNotChangeBehaviour(): void {
    test('save then load does not change behaviour', () => {
        EXPECT.toBe(number.duration(800).changeTo(500), 800);
        EXPECT.truthy(number.isActive);
        number.load(number.save()); // <--
        EXPECT.truthy(number.isActive);
        number.update(160);
        number.load(number.save()); // <--
        EXPECT.truthy(number.isActive);
        EXPECT.toBe(number.current, 100);
        number.update(160);
        number.load(number.save()); // <--
        EXPECT.truthy(number.isActive);
        EXPECT.toBe(number.current, 200);
        number.update(160);
        number.load(number.save()); // <--
        EXPECT.truthy(number.isActive);
        EXPECT.toBe(number.current, 300);
        number.update(160);
        number.load(number.save()); // <--
        EXPECT.truthy(number.isActive);
        EXPECT.toBe(number.current, 400);
        number.update(160);
        number.load(number.save()); // <--
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, 500);

    });
}

function testCanSaveWhetherNumberIsOnOrOff(): void {
    test('can save whether number is on or off', () => {
        number.duration(1000).ease('easeInBounce').changeTo(200);
        number.update(100);
        number.update(100);
        number.turnOff();
        EXPECT.truthy(number.isActive);
        const before = number.current;
        number.load(number.save());
        number.turnOn();
        number.load(number.save());
        EXPECT.truthy(number.isActive);
        EXPECT.toBe(number.current, before);
    });
}

function testCanStopAndStartUpdate(): void {
    test('can stop and start update', () => {
        number.duration(1000).changeTo(500);
        number.update(100);
        EXPECT.toBe(number.current, 50);
        number.turnOff();
        number.update(100);
        EXPECT.toBe(number.current, 50);
        number.turnOn();
        number.update(100);
        EXPECT.toBe(number.current, 100);
    });
}

function testCanBeOffAndActive(): void {
    test('can be off and active', () => {
        number.turnOff();
        EXPECT.falsy(number.isActive);
        number.duration(1000).changeTo(500);
        EXPECT.truthy(number.isActive);
        number.turnOff();
        EXPECT.truthy(number.isActive);
        number.turnOn();
        EXPECT.truthy(number.isActive);
    });
}

function testCurrentValueIsTheSameWhetherOnOrOff(): void {
    test('current value is the same whether on or off', () => {
        number.duration(1000).changeTo(500);
        number.update(100);
        EXPECT.toBe(number.current, 50);
        number.turnOff();
        EXPECT.toBe(number.current, 50);
    });
}

function testReturnsExpectedCurrentValuesDuringFullDuration(): void {
    test('returns expected current values during full duration', () => {
        testFullDuration({
            start: 100,
            end: 500,
            duration: 800,
            ease: 'noEase'
        });
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationWithEaseApplied(): void {
    test('returns expected current values during full duration with ease applied', () => {
        testFullDuration({
            start: 100,
            end: 500,
            duration: 800,
            ease: 'easeInOutBounce'
        });
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationAfterSettingSpeed(): void {
    test('returns expected current values during full duration after setting speed', () => {
        testFullDuration({
            start: 100,
            end: 500,
            speed: 3,
            ease: 'noEase'
        });
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationAfterSettingSpeedAndANegativeNumber(): void {
    testFullDuration({
        start: 0,
        end: -500,
        speed: 2,
        ease: 'noEase'
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationAfterSettingSpeedWithEaseApplied(): void {
    test('returns expected current values during full duration after setting speed with ease applied', () => {
        testFullDuration({
            start: 100,
            end: 500,
            speed: 2,
            ease: 'easeInQuad'
        });
    });
}

function testWorksCorrectlyPositiveToHigherNumber(): void {
    test('works correctly with positive to higher numbers', () => {
        testFullDuration({
            start: 200,
            end: 800,
            duration: 1000,
            ease: 'noEase'
        });
    });
}

function testWorksCorrectlyPositiveToLowerNumber(): void {
    test('works correctly with positive to lower numbers', () => {
        testFullDuration({
            start: 800,
            end: 200,
            duration: 1000,
            ease: 'noEase'
        });
    });
}

function testWorksCorrectlyPositiveToNegativeNumber(): void {
    test('works correctly with positive to negative numbers', () => {
        testFullDuration({
            start: 200,
            end: -800,
            duration: 1000,
            ease: 'noEase'
        });
    });
}

function testWorksCorrectlyNegativeToHigherNumber(): void {
    test('works correctly with negative to higher numbers', () => {
        testFullDuration({
            start: -800,
            end: -200,
            duration: 1000,
            ease: 'noEase'
        });
    });
}

function testWorksCorrectlyNegativeToLowerNumber(): void {
    test('works correctly with negative to lower numbers', () => {
        testFullDuration({
            start: -200,
            end: -800,
            duration: 1000,
            ease: 'noEase'
        });
    });
}

function testWorksCorrectlyNegativeToPositiveNumber(): void {
    test('works correctly with negative to positive numbers', () => {
        testFullDuration({
            start: -200,
            end: 800,
            duration: 1000,
            ease: 'noEase'
        });
    });
}



/**
 * UTILITY FUNCTIONS
 * 
 */

function testFullDuration(params: tFullDurationTestParams): void {

    const DEFAULT_DURATION = 1000;
    const diff = params.end - params.start;
    const distanceBetween = Math.abs(params.end - params.start);
    const speed = (params.speed !== undefined) ? params.speed : false;
    const duration = (speed) ? distanceBetween / speed : (params.duration) ? params.duration : DEFAULT_DURATION;
    const numSteps = 10;
    const step = duration / numSteps;
    let easeFn: EASE.tEaseFunction = EASE.load(params.ease);
    let elapsed: number = 0;
    let progress: number = 0;
    let current: number = 0;

    number = new DynamicNumber(params.start);
    if (speed) number.speed(speed);
    else number.duration(duration);
    EXPECT.toBeCloseTo(number.ease(params.ease).changeTo(params.end), duration);
    EXPECT.truthy(number.isActive);

    // loop to 1 step before completion
    for (let i = 0; i < numSteps - 1; i++) {
        number.update(step);
        elapsed += step;
        progress = easeFn(elapsed / duration);
        current = params.start + (diff * progress);
        EXPECT.truthy(number.isActive);
        EXPECT.toBeCloseTo(number.current, current);
    }

    // final step (+ 1 for rounding errors)
    number.update(step + 1);
    EXPECT.toBe(number.current, params.end);
    EXPECT.falsy(number.isActive);

}