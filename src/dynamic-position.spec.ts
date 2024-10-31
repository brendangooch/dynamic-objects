/**
 * DynamicPosition uses an internal DynamicVector or DynamicBezier depending on context
 * no need to test full functionality again
 */

import * as EXPECT from '@brendangooch/jest-expect';
import * as EASE from '@brendangooch/ease';
import { QuadraticBezierCurve, Vector2D } from "@brendangooch/maths";
import { DynamicPosition } from "./dynamic-position.js";

type tFullDurationMoveToTestParams = {
    start: Vector2D;
    end: Vector2D;
    speed?: number;
    duration?: number;
    ease: EASE.tEaseOption;
};

type tFullDurationCurveToTestParams = {
    start: Vector2D;
    end: Vector2D;
    speed?: number;
    duration?: number;
    ease: EASE.tEaseOption;
    controlDistance: number;
    controlAngle: number;
};

let p: DynamicPosition;
beforeEach(() => {
    p = new DynamicPosition();
});

testAll();
function testAll(): void {
    describe('DynamicPosition', () => {

        testDefaultInitialXYValuesAre00();
        testInitialXYValuesAreValuesSetOnInstantiation();
        testCannotSetDurationIfPositionActive();
        testCannotSetSpeedIfPositionActive();
        testCannotSetEaseIfPositionActive();
        testCannotCallMoveToIfPositionActive();
        testCallCurveToIfPositionNotActive();
        testContinuesToBehaveAsExpectedAfterSaveAndLoad();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToNoEase();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToNoEaseSetBySpeed();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToWithEase();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToNoEase();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToWithEase();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToWithEaseSetBySpeed();
        testCurveToThenMoveToBehavesAsExpected();
        testMoveToThenCurveToBehavesAsExpected();

    });

}

function testDefaultInitialXYValuesAre00(): void {
    test('default initial x,y values are 0,0', () => {
        EXPECT.toBe(p.x, 0);
        EXPECT.toBe(p.y, 0);
    });
}

function testInitialXYValuesAreValuesSetOnInstantiation(): void {
    test('initial x,y values are values set on instantiation', () => {
        p = new DynamicPosition(100, 200);
        EXPECT.toBe(p.x, 100);
        EXPECT.toBe(p.y, 200);
    });
}

function testCannotSetDurationIfPositionActive(): void {
    test('cannot set duration if position active', () => {
        EXPECT.falsy(p.isActive);
        EXPECT.toBe(p.duration(1000).moveTo(500, 600), 1000);
        EXPECT.truthy(p.isActive);
        p.duration(500);
        p.update(200);
        EXPECT.toBe(p.x, 100);
        EXPECT.toBe(p.y, 120);
    });
}

function testCannotSetSpeedIfPositionActive(): void {
    test('cannot set speed if position active', () => {
        EXPECT.falsy(p.isActive);
        EXPECT.toBe(p.duration(1000).moveTo(500, 600), 1000);
        EXPECT.truthy(p.isActive);
        p.speed(10);
        p.update(200);
        EXPECT.toBe(p.x, 100);
        EXPECT.toBe(p.y, 120);
    });
}

function testCannotSetEaseIfPositionActive(): void {
    test('cannot set ease if position active', () => {
        EXPECT.falsy(p.isActive);
        EXPECT.toBe(p.duration(1000).moveTo(1000, 800), 1000);
        EXPECT.truthy(p.isActive);
        p.ease('easeInElastic');
        p.update(200);
        EXPECT.toBeCloseTo(p.x, 200);
        EXPECT.toBeCloseTo(p.y, 160);
    });
}

function testCannotCallMoveToIfPositionActive(): void {
    test('cannot call moveTo if position active', () => {
        p = new DynamicPosition(100, 200);
        EXPECT.notToBe(p.speed(1).moveTo(500, 500), 0);
        EXPECT.truthy(p.isActive);
        EXPECT.toBe(p.moveTo(1000, 2000), 0);
        EXPECT.toBeCloseTo(p.x, 100);
        EXPECT.toBeCloseTo(p.y, 200);
    });
}

function testCallCurveToIfPositionNotActive(): void {
    test('cannot call curveTo if position not active', () => {
        p = new DynamicPosition(100, 200);
        EXPECT.notToBe(p.speed(1).moveTo(500, 500), 0);
        EXPECT.truthy(p.isActive);
        EXPECT.toBe(p.curveTo(1000, 2000, 500, 1), 0);
        EXPECT.toBeCloseTo(p.x, 100);
        EXPECT.toBeCloseTo(p.y, 200);
    });
}




function testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToNoEase(): void {
    test('returns expected values during full update cycle using moveTo no ease', () => {
        fullTestDurationMoveTo({
            start: new Vector2D(-500, -200),
            end: new Vector2D(500, 1200),
            duration: 1000,
            ease: 'noEase'
        });
    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToNoEaseSetBySpeed(): void {
    test('returns expected values during full update cycle using moveTo no ease set by speed', () => {
        fullTestDurationMoveTo({
            start: new Vector2D(-500, -200),
            end: new Vector2D(500, 1200),
            speed: 2,
            ease: 'noEase'
        });
    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToWithEase(): void {
    test('returns expected values during full update cycle using moveTo with ease', () => {
        fullTestDurationMoveTo({
            start: new Vector2D(-500, -200),
            end: new Vector2D(500, 1200),
            speed: 2,
            ease: 'easeInOutCubic'
        });
    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToNoEase(): void {
    test('returns expected values during full update cycle using curveTo no ease', () => {
        fullTestDurationCurveTo({
            start: new Vector2D(-500, -200),
            end: new Vector2D(500, 1200),
            duration: 800,
            ease: 'noEase',
            controlDistance: 500,
            controlAngle: 1.5
        });
    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToWithEase(): void {
    test('returns expected values during full update cycle using curveTo with ease', () => {
        fullTestDurationCurveTo({
            start: new Vector2D(-500, -200),
            end: new Vector2D(500, 1200),
            duration: 800,
            ease: 'easeInOutBounce',
            controlDistance: 500,
            controlAngle: 1.5
        });
    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToWithEaseSetBySpeed(): void {
    test('returns expected values during full update cycle using curveTo with ease set by speed', () => {
        fullTestDurationCurveTo({
            start: new Vector2D(-500, -200),
            end: new Vector2D(500, 1200),
            speed: 1.5,
            ease: 'easeInOutQuint',
            controlDistance: 500,
            controlAngle: 1.5
        });
    });
}

function testCurveToThenMoveToBehavesAsExpected(): void {
    test('curveTo then moveTo behaves as expected', () => {

        // curveTo

        const NUM_STEPS = 10;
        const duration = 800;
        const ease: EASE.tEaseOption = 'easeInOutQuad';

        const start = new Vector2D(100, 200);
        const end = new Vector2D(600, 800);
        const controlDistance = 500;
        const controlAngle = 1.5;

        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        bezier.setControlByDistanceAndAngleFromStart(controlDistance, controlAngle);
        const step = duration / NUM_STEPS;
        let easeFn: EASE.tEaseFunction = EASE.load(ease);
        let elapsed: number = 0;
        let progress: number = 0;
        let current = new Vector2D();

        p = new DynamicPosition(start.x, start.y);
        EXPECT.toBeCloseTo(p.duration(duration).ease(ease).curveTo(end.x, end.y, controlDistance, controlAngle), duration);
        EXPECT.truthy(p.isActive);

        // loop to 1 step before completion
        for (let i = 0; i < NUM_STEPS - 1; i++) {
            p.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            EXPECT.truthy(p.isActive);
            EXPECT.toBeCloseTo(p.x, current.x);
            EXPECT.toBeCloseTo(p.y, current.y);
        }

        // final step (+ 1 for rounding errors)
        p.update(step + 1);
        EXPECT.toBe(p.x, end.x);
        EXPECT.toBe(p.y, end.y);
        EXPECT.falsy(p.isActive);

        // moveTo
        const previous = end.clone();
        const next = new Vector2D(1500, -800);
        const diff = next.subtract(previous);
        elapsed = 0;

        EXPECT.toBeCloseTo(p.duration(duration).ease(ease).moveTo(next.x, next.y), duration);
        EXPECT.truthy(p.isActive);

        // loop to 1 step before completion
        for (let i = 0; i < NUM_STEPS - 1; i++) {
            p.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current = previous.add(diff.multiply(progress));
            EXPECT.truthy(p.isActive);
            EXPECT.toBeCloseTo(p.x, current.x);
            EXPECT.toBeCloseTo(p.y, current.y);
        }

        // final step (+ 1 for rounding errors)
        p.update(step + 1);
        EXPECT.toBe(p.x, next.x);
        EXPECT.toBe(p.y, next.y);
        EXPECT.falsy(p.isActive);

    });
}

function testMoveToThenCurveToBehavesAsExpected(): void {
    test('moveTo then curveTo behaves as expected', () => {

        // moveTo
        const NUM_STEPS = 10;
        const duration = 800;
        const ease: EASE.tEaseOption = 'easeInCirc'
        let easeFn: EASE.tEaseFunction = EASE.load(ease);
        const step = duration / NUM_STEPS;

        const start = new Vector2D(0, 0);
        const end = new Vector2D(-500, 800);
        const diff = end.subtract(start);

        let elapsed: number = 0;
        let progress: number = 0;
        let current = new Vector2D();

        p = new DynamicPosition(start.x, start.y);
        EXPECT.toBeCloseTo(p.duration(duration).ease(ease).moveTo(end.x, end.y), duration);
        EXPECT.truthy(p.isActive);

        // loop to 1 step before completion
        for (let i = 0; i < NUM_STEPS - 1; i++) {
            p.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current = start.add(diff.multiply(progress));
            EXPECT.truthy(p.isActive);
            EXPECT.toBeCloseTo(p.x, current.x);
            EXPECT.toBeCloseTo(p.y, current.y);
        }

        // final step (+ 1 for rounding errors)
        p.update(step + 1);
        EXPECT.toBe(p.x, end.x);
        EXPECT.toBe(p.y, end.y);
        EXPECT.falsy(p.isActive);


        // curveTo
        elapsed = 0;
        const previous = end.clone();
        const next = new Vector2D(600, 900);
        const controlDistance = 400;
        const controlAngle = 2.5;
        const bezier = new QuadraticBezierCurve()
        bezier.setStart(previous.x, previous.y);
        bezier.setEnd(next.x, next.y);
        bezier.setControlByDistanceAndAngleFromStart(controlDistance, controlAngle);

        EXPECT.toBeCloseTo(p.duration(duration).ease(ease).curveTo(next.x, next.y, controlDistance, controlAngle), duration);
        EXPECT.truthy(p.isActive);

        // loop to 1 step before completion
        for (let i = 0; i < NUM_STEPS - 1; i++) {
            p.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            EXPECT.truthy(p.isActive);
            EXPECT.toBeCloseTo(p.x, current.x);
            EXPECT.toBeCloseTo(p.y, current.y);
        }

        // final step (+ 1 for rounding errors)
        p.update(step + 1);
        EXPECT.toBe(p.x, next.x);
        EXPECT.toBe(p.y, next.y);
        EXPECT.falsy(p.isActive);

    });
}

function testContinuesToBehaveAsExpectedAfterSaveAndLoad(): void {
    test('continues to behave as expected after save and load', () => {

        const start = new Vector2D(0, 0);
        const end = new Vector2D(-500, 800);
        const diff = end.subtract(start);
        const duration = 800;
        const numSteps = 10;
        const step = duration / numSteps;
        const ease: EASE.tEaseOption = 'easeInCirc'
        let easeFn: EASE.tEaseFunction = EASE.load(ease);
        let elapsed: number = 0;
        let progress: number = 0;
        let current = new Vector2D();

        p = new DynamicPosition(start.x, start.y);
        EXPECT.toBeCloseTo(p.duration(duration).ease(ease).moveTo(end.x, end.y), duration);
        p.load(p.save()); // <--
        EXPECT.truthy(p.isActive);

        // loop to 1 step before completion
        for (let i = 0; i < numSteps - 1; i++) {
            p.update(step);
            p.load(p.save()); // <--
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current = start.add(diff.multiply(progress));
            EXPECT.truthy(p.isActive);
            EXPECT.toBeCloseTo(p.x, current.x);
            EXPECT.toBeCloseTo(p.y, current.y);
        }

        // final step (+ 1 for rounding errors)
        p.update(step + 1);
        EXPECT.toBe(p.x, end.x);
        EXPECT.toBe(p.y, end.y);
        EXPECT.falsy(p.isActive);

    });
}

/**
 * 
 * UTILITY FUNCTIONS
 */

function fullTestDurationMoveTo(params: tFullDurationMoveToTestParams): void {

    const DEFAULT_DURATION = 1000;
    const diff = params.end.subtract(params.start);
    const distanceBetween = diff.length;
    const speed = (params.speed !== undefined) ? params.speed : false;
    const duration = (speed) ? distanceBetween / speed : (params.duration) ? params.duration : DEFAULT_DURATION;
    const numSteps = 10;
    const step = duration / numSteps;
    let easeFn: EASE.tEaseFunction = EASE.load(params.ease);
    let elapsed: number = 0;
    let progress: number = 0;
    let current = new Vector2D();

    p = new DynamicPosition(params.start.x, params.start.y);
    if (speed) p.speed(speed);
    else p.duration(duration);
    EXPECT.toBeCloseTo(p.ease(params.ease).moveTo(params.end.x, params.end.y), duration);
    EXPECT.truthy(p.isActive);

    // loop to 1 step before completion
    for (let i = 0; i < numSteps - 1; i++) {
        p.update(step);
        elapsed += step;
        progress = easeFn(elapsed / duration);
        current = params.start.add(diff.multiply(progress));
        EXPECT.truthy(p.isActive);
        EXPECT.toBeCloseTo(p.x, current.x);
        EXPECT.toBeCloseTo(p.y, current.y);
    }

    // final step (+ 1 for rounding errors)
    p.update(step + 1);
    EXPECT.toBe(p.x, params.end.x);
    EXPECT.toBe(p.y, params.end.y);
    EXPECT.falsy(p.isActive);

}

function fullTestDurationCurveTo(params: tFullDurationCurveToTestParams): void {

    const NUM_STEPS = 10;
    const DEFAULT_DURATION = 1000;
    const bezier = new QuadraticBezierCurve();
    bezier.setStart(params.start.x, params.start.y);
    bezier.setEnd(params.end.x, params.end.y);
    bezier.setControlByDistanceAndAngleFromStart(params.controlDistance, params.controlAngle);
    const diff = params.end.subtract(params.start);
    const distanceBetween = diff.length;
    const speed = (params.speed !== undefined) ? params.speed : false;
    const duration = (speed) ? distanceBetween / speed : (params.duration) ? params.duration : DEFAULT_DURATION;
    const step = duration / NUM_STEPS;
    let easeFn: EASE.tEaseFunction = EASE.load(params.ease);
    let elapsed: number = 0;
    let progress: number = 0;
    let current = new Vector2D();

    p = new DynamicPosition(params.start.x, params.start.y);
    if (speed) p.speed(speed);
    else p.duration(duration);
    EXPECT.toBeCloseTo(p.ease(params.ease).curveTo(params.end.x, params.end.y, params.controlDistance, params.controlAngle), duration);
    EXPECT.truthy(p.isActive);

    // loop to 1 step before completion
    for (let i = 0; i < NUM_STEPS - 1; i++) {
        p.update(step);
        elapsed += step;
        progress = easeFn(elapsed / duration);
        current.setX(bezier.x(progress));
        current.setY(bezier.y(progress));
        EXPECT.truthy(p.isActive);
        EXPECT.toBeCloseTo(p.x, current.x);
        EXPECT.toBeCloseTo(p.y, current.y);
    }

    // final step (+ 1 for rounding errors)
    p.update(step + 1);
    EXPECT.toBe(p.x, params.end.x);
    EXPECT.toBe(p.y, params.end.y);
    EXPECT.falsy(p.isActive);

}