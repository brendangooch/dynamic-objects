/**
 * 
 */

import { QuadraticBezierCurve, Vector2D } from "@brendangooch/maths";
import { DynamicBezier } from "./dynamic-bezier.js";
import { DynamicUnit } from "./dynamic-unit.js";
import * as Ease from '@brendangooch/ease';

testAll();
function testAll(): void {
    describe('DynamicBezier', () => {

        // public constructor(x: number = 0, y: number = 0)
        testInitialValuesAre00IfPositionNotSetOnInstantiation();
        testInitialPositionIsPositionSetOnInstantiation();

        // public get isActive(): boolean
        textSettingDurationDoesNotMakeBezierActive();
        textSettingSpeedDoesNotMakeBezierActive();
        textSettingEaseDoesNotMakeBezierActive();
        textSettingControlDoesNotMakeBezierActive();
        textSettingDurationAndCallingMoveToMakesBezierActive();
        textSettingDurationAndCallingMoveByMakesBezierActive();
        textSettingSpeedAndCallingMoveToMakesBezierActive();
        textSettingSpeedAndCallingMoveByMakesBezierActive();
        textBezierCanBeActiveAndTurnedOff();

        // public duration(ms: number): DynamicBezier
        testDurationCannotBeSetIfBezierIsActive();
        testDurationHasNoEffectIfSetTo0();
        testDurationHasNoEffectIfLessThan0();

        // public speed(unitsPerMs: number): DynamicBezier
        testSpeedCannotBeSetIfBezierIsActive();
        testSpeedHasNoEffectIfSetTo0();
        testSpeedHasNoEffectIfLessThan0();

        // public ease(easeOption: tEaseOption): DynamicBezier
        testEaseCannotBeSetIfBezierIsActive();

        // public control(distance: number, angle: number): DynamicBezier
        testControlCannotBeSetIfBezierIsActive();

        // public moveTo(x: number, y: number): boolean
        textMoveToHasNoEffectIfBezierIsActive();
        textMoveToHasNoEffectIfXAndYParamsAreCurrentValues();
        textMoveToDoesChangePositionIfXOrYAreDifferentToCurrentValues();
        textMoveToMovesCurrentPositionInstantlyIfNoDurationOrSpeedSet();
        textMoveToMakesBezierActiveIfDurationIsSet();
        textMoveToMakesBezierActiveIfSpeedIsSet();

        // public moveBy(x: number, y: number): boolean
        textMoveByHasNoEffectIfBezierIsActive();
        textMoveByHasNoEffectIfXAndYParamsAreCurrentValues();
        textMoveByDoesChangePositionIfXOrYAreDifferentToCurrentValues();
        textMoveByMovesCurrentPositionInstantlyIfNoDurationOrSpeedSet();
        textMoveByMakesBezierActiveIfDurationIsSet();
        textMoveByMakesBezierActiveIfSpeedIsSet();
        textMoveByMovesCurrentPositionByCorrectAmount();
        textMoveByWorksWithNegativeNumbers();

        // public load(json: string): boolean
        // public save(): string
        testLoadReturnsTrueOnValidLoad();
        testBehavesTheSameOnSaveAndLoad();
        testReturnsFalseIfMissingUnitProperty();
        testReturnsFalseIfMissingCurrentProperty();
        testReturnsFalseIfMissingDistanceBetweenProperty();
        testReturnsFalseIfMissingBezierProperty();
        testReturnsFalseIfMissingNextProperty();
        testReturnsFalseIfMissingControlProperty();
        testReturnsFalseIfMissingDurationProperty();
        testReturnsFalseIfMissingSpeedProperty();
        testReturnsFalseIfMissingIsOnProperty();

        // general behaviour
        testTurningUnitOnAndOffStopsAndStartsUpdate();
        testDefaultPathIsAStraightLine();
        testPathIsCurvedIfControlIsCalled();
        testControlPointIsResetAfterFullUpdateCycle();
        testReturnsExpectedValuesDuringFullUpdateCycleWithNoEaseAndNoControlPoint();
        testReturnsExpectedValuesDuringFullUpdateCycleWithEaseAndNoControlPoint();
        testReturnsExpectedValuesDuringFullUpdateCycleWithNoEaseAndControlPoint();
        testReturnsExpectedValuesDuringFullUpdateCycleWithEaseAndControlPoint();
        testReturnsExpectedValuesDuringFullUpdateCycleWithEaseAndControlPointAndSpeedSetting();

    });

}


function testInitialValuesAre00IfPositionNotSetOnInstantiation(): void {
    test('initial values are 0, 0 if position not set on instantiation', () => {
        const b = new DynamicBezier();
        expectXYToBe(b, 0, 0);
    });
}

function testInitialPositionIsPositionSetOnInstantiation(): void {
    test('initial position is position set on instantiation', () => {
        const b = new DynamicBezier(500, 600);
        expectXYToBe(b, 500, 600);
    });
}


function textSettingDurationDoesNotMakeBezierActive(): void {
    test('setting duration does not make bezier active', () => {
        const b = new DynamicBezier();
        b.duration(1000);
        expectNotActive(b);
    });
}

function textSettingSpeedDoesNotMakeBezierActive(): void {
    test('setting speed does not make bezier active', () => {
        const b = new DynamicBezier();
        b.speed(1);
        expectNotActive(b);
    });
}

function textSettingEaseDoesNotMakeBezierActive(): void {
    test('setting ease does not make bezier active', () => {
        const b = new DynamicBezier();
        b.ease('easeInBack');
        expectNotActive(b);
    });
}

function textSettingControlDoesNotMakeBezierActive(): void {
    test('setting control does not make bezier active', () => {
        const b = new DynamicBezier();
        b.control(1000, Math.PI / 2);
        expectNotActive(b);
    });
}

function textSettingDurationAndCallingMoveToMakesBezierActive(): void {
    test('setting duration and calling moveTo makes bezier active', () => {
        const b = new DynamicBezier();
        b.duration(1000).moveTo(1000, 2000);
        expectActive(b);
    });
}

function textSettingDurationAndCallingMoveByMakesBezierActive(): void {
    test('setting duration and calling moveBy makes bezier active', () => {
        const b = new DynamicBezier();
        b.duration(1000).moveBy(1000, 2000);
        expectActive(b);
    });
}

function textSettingSpeedAndCallingMoveToMakesBezierActive(): void {
    test('setting speed and calling moveTo makes bezier active', () => {
        const b = new DynamicBezier();
        b.speed(1).moveTo(500, 600);
        expectActive(b);
    });
}

function textSettingSpeedAndCallingMoveByMakesBezierActive(): void {
    test('setting speed and calling moveBy makes bezier active', () => {
        const b = new DynamicBezier();
        b.speed(1).moveBy(500, 600);
        expectActive(b);
    });
}

function textBezierCanBeActiveAndTurnedOff(): void {
    test('bezier can be active and turned off', () => {
        const b = new DynamicBezier();
        b.duration(1000).moveTo(100, 200);
        expectActive(b);
        b.turnOff();
        expectActive(b);
    });
}


function testDurationCannotBeSetIfBezierIsActive(): void {
    test('duration cannot be set if bezier is active', () => {
        const b = new DynamicBezier();
        expectNotActive(b);
        b.duration(1000).moveTo(200, 700);
        expectActive(b);
        b.duration(2000);
        b.update(200);
        b.update(200);
        b.update(200);
        b.update(200);
        b.update(200);
        expectNotActive(b);
    });
}

function testDurationHasNoEffectIfSetTo0(): void {
    test('duration has no effect if set to 0', () => {
        const b = new DynamicBezier();
        b.duration(0).moveTo(300, 400);
        expectNotActive(b);
        expectXYToBe(b, 300, 400);
    });
}

function testDurationHasNoEffectIfLessThan0(): void {
    test('duration has no effect if less than 0', () => {
        const b = new DynamicBezier();
        b.duration(-100).moveTo(300, 400);
        expectNotActive(b);
        expectXYToBe(b, 300, 400);
    });
}


function testSpeedCannotBeSetIfBezierIsActive(): void {
    test('speed cannot be set if bezier is active', () => {
        const b = new DynamicBezier();
        expectNotActive(b);
        b.speed(2).moveTo(600, 800); // distance 1000; duration 1000 / 2 = 500
        expectActive(b);
        b.speed(1);
        b.update(100);
        b.update(100);
        b.update(100);
        b.update(100);
        b.update(100);
        expectNotActive(b);
    });
}

function testSpeedHasNoEffectIfSetTo0(): void {
    test('speed has no effect if set to 0', () => {
        const b = new DynamicBezier();
        b.speed(0).moveTo(300, 400);
        expectNotActive(b);
        expectXYToBe(b, 300, 400);
    });
}

function testSpeedHasNoEffectIfLessThan0(): void {
    test('speed has no effect if less than 0', () => {
        const b = new DynamicBezier();
        b.speed(-1).moveTo(300, 400);
        expectNotActive(b);
        expectXYToBe(b, 300, 400);
    });
}


function testEaseCannotBeSetIfBezierIsActive(): void {
    test('ease cannot be set if bezier is active', () => {
        const b = new DynamicBezier();
        expectNotActive(b);
        b.duration(1000).moveTo(500, 600);
        expectActive(b);
        b.ease('easeInBounce');
        b.update(200);
        expectXYToBeCloseTo(b, 100, 120);
    });
}


function testControlCannotBeSetIfBezierIsActive(): void {
    test('control cannot be set if bezier is active', () => {
        const b = new DynamicBezier();
        expectNotActive(b);
        b.duration(1000).moveTo(500, 600);
        expectActive(b);
        b.control(1000, -Math.PI * 0.5);
        b.update(200);
        expectXYToBeCloseTo(b, 100, 120);
    });
}


function textMoveToHasNoEffectIfBezierIsActive(): void {
    test('moveTo has no effect if bezier is active', () => {
        const b = new DynamicBezier(100, 200);
        b.duration(1000).moveTo(300, 400);
        expectActive(b);
        expectFalse(b.moveTo(500, 600));
    });
}

function textMoveToHasNoEffectIfXAndYParamsAreCurrentValues(): void {
    test('moveTo has no effect if x and y params are current values', () => {
        const b = new DynamicBezier(10, 20);
        expectFalse(b.moveTo(10, 20));

    });
}

function textMoveToDoesChangePositionIfXOrYAreDifferentToCurrentValues(): void {
    test('moveTo does change position if x OR y are different to current values', () => {
        const b = new DynamicBezier(10, 20);
        expectTrue(b.moveTo(20, 20));
        expectTrue(b.moveTo(20, 30));
    });
}

function textMoveToMovesCurrentPositionInstantlyIfNoDurationOrSpeedSet(): void {
    test('moveTo moves current position instantly if no duration or speed set', () => {
        const b = new DynamicBezier();
        expectTrue(b.moveTo(100, 200))
        expectXYToBe(b, 100, 200);
    });
}

function textMoveToMakesBezierActiveIfDurationIsSet(): void {
    test('moveTo makes bezier active if duration is set', () => {
        const b = new DynamicBezier();
        expectTrue(b.duration(1000).moveTo(500, 700))
        expectActive(b);
    });
}

function textMoveToMakesBezierActiveIfSpeedIsSet(): void {
    test('moveTo makes bezier active if speed is set', () => {
        const b = new DynamicBezier();
        expectTrue(b.speed(2).moveTo(500, 700))
        expectActive(b);
    });
}


function textMoveByHasNoEffectIfBezierIsActive(): void {
    test('moveBy has no effect if bezier is active', () => {
        const b = new DynamicBezier();
        b.duration(1000).moveTo(200, 300);
        expectActive(b);
        expectFalse(b.moveBy(100, 200));
    });
}

function textMoveByHasNoEffectIfXAndYParamsAreCurrentValues(): void {
    test('moveBy has no effect if x and y params are 0', () => {
        const b = new DynamicBezier();
        expectFalse(b.moveBy(0, 0));
        expectNotActive(b);
    });
}

function textMoveByDoesChangePositionIfXOrYAreDifferentToCurrentValues(): void {
    test('moveBy does change position if x OR y are not 0', () => {
        const b = new DynamicBezier();
        expectTrue(b.moveBy(10, 0));
        expectTrue(b.moveBy(0, 10));
    });
}

function textMoveByMovesCurrentPositionInstantlyIfNoDurationOrSpeedSet(): void {
    test('moveBy moves current position instantly if no duration or speed set', () => {
        const b = new DynamicBezier(10, 15);
        b.moveBy(10, 10);
        expectNotActive(b);
        expectXYToBe(b, 20, 25);
    });
}

function textMoveByMakesBezierActiveIfDurationIsSet(): void {
    test('moveBy makes bezier active if duration is set', () => {
        const b = new DynamicBezier();
        b.duration(1000).moveBy(100, 200);
        expectActive(b);
    });
}

function textMoveByMakesBezierActiveIfSpeedIsSet(): void {
    test('moveBy makes bezier active if speed is set', () => {
        const b = new DynamicBezier();
        b.speed(2).moveBy(100, 200);
        expectActive(b);
    });
}

function textMoveByMovesCurrentPositionByCorrectAmount(): void {
    test('moveBy moves current position by correct amount', () => {
        const b = new DynamicBezier(10, 20);
        b.moveBy(10, 20);
        expectXYToBe(b, 20, 40);
    });
}

function textMoveByWorksWithNegativeNumbers(): void {
    test('moveBy works with negative numbers', () => {
        const b = new DynamicBezier(100, 200);
        b.moveBy(-200, -400);
        expectXYToBe(b, -100, -200);
    });
}


function testLoadReturnsTrueOnValidLoad(): void {
    test('load() returns true on valid load', () => {
        const unit = new DynamicUnit();
        const current = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const next = new Vector2D();
        const control = { distance: 0, angle: 0 };
        const b = new DynamicBezier();
        expectTrue(b.load(
            JSON.stringify({
                unit: unit.save(),
                current: current.save(),
                distanceBetween: 0,
                bezier: bezier.save(),
                next: next.save(),
                control: control,
                duration: 0,
                speed: 0,
                isOn: false
            })
        ));
    });
}

function testBehavesTheSameOnSaveAndLoad(): void {
    test('behaves the same on save and load', () => {

        const speed = 1;
        const cDistance = 800;
        const cAngle = -Math.PI / 4;
        const easeOption: Ease.tEaseOption = 'easeOutCubic';
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

        const b = new DynamicBezier(start.x, start.y);
        b.speed(speed).ease(easeOption).control(cDistance, cAngle).moveTo(end.x, end.y);
        b.load(b.save());
        expectActive(b);

        for (let i = 0; i < numSteps; i++) {
            b.update(step);
            b.load(b.save());
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expectXYToBeCloseTo(b, current.x, current.y);
        }

    });
}

function testReturnsFalseIfMissingUnitProperty(): void {
    test('load() returns false if missing "unit" property', () => {
        // const unit = new DynamicUnit();
        const current = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const next = new Vector2D();
        const control = { distance: 0, angle: 0 };
        const b = new DynamicBezier();
        expectFalse(b.load(
            JSON.stringify({
                // unit: unit.save(),
                current: current.save(),
                distanceBetween: 0,
                bezier: bezier.save(),
                next: next.save(),
                control: control,
                duration: 0,
                speed: 0,
                isOn: false
            })
        ));
    });
}

function testReturnsFalseIfMissingCurrentProperty(): void {
    test('load() returns false if missing "current" property', () => {
        const unit = new DynamicUnit();
        // const current = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const next = new Vector2D();
        const control = { distance: 0, angle: 0 };
        const b = new DynamicBezier();
        expectFalse(b.load(
            JSON.stringify({
                unit: unit.save(),
                // current: current.save(),
                distanceBetween: 0,
                bezier: bezier.save(),
                next: next.save(),
                control: control,
                duration: 0,
                speed: 0,
                isOn: false
            })
        ));
    });
}

function testReturnsFalseIfMissingDistanceBetweenProperty(): void {
    test('load() returns false if missing "distanceBetween" property', () => {
        const unit = new DynamicUnit();
        const current = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const next = new Vector2D();
        const control = { distance: 0, angle: 0 };
        const b = new DynamicBezier();
        expectFalse(b.load(
            JSON.stringify({
                unit: unit.save(),
                current: current.save(),
                // distanceBetween: 0,
                bezier: bezier.save(),
                next: next.save(),
                control: control,
                duration: 0,
                speed: 0,
                isOn: false
            })
        ));
    });
}

function testReturnsFalseIfMissingBezierProperty(): void {
    test('load() returns false if missing "bezier" property', () => {
        const unit = new DynamicUnit();
        const current = new Vector2D();
        // const bezier = new QuadraticBezierCurve();
        const next = new Vector2D();
        const control = { distance: 0, angle: 0 };
        const b = new DynamicBezier();
        expectFalse(b.load(
            JSON.stringify({
                unit: unit.save(),
                current: current.save(),
                distanceBetween: 0,
                // bezier: bezier.save(),
                next: next.save(),
                control: control,
                duration: 0,
                speed: 0,
                isOn: false
            })
        ));
    });
}

function testReturnsFalseIfMissingNextProperty(): void {
    test('load() returns false if missing "next" property', () => {
        const unit = new DynamicUnit();
        const current = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        // const next = new Vector2D();
        const control = { distance: 0, angle: 0 };
        const b = new DynamicBezier();
        expectFalse(b.load(
            JSON.stringify({
                unit: unit.save(),
                current: current.save(),
                distanceBetween: 0,
                bezier: bezier.save(),
                // next: next.save(),
                control: control,
                duration: 0,
                speed: 0,
                isOn: false
            })
        ));
    });
}

function testReturnsFalseIfMissingControlProperty(): void {
    test('load() returns false if missing "control" property', () => {
        const unit = new DynamicUnit();
        const current = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const next = new Vector2D();
        // const control = { distance: 0, angle: 0 };
        const b = new DynamicBezier();
        expectFalse(b.load(
            JSON.stringify({
                unit: unit.save(),
                current: current.save(),
                distanceBetween: 0,
                bezier: bezier.save(),
                next: next.save(),
                // control: control,
                duration: 0,
                speed: 0,
                isOn: false
            })
        ));
    });
}

function testReturnsFalseIfMissingDurationProperty(): void {
    test('load() returns false if missing "duration" property', () => {
        const unit = new DynamicUnit();
        const current = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const next = new Vector2D();
        const control = { distance: 0, angle: 0 };
        const b = new DynamicBezier();
        expectFalse(b.load(
            JSON.stringify({
                unit: unit.save(),
                current: current.save(),
                distanceBetween: 0,
                bezier: bezier.save(),
                next: next.save(),
                control: control,
                // duration: 0,
                speed: 0,
                isOn: false
            })
        ));
    });
}

function testReturnsFalseIfMissingSpeedProperty(): void {
    test('load() returns false if missing "speed" property', () => {
        const unit = new DynamicUnit();
        const current = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const next = new Vector2D();
        const control = { distance: 0, angle: 0 };
        const b = new DynamicBezier();
        expectFalse(b.load(
            JSON.stringify({
                unit: unit.save(),
                current: current.save(),
                distanceBetween: 0,
                bezier: bezier.save(),
                next: next.save(),
                control: control,
                duration: 0,
                // speed: 0,
                isOn: false
            })
        ));
    });
}

function testReturnsFalseIfMissingIsOnProperty(): void {
    test('load() returns false if missing "isOn" property', () => {
        const unit = new DynamicUnit();
        const current = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const next = new Vector2D();
        const control = { distance: 0, angle: 0 };
        const b = new DynamicBezier();
        expectFalse(b.load(
            JSON.stringify({
                unit: unit.save(),
                current: current.save(),
                distanceBetween: 0,
                bezier: bezier.save(),
                next: next.save(),
                control: control,
                duration: 0,
                speed: 0,
                // isOn: false
            })
        ));
    });
}

function testTurningUnitOnAndOffStopsAndStartsUpdate(): void {
    test('turning unit off and on stops and start update', () => {
        const b = new DynamicBezier();
        b.duration(1000).moveBy(500, 600);
        b.update(200);
        expectXYToBeCloseTo(b, 100, 120);
        b.turnOff();
        b.update(200);
        expectXYToBeCloseTo(b, 100, 120);
        b.turnOn();
        b.update(200);
        expectXYToBeCloseTo(b, 200, 240);

    });
}

function testDefaultPathIsAStraightLine(): void {
    test('default path is a straight line', () => {

        const duration = 1000;
        const start = new Vector2D(100, 200);
        const end = new Vector2D(600, 800);
        const diff = end.subtract(start);
        const bezier = new QuadraticBezierCurve();
        // bezier.setStart(start.x, start.y);
        // bezier.setEnd(end.x, end.y);
        // bezier.makeStraight();
        let elapsed = 0;
        let progress = 0;
        let current = new Vector2D();
        const numSteps = 5;
        const step = duration / numSteps;

        const b = new DynamicBezier(start.x, start.y);
        b.duration(duration).moveTo(end.x, end.y);
        expectActive(b);

        for (let i = 0; i < numSteps; i++) {
            b.update(step);
            elapsed += step;
            progress = elapsed / duration;
            current = start.add(diff.multiply(progress));
            expectXYToBeCloseTo(b, current.x, current.y);
        }

    });
}

function testPathIsCurvedIfControlIsCalled(): void {
    test('path is curved if control() is called', () => {

        const duration = 500;
        const cDistance = 800;
        const cAngle = -Math.PI / 4;
        const easeOption: Ease.tEaseOption = 'noEase';
        const easeFn = Ease.load(easeOption);
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1600, 1800);
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        bezier.setControlByDistanceAndAngleFromStart(cDistance, cAngle);
        let elapsed = 0;
        let progress = 0;
        const current = new Vector2D();
        const numSteps = 5;
        const step = duration / numSteps;

        const b = new DynamicBezier(start.x, start.y);
        b.duration(duration).control(cDistance, cAngle).moveTo(end.x, end.y);
        expectActive(b);

        for (let i = 0; i < numSteps; i++) {
            b.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expectXYToBeCloseTo(b, current.x, current.y);
        }

    });
}

function testControlPointIsResetAfterFullUpdateCycle(): void {
    test('control point is reset after full update cycle', () => {

        const duration = 500;
        const cDistance = 800;
        const cAngle = -Math.PI / 4;
        const easeOption: Ease.tEaseOption = 'noEase';
        const easeFn = Ease.load(easeOption);
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1600, 1800);
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        bezier.setControlByDistanceAndAngleFromStart(cDistance, cAngle);
        let elapsed = 0;
        let progress = 0;
        const current = new Vector2D();
        const numSteps = 5;
        const step = duration / numSteps;

        const b = new DynamicBezier(start.x, start.y);
        b.duration(duration).control(cDistance, cAngle).moveTo(end.x, end.y);
        expectActive(b);

        for (let i = 0; i < numSteps; i++) {
            b.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expectXYToBeCloseTo(b, current.x, current.y);
        }

        expectNotActive(b);

        // repeat with no control point set
        bezier.makeStraight();
        elapsed = 0;
        b.moveTo(start.x, start.y);
        expectTrue(b.duration(duration).moveTo(end.x, end.y));
        expectActive(b);

        for (let i = 0; i < numSteps; i++) {
            b.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expectXYToBeCloseTo(b, current.x, current.y);
        }

    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleWithNoEaseAndNoControlPoint(): void {
    test('returns expected values during full update cycle with no ease and no control point', () => {

        const duration = 1000;
        // const cDistance = 800;
        // const cAngle = -Math.PI / 4;
        const easeOption: Ease.tEaseOption = 'noEase';
        const easeFn = Ease.load(easeOption);
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1600, 1800);
        // const distanceBetween = end.distanceTo(start);
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        bezier.makeStraight();
        // bezier.setControlByDistanceAndAngleFromStart(cDistance, cAngle);
        let elapsed = 0;
        let progress = 0;
        const current = new Vector2D();
        const numSteps = 5;

        const step = duration / numSteps;

        const b = new DynamicBezier(start.x, start.y);
        b.duration(duration).moveTo(end.x, end.y);
        expectActive(b);

        for (let i = 0; i < numSteps; i++) {
            b.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expectXYToBeCloseTo(b, current.x, current.y);
        }

    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleWithEaseAndNoControlPoint(): void {
    test('returns expected values during full update cycle with ease and no control point', () => {

        const duration = 1000;
        // const cDistance = 800;
        // const cAngle = -Math.PI / 4;
        const easeOption: Ease.tEaseOption = 'easeInCubic';
        const easeFn = Ease.load(easeOption);
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1600, 1800);
        // const distanceBetween = end.distanceTo(start);
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        bezier.makeStraight();
        // bezier.setControlByDistanceAndAngleFromStart(cDistance, cAngle);
        let elapsed = 0;
        let progress = 0;
        const current = new Vector2D();
        const numSteps = 5;

        const step = duration / numSteps;

        const b = new DynamicBezier(start.x, start.y);
        b.duration(duration).ease(easeOption).moveTo(end.x, end.y);
        expectActive(b);

        for (let i = 0; i < numSteps; i++) {
            b.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expectXYToBeCloseTo(b, current.x, current.y);
        }

    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleWithNoEaseAndControlPoint(): void {
    test('returns expected values during full update cycle with no ease and control point', () => {

        const duration = 1000;
        const cDistance = 800;
        const cAngle = -Math.PI / 4;
        const easeOption: Ease.tEaseOption = 'noEase';
        const easeFn = Ease.load(easeOption);
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1600, 1800);
        // const distanceBetween = end.distanceTo(start);
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        // bezier.makeStraight();
        bezier.setControlByDistanceAndAngleFromStart(cDistance, cAngle);
        let elapsed = 0;
        let progress = 0;
        const current = new Vector2D();
        const numSteps = 5;

        const step = duration / numSteps;

        const b = new DynamicBezier(start.x, start.y);
        b.duration(duration).control(cDistance, cAngle).moveTo(end.x, end.y);
        expectActive(b);

        for (let i = 0; i < numSteps; i++) {
            b.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expectXYToBeCloseTo(b, current.x, current.y);
        }

    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleWithEaseAndControlPoint(): void {
    test('returns expected values during full update cycle with ease and control point', () => {

        const duration = 1000;
        const cDistance = 800;
        const cAngle = -Math.PI / 4;
        const easeOption: Ease.tEaseOption = 'easeInOutElastic';
        const easeFn = Ease.load(easeOption);
        const start = new Vector2D(100, 200);
        const end = new Vector2D(1600, 1800);
        const bezier = new QuadraticBezierCurve();
        bezier.setStart(start.x, start.y);
        bezier.setEnd(end.x, end.y);
        // bezier.makeStraight();
        bezier.setControlByDistanceAndAngleFromStart(cDistance, cAngle);
        let elapsed = 0;
        let progress = 0;
        const current = new Vector2D();
        const numSteps = 5;

        const step = duration / numSteps;

        const b = new DynamicBezier(start.x, start.y);
        b.duration(duration).ease(easeOption).control(cDistance, cAngle).moveTo(end.x, end.y);
        expectActive(b);

        for (let i = 0; i < numSteps; i++) {
            b.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expectXYToBeCloseTo(b, current.x, current.y);
        }

    });
}

function testReturnsExpectedValuesDuringFullUpdateCycleWithEaseAndControlPointAndSpeedSetting(): void {
    test('returns expected values during full update cycle with ease and control point and speed set', () => {

        const speed = 1;
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

        const b = new DynamicBezier(start.x, start.y);
        b.speed(speed).ease(easeOption).control(cDistance, cAngle).moveTo(end.x, end.y);
        expectActive(b);

        for (let i = 0; i < numSteps; i++) {
            b.update(step);
            elapsed += step;
            progress = easeFn(elapsed / duration);
            current.setX(bezier.x(progress));
            current.setY(bezier.y(progress));
            expectXYToBeCloseTo(b, current.x, current.y);
        }

    });
}




/**
 * Utilities
 */

function expectActive(b: DynamicBezier): void {
    expect(b.isActive).toBeTruthy();
}

function expectNotActive(b: DynamicBezier): void {
    expect(b.isActive).not.toBeTruthy();
}

function expectXToBe(b: DynamicBezier, x: number): void {
    expect(b.x).toBe(x);
}

function expectYToBe(b: DynamicBezier, y: number): void {
    expect(b.y).toBe(y);
}

function expectXYToBe(b: DynamicBezier, x: number, y: number): void {
    expectXToBe(b, x);
    expectYToBe(b, y);
}

function expectXToBeCloseTo(b: DynamicBezier, x: number): void {
    expect(b.x).toBeCloseTo(x);
}

function expectYToBeCloseTo(b: DynamicBezier, y: number): void {
    expect(b.y).toBeCloseTo(y);
}

function expectXYToBeCloseTo(b: DynamicBezier, x: number, y: number): void {
    expectXToBeCloseTo(b, x);
    expectYToBeCloseTo(b, y);
}

function expectTrue(expression: boolean): void {
    expect(expression).toBeTruthy();
}

function expectFalse(expression: boolean): void {
    expect(expression).not.toBeTruthy();
}