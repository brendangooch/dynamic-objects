/**
 * 
 */

import * as EXPECT from '@brendangooch/jest-expect';
import * as EASE from '@brendangooch/ease';
import { Vector2D, QuadraticBezierCurve } from "@brendangooch/maths";
import { DynamicQuadraticBezier } from './dynamic-quadratic-bezier.js';
import { DynamicUnit } from './dynamic-unit.js';

test('dummy', () => { });

type tFullDurationTestParams = {
    start: Vector2D;
    end: Vector2D;
    speed?: number;
    duration?: number;
    ease: EASE.tEaseOption;
    controlDistance?: number;
    controlAngle?: number;
};

let db: DynamicQuadraticBezier;
beforeEach(() => {
    db = new DynamicQuadraticBezier();
});

testAll();
function testAll(): void {
    describe('DynamicBezier', () => {
        testChangesCurrentValuesInstantlyIfNoDurationSet();
        testLoadReturnsTrueOnValidLoad();
        testLoadReturnsFalseIfMissingParentProperty();
        testLoadReturnsFalseIfMissingBezierProperty();
        testLoadReturnsFalseIfMissingControlDistanceProperty();
        testLoadReturnsFalseIfMissingControlAngleProperty();
        testReturnsExpectedValuesDuringFullDurationCycle();
        testReturnsExpectedValuesDuringFullDurationCycleControlPointNotSet();
        testControlPointResetsAfterFullDurationComplete();
        testControlPointCannotBeSetIfBezierIsActive();
        testReturnsExpectedValuesDuringFullDurationCycleWithEase();
        testReturnsExpectedValuesDuringFullDurationCycleWhenSpeedIsSet();
        testReturnsExpectedValuesDuringFullDurationCycleWhenSpeedIsSetWithEase();

    });
}


function testChangesCurrentValuesInstantlyIfNoDurationSet(): void {
    test('changes current values instantly if no duration or speed set', () => {
        db.changeTo(new Vector2D(100, 200));
        EXPECT.toBe(db.current.x, 100);
        EXPECT.toBe(db.current.y, 200);
    });
}

function testLoadReturnsTrueOnValidLoad(): void {
    test('load returns true on valid load', () => {
        const greatGrandParent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const grandParent = JSON.stringify({
            parent: greatGrandParent,
            unit: unit.save(),
            speed: 0
        });
        const previous = new Vector2D();
        const next = new Vector2D();
        const distanceBetween = new Vector2D();
        const currentValue = new Vector2D();
        const parent = JSON.stringify({
            parent: grandParent,
            previous: previous.save(),
            next: next.save(),
            distanceBetween: distanceBetween.save(),
            currentValue: currentValue.save()
        });
        const bezier = new QuadraticBezierCurve();
        EXPECT.truthy(
            db.load(
                JSON.stringify({
                    parent: parent,
                    bezier: bezier.save(),
                    controlDistance: 500,
                    controlAngle: 0
                })
            )
        );
    });
}

function testLoadReturnsFalseIfMissingParentProperty(): void {
    test('load returns false if missing "parent" property', () => {
        // const greatGrandParent = JSON.stringify({
        //     isOn: false,
        //     duration: 0,
        //     easeOption: 'noEase'
        // });
        // const unit = new DynamicUnit();
        // const grandParent = JSON.stringify({
        //     parent: greatGrandParent,
        //     unit: unit.save(),
        //     speed: 0
        // });
        // const previous = new Vector2D();
        // const next = new Vector2D();
        // const distanceBetween = new Vector2D();
        // const currentValue = new Vector2D();
        // const parent = JSON.stringify({
        //     parent: grandParent,
        //     previous: previous.save(),
        //     next: next.save(),
        //     distanceBetween: distanceBetween.save(),
        //     currentValue: currentValue.save()
        // });
        const bezier = new QuadraticBezierCurve();
        EXPECT.falsy(
            db.load(
                JSON.stringify({
                    // parent: parent,
                    bezier: bezier.save(),
                    controlDistance: 500,
                    controlAngle: 0
                })
            )
        );
    });
}

function testLoadReturnsFalseIfMissingBezierProperty(): void {
    test('load returns false if missing "bezier" property', () => {
        const greatGrandParent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const grandParent = JSON.stringify({
            parent: greatGrandParent,
            unit: unit.save(),
            speed: 0
        });
        const previous = new Vector2D();
        const next = new Vector2D();
        const distanceBetween = new Vector2D();
        const currentValue = new Vector2D();
        const parent = JSON.stringify({
            parent: grandParent,
            previous: previous.save(),
            next: next.save(),
            distanceBetween: distanceBetween.save(),
            currentValue: currentValue.save()
        });
        // const bezier = new QuadraticBezierCurve();
        EXPECT.falsy(
            db.load(
                JSON.stringify({
                    parent: parent,
                    // bezier: bezier.save(),
                    controlDistance: 500,
                    controlAngle: 0
                })
            )
        );
    });
}

function testLoadReturnsFalseIfMissingControlDistanceProperty(): void {
    test('load returns false if missing "controlDistance" property', () => {
        const greatGrandParent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const grandParent = JSON.stringify({
            parent: greatGrandParent,
            unit: unit.save(),
            speed: 0
        });
        const previous = new Vector2D();
        const next = new Vector2D();
        const distanceBetween = new Vector2D();
        const currentValue = new Vector2D();
        const parent = JSON.stringify({
            parent: grandParent,
            previous: previous.save(),
            next: next.save(),
            distanceBetween: distanceBetween.save(),
            currentValue: currentValue.save()
        });
        const bezier = new QuadraticBezierCurve();
        EXPECT.falsy(
            db.load(
                JSON.stringify({
                    parent: parent,
                    bezier: bezier.save(),
                    // controlDistance: 500,
                    controlAngle: 0
                })
            )
        );
    });
}

function testLoadReturnsFalseIfMissingControlAngleProperty(): void {
    test('load returns false if missing "controlAngle" property', () => {
        const greatGrandParent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const grandParent = JSON.stringify({
            parent: greatGrandParent,
            unit: unit.save(),
            speed: 0
        });
        const previous = new Vector2D();
        const next = new Vector2D();
        const distanceBetween = new Vector2D();
        const currentValue = new Vector2D();
        const parent = JSON.stringify({
            parent: grandParent,
            previous: previous.save(),
            next: next.save(),
            distanceBetween: distanceBetween.save(),
            currentValue: currentValue.save()
        });
        const bezier = new QuadraticBezierCurve();
        EXPECT.falsy(
            db.load(
                JSON.stringify({
                    parent: parent,
                    bezier: bezier.save(),
                    controlDistance: 500,
                    // controlAngle: 0
                })
            )
        );
    });
}

function testReturnsExpectedValuesDuringFullDurationCycle(): void {
    test('returns expected values during full duration cycle', () => {
        testFullDuration({
            start: new Vector2D(100, 100),
            end: new Vector2D(1000, 200),
            duration: 1000,
            ease: 'noEase',
            controlDistance: 1000,
            controlAngle: -Math.PI / 4
        });
    });
}

function testReturnsExpectedValuesDuringFullDurationCycleControlPointNotSet(): void {
    test('returns expected values when control point not set (control point is at start position)', () => {
        testFullDuration({
            start: new Vector2D(100, 100),
            end: new Vector2D(1000, 200),
            duration: 1000,
            ease: 'noEase'
        });
    });
}



function testReturnsExpectedValuesDuringFullDurationCycleWithEase(): void {
    test('returns expected values during full duration cycle with ease', () => {
        testFullDuration({
            start: new Vector2D(100, 100),
            end: new Vector2D(1000, 200),
            duration: 1000,
            ease: 'easeOutCubic',
            controlDistance: 500,
            controlAngle: -1.5
        });
    });
}

function testReturnsExpectedValuesDuringFullDurationCycleWhenSpeedIsSet(): void {
    test('returns expected values during full duration cycle when speed set', () => {
        testFullDuration({
            start: new Vector2D(100, 100),
            end: new Vector2D(1000, 200),
            speed: 2.5,
            ease: 'noEase',
            controlDistance: 500,
            controlAngle: -1.5
        });
    });
}

function testReturnsExpectedValuesDuringFullDurationCycleWhenSpeedIsSetWithEase(): void {
    test('returns expected values during full duration cycle when speed set with ease', () => {
        testFullDuration({
            start: new Vector2D(100, 100),
            end: new Vector2D(1000, 200),
            speed: 2.5,
            ease: 'easeInOutSine',
            controlDistance: 500,
            controlAngle: -1.5
        });
    });
}

function testControlPointResetsAfterFullDurationComplete(): void {
    test('control point resets after full duration complete', () => {

        const NUM_STEPS = 10;
        const duration = 800;
        const start = new Vector2D(0, 0);
        const end = new Vector2D(1000, -500);
        const controlDistance = 500;
        const controlAngle = Math.PI / 3;
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        bezier.setControlByDistanceAndAngleFromStart(controlDistance, controlAngle);
        const step = duration / NUM_STEPS;
        let easeFn: EASE.tEaseFunction = EASE.load('noEase');
        let elapsed: number = 0;
        let progress: number = 0;
        let current = new Vector2D();

        db = new DynamicQuadraticBezier(start);
        EXPECT.toBeCloseTo(db.duration(duration).ease('noEase').controlPoint(controlDistance, controlAngle).changeTo(end), duration);
        EXPECT.truthy(db.isActive);

        // loop to 1 step before completion
        for (let i = 0; i < NUM_STEPS - 1; i++) {
            db.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            EXPECT.truthy(db.isActive);
            EXPECT.toBeCloseTo(db.current.x, current.x);
            EXPECT.toBeCloseTo(db.current.y, current.y);
        }

        // final step (+ 1 for rounding errors)
        db.update(step + 1);
        EXPECT.toBe(db.current.x, end.x);
        EXPECT.toBe(db.current.y, end.y);
        EXPECT.falsy(db.isActive);


        // LOOP 2
        // back to start but now with no control point set
        // control point now back to 0, 0, which equates to end (current start)
        bezier.setStart(end.x, end.y);
        bezier.setEnd(start.x, start.y);
        bezier.setControl(end.x, end.y);
        elapsed = 0;

        EXPECT.toBeCloseTo(db.duration(duration).ease('noEase').changeTo(start), duration);
        EXPECT.truthy(db.isActive);

        // loop to 1 step before completion
        for (let i = 0; i < NUM_STEPS - 1; i++) {
            db.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            EXPECT.truthy(db.isActive);
            EXPECT.toBeCloseTo(db.current.x, current.x);
            EXPECT.toBeCloseTo(db.current.y, current.y);
        }

        // final step (+ 1 for rounding errors)
        db.update(step + 1);
        EXPECT.toBe(db.current.x, start.x);
        EXPECT.toBe(db.current.y, start.y);
        EXPECT.falsy(db.isActive);


    });
}

function testControlPointCannotBeSetIfBezierIsActive(): void {
    test('control point cannot be set if bezier is active', () => {

        const NUM_STEPS = 10;
        const duration = 800;
        const start = new Vector2D(0, 0);
        const end = new Vector2D(1000, -500);
        const controlDistance = 500;
        const controlAngle = Math.PI / 3;
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        bezier.setControlByDistanceAndAngleFromStart(controlDistance, controlAngle);
        const step = duration / NUM_STEPS;
        let easeFn: EASE.tEaseFunction = EASE.load('noEase');
        let elapsed: number = 0;
        let progress: number = 0;
        let current = new Vector2D();

        db = new DynamicQuadraticBezier(start);
        EXPECT.toBeCloseTo(db.duration(duration).ease('noEase').controlPoint(controlDistance, controlAngle).changeTo(end), duration);

        EXPECT.truthy(db.isActive); // <-- is active
        db.controlPoint(2000, -Math.PI / 2); // <-- has no effect

        // loop to 1 step before completion
        for (let i = 0; i < NUM_STEPS - 1; i++) {
            db.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            EXPECT.truthy(db.isActive);
            EXPECT.toBeCloseTo(db.current.x, current.x);
            EXPECT.toBeCloseTo(db.current.y, current.y);
        }

        // final step (+ 1 for rounding errors)
        db.update(step + 1);
        EXPECT.toBe(db.current.x, end.x);
        EXPECT.toBe(db.current.y, end.y);
        EXPECT.falsy(db.isActive);

    });
}


/**
 * UTILITY FUNCTIONS
 */

function testFullDuration(params: tFullDurationTestParams): void {

    const NUM_STEPS = 10;
    const DEFAULT_DURATION = 1000;
    const bezier = new QuadraticBezierCurve();
    bezier.setStart(params.start.x, params.start.y);
    bezier.setEnd(params.end.x, params.end.y);
    if (params.controlDistance && params.controlAngle) {
        bezier.setControlByDistanceAndAngleFromStart(params.controlDistance, params.controlAngle);
    }
    else {
        bezier.setControl(params.start.x, params.start.y);
    }
    const diff = params.end.subtract(params.start);
    const distanceBetween = diff.length;
    const speed = (params.speed !== undefined) ? params.speed : false;
    const duration = (speed) ? distanceBetween / speed : (params.duration) ? params.duration : DEFAULT_DURATION;
    const step = duration / NUM_STEPS;
    let easeFn: EASE.tEaseFunction = EASE.load(params.ease);
    let elapsed: number = 0;
    let progress: number = 0;
    let current = new Vector2D();

    db = new DynamicQuadraticBezier(params.start);
    if (speed) db.speed(speed);
    else db.duration(duration);
    if (params.controlDistance && params.controlAngle) {
        db.controlPoint(params.controlDistance, params.controlAngle);
    }
    EXPECT.toBeCloseTo(db.ease(params.ease).changeTo(params.end), duration);
    EXPECT.truthy(db.isActive);

    // loop to 1 step before completion
    for (let i = 0; i < NUM_STEPS - 1; i++) {
        db.update(step);
        elapsed += step;
        progress = easeFn(elapsed / duration);
        current.setX(bezier.x(progress));
        current.setY(bezier.y(progress));
        EXPECT.truthy(db.isActive);
        EXPECT.toBeCloseTo(db.current.x, current.x);
        EXPECT.toBeCloseTo(db.current.y, current.y);
    }

    // final step (+ 1 for rounding errors)
    db.update(step + 1);
    EXPECT.toBe(db.current.x, params.end.x);
    EXPECT.toBe(db.current.y, params.end.y);
    EXPECT.falsy(db.isActive);

}