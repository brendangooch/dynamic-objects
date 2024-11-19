/**
 * 
 */

import { type tEaseFunction, type tEaseOption, easeInOutBounce, load as loadEase } from '@brendangooch/ease';
import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicVector } from './dynamic-vector.js';
import { Vector2D } from '@brendangooch/maths';

const EXPECT = new JestExpect();
let vector: DynamicVector;
beforeEach(() => {
    vector = new DynamicVector();
});

testAll();
function testAll(): void {
    describe('DynamicNumber', () => {

        testStartsInactive();
        testDefaultInitialXValueIs0();
        testDefaultInitialYValueIs0();
        testCurrentXYValuesAreValuesPassedInOnCreation();
        testChangeDoesNothingIfNoNextValueProvidedBefore();
        testSettingNoSpeedOrDurationChangesPositionInstantly();
        testCannotChangeIfVectorIsActive();
        testDoesNotChangeIfNextPositionIsCurrentPosition();
        testDOESChangeIfNextXIsNotCurrentX();
        testDOESChangeIfNextYIsNotCurrentY();
        testChangesInstantlyIfNoDurationOrSpeedProvided();
        testReturnsCorrectDurationWhenSpeedAndNextValueAreSet();
        testDynamicTransitionCanBeStopped();
        testBehavesAsExpectedDuringFullDynamicTransitionToNextPosition();
        testBehavesAsExpectedDuringFullDynamicTransitionToNextPositionWithEaseApplied();
        testBehavesAsExpectedDuringFullDynamicTransitionToNextPositionWithSpeedSet();
        testBehavesAsExpectedDuringFullDynamicTransitionToNextPositionWithSpeedAndEaseSet();
        testBehavesAsExpectedDuringFullDynamicTransitionToNextPositionAfterMultipleSaveAndReloads();

    });
}


function testStartsInactive(): void {
    test('starts inactive', () => {
        EXPECT.falsy(vector.isActive);
    });
}

function testDefaultInitialXValueIs0(): void {
    test('default initial x value is 0', () => {
        EXPECT.toBe(vector.x, 0);
    });
}

function testDefaultInitialYValueIs0(): void {
    test('default initial y value is 0', () => {
        EXPECT.toBe(vector.y, 0);
    });
}

function testCurrentXYValuesAreValuesPassedInOnCreation(): void {
    test('current xy values are values passed in on creation', () => {
        vector = new DynamicVector(100, 200)
        EXPECT.toBe(vector.x, 100);
        EXPECT.toBe(vector.y, 200);
    });
}

function testChangeDoesNothingIfNoNextValueProvidedBefore(): void {
    test('change does nothing if no next value provided before', () => {
        vector.change();
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.x, 0);
        EXPECT.toBe(vector.y, 0);
    });
}

function testSettingNoSpeedOrDurationChangesPositionInstantly(): void {
    test('setting no speed or duration changes position instantly', () => {
        vector.next(100, 200).change();
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.x, 100);
        EXPECT.toBe(vector.y, 200);
    });
}

function testCannotChangeIfVectorIsActive(): void {
    test('cannot change if vector is active', () => {
        vector.duration(1000).next(100, 500).change();
        EXPECT.truthy(vector.isActive);
        vector.duration(2000).next(200, 1000).change();
        vector.update(100);
        EXPECT.toBeCloseTo(vector.x, 10);
        EXPECT.toBeCloseTo(vector.y, 50);
    });
}

function testDoesNotChangeIfNextPositionIsCurrentPosition(): void {
    test('does NOT change if next position is current position', () => {
        vector.next(200, 400).change();
        EXPECT.toBe(vector.x, 200);
        EXPECT.toBe(vector.y, 400);
        vector.duration(1000).next(200, 400).change();
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.x, 200);
        EXPECT.toBe(vector.y, 400);
    });
}

function testDOESChangeIfNextXIsNotCurrentX(): void {
    test('DOES change if next x value is not current x value', () => {
        vector = new DynamicVector(100, 200);
        vector.next(200, 200).change();
        EXPECT.toBe(vector.x, 200);
        EXPECT.toBe(vector.y, 200);
    });
}

function testDOESChangeIfNextYIsNotCurrentY(): void {
    test('DOES change if next y value is not current y value', () => {
        vector = new DynamicVector(100, 200);
        vector.next(100, 100).change();
        EXPECT.toBe(vector.x, 100);
        EXPECT.toBe(vector.y, 100);
    });
}


function testChangesInstantlyIfNoDurationOrSpeedProvided(): void {
    test('changes instantly if no duration or speed provided', () => {
        vector.next(200, 400).change();
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.x, 200);
        EXPECT.toBe(vector.y, 400);
    });
}

function testReturnsCorrectDurationWhenSpeedAndNextValueAreSet(): void {
    test('returns correct duration when speed and next value are set', () => {

        let speed = 2;
        let previous = new Vector2D(0, 0);
        let next = new Vector2D(500, 1000);
        let distance = previous.distanceTo(next);
        let duration = distance / speed;
        vector.speed(speed).next(next.x, next.y);
        EXPECT.toBeCloseTo(vector.getDuration(), duration);

        speed = 1;
        previous = next.clone();
        next = new Vector2D(1000, 2000);
        distance = previous.distanceTo(next);
        duration = distance / speed;
        vector = new DynamicVector(previous.x, previous.y);
        vector.speed(speed).next(next.x, next.y);
        EXPECT.toBeCloseTo(vector.getDuration(), duration);

        speed = 4;
        previous = next.clone();
        next = new Vector2D(-500, -600);
        distance = previous.distanceTo(next);
        duration = distance / speed;
        vector = new DynamicVector(previous.x, previous.y);
        vector.speed(speed).next(next.x, next.y);
        EXPECT.toBeCloseTo(vector.getDuration(), duration);

    });
}

function testDynamicTransitionCanBeStopped(): void {
    test('can be stopped', () => {

        vector.duration(1000).next(1000, 500).change();
        EXPECT.truthy(vector.isActive);

        vector.update(100);
        EXPECT.toBeCloseTo(vector.x, 100);
        EXPECT.toBeCloseTo(vector.y, 50);

        vector.stop(); // <--

        EXPECT.falsy(vector.isActive);
        EXPECT.toBeCloseTo(vector.x, 100);
        EXPECT.toBeCloseTo(vector.y, 50);

    });
}

function testBehavesAsExpectedDuringFullDynamicTransitionToNextPosition(): void {
    test('behaves as expected during full dynamic transition to next position', () => {
        fullTransitionTest({
            initial: new Vector2D(-100, 500),
            next: new Vector2D(-500, -1000),
            duration: 1000
        });
    });
}

function testBehavesAsExpectedDuringFullDynamicTransitionToNextPositionWithEaseApplied(): void {
    test('behaves as expected during full dynamic transition to next position with ease applied', () => {
        fullTransitionTest({
            initial: new Vector2D(-100, 500),
            next: new Vector2D(-500, -1000),
            duration: 1000,
            ease: 'easeInOutCirc'
        });
    });
}

function testBehavesAsExpectedDuringFullDynamicTransitionToNextPositionWithSpeedSet(): void {
    test('behaves as expected during full dynamic transition to next position with speed set', () => {
        fullTransitionTest({
            initial: new Vector2D(100, 200),
            next: new Vector2D(500, 1000),
            speed: 2,
        });
    });
}

function testBehavesAsExpectedDuringFullDynamicTransitionToNextPositionWithSpeedAndEaseSet(): void {
    test('behaves as expected during full dynamic transition to next position with speed and ease set', () => {
        fullTransitionTest({
            initial: new Vector2D(100, 200),
            next: new Vector2D(500, 1000),
            speed: 3,
            ease: 'easeOutExpo'
        });
    });
}


function testBehavesAsExpectedDuringFullDynamicTransitionToNextPositionAfterMultipleSaveAndReloads(): void {
    test('behaves as expected during full dynamic transition to next position after multiple save and reloads', () => {

        const initial = new Vector2D(100, 200);
        const next = new Vector2D(-500, -300);
        const NUM_STEPS = 20;
        const duration = 800;
        const stepSize = duration / NUM_STEPS;
        const ease: tEaseOption = 'easeInOutBounce';
        let easeFn: tEaseFunction = loadEase(ease);
        let elapsed = 0;
        let progress = 0;
        let current: Vector2D;

        const vector = new DynamicVector(initial.x, initial.y);
        vector.load(vector.save()); // <--
        vector.duration(duration).ease(ease).next(next.x, next.y).change();
        EXPECT.truthy(vector.isActive);

        for (let i = 0; i < NUM_STEPS - 1; i++) {
            vector.update(stepSize!);
            vector.load(vector.save()); // <--
            elapsed += stepSize!;
            progress = easeFn(elapsed / duration!);
            current = initial.add(next.subtract(initial).multiply(progress));
            EXPECT.toBeCloseTo(vector.x, current.x);
            EXPECT.toBeCloseTo(vector.y, current.y);
        }

        vector.update(stepSize! + 10);
        vector.load(vector.save()); // <--
        EXPECT.falsy(vector.isActive);
        EXPECT.toBeCloseTo(vector.x, next.x);
        EXPECT.toBeCloseTo(vector.y, next.y);

    });
}


/**
 * UTILITY FUNCTIONS
 */

function fullTransitionTest(props: {
    initial: Vector2D;
    next: Vector2D;
    duration?: number;
    speed?: number;
    ease?: tEaseOption;
}): void {

    const vector = new DynamicVector(props.initial.x, props.initial.y);

    const NUM_STEPS = 20;
    const DISTANCE = props.initial.distanceTo(props.next);
    let duration: number;
    let stepSize: number;
    let easeFn: tEaseFunction = loadEase('noEase');
    let elapsed = 0;
    let progress = 0;
    const current = new Vector2D();

    if (props.duration) {
        duration = props.duration;
        stepSize = duration / NUM_STEPS;
        vector.duration(props.duration);
    }

    if (props.speed) {
        duration = DISTANCE / props.speed;
        stepSize = duration / NUM_STEPS;
        vector.speed(props.speed);
    }

    if (props.ease) {
        easeFn = loadEase(props.ease);
        vector.ease(props.ease);
    }

    vector.next(props.next.x, props.next.y).change();
    EXPECT.truthy(vector.isActive);

    for (let i = 0; i < NUM_STEPS - 1; i++) {
        vector.update(stepSize!);
        elapsed += stepSize!;
        progress = easeFn(elapsed / duration!);
        current.copy(props.initial.add(props.next.subtract(props.initial).multiply(progress)));
        EXPECT.toBeCloseTo(vector.x, current.x);
        EXPECT.toBeCloseTo(vector.y, current.y);
    }

    vector.update(stepSize! + 10);
    EXPECT.falsy(vector.isActive);
    EXPECT.toBeCloseTo(vector.x, props.next.x);
    EXPECT.toBeCloseTo(vector.y, props.next.y);

}