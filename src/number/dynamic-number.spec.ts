/**
 * 
 */

import { type tEaseFunction, type tEaseOption, load as loadEase } from '@brendangooch/ease';
import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicNumber } from './dynamic-number.js';

const EXPECT = new JestExpect();
let number: DynamicNumber;
beforeEach(() => {
    number = new DynamicNumber();
});

testAll();
function testAll(): void {
    describe('DynamicNumber', () => {

        testStartsInactive();
        testDefaultInitialValueIs0();
        testCurrentValueIsValuePassedInOnCreation();
        testChangeDoesNothingIfNoNextValueProvidedBefore();
        testSettingNoSpeedOrDurationChangesValueInstantly();
        testCannotChangeIfNumberIsActive();
        testDoesNotChangeIfNextValueIsCurrentValue();
        testChangesInstantlyIfNoDurationOrSpeedProvided();
        testReturnsCorrectDurationWhenSpeedAndNextValueAreSet();
        testDynamicTransitionCanBeStopped();
        testBehavesAsExpectedDuringFullDynamicTransitionToNextValue();
        testBehavesAsExpectedDuringFullDynamicTransitionToNextValueWithEaseApplied();
        testBehavesAsExpectedDuringFullDynamicTransitionToNextValueWithSpeedSet();
        testBehavesAsExpectedDuringFullDynamicTransitionToNextValueWithSpeedAndEaseSet();
        testWorksWithNumbersBetween0And1();
        testCanChangeFromPositiveToHigherNumber();
        testCanChangeFromPositiveToLowerNumber();
        testCanChangeFromPositiveToNegativeNumber();
        testCanChangeFromNegativeToHigherNumber();
        testCanChangeFromNegativeToLowerNumber();
        testCanChangeFromNegativeToPositiveNumber();
        testBehavesAsExpectedDuringFullDynamicTransitionToNextValueAfterMultipleSaveAndReloads();

    });
}


function testStartsInactive(): void {
    test('starts inactive', () => {
        EXPECT.falsy(number.isActive);
    });
}

function testDefaultInitialValueIs0(): void {
    test('default initial value is 0', () => {
        EXPECT.toBe(number.current, 0);
    });
}

function testCurrentValueIsValuePassedInOnCreation(): void {
    test('current value is value passed in on creation', () => {
        number = new DynamicNumber(100);
        EXPECT.toBe(number.current, 100);
    });
}

function testChangeDoesNothingIfNoNextValueProvidedBefore(): void {
    test('change does nothing if no next value provided before', () => {
        number.change();
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, 0);
    });
}

function testSettingNoSpeedOrDurationChangesValueInstantly(): void {
    test('setting no speed or duration changes value instantly', () => {
        number.next(100).change();
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, 100);
    });
}

function testCannotChangeIfNumberIsActive(): void {
    test('cannot change if number is active', () => {
        number.duration(1000).next(100).change();
        EXPECT.truthy(number.isActive);
        number.duration(2000).next(200).change();
        number.update(100);
        EXPECT.toBeCloseTo(number.current, 10);
    });
}

function testDoesNotChangeIfNextValueIsCurrentValue(): void {
    test('does not change if next value is current value', () => {
        number.next(20).change();
        EXPECT.toBe(number.current, 20);
        number.duration(1000).next(20).change();
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, 20);
    });
}

function testChangesInstantlyIfNoDurationOrSpeedProvided(): void {
    test('changes instantly if no duration or speed provided', () => {
        number.next(20).change();
        EXPECT.toBe(number.current, 20);
    });
}

function testReturnsCorrectDurationWhenSpeedAndNextValueAreSet(): void {
    test('returns correct duration when speed and next value are set', () => {

        number.speed(2).next(500);
        EXPECT.toBeCloseTo(number.getDuration(), 250);

        number = new DynamicNumber(500);
        number.speed(0.5).next(600);
        EXPECT.toBeCloseTo(number.getDuration(), 200);

        number = new DynamicNumber(-50);
        number.speed(2).next(250);
        EXPECT.toBeCloseTo(number.getDuration(), 150);

    });
}

function testDynamicTransitionCanBeStopped(): void {
    test('can be stopped', () => {

        number.duration(1000).next(100).change();
        EXPECT.truthy(number.isActive);

        number.update(100);
        EXPECT.toBeCloseTo(number.current, 10);

        number.stop(); // <--

        EXPECT.falsy(number.isActive);
        EXPECT.toBeCloseTo(number.current, 10);

    });
}

function testBehavesAsExpectedDuringFullDynamicTransitionToNextValue(): void {
    test('behaves as expected during full dynamic transition to next value', () => {
        fullTransitionTest({
            initial: 100,
            next: 200,
            duration: 1000
        });
    });
}

function testBehavesAsExpectedDuringFullDynamicTransitionToNextValueWithEaseApplied(): void {
    test('behaves as expected during full dynamic transition to next value with ease applied', () => {
        fullTransitionTest({
            initial: 100,
            next: 200,
            duration: 1000,
            ease: 'easeInOutElastic'
        });
    });
}

function testBehavesAsExpectedDuringFullDynamicTransitionToNextValueWithSpeedSet(): void {
    test('behaves as expected during full dynamic transition to next value with speed set', () => {
        fullTransitionTest({
            initial: 100,
            next: 200,
            speed: 1
        });
    });
}

function testBehavesAsExpectedDuringFullDynamicTransitionToNextValueWithSpeedAndEaseSet(): void {
    test('behaves as expected during full dynamic transition to next value with speed and ease set', () => {
        fullTransitionTest({
            initial: 100,
            next: 200,
            speed: 1,
            ease: 'easeOutSine'
        });
    });
}

function testWorksWithNumbersBetween0And1(): void {
    test('works with numbers between 0 and 1', () => {
        fullTransitionTest({
            initial: 0.21,
            next: 0.56,
            duration: 500
        });
    });
}

function testCanChangeFromPositiveToHigherNumber(): void {
    test('can change from positive to higher number', () => {
        fullTransitionTest({
            initial: 100,
            next: 500,
            duration: 600
        });
    });
}

function testCanChangeFromPositiveToLowerNumber(): void {
    test('can change from positive to lower number', () => {
        fullTransitionTest({
            initial: 100,
            next: 50,
            duration: 600
        });
    });
}

function testCanChangeFromPositiveToNegativeNumber(): void {
    test('can change from positive to negative number', () => {
        fullTransitionTest({
            initial: 100,
            next: -500,
            duration: 600
        });
    });
}

function testCanChangeFromNegativeToHigherNumber(): void {
    test('can change from negative to higher number', () => {
        fullTransitionTest({
            initial: -100,
            next: -50,
            duration: 600
        });
    });
}

function testCanChangeFromNegativeToLowerNumber(): void {
    test('can change from negative to lower number', () => {
        fullTransitionTest({
            initial: -100,
            next: -400,
            duration: 600
        });
    });
}

function testCanChangeFromNegativeToPositiveNumber(): void {
    test('can change from negative to positive number', () => {
        fullTransitionTest({
            initial: -100,
            next: 50,
            duration: 600
        });
    });
}

function testBehavesAsExpectedDuringFullDynamicTransitionToNextValueAfterMultipleSaveAndReloads(): void {
    test('behaves as expected during full dynamic transition to next value after multiple save and reloads', () => {

        const initial = 500;
        const next = 1000;
        const NUM_STEPS = 20;
        const DISTANCE = Math.abs(next - initial);
        const duration = 750;
        const stepSize = duration / NUM_STEPS;
        const ease: tEaseOption = 'easeInCubic';
        const easeFn: tEaseFunction = loadEase(ease);
        let elapsed = 0;
        let progress = 0;
        let current = 0;

        const number = new DynamicNumber(initial);

        number.duration(duration).ease(ease).next(next).change();
        number.load(number.save()); // <--
        EXPECT.truthy(number.isActive);

        for (let i = 0; i < NUM_STEPS - 1; i++) {
            number.update(stepSize!);
            number.load(number.save()); // <--
            elapsed += stepSize!;
            progress = easeFn(elapsed / duration!);
            current = initial + (DISTANCE * progress);
            EXPECT.toBeCloseTo(number.current, current);
        }

        number.update(stepSize! + 10);
        number.load(number.save()); // <--
        EXPECT.falsy(number.isActive);
        EXPECT.toBe(number.current, next);

    });
}

/**
 * UTILITY FUNCTIONS
 */

function fullTransitionTest(props: {
    initial: number;
    next: number;
    duration?: number;
    speed?: number;
    ease?: tEaseOption;
}): void {

    const number = new DynamicNumber(props.initial);

    const NUM_STEPS = 20;
    const DISTANCE = Math.abs(props.next - props.initial);
    let duration: number;
    let stepSize: number;
    let easeFn: tEaseFunction = loadEase('noEase');
    let elapsed = 0;
    let progress = 0;
    let current = 0;

    if (props.duration) {
        duration = props.duration;
        stepSize = duration / NUM_STEPS;
        number.duration(props.duration);
    }

    if (props.speed) {
        duration = DISTANCE / props.speed;
        stepSize = duration / NUM_STEPS;
        number.speed(props.speed);
    }

    if (props.ease) {
        easeFn = loadEase(props.ease);
        number.ease(props.ease);
    }

    number.next(props.next);
    EXPECT.toBe(number.getDuration(), duration!); // <-- test get duration
    number.change();
    EXPECT.truthy(number.isActive);

    for (let i = 0; i < NUM_STEPS - 1; i++) {
        number.update(stepSize!);
        elapsed += stepSize!;
        progress = easeFn(elapsed / duration!);
        current = props.initial + ((props.next - props.initial) * progress);
        EXPECT.toBeCloseTo(number.current, current);
    }

    number.update(stepSize! + 10);
    EXPECT.falsy(number.isActive);
    EXPECT.toBe(number.current, props.next);

}