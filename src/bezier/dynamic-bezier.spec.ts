/**
 * 
 */

import { type tEaseOption, type tEaseFunction, load as loadEase } from '@brendangooch/ease';
import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicBezier } from './dynamic-bezier.js';
import { Vector2D } from '@brendangooch/maths';
import { QuadraticBezierCurve } from '@brendangooch/maths';

const EXPECT = new JestExpect();

testAll();
function testAll(): void {
    describe('DynamicBezier', () => {

        test('dummy', () => { });

        testCanChangeInstantly();
        testBehavesAsExpectedDuringFullTransitionFromStartToFinishNoControlPointSet();
        testBehavesAsExpectedDuringFullTransitionFromStartToFinishWithControlPointSet();
        testBehavesAsExpectedDuringFullTransitionFromStartToFinishWithEaseApplied();
        testBehavesAsExpectedDuringFullTransitionFromStartToFinishWithSpeedSet();
        testBehavesAsExpectedDuringFullTransitionFromStartToFinishWithSpeedSetAndEaseApplied();
        testBehavesAsExpectedDuringFullTransitionFromStartToFinishAfterMultipleSaveAndReloads();

    });
}


function testCanChangeInstantly(): void {
    test('can change instantly', () => {
        const bezier = new DynamicBezier();
        EXPECT.falsy(bezier.isActive);
        bezier.next(500, 600).change();
        EXPECT.falsy(bezier.isActive);
        EXPECT.toBe(bezier.x, 500);
        EXPECT.toBe(bezier.y, 600);
    });
}

function testBehavesAsExpectedDuringFullTransitionFromStartToFinishNoControlPointSet(): void {
    test('behaves as expected during full transition from start to finish no control point set', () => {
        fullTransitionTest({
            previous: new Vector2D(500, 100),
            next: new Vector2D(1500, 200),
            // distance: 1000,
            // angle: -1.5,
            duration: 800,
            // speed: 2,
            // ease: 'easeOutCubic',
        });
    });
}

function testBehavesAsExpectedDuringFullTransitionFromStartToFinishWithControlPointSet(): void {
    test('behaves as expected during full transition from start to finish with control point set', () => {
        fullTransitionTest({
            previous: new Vector2D(500, 100),
            next: new Vector2D(1500, 200),
            distance: 1000,
            angle: -1.5,
            duration: 800,
            // speed: 2,
            // ease: 'easeOutCubic',
        });
    });
}

function testBehavesAsExpectedDuringFullTransitionFromStartToFinishWithEaseApplied(): void {
    test('behaves as expected during full transition from start to finish with ease applied', () => {
        fullTransitionTest({
            previous: new Vector2D(500, 100),
            next: new Vector2D(1500, 200),
            distance: 1000,
            angle: -1.5,
            duration: 800,
            // speed: 2,
            ease: 'easeOutCubic'
        });
    });
}

function testBehavesAsExpectedDuringFullTransitionFromStartToFinishWithSpeedSet(): void {
    test('behaves as expected during full transition from start to finish with speed set', () => {
        fullTransitionTest({
            previous: new Vector2D(500, 100),
            next: new Vector2D(1500, 200),
            distance: 1000,
            angle: -1.5,
            // duration: 800,
            speed: 2,
            // ease: 'easeOutCubic',
        });
    });
}

function testBehavesAsExpectedDuringFullTransitionFromStartToFinishWithSpeedSetAndEaseApplied(): void {
    test('behaves as expected during full transition from start to finish with speed and ease applied', () => {
        fullTransitionTest({
            previous: new Vector2D(500, 100),
            next: new Vector2D(1500, 200),
            distance: 1000,
            angle: -1.5,
            // duration: 800,
            speed: 2,
            ease: 'easeOutCubic'
        });
    });
}

function testBehavesAsExpectedDuringFullTransitionFromStartToFinishAfterMultipleSaveAndReloads(): void {
    test('behaves as expected during full transition from start to finish after multiple save and reloads', () => {

        const previous = new Vector2D(-500, -500);
        const next = new Vector2D(500, 500);
        const distance = 500;
        const angle = 1;

        const db = new DynamicBezier(previous.x, previous.y);
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(previous.x, previous.y);
        bezier.setEnd(next.x, next.y);
        bezier.setControlByDistanceAndAngleFromStart(distance, angle);
        const NUM_STEPS = 20;
        const duration = 800;
        const stepSize = duration / NUM_STEPS;
        const ease: tEaseOption = 'easeInOutExpo';
        const easeFn: tEaseFunction = loadEase(ease);
        let elapsed = 0;
        let progress = 0;
        const current = new Vector2D();

        db.duration(duration).ease(ease).control(distance, angle).next(next.x, next.y).change();
        db.load(db.save()); // <--
        EXPECT.truthy(db.isActive);

        for (let i = 0; i < NUM_STEPS - 1; i++) {
            db.update(stepSize!);
            db.load(db.save()); // <--
            elapsed += stepSize!;
            progress = easeFn(elapsed / duration!);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            EXPECT.toBeCloseTo(db.x, current.x);
            EXPECT.toBeCloseTo(db.y, current.y);
        }

        db.update(stepSize! + 10);
        db.load(db.save()); // <--
        EXPECT.falsy(db.isActive);
        EXPECT.toBeCloseTo(db.x, next.x);
        EXPECT.toBeCloseTo(db.y, next.y);

    });
}


/**
 * UTILITY FUNCTIONS
 */

function fullTransitionTest(props: {
    previous: Vector2D;
    next: Vector2D;
    distance?: number;
    angle?: number;
    duration?: number;
    speed?: number;
    ease?: tEaseOption;
}): void {

    const db = new DynamicBezier(props.previous.x, props.previous.y);
    const bezier = new QuadraticBezierCurve();
    bezier.setStart(props.previous.x, props.previous.y);
    bezier.setEnd(props.next.x, props.next.y);
    bezier.setControl(props.previous.x, props.previous.y); // default behaviour
    const NUM_STEPS = 20;
    const DISTANCE = props.previous.distanceTo(props.next);
    let duration: number;
    let stepSize: number;
    let easeFn: tEaseFunction = loadEase('noEase');
    let elapsed = 0;
    let progress = 0;
    const current = new Vector2D();

    if (props.duration) {
        duration = props.duration;
        stepSize = duration / NUM_STEPS;
        db.duration(duration);
    }

    if (props.speed) {
        duration = DISTANCE / props.speed;
        stepSize = duration / NUM_STEPS;
        db.speed(props.speed);
    }

    if (props.ease) {
        easeFn = loadEase(props.ease);
        db.ease(props.ease);
    }

    if (props.distance && props.angle) {
        bezier.setControlByDistanceAndAngleFromStart(props.distance, props.angle);
        db.control(props.distance, props.angle);
    }

    db.next(props.next.x, props.next.y).change();
    EXPECT.truthy(db.isActive);

    for (let i = 0; i < NUM_STEPS - 1; i++) {
        db.update(stepSize!);
        elapsed += stepSize!;
        progress = easeFn(elapsed / duration!);
        current.setX(bezier.x(progress));
        current.setY(bezier.y(progress));
        EXPECT.toBeCloseTo(db.x, current.x);
        EXPECT.toBeCloseTo(db.y, current.y);
    }

    db.update(stepSize! + 10);
    EXPECT.falsy(db.isActive);
    EXPECT.toBeCloseTo(db.x, props.next.x);
    EXPECT.toBeCloseTo(db.y, props.next.y);

}