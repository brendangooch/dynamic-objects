/**
 * DynamicPosition uses an internal DynamicVector or DynamicBezier depending on context
 * no need to test full functionality again
 */

import * as Ease from '@brendangooch/ease';
import { QuadraticBezierCurve, Vector2D } from "@brendangooch/maths";
import { DynamicPosition } from "./dynamic-position.js";

testAll();
function testAll(): void {
    describe('DynamicPosition', () => {

        testDefaultInitialXYValuesAre00();
        testInitialXYValuesAreValuesSetOnInstantiation();
        testCannotSetDurationIfPositionActive();
        testCannotSetSpeedIfPositionActive();
        testCannotSetEaseIfPositionActive();
        testCannotCallMoveToIfPositionActive();
        testCannotCallMoveByIfPositionActive();
        testCallCurveToIfPositionNotActive();
        testContinuesToBehaveAsExpectedAfterSaveAndLoad();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveBy();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToNoEase();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToNoEaseSetBySpeed();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToWithEase();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToNoeEase();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToWithEase();
        testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToWithEaseSetBySpeed();
        testTurnOffAndOnStopsAndStartsUpdate();
        testCurveToThenMoveToBehavesAsExpected();
        testMoveToThenCurveToBehavesAsExpected();

    });

}

function testDefaultInitialXYValuesAre00(): void {
    test('default initial x,y values are 0,0', () => {
        const p = new DynamicPosition();
        expect(p.x).toBe(0);
        expect(p.y).toBe(0);
    });
}

function testInitialXYValuesAreValuesSetOnInstantiation(): void {
    test('initial x,y values are values set on instantiation', () => {
        const p = new DynamicPosition(100, 200);
        expect(p.x).toBe(100);
        expect(p.y).toBe(200);
    });
}

function testCannotSetDurationIfPositionActive(): void {
    test('cannot set duration if position active', () => {
        const p = new DynamicPosition();
        expect(p.isActive).not.toBeTruthy();
        p.duration(1000).moveTo(500, 600);
        expect(p.isActive).toBeTruthy();
        p.duration(500);
        p.update(200);
        expect(p.x).toBeCloseTo(100);
        expect(p.y).toBeCloseTo(120);
    });
}

function testCannotSetSpeedIfPositionActive(): void {
    test('cannot set speed if position active', () => {
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1000, 2000);
        const distanceBetween = end.distanceTo(start);
        const speed = 2;
        const duration = distanceBetween / speed;
        const step = duration / 5;
        const p = new DynamicPosition(start.x, start.y);
        expect(p.isActive).not.toBeTruthy();
        p.speed(speed).moveTo(end.x, end.y);
        expect(p.isActive).toBeTruthy();
        p.speed(3);
        p.update(step);
        expect(p.x).toBeCloseTo(280);
        expect(p.y).toBeCloseTo(560);
    });
}

function testCannotSetEaseIfPositionActive(): void {
    test('cannot set ease if position active', () => {
        const p = new DynamicPosition();
        expect(p.isActive).not.toBeTruthy();
        p.duration(1000).moveTo(1000, 800);
        expect(p.isActive).toBeTruthy();
        p.ease('easeInElastic');
        p.update(200);
        expect(p.x).toBeCloseTo(200);
        expect(p.y).toBeCloseTo(160);
    });
}

function testCannotCallMoveToIfPositionActive(): void {
    test('cannot call moveTo if position active', () => {
        const p = new DynamicPosition(100, 200);
        expect(p.speed(1).moveTo(500, 500)).toBeTruthy();
        expect(p.isActive).toBeTruthy();
        expect(p.moveTo(1000, 2000)).not.toBeTruthy();
        expect(p.x).toBe(100);
        expect(p.y).toBe(200);
    });
}

function testCannotCallMoveByIfPositionActive(): void {
    test('cannot call moveBy if position active', () => {
        const p = new DynamicPosition(100, 200);
        expect(p.speed(1).moveTo(500, 500)).toBeTruthy();
        expect(p.isActive).toBeTruthy();
        expect(p.moveBy(100, 200)).not.toBeTruthy();
        expect(p.x).toBe(100);
        expect(p.y).toBe(200);
    });
}

function testCallCurveToIfPositionNotActive(): void {
    test('cannot call curveTo if position not active', () => {
        const p = new DynamicPosition(100, 200);
        expect(p.speed(1).moveTo(500, 500)).toBeTruthy();
        expect(p.isActive).toBeTruthy();
        expect(p.curveTo(1000, 2000, 1000, 0.5)).not.toBeTruthy();
        expect(p.x).toBe(100);
        expect(p.y).toBe(200);
    });
}

function testTurnOffAndOnStopsAndStartsUpdate(): void {
    test('turn off and on stops and starts update', () => {
        const p = new DynamicPosition(100, 100);
        p.duration(1000).moveBy(100, 100);
        p.update(200);
        expect(p.x).toBe(120);
        expect(p.y).toBe(120);
        p.turnOff();
        p.update(200);
        expect(p.x).toBe(120);
        expect(p.y).toBe(120);
        p.turnOn();
        p.update(200);
        expect(p.x).toBe(140);
        expect(p.y).toBe(140);
    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveBy(): void {
    test('returns expected values during full update cycle using moveBy', () => {

        const start = new Vector2D(100, 200);
        const moveBy = new Vector2D(500, 500);
        const end = start.add(moveBy);
        const diff = end.subtract(start);
        const easeOption: Ease.tEaseOption = 'noEase';
        const easeFn = Ease.load(easeOption);
        const duration = 800;
        const numSteps = 5;
        const step = duration / numSteps;
        let elapsed = 0;
        let progress = 0;
        let current: Vector2D;

        const p = new DynamicPosition(start.x, start.y);
        p.duration(duration).moveBy(moveBy.x, moveBy.y);

        for (let i = 0; i < numSteps; i++) {
            p.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current = start.add(diff.multiply(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }

    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToNoEase(): void {
    test('returns expected values during full update cycle using moveTo no ease', () => {

        const start = new Vector2D(100, 200);
        const end = new Vector2D(600, -1000);
        const diff = end.subtract(start);
        const easeOption: Ease.tEaseOption = 'noEase';
        const easeFn = Ease.load(easeOption);
        const duration = 800;
        const numSteps = 5;
        const step = duration / numSteps;
        let elapsed = 0;
        let progress = 0;
        let current: Vector2D;

        const p = new DynamicPosition(start.x, start.y);
        p.duration(duration).moveTo(end.x, end.y);

        for (let i = 0; i < numSteps; i++) {
            p.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current = start.add(diff.multiply(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }

    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToNoEaseSetBySpeed(): void {
    test('returns expected values during full update cycle using moveTo no ease set by speed', () => {

        const speed = 2;
        const easeOption: Ease.tEaseOption = 'noEase';
        const easeFn = Ease.load(easeOption);
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1600, 1800);
        const distanceBetween = end.distanceTo(start);

        let elapsed = 0;
        let progress = 0;
        let current = new Vector2D();
        const numSteps = 5;
        const duration = distanceBetween / speed;
        const step = duration / numSteps;

        const p = new DynamicPosition(start.x, start.y);
        p.speed(speed).moveTo(end.x, end.y);

        for (let i = 0; i < numSteps; i++) {
            p.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current = start.add(end.subtract(start).multiply(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }

    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingMoveToWithEase(): void {
    test('returns expected values during full update cycle using moveTo with ease', () => {

        const start = new Vector2D(100, 200);
        const end = new Vector2D(600, -1000);
        const diff = end.subtract(start);
        const easeOption: Ease.tEaseOption = 'easeInOutBounce';
        const easeFn = Ease.load(easeOption);
        const duration = 800;
        const numSteps = 5;
        const step = duration / numSteps;
        let elapsed = 0;
        let progress = 0;
        let current: Vector2D;

        const p = new DynamicPosition(start.x, start.y);
        p.duration(duration).ease(easeOption).moveTo(end.x, end.y);

        for (let i = 0; i < numSteps; i++) {
            p.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current = start.add(diff.multiply(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }

    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToNoeEase(): void {
    test('returns expected values during full update cycle using curveTo no ease', () => {

        const duration = 750;
        const cDistance = 800;
        const cAngle = -Math.PI / 4;
        const easeOption: Ease.tEaseOption = 'noEase';
        const easeFn = Ease.load(easeOption);
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1600, 1800);
        const distanceBetween = end.distanceTo(start);
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        bezier.setControlByDistanceAndAngleFromStart(cDistance, cAngle);
        let elapsed = 0;
        let progress = 0;
        const current = new Vector2D();
        const numSteps = 5;

        const step = duration / numSteps;

        const p = new DynamicPosition(start.x, start.y);
        p.duration(duration).curveTo(end.x, end.y, cDistance, cAngle);

        for (let i = 0; i < numSteps; i++) {
            p.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }

    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToWithEase(): void {
    test('returns expected values during full update cycle using curveTo with ease', () => {

        const duration = 750;
        const cDistance = 800;
        const cAngle = -Math.PI / 4;
        const easeOption: Ease.tEaseOption = 'easeOutQuint';
        const easeFn = Ease.load(easeOption);
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1600, 1800);
        const distanceBetween = end.distanceTo(start);
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        bezier.setControlByDistanceAndAngleFromStart(cDistance, cAngle);
        let elapsed = 0;
        let progress = 0;
        const current = new Vector2D();
        const numSteps = 5;

        const step = duration / numSteps;

        const p = new DynamicPosition(start.x, start.y);
        p.duration(duration).ease(easeOption).curveTo(end.x, end.y, cDistance, cAngle);

        for (let i = 0; i < numSteps; i++) {
            p.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }

    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleUsingCurveToWithEaseSetBySpeed(): void {
    test('returns expected values during full update cycle using curveTo with ease set by speed', () => {

        const speed = 1.5;
        const cDistance = 800;
        const cAngle = -Math.PI / 4;
        const easeOption: Ease.tEaseOption = 'easeInOutBack';
        const easeFn = Ease.load(easeOption);
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1600, 1800);
        const distanceBetween = end.distanceTo(start);
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        bezier.setControlByDistanceAndAngleFromStart(cDistance, cAngle);
        let elapsed = 0;
        let progress = 0;
        const current = new Vector2D();
        const numSteps = 5;
        const duration = distanceBetween / speed;
        const step = duration / numSteps;

        const p = new DynamicPosition(start.x, start.y);
        p.speed(speed).ease(easeOption).curveTo(end.x, end.y, cDistance, cAngle);

        for (let i = 0; i < numSteps; i++) {
            p.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }

    });
}

function testCurveToThenMoveToBehavesAsExpected(): void {
    test('curveTo then moveTo behaves as expected', () => {

        const start = new Vector2D(500, 1000);
        const curveTo = new Vector2D(1000, 2000);
        const moveTo = new Vector2D(-400, -300);
        const diff = moveTo.subtract(curveTo);
        const distance = 600;
        const angle = -0.6;
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(curveTo.x, curveTo.y);
        bezier.setControlByDistanceAndAngleFromStart(distance, angle);
        const duration1 = 1200;
        const duration2 = 800;
        const numSteps = 5;
        const step1 = duration1 / 5;
        const step2 = duration2 / 5;
        let elapsed = 0;
        let progress = 0;
        let current = new Vector2D();

        const p = new DynamicPosition(start.x, start.y);
        p.duration(duration1).curveTo(curveTo.x, curveTo.y, distance, angle);

        for (let i = 0; i < numSteps; i++) {
            p.update(step1);
            elapsed += step1;
            progress = elapsed / duration1;
            current.setXY(bezier.x(progress), bezier.y(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }

        expect(p.isActive).not.toBeTruthy();
        expect(p.x).toBe(curveTo.x);
        expect(p.y).toBe(curveTo.y);
        elapsed = 0;
        progress = 0;

        p.duration(duration2).moveTo(moveTo.x, moveTo.y);
        expect(p.isActive).toBeTruthy();

        for (let i = 0; i < numSteps; i++) {
            p.update(step2);
            elapsed += step2;
            progress = elapsed / duration2;
            current = curveTo.add(diff.multiply(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }

    });
}

function testMoveToThenCurveToBehavesAsExpected(): void {
    test('moveTo then curveTo behaves as expected', () => {

        const start = new Vector2D(500, 1000);
        const moveTo = new Vector2D(-400, -300);
        const diff = moveTo.subtract(start);
        const curveTo = new Vector2D(1000, 2000);
        const distance = 600;
        const angle = -0.6;
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(moveTo.x, moveTo.y);
        bezier.setEnd(curveTo.x, curveTo.y);
        bezier.setControlByDistanceAndAngleFromStart(distance, angle);
        const duration1 = 1200;
        const duration2 = 800;
        const numSteps = 5;
        const step1 = duration1 / 5;
        const step2 = duration2 / 5;
        let elapsed = 0;
        let progress = 0;
        let current = new Vector2D();

        const p = new DynamicPosition(start.x, start.y);
        p.duration(duration1).moveTo(moveTo.x, moveTo.y);

        for (let i = 0; i < numSteps; i++) {
            p.update(step1);
            elapsed += step1;
            progress = elapsed / duration1;
            current = start.add(diff.multiply(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }

        expect(p.isActive).not.toBeTruthy();
        expect(p.x).toBe(moveTo.x);
        expect(p.y).toBe(moveTo.y);
        elapsed = 0;
        progress = 0;

        p.duration(duration2).curveTo(curveTo.x, curveTo.y, distance, angle);

        for (let i = 0; i < numSteps; i++) {
            p.update(step2);
            elapsed += step2;
            progress = elapsed / duration2;
            current.setXY(bezier.x(progress), bezier.y(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }





    });
}

function testContinuesToBehaveAsExpectedAfterSaveAndLoad(): void {
    test('continues to behave as expected after save and load', () => {

        const speed = 2;
        const cDistance = 800;
        const cAngle = -Math.PI / 4;
        const easeOption: Ease.tEaseOption = 'easeInOutBack';
        const easeFn = Ease.load(easeOption);
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1600, 1800);
        const distanceBetween = end.distanceTo(start);
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        bezier.setControlByDistanceAndAngleFromStart(cDistance, cAngle);
        let elapsed = 0;
        let progress = 0;
        const current = new Vector2D();
        const numSteps = 5;
        const duration = distanceBetween / speed;
        const step = duration / numSteps;

        const p = new DynamicPosition(start.x, start.y);
        p.load(p.save());
        p.speed(speed).ease(easeOption).curveTo(end.x, end.y, cDistance, cAngle);

        for (let i = 0; i < numSteps; i++) {
            p.update(step);
            p.load(p.save());
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expect(p.x).toBeCloseTo(current.x);
            expect(p.y).toBeCloseTo(current.y);
        }

    });
}

