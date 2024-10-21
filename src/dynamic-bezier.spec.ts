/**
 * 
 */

import { QuadraticBezierCurve, Vector2D } from "@brendangooch/maths";
import { DynamicBezier } from "./dynamic-bezier.js";
import { DynamicUnit } from "./dynamic-unit.js";

testAll();
function testAll(): void {
    describe('DynamicBezier', () => {

        // public get isActive(): boolean
        testStartsInactive();
        testDoesNotBecomeActiveOnceDurationIsSet();
        testDoesNotBecomeActiveOnceSpeedIsSet();
        testDoesNotBecomeActiveOnceControlIsSet();
        testDoesNotBecomeActiveOnceControlDistanceIsSet();
        testDoesNotBecomeActiveOnceControlAngleIsSet();
        testBecomesActiveOnceValidDurationIsSetAndMoveToCalled();
        testBecomesActiveOnceValidDurationIsSetAndMoveByIsCalled();
        testBecomesActiveOnceValidSpeedIsSetAndMoveToIsCalled();
        testBecomesActiveOnceValidSpeedIsSetAndMoveByIsCalled();
        testBecomesInactiveOnceDurationHasElapsed();
        testCanBeActiveWhetherOnOrOff();

        // public get x() / get y(): number
        testInitialCurrentXYValuesAre0IfNotSetOnInstantiation();
        testInitialCurrentXYValuesAreValuesSetOnInstantiation();
        testXYAreTheSameWhetherUnitIsOnOrOff();

        // public duration(ms: number): DynamicBezier
        testDurationCanOnlyBeSetIfNotActive();
        testDurationMustBeGreaterThan0ToHaveAnEffect();

        // public speed(units: number): DynamicBezier
        testSpeedCanOnlyBeSetIfNotActive();
        testSpeedMustBeGreaterThan0ToHaveAnEffect();

        // public ease(easeOption: tEaseOption): DynamicBezier
        testEaseCanOnlyBeSetIfNotActive();
        testEaseIsResetAfterDurationHasElapsed();

        // public control(x: number, y: number): DynamicBezier
        testControlCanOnlyBeSetIfNotActive();
        testControlReplacesDistanceAndAngle();
        testInstantMoveResetsControlSetting();

        // public distance(distance: number): DynamicBezier
        testDistanceCanOnlyBeSetIfNotActive();
        testDistanceReplacesControlVector();
        testInstantMoveResetsDistanceSetting();

        // public angle(angle: number): DynamicBezier
        testAngleCanOnlyBeSetIfNotActive();
        testAngleReplacesControlVector();
        testInstantMoveResetsAngleSetting();

        // public moveTo(x: number, y: number): boolean
        testMoveToPositionCanOnlyBeChangedIfNotActive();
        testMoveToDoesNothingIfSetToCurentXYValues();
        testMoveToCANChangeIfXisDifferentAndYIsTheSame();
        testMoveToCANChangeIfYisDifferentAndXIsTheSame();
        testIfDurationIsNotSetMoveToChangesCurrentXYValuesImmediately();
        testIfDurationIsSetMoveToMakesVectorActiveAndChangesXYValuesDynamicallyOverTime();

        // public moveBy(x: number, y: number): boolean
        testMoveByPositionCanOnlyBeChangedIfNotActive();
        testMoveByDoesNothingIfXAndYAre0();
        testMoveByCanChangeXIfXIsNot0AndYIs0();
        testMoveByCanChangeYIfYIsNot0AndXIs0();
        testIfDurationIsNotSetMoveByChangesCurrentXYValuesImmediately();
        testIfDurationIsSetMoveByMakesBezierActiveAndChangesXYValuesOverTime();
        testMoveByChangesXYValuesByCorrectAmount();

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
        testLoadReturnsFalseIfUnitMissing();
        testLoadReturnsFalseIfPreviousMissing();
        testLoadReturnsFalseIfNextMissing();
        testLoadReturnsFalseIfDifferenceMissing();
        testLoadReturnsFalseIfCurrentMissing();
        testLoadReturnsFalseIfControlMissing();
        testLoadReturnsFalseIfDistanceMissing();
        testLoadReturnsFalseIfAngleMissing();
        testLoadReturnsFalseIfBezierMissing();
        testLoadReturnsFalseIfDurationMissing();
        testLoadReturnsFalseIfSpeedMissing();
        testLoadReturnsFalseIfIsOnPropertyMissing();

        // general behaviour
        testWorksWithNegativeValues();
        testPathIsStraightIfControlPointNotSet();
        testPathIsCurvedIfControlPointIsSet();
        testDistanceAndControlMustBothBeSetToAffectControlPoint();
        testReturnsExpectedCurrentValuesDuringFullDurationWhenControlPointAdded();
        testReturnsExpectedCurrentValuesDuringFullDurationWhenControlPointDistanceAngleAdded();
        testReturnsExpectedCurrentValuesDuringFullDurationWhenControlPointNotAdded();
        testReturnsExpectedCurrentValuesDuringFullDurationWhenSpeedIsSet();
        testReturnsExpectedCurrentValuesDuringFullDurationWithEaseApplied();

    });

}


function testStartsInactive(): void {
    test('starts inactive', () => {
        const bezier = new DynamicBezier();
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testDoesNotBecomeActiveOnceDurationIsSet(): void {
    test('does not become active once duration is set', () => {
        const bezier = new DynamicBezier();
        bezier.duration(1000);
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testDoesNotBecomeActiveOnceSpeedIsSet(): void {
    test('does not become active once speed is set', () => {
        const bezier = new DynamicBezier();
        bezier.speed(2);
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testDoesNotBecomeActiveOnceControlIsSet(): void {
    test('does not become active once control is set', () => {
        const bezier = new DynamicBezier();
        bezier.control(100, 100);
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testDoesNotBecomeActiveOnceControlDistanceIsSet(): void {
    test('does not become active once control distance is set', () => {
        const bezier = new DynamicBezier();
        bezier.distance(500);
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testDoesNotBecomeActiveOnceControlAngleIsSet(): void {
    test('does not become active once control angle is set', () => {
        const bezier = new DynamicBezier();
        bezier.angle(-Math.PI / 2);
        expect(bezier.isActive).not.toBeTruthy();
    });
}


function testBecomesActiveOnceValidDurationIsSetAndMoveToCalled(): void {
    test('becomes active once valid duration is set and moveTo() is called', () => {
        const bezier = new DynamicBezier();
        bezier.duration(1000).moveTo(1000, 1000);
        expect(bezier.isActive).toBeTruthy();
    });
}

function testBecomesActiveOnceValidDurationIsSetAndMoveByIsCalled(): void {
    test('becomes active once valid duration is set and moveBy() is called', () => {
        const bezier = new DynamicBezier();
        bezier.duration(1000).moveBy(1000, 1000);
        expect(bezier.isActive).toBeTruthy();
    });
}

function testBecomesActiveOnceValidSpeedIsSetAndMoveToIsCalled(): void {
    test('becomes active once valid speed is set and moveTo() is called', () => {
        const bezier = new DynamicBezier();
        bezier.speed(2).moveTo(100, 200);
        expect(bezier.isActive).toBeTruthy();
    });
}

function testBecomesActiveOnceValidSpeedIsSetAndMoveByIsCalled(): void {
    test('becomes active once valid speed is set and moveBy() is called', () => {
        const bezier = new DynamicBezier();
        bezier.speed(2).moveBy(100, 200);
        expect(bezier.isActive).toBeTruthy();
    });
}

function testBecomesInactiveOnceDurationHasElapsed(): void {
    test('becomes inactive once duration has elapsed', () => {
        const bezier = new DynamicBezier();
        bezier.duration(1000).moveTo(500, 500);
        expect(bezier.isActive).toBeTruthy();
        bezier.update(200);
        bezier.update(200);
        bezier.update(200);
        bezier.update(200);
        bezier.update(200);
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testCanBeActiveWhetherOnOrOff(): void {
    test('can be active whether on or off', () => {
        const bezier = new DynamicBezier();
        bezier.duration(1000).moveTo(500, 500);
        bezier.turnOn(); // <-- (already on, emphasising point)
        expect(bezier.isActive).toBeTruthy();
        bezier.turnOff();
        expect(bezier.isActive).toBeTruthy();
    });
}


function testInitialCurrentXYValuesAre0IfNotSetOnInstantiation(): void {
    test('initial current x y values are 0 if not set on instantiation', () => {
        const bezier = new DynamicBezier();
        expect(bezier.x).toBe(0);
        expect(bezier.y).toBe(0);
    });
}

function testInitialCurrentXYValuesAreValuesSetOnInstantiation(): void {
    test('initial current x y values are values set on instantiation', () => {
        const bezier = new DynamicBezier(100, 500);
        expect(bezier.x).toBe(100);
        expect(bezier.y).toBe(500);
    });
}

function testXYAreTheSameWhetherUnitIsOnOrOff(): void {
    test('x y are the same value whether unit is on or off', () => {
        const bezier = new DynamicBezier(250, 1000);
        bezier.duration(1000).moveTo(500, 1000);
        bezier.update(200);
        const x = bezier.x;
        const y = bezier.y;
        bezier.turnOff();
        expect(bezier.x).toBe(x);
        expect(bezier.y).toBe(y);
    });
}


function testDurationCanOnlyBeSetIfNotActive(): void {
    test('duration can only be set if not active', () => {
        const bezier = new DynamicBezier();
        expect(bezier.isActive).not.toBeTruthy();
        bezier.duration(1000).moveTo(100, 100);
        expect(bezier.isActive).toBeTruthy();
        bezier.duration(2000); // <-- X
        bezier.update(200);
        bezier.update(200);
        bezier.update(200);
        bezier.update(200);
        bezier.update(200);
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testDurationMustBeGreaterThan0ToHaveAnEffect(): void {
    test('duration must be greater than 0 to have an effect', () => {
        const bezier = new DynamicBezier();
        bezier.duration(0).moveTo(100, 200);
        bezier.update(200);
        expect(bezier.x).toBe(100);
        expect(bezier.y).toBe(200);
        bezier.duration(-1).moveTo(200, 100);
        bezier.update(200);
        expect(bezier.x).toBe(200);
        expect(bezier.y).toBe(100);
    });
}


function testSpeedCanOnlyBeSetIfNotActive(): void {
    test('speed can only be set if not active', () => {
        const bezier = new DynamicBezier();
        expect(bezier.isActive).not.toBeTruthy();
        //

    });
}

function testSpeedMustBeGreaterThan0ToHaveAnEffect(): void {
    test('speed must be greater than 0 to have an effect', () => {
        const bezier = new DynamicBezier();
    });
}


function testEaseCanOnlyBeSetIfNotActive(): void {
    test('ease can only be set if not active', () => {
        const bezier = new DynamicBezier();
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testEaseIsResetAfterDurationHasElapsed(): void {
    test('ease is reset after duration has elapsed', () => {
        const bezier = new DynamicBezier();
    });
}


function testControlCanOnlyBeSetIfNotActive(): void {
    test('control() can only be set if not active', () => {
        const bezier = new DynamicBezier();
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testControlReplacesDistanceAndAngle(): void {
    test('control() replaces control distance and angle', () => {
        const bezier = new DynamicBezier();
    });
}

function testInstantMoveResetsControlSetting(): void {
    test('an instant move resets control setting', () => {
        const bezier = new DynamicBezier();
    });
}


function testDistanceCanOnlyBeSetIfNotActive(): void {
    test('control distance can only be set if not active', () => {
        const bezier = new DynamicBezier();
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testDistanceReplacesControlVector(): void {
    test('calling distance() replaces the control() setting', () => {
        const bezier = new DynamicBezier();
    });
}

function testInstantMoveResetsDistanceSetting(): void {
    test('an instant move resets control distance setting', () => {
        const bezier = new DynamicBezier();
    });
}


function testAngleCanOnlyBeSetIfNotActive(): void {
    test('control angle can only be set if not active', () => {
        const bezier = new DynamicBezier();
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testAngleReplacesControlVector(): void {
    test('calling angle() replaces the control() setting', () => {
        const bezier = new DynamicBezier();
    });
}

function testInstantMoveResetsAngleSetting(): void {
    test('an instant move resets control angle setting', () => {
        const bezier = new DynamicBezier();
    });
}


function testMoveToPositionCanOnlyBeChangedIfNotActive(): void {
    test('moveTo() position can only be changed if not active', () => {
        const bezier = new DynamicBezier();
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testMoveToDoesNothingIfSetToCurentXYValues(): void {
    test('moveTo() does nothing if set to current x/y values', () => {
        const bezier = new DynamicBezier();
    });
}

function testMoveToCANChangeIfXisDifferentAndYIsTheSame(): void {
    test('moveTo() CAN change if x is different and y is the same', () => {
        const bezier = new DynamicBezier();
    });
}

function testMoveToCANChangeIfYisDifferentAndXIsTheSame(): void {
    test('moveTo() CAN change if y is different and x is the same', () => {
        const bezier = new DynamicBezier();
    });
}

function testIfDurationIsNotSetMoveToChangesCurrentXYValuesImmediately(): void {
    test('if duration is not set, moveTo() changes current x/y values immediately', () => {
        const bezier = new DynamicBezier();
    });
}

function testIfDurationIsSetMoveToMakesVectorActiveAndChangesXYValuesDynamicallyOverTime(): void {
    test('if duration is set, moveTo() makes vector active and changes x/y values dynamically over time', () => {
        const bezier = new DynamicBezier();
    });
}


function testMoveByPositionCanOnlyBeChangedIfNotActive(): void {
    test('moveBy() position can only be changed if not active', () => {
        const bezier = new DynamicBezier();
        expect(bezier.isActive).not.toBeTruthy();
    });
}

function testMoveByDoesNothingIfXAndYAre0(): void {
    test('moveBy() does nothing if x & y are 0', () => {
        const bezier = new DynamicBezier();
    });
}

function testMoveByCanChangeXIfXIsNot0AndYIs0(): void {
    test('moveBy() CAN change x if x is not 0 and y is 0', () => {
        const bezier = new DynamicBezier();
    });
}

function testMoveByCanChangeYIfYIsNot0AndXIs0(): void {
    test('moveBy() CAN change y if y is not 0 and x is 0', () => {
        const bezier = new DynamicBezier();
    });
}

function testIfDurationIsNotSetMoveByChangesCurrentXYValuesImmediately(): void {
    test('if duration is not set, moveBy()  changes current x/y values immediately', () => {
        const bezier = new DynamicBezier();
    });
}

function testIfDurationIsSetMoveByMakesBezierActiveAndChangesXYValuesOverTime(): void {
    test('if duration is set, moveBy() makes vector active and changes x/y values dynamically over time', () => {
        const bezier = new DynamicBezier();

    });
}

function testMoveByChangesXYValuesByCorrectAmount(): void {
    test('moveBy() changes x y values by correct amount', () => {
        const bezier = new DynamicBezier();
    });
}


function testTurningOffAndOnStopsAndStartsUpdate(): void {
    test('turning off and on stops and starts update', () => {
        const bezier = new DynamicBezier();
    });
}


function testDoesNotUpdateIfNotActive(): void {
    test('does not update if not active', () => {
        const bezier = new DynamicBezier();
    });
}

function testDoesNotUpdateIfNotTurnedOn(): void {
    test('does not update if turned off', () => {
        const bezier = new DynamicBezier();
    });
}

function testUpdatesIfActiveAndTurnedOnAndDurationGreaterThan0(): void {
    test('updates if active and turned on and duration is greater than 0', () => {
        const bezier = new DynamicBezier();
    });
}



function testCanBeSavedWhetherTurnedOnOrOff(): void {
    test('can be saved whether turned on or off', () => {
        const bezier = new DynamicBezier();
    });
}

function testBehavesTheSameAfterSaveAndLoad(): void {
    test('behaves the same after save and load', () => {
        const bezier = new DynamicBezier();
    });
}

function testLoadReturnsTrueOnValidLoad(): void {
    test('load returns true on valid load', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const difference = new Vector2D();
        const current = new Vector2D();
        const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    difference: difference.save(),
                    current: current.save(),
                    duration: 1000,
                    speed: 0,
                    isOn: true,
                    control: control.save(),
                    distance: 0,
                    angle: 0,
                    bezier: bezier.save()
                })
            )
        ).toBeTruthy();
    });
}

function testLoadReturnsFalseIfUnitMissing(): void {
    test('load returns false if "unit" property missing', () => {
        // const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const difference = new Vector2D();
        const current = new Vector2D();
        const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    // unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    difference: difference.save(),
                    current: current.save(),
                    duration: 1000,
                    speed: 0,
                    isOn: true,
                    control: control.save(),
                    distance: 0,
                    angle: 0,
                    bezier: bezier.save()
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfPreviousMissing(): void {
    test('load returns false if "previous" property missing', () => {
        const unit = new DynamicUnit();
        // const previous = new Vector2D();
        const next = new Vector2D();
        const difference = new Vector2D();
        const current = new Vector2D();
        const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    // previous: previous.save(),
                    next: next.save(),
                    difference: difference.save(),
                    current: current.save(),
                    duration: 1000,
                    speed: 0,
                    isOn: true,
                    control: control.save(),
                    distance: 0,
                    angle: 0,
                    bezier: bezier.save()
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfNextMissing(): void {
    test('load returns false if "next" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        // const next = new Vector2D();
        const difference = new Vector2D();
        const current = new Vector2D();
        const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    // next: next.save(),
                    difference: difference.save(),
                    current: current.save(),
                    duration: 1000,
                    speed: 0,
                    isOn: true,
                    control: control.save(),
                    distance: 0,
                    angle: 0,
                    bezier: bezier.save()
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfDifferenceMissing(): void {
    test('load returns false if "difference" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        // const difference = new Vector2D();
        const current = new Vector2D();
        const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    // difference: difference.save(),
                    current: current.save(),
                    duration: 1000,
                    speed: 0,
                    isOn: true,
                    control: control.save(),
                    distance: 0,
                    angle: 0,
                    bezier: bezier.save()
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfCurrentMissing(): void {
    test('load returns false if "current" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const difference = new Vector2D();
        // const current = new Vector2D();
        const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    difference: difference.save(),
                    // current: current.save(),
                    duration: 1000,
                    speed: 0,
                    isOn: true,
                    control: control.save(),
                    distance: 0,
                    angle: 0,
                    bezier: bezier.save()
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfControlMissing(): void {
    test('load returns false if "control" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const difference = new Vector2D();
        const current = new Vector2D();
        // const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    difference: difference.save(),
                    current: current.save(),
                    duration: 1000,
                    speed: 0,
                    isOn: true,
                    // control: control.save(),
                    distance: 0,
                    angle: 0,
                    bezier: bezier.save()
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfDistanceMissing(): void {
    test('load returns false if "distance" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const difference = new Vector2D();
        const current = new Vector2D();
        const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    difference: difference.save(),
                    current: current.save(),
                    duration: 1000,
                    speed: 0,
                    isOn: true,
                    control: control.save(),
                    // distance: 0,
                    angle: 0,
                    bezier: bezier.save()
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfAngleMissing(): void {
    test('load returns false if "angle" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const difference = new Vector2D();
        const current = new Vector2D();
        const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    difference: difference.save(),
                    current: current.save(),
                    duration: 1000,
                    speed: 0,
                    isOn: true,
                    control: control.save(),
                    distance: 0,
                    // angle: 0,
                    bezier: bezier.save()
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfBezierMissing(): void {
    test('load returns false if "bezier" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const difference = new Vector2D();
        const current = new Vector2D();
        const control = new Vector2D();
        // const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    difference: difference.save(),
                    current: current.save(),
                    duration: 1000,
                    speed: 0,
                    isOn: true,
                    control: control.save(),
                    distance: 0,
                    angle: 0,
                    // bezier: bezier.save()
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfDurationMissing(): void {
    test('load returns false if "duration" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const difference = new Vector2D();
        const current = new Vector2D();
        const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    difference: difference.save(),
                    current: current.save(),
                    // duration: 1000,
                    speed: 0,
                    isOn: true,
                    control: control.save(),
                    distance: 0,
                    angle: 0,
                    bezier: bezier.save()
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfSpeedMissing(): void {
    test('load returns false if "speed" property missing', () => {
        const unit = new DynamicUnit();
        const previous = new Vector2D();
        const next = new Vector2D();
        const difference = new Vector2D();
        const current = new Vector2D();
        const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    difference: difference.save(),
                    current: current.save(),
                    duration: 1000,
                    // speed: 0,
                    isOn: true,
                    control: control.save(),
                    distance: 0,
                    angle: 0,
                    bezier: bezier.save()
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
        const difference = new Vector2D();
        const current = new Vector2D();
        const control = new Vector2D();
        const bezier = new QuadraticBezierCurve();
        const dBezier = new DynamicBezier();
        expect(
            dBezier.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: previous.save(),
                    next: next.save(),
                    difference: difference.save(),
                    current: current.save(),
                    duration: 1000,
                    speed: 0,
                    // isOn: true,
                    control: control.save(),
                    distance: 0,
                    angle: 0,
                    bezier: bezier.save()
                })
            )
        ).not.toBeTruthy();
    });
}


function testWorksWithNegativeValues(): void {
    test('works as expected with negative values', () => {
        const bezier = new DynamicBezier();
    });
}

function testPathIsStraightIfControlPointNotSet(): void {
    test('path is straight if control point not set', () => {
        const bezier = new DynamicBezier();
    });
}

function testPathIsCurvedIfControlPointIsSet(): void {
    test('path is straight if control point not set', () => {
        const bezier = new DynamicBezier();
    });
}

function testDistanceAndControlMustBothBeSetToAffectControlPoint(): void {
    test('control distance AND angle must both be set to affect control point', () => {
        const bezier = new DynamicBezier();
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationWhenControlPointAdded(): void {
    test('returns expected current values during full duration when control point set', () => {
        const bezier = new DynamicBezier();
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationWhenControlPointDistanceAngleAdded(): void {
    test('returns expected current values during full duration when control point distance and angle set', () => {
        const bezier = new DynamicBezier();
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationWhenControlPointNotAdded(): void {
    test('returns expected current values during full duration when control point not added', () => {
        const bezier = new DynamicBezier();
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationWhenSpeedIsSet(): void {
    test('returns expected current values during full duration when speed is set', () => {
        const bezier = new DynamicBezier();
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationWithEaseApplied(): void {
    test('returns expected current values during full duration with ease applied', () => {
        const bezier = new DynamicBezier();
    });
}