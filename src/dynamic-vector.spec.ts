/**
 * 
 */

import { Vector2D } from "@brendangooch/maths";
import { DynamicUnit } from "./dynamic-unit.js";
import { DynamicVector } from "./dynamic-vector.js";
import * as Ease from '@brendangooch/ease';

testAll();
function testAll(): void {
    describe('DynamicVector', () => {

        // public get isActive(): boolean
        testStartsInactive();
        testDoesNotBecomeActiveOnceDurationIsSet();
        testDoesNotBecomeActiveOnceSpeedIsSet();
        testBecomesActiveOnceValidDurationIsSEtAndMoveToCalled();
        testBecomesActiveOnceValidDurationIsSetAndMoveByIsCalled();
        testBecomesActiveOnceValidSpeedIsSetAndMoveToIsCalled();
        testBecomesActiveOnceValidSpeedIsSetAndMoveByIsCalled();
        testBecomesInactiveOnceDurationHasElapsed();
        testCanBeActiveWhetherOnOrOff();

        // public get x() / get y(): number
        testInitialCurrentXYValuesAre0IfNotSetOnInstantiation();
        testInitialCurrentXYValuesAreValuesSetOnInstantiation();
        testXYAreTheSameWhetherUnitIsOnOrOff();

        // public duration(ms: number): DynamicNumber
        testDurationCanOnlyBeSetIfNotActive();
        testDurationMustBeGreaterThan0ToHaveAnEffect();

        // public speed(units: number): DynamicVector
        testSpeedCanOnlyBeSetIfNotActive();
        testSpeedMustBeGreaterThan0ToHaveAnEffect();

        // public ease(easeOption: tEaseOption): DynamicUnit
        testEaseCanOnlyBeSetIfNotActive();
        testEaseIsResetAfterDurationHasElapsed();

        // public moveTo(x: number, y: number): boolean
        testMoveToPositionCanOnlyBeChangedIfNotActive();
        testMoveToDoesNothingIfSetToCurentXYValues();
        testMoveToCANChangeIfXisDifferentAndYIsTheSame();
        testMoveToCANChangeIfYisDifferentAndXIsTheSame();
        testIfDurationIsNotSetMoveToChangesCurrentXYValuesImmediately();
        testIfDurationIsSetMoveToMAkesVectorActiveAndChangesXYValuesDynamicallyOverTime();

        // public moveBy(x: number, y: number): boolean
        testMoveByPositionCanOnlyBeChangedIfNotActive();
        testMoveByDoesNothingIfXAndYAre0();
        testMoveByCanChangeXIfXIsNot0AndYIs0();
        testMoveByCanChangeYIfYIsNot0AndXIs0();
        testIfDurationIsNotSetMoveByChangesCurrentXYValuesImmediately();
        testIfDurationIsSetMoveByMakesVectorActiveAndChangesXYValuesOverTime();
        testMoveByChangesXYValuesBCorrectAmount();

        // public turnOn(): void
        // public turnOff(): void
        testTurningOffAndOnStopsAndStartsUpdate();

        // public update(ms: number): void
        testDoesNotUpdateIfNotActive();
        testDoesNotUpdateIfNotTurnedOn();
        testUpdatesIfActiveAndTurnedOnAndDurationGreaterThan0();

        // public load(json: string): boolean
        // public save(): string
        testCanBeSavedWhetherTurnedOnOrOff();
        testBehavesTheSameAfterSaveAndLoad();
        testLoadReturnsTrueOnValidLoad();
        testLoadReturnsFalseIfUnitPropertyMissing();
        testLoadReturnsFalseIfPreviousPropertyMissing();
        testLoadReturnsFalseIfNextPropertyMissing();
        testLoadReturnsFalseIfCurrentPropertyMissing();
        testLoadReturnsFalseIfDifferencePropertyMissing();
        testLoadReturnsFalseIfDurationPropertyMissing();
        testLoadReturnsFalseIfSpeedPropertyMissing();
        testLoadReturnsFalseIfIsOnPropertyMissing();

        // general behaviour
        testReturnsExpectdCurrentValuesDuringFullDuration();
        testReturnsExpectdCurrentValuesDuringFullDurationWhenSpeedIsSet();
        testReturnsExpectdCurrentValuesDuringFullDurationWithEaseApplied();
        testWorksWithPositiveXToHigherX();
        testWorksWithPositiveXToLowerX();
        testWorksWithNegativeXToHigherX();
        testWorksWithNegativeXToLowerX();
        testWorksWithPositiveYToHigherY();
        testWorksWithPositiveYToLowerY();
        testWorksWithNegativeYToHigherY();
        testWorksWithNegativeYToLowerY();

    });

}


function testStartsInactive(): void {
    test('starts inactive', () => {
        const v = new DynamicVector();
        expect(v.isActive).not.toBeTruthy();
    });
}

function testDoesNotBecomeActiveOnceDurationIsSet(): void {
    test('does not become active once duration is set', () => {
        const v = new DynamicVector();
        v.duration(1000);
        expect(v.isActive).not.toBeTruthy();
    });
}

function testDoesNotBecomeActiveOnceSpeedIsSet(): void {
    test('does not become active once speed is set', () => {
        const v = new DynamicVector();
        v.speed(1);
        expect(v.isActive).not.toBeTruthy();
    });
}

function testBecomesActiveOnceValidDurationIsSEtAndMoveToCalled(): void {
    test('becomes active once valid duration is set and moveTo() is called', () => {
        const v = new DynamicVector();
        v.duration(1000).moveTo(10, 20);
        expect(v.isActive).toBeTruthy();
    });
}

function testBecomesActiveOnceValidDurationIsSetAndMoveByIsCalled(): void {
    test('becomes active once valid duration is set and moveBy() is called', () => {
        const v = new DynamicVector();
        v.duration(1000).moveBy(10, 20);
        expect(v.isActive).toBeTruthy();
    });
}

function testBecomesActiveOnceValidSpeedIsSetAndMoveToIsCalled(): void {
    test('becomes active once valid speed is set and moveTo() is called', () => {
        const v = new DynamicVector();
        v.speed(1).moveTo(10, 20);
        expect(v.isActive).toBeTruthy();
    });
}

function testBecomesActiveOnceValidSpeedIsSetAndMoveByIsCalled(): void {
    test('becomes active once valid speed is set and moveBy() is called', () => {
        const v = new DynamicVector();
        v.speed(1).moveBy(10, 20);
        expect(v.isActive).toBeTruthy();
    });
}

function testBecomesInactiveOnceDurationHasElapsed(): void {
    test('becomes inactive once duration has elapsed', () => {
        const v = new DynamicVector();
        v.duration(1000).moveTo(10, 20);
        expect(v.isActive).toBeTruthy();
        v.update(200);
        v.update(200);
        v.update(200);
        v.update(200);
        v.update(200);
        expect(v.isActive).not.toBeTruthy();
    });
}

function testCanBeActiveWhetherOnOrOff(): void {
    test('can be active whether on or off', () => {
        const v = new DynamicVector();
        v.duration(1000).moveTo(10, 400);
        expect(v.isActive).toBeTruthy();
        v.turnOff();
        expect(v.isActive).toBeTruthy();
    });
}


function testInitialCurrentXYValuesAre0IfNotSetOnInstantiation(): void {
    test('initial current x y values are 0 if not set on instantiation', () => {
        const v = new DynamicVector();
        expect(v.x).toBe(0);
        expect(v.y).toBe(0);
    });
}

function testInitialCurrentXYValuesAreValuesSetOnInstantiation(): void {
    test('initial current x y values are values set on instantiation', () => {
        const v = new DynamicVector(100, 200);
        expect(v.x).toBe(100);
        expect(v.y).toBe(200);
    });
}

function testXYAreTheSameWhetherUnitIsOnOrOff(): void {
    test('x y are the same value whether unit is on or off', () => {
        const v = new DynamicVector(10, 20);
        expect(v.x).toBe(10);
        expect(v.y).toBe(20);
        v.turnOff();
        expect(v.x).toBe(10);
        expect(v.y).toBe(20);
    });
}


function testDurationCanOnlyBeSetIfNotActive(): void {
    test('duration can only be set if not active', () => {
        const v = new DynamicVector();
        expect(v.isActive).not.toBeTruthy();
        v.duration(1000).moveTo(500, 500);
        expect(v.isActive).toBeTruthy();
        v.duration(2000).moveTo(800, 800);
        v.update(200);
        expect(v.x).not.toBe(80);
        expect(v.y).not.toBe(80);
        expect(v.x).toBe(100);
        expect(v.y).toBe(100);
    });
}

function testDurationMustBeGreaterThan0ToHaveAnEffect(): void {
    test('duration must be greater than 0 to have an effect', () => {
        const v = new DynamicVector();
        v.duration(0).moveTo(10, 10);
        expect(v.isActive).not.toBeTruthy();
        v.duration(-1).moveTo(20, 20);
        expect(v.isActive).not.toBeTruthy();
    });
}


function testSpeedCanOnlyBeSetIfNotActive(): void {
    test('speed can only be set if not active', () => {
        const v = new DynamicVector();
        expect(v.isActive).not.toBeTruthy();
        v.speed(1).moveTo(300, 400); // distance = 500; duration = 500
        expect(v.isActive).toBeTruthy();
        v.speed(2); // ineffective
        v.update(100); // 20%
        expect(v.x).toBeCloseTo(60);
        expect(v.y).toBeCloseTo(80);
    });
}

function testSpeedMustBeGreaterThan0ToHaveAnEffect(): void {
    test('speed must be greater than 0 to have an effect', () => {
        const v = new DynamicVector();
        v.speed(0).moveTo(200, 200);
        expect(v.isActive).not.toBeTruthy();
        v.speed(-10).moveTo(400, 400);
        expect(v.isActive).not.toBeTruthy();
    });
}


function testEaseCanOnlyBeSetIfNotActive(): void {
    test('ease can only be set if not active', () => {
        const v = new DynamicVector();
        expect(v.isActive).not.toBeTruthy();
        v.duration(1000).ease('easeInQuad').moveTo(1000, 1000);
        expect(v.isActive).toBeTruthy();
        v.ease('easeInCubic'); // ineffective
        v.update(200) // 20%
        expect(v.x).not.toBeCloseTo((1000 * Math.pow(0.2, 3)));
        expect(v.y).not.toBeCloseTo((1000 * Math.pow(0.2, 3)));
        expect(v.x).toBeCloseTo((1000 * Math.pow(0.2, 2)));
        expect(v.y).toBeCloseTo((1000 * Math.pow(0.2, 2)));
    });
}

function testEaseIsResetAfterDurationHasElapsed(): void {
    test('ease is reset after duration has elapsed', () => {
        const v = new DynamicVector();
        v.duration(1000).ease('easeInQuad').moveTo(500, 500);
        v.update(200);
        v.update(200);
        v.update(200);
        v.update(200);
        v.update(200);
        v.duration(1000).moveTo(1000, 1000);
        v.update(200);
        expect(v.x).not.toBeCloseTo(500 * Math.pow(0.2, 2));
        expect(v.y).not.toBeCloseTo(500 * Math.pow(0.2, 2));
        expect(v.x).toBeCloseTo(600);
        expect(v.y).toBeCloseTo(600);
    });
}


function testMoveToPositionCanOnlyBeChangedIfNotActive(): void {
    test('moveTo() position can only be changed if not active', () => {
        const v = new DynamicVector();
        expect(v.isActive).not.toBeTruthy();
        v.duration(1000).moveTo(100, 200);
        expect(v.isActive).toBeTruthy();
        v.moveTo(-100, -200);
        expect(v.x).not.toBe(-100);
        expect(v.y).not.toBe(-200);
    });
}

function testMoveToDoesNothingIfSetToCurentXYValues(): void {
    test('moveTo() does nothing if set to current x/y values', () => {
        const v = new DynamicVector(100, 200);
        v.duration(1000).moveTo(100, 200);
        v.update(200);
        expect(v.x).toBe(100);
        expect(v.y).toBe(200);
    });
}

function testMoveToCANChangeIfXisDifferentAndYIsTheSame(): void {
    test('moveTo() CAN change if x is different and y is the same', () => {
        const v = new DynamicVector(10, 20);
        v.moveTo(20, 20);
        expect(v.x).toBe(20);
        expect(v.y).toBe(20);
    });
}

function testMoveToCANChangeIfYisDifferentAndXIsTheSame(): void {
    test('changeTo() CAN change if y is different and x is the same', () => {
        const v = new DynamicVector(20, 10);
        v.moveTo(20, 20);
        expect(v.x).toBe(20);
        expect(v.y).toBe(20);
    });
}

function testIfDurationIsNotSetMoveToChangesCurrentXYValuesImmediately(): void {
    test('if duration is not set, moveTo() changes current x/y values immediately', () => {
        const v = new DynamicVector();
        v.moveTo(50, 60);
        expect(v.isActive).not.toBeTruthy();
        expect(v.x).toBe(50);
        expect(v.y).toBe(60);
    });
}

function testIfDurationIsSetMoveToMAkesVectorActiveAndChangesXYValuesDynamicallyOverTime(): void {
    test('if duration is set, changeTo makes vector active and changes x/y values dynamically over time', () => {
        const v = new DynamicVector(10, 20);
        v.duration(1000).moveTo(50, 60);
        expect(v.isActive).toBeTruthy();
        expect(v.x).toBe(10);
        expect(v.y).toBe(20);
        v.update(200);
        expect(v.x).toBeCloseTo(18);
        expect(v.y).toBeCloseTo(28);
    });
}


function testMoveByPositionCanOnlyBeChangedIfNotActive(): void {
    test('moveBy() position can only be changed if not active', () => {
        const v = new DynamicVector(50, 100);
        expect(v.isActive).not.toBeTruthy();
        v.duration(1000).moveBy(100, 200);
        expect(v.isActive).toBeTruthy();
        v.moveBy(200, 400);
        expect(v.x).toBe(50);
        expect(v.y).toBe(100);
        v.update(200);
        expect(v.x).toBeCloseTo(70);
        expect(v.y).toBeCloseTo(140);
    });
}

function testMoveByDoesNothingIfXAndYAre0(): void {
    test('moveBy() does nothing if x & y are 0', () => {
        const v = new DynamicVector(10, 20);
        v.duration(1000).moveBy(0, 0);
        expect(v.isActive).not.toBeTruthy();

    });
}

function testMoveByCanChangeXIfXIsNot0AndYIs0(): void {
    test('moveBy() CAN change x if x is not 0 and y is 0', () => {
        const v = new DynamicVector(10, 0);
        v.moveBy(10, 0);
        expect(v.x).toBe(20);
        expect(v.y).toBe(0);
    });
}

function testMoveByCanChangeYIfYIsNot0AndXIs0(): void {
    test('moveBy() CAN change y if y is not 0 and x is 0', () => {
        const v = new DynamicVector(0, 10);
        v.moveBy(0, 10);
        expect(v.x).toBe(0);
        expect(v.y).toBe(20);
    });
}

function testIfDurationIsNotSetMoveByChangesCurrentXYValuesImmediately(): void {
    test('if duration is not set, moveBy()  changes current x/y values immediately', () => {
        const v = new DynamicVector(200, 100);
        v.moveBy(200, 100);
        expect(v.x).toBe(400);
        expect(v.y).toBe(200);
    });
}

function testIfDurationIsSetMoveByMakesVectorActiveAndChangesXYValuesOverTime(): void {
    test('if duration is set, moveBy() makes vector active and changes x/y values dynamically over time', () => {
        const v = new DynamicVector(200, 100);
        v.duration(1000).moveBy(100, 200);
        v.update(200);
        expect(v.x).toBeCloseTo(220);
        expect(v.y).toBeCloseTo(140);
    });
}

function testMoveByChangesXYValuesBCorrectAmount(): void {
    test('changeBy() changes x y values by correct amount', () => {
        const v = new DynamicVector(100, 500);
        v.moveBy(200, 1000);
        expect(v.x).toBe(300);
        expect(v.y).toBe(1500);
    });
}


function testTurningOffAndOnStopsAndStartsUpdate(): void {
    test('turning off and on stops and starts update', () => {
        const v = new DynamicVector();
        v.duration(1000).moveTo(500, 600);
        v.update(200);
        expect(v.x).toBeCloseTo(100);
        expect(v.y).toBeCloseTo(120);
        v.turnOff();
        v.update(200);
        expect(v.x).toBeCloseTo(100);
        expect(v.y).toBeCloseTo(120);
        v.turnOn();
        v.update(200);
        expect(v.x).toBeCloseTo(200);
        expect(v.y).toBeCloseTo(240);
    });
}


function testDoesNotUpdateIfNotActive(): void {
    test('does not update if not active', () => {
        const v = new DynamicVector(100, 200);

        expect(v.isActive).not.toBeTruthy();
        v.update(200);
        expect(v.isActive).not.toBeTruthy();
        expect(v.x).toBe(100);
        expect(v.y).toBe(200);

        v.moveTo(500, 600);
        expect(v.isActive).not.toBeTruthy();
        v.update(200);
        expect(v.x).toBe(500);
        expect(v.y).toBe(600);

        v.duration(1000).moveTo(200, 300);
        expect(v.isActive).toBeTruthy();
        v.update(200);
        expect(v.x).toBeCloseTo(440);
        expect(v.y).toBeCloseTo(540);
    });
}

function testDoesNotUpdateIfNotTurnedOn(): void {
    test('does not update if turned off', () => {
        const v = new DynamicVector(50, 100);
        v.duration(1000).moveBy(100, 100);
        v.turnOff();
        v.update(200);
        expect(v.x).toBe(50);
        expect(v.y).toBe(100);
    });
}

function testUpdatesIfActiveAndTurnedOnAndDurationGreaterThan0(): void {
    test('updates if active and turned on and duration is greater than 0', () => {
        const v = new DynamicVector();
        v.duration(1000).moveTo(1000, 1000);
        expect(v.x).toBe(0);
        expect(v.y).toBe(0);
        v.update(200);
        expect(v.x).toBeCloseTo(200);
        expect(v.y).toBeCloseTo(200);
    });
}


function testCanBeSavedWhetherTurnedOnOrOff(): void {
    test('can be saved whether turned on or off', () => {
        const v = new DynamicVector();
        v.speed(2).moveBy(1000, 1200);
        v.update(300);
        const beforeX = v.x;
        const beforeY = v.y;
        v.turnOff();
        v.load(v.save()); // <--
        expect(v.x).toBe(beforeX);
        expect(v.y).toBe(beforeY);
    });
}

function testBehavesTheSameAfterSaveAndLoad(): void {
    test('behaves the same after save and load', () => {

        let v: DynamicVector;

        v = new DynamicVector(100, 100);
        expect(v.isActive).not.toBeTruthy();
        v.duration(1000).moveBy(500, 600);
        expect(v.isActive).toBeTruthy();
        v.update(200);
        expect(v.x).toBeCloseTo(200);
        expect(v.y).toBeCloseTo(220);
        v.update(200);
        expect(v.x).toBeCloseTo(300);
        expect(v.y).toBeCloseTo(340);
        v.update(200);
        expect(v.x).toBeCloseTo(400);
        expect(v.y).toBeCloseTo(460);
        v.update(200);
        expect(v.x).toBeCloseTo(500);
        expect(v.y).toBeCloseTo(580);
        v.update(200);
        expect(v.x).toBe(600);
        expect(v.y).toBeCloseTo(700);

        v = new DynamicVector(100, 100);
        v.load(v.save()); // <--
        expect(v.isActive).not.toBeTruthy();
        v.duration(1000).moveBy(500, 600);
        v.load(v.save()); // <--
        expect(v.isActive).toBeTruthy();
        v.update(200);
        v.load(v.save()); // <--
        expect(v.x).toBeCloseTo(200);
        expect(v.y).toBeCloseTo(220);
        v.update(200);
        v.load(v.save()); // <--
        expect(v.x).toBeCloseTo(300);
        expect(v.y).toBeCloseTo(340);
        v.update(200);
        v.load(v.save()); // <--
        expect(v.x).toBeCloseTo(400);
        expect(v.y).toBeCloseTo(460);
        v.update(200);
        v.load(v.save()); // <--
        expect(v.x).toBeCloseTo(500);
        expect(v.y).toBeCloseTo(580);
        v.update(200);
        v.load(v.save()); // <--
        expect(v.x).toBe(600);
        expect(v.y).toBeCloseTo(700);

    });
}

function testLoadReturnsTrueOnValidLoad(): void {
    test('load returns true on valid load', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const current = new Vector2D();
        const difference = new Vector2D();
        const v = new DynamicVector();
        expect(
            v.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    current: current.save(),
                    difference: difference.save(),
                    duration: 0,
                    speed: 0,
                    isOn: true
                })
            )
        ).toBeTruthy();
    });
}

function testLoadReturnsFalseIfUnitPropertyMissing(): void {
    test('load returns false if "unit" property missing', () => {
        // const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const current = new Vector2D();
        const difference = new Vector2D();
        const v = new DynamicVector();
        expect(
            v.load(
                JSON.stringify({
                    // unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    current: current.save(),
                    difference: difference.save(),
                    duration: 0,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfPreviousPropertyMissing(): void {
    test('load returns false if "previous" property missing', () => {
        const unit = new DynamicUnit();
        // const previous = new Vector2D();
        const next = new Vector2D();
        const current = new Vector2D();
        const difference = new Vector2D();
        const v = new DynamicVector();
        expect(
            v.load(
                JSON.stringify({
                    unit: unit.save(),
                    // previous: previous.save(),
                    next: next.save(),
                    current: current.save(),
                    difference: difference.save(),
                    duration: 0,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfNextPropertyMissing(): void {
    test('load returns false if "next" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        // const next = new Vector2D();
        const current = new Vector2D();
        const difference = new Vector2D();
        const v = new DynamicVector();
        expect(
            v.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    // next: next.save(),
                    current: current.save(),
                    difference: difference.save(),
                    duration: 0,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfCurrentPropertyMissing(): void {
    test('load returns false if "current" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        // const current = new Vector2D();
        const difference = new Vector2D();
        const v = new DynamicVector();
        expect(
            v.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    // current: current.save(),
                    difference: difference.save(),
                    duration: 0,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfDifferencePropertyMissing(): void {
    test('load returns false if "difference" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const current = new Vector2D();
        // const difference = new Vector2D();
        const v = new DynamicVector();
        expect(
            v.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    current: current.save(),
                    // difference: difference.save(),
                    duration: 0,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfDurationPropertyMissing(): void {
    test('load returns false if "duration" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const current = new Vector2D();
        const difference = new Vector2D();
        const v = new DynamicVector();
        expect(
            v.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    current: current.save(),
                    difference: difference.save(),
                    // duration: 0,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfSpeedPropertyMissing(): void {
    test('load returns false if "speed" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const current = new Vector2D();
        const difference = new Vector2D();
        const v = new DynamicVector();
        expect(
            v.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    current: current.save(),
                    difference: difference.save(),
                    duration: 0,
                    // speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfIsOnPropertyMissing(): void {
    test('load returns false if "isOn" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const current = new Vector2D();
        const difference = new Vector2D();
        const v = new DynamicVector();
        expect(
            v.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    current: current.save(),
                    difference: difference.save(),
                    duration: 0,
                    speed: 0,
                    // isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}


function testReturnsExpectdCurrentValuesDuringFullDuration(): void {
    test('returns expected current values during full duration', () => {
        const v = new DynamicVector(100, 200);
        v.duration(1000).moveTo(500, 800);
        expect(v.x).toBe(100);
        expect(v.y).toBe(200);
        v.update(200);
        expect(v.x).toBeCloseTo(180);
        expect(v.y).toBeCloseTo(320);
        v.update(200);
        expect(v.x).toBeCloseTo(260);
        expect(v.y).toBeCloseTo(440);
        v.update(200);
        expect(v.x).toBeCloseTo(340);
        expect(v.y).toBeCloseTo(560);
        v.update(200);
        expect(v.x).toBeCloseTo(420);
        expect(v.y).toBeCloseTo(680);
        v.update(200);
        expect(v.x).toBe(500);
        expect(v.y).toBe(800);
    });
}

function testReturnsExpectdCurrentValuesDuringFullDurationWhenSpeedIsSet(): void {
    test('returns expected current values during full duration when speed is set', () => {
        const start = new Vector2D(100, 300);
        const end = new Vector2D(2000, 3000);
        const diff = end.subtract(start);
        let current: Vector2D;
        const distance = start.distanceTo(end);
        const speed = 2.5;
        const duration = distance / speed;
        const step = duration / 5;
        const v = new DynamicVector(start.x, start.y);
        v.speed(speed).moveTo(end.x, end.y);
        v.update(step); // 20%
        current = start.add(diff.multiply(0.2));
        expect(v.x).toBeCloseTo(current.x);
        expect(v.y).toBeCloseTo(current.y);
        v.update(step); // 40%
        current = start.add(diff.multiply(0.4));
        expect(v.x).toBeCloseTo(current.x);
        expect(v.y).toBeCloseTo(current.y);
        v.update(step); // 60%
        current = start.add(diff.multiply(0.6));
        expect(v.x).toBeCloseTo(current.x);
        expect(v.y).toBeCloseTo(current.y);
        v.update(step); // 80%
        current = start.add(diff.multiply(0.8));
        expect(v.x).toBeCloseTo(current.x);
        expect(v.y).toBeCloseTo(current.y);
        v.update(distance / 5); // 100%
        expect(v.x).toBe(end.x);
        expect(v.y).toBe(end.y);
    });
}

function testReturnsExpectdCurrentValuesDuringFullDurationWithEaseApplied(): void {
    test('returns expected current values during full duration with ease applied', () => {
        const previous = new Vector2D(500, 600);
        const next = new Vector2D(1000, 2000);
        const diff = next.subtract(previous);
        let current: Vector2D;
        const easeOption: Ease.tEaseOption = 'easeInOutCirc';
        const easeFn = Ease.load(easeOption);
        const duration = 1000;
        const step = duration / 5;
        let progress: number;
        const v = new DynamicVector(previous.x, previous.y);
        v.duration(duration).ease(easeOption).moveTo(next.x, next.y);
        v.update(step);
        progress = easeFn(step / duration);
        current = previous.add(diff.multiply(progress));
        expect(v.x).toBeCloseTo(current.x);
        expect(v.y).toBeCloseTo(current.y);
        v.update(step);
        progress = easeFn((step * 2) / duration);
        current = previous.add(diff.multiply(progress));
        expect(v.x).toBeCloseTo(current.x);
        expect(v.y).toBeCloseTo(current.y);
        v.update(step);
        progress = easeFn((step * 3) / duration);
        current = previous.add(diff.multiply(progress));
        expect(v.x).toBeCloseTo(current.x);
        expect(v.y).toBeCloseTo(current.y);
        v.update(step);
        progress = easeFn((step * 4) / duration);
        current = previous.add(diff.multiply(progress));
        expect(v.x).toBeCloseTo(current.x);
        expect(v.y).toBeCloseTo(current.y);
        v.update(step);
        expect(v.x).toBe(next.x);
        expect(v.y).toBe(next.y);
    });
}

function testWorksWithPositiveXToHigherX(): void {
    test('works with positive x to higher x', () => {
        const v = new DynamicVector(100, 50);
        v.duration(1000).moveTo(200, 50);
        v.update(200);
        expect(v.x).toBeCloseTo(120);
        expect(v.y).toBeCloseTo(50);
    });
}

function testWorksWithPositiveXToLowerX(): void {
    test('works with positive x to lower x', () => {
        const v = new DynamicVector(100, 50);
        v.duration(1000).moveTo(50, 50);
        v.update(200);
        expect(v.x).toBeCloseTo(90);
        expect(v.y).toBeCloseTo(50);
    });
}

function testWorksWithNegativeXToHigherX(): void {
    test('works with negative x to higher x', () => {
        const v = new DynamicVector(-100, 50);
        v.duration(1000).moveTo(100, 50);
        v.update(200);
        expect(v.x).toBeCloseTo(-60);
        expect(v.y).toBeCloseTo(50);
    });
}

function testWorksWithNegativeXToLowerX(): void {
    test('works with negative x to lower x', () => {
        const v = new DynamicVector(-100, 50);
        v.duration(1000).moveTo(-200, 50);
        v.update(200);
        expect(v.x).toBeCloseTo(-120);
        expect(v.y).toBeCloseTo(50);
    });
}

function testWorksWithPositiveYToHigherY(): void {
    test('works with positive y to higher y', () => {
        const v = new DynamicVector(50, 50);
        v.duration(1000).moveTo(50, 100);
        v.update(200);
        expect(v.x).toBeCloseTo(50);
        expect(v.y).toBeCloseTo(60);
    });
}

function testWorksWithPositiveYToLowerY(): void {
    test('works with positive y to lower y', () => {
        const v = new DynamicVector(50, 100);
        v.duration(1000).moveTo(50, 50);
        v.update(200);
        expect(v.x).toBeCloseTo(50);
        expect(v.y).toBeCloseTo(90);
    });
}

function testWorksWithNegativeYToHigherY(): void {
    test('works with negative y to higher y', () => {
        const v = new DynamicVector(50, -50);
        v.duration(1000).moveTo(50, 50);
        v.update(200);
        expect(v.x).toBeCloseTo(50);
        expect(v.y).toBeCloseTo(-30);
    });
}

function testWorksWithNegativeYToLowerY(): void {
    test('works with negative y to higher y', () => {
        const v = new DynamicVector(50, -50);
        v.duration(1000).moveTo(50, -100);
        v.update(200);
        expect(v.x).toBeCloseTo(50);
        expect(v.y).toBeCloseTo(-60);
    });
}