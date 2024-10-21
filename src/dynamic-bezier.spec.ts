/**
 * 
 */

testAll();
function testAll(): void {
    describe('DynamicBezier', () => {

        test('dummy', () => { });

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

        // public addControlPoint(distance: number, angle: number): DynamicBezier
        testControlPointCanOnlyBeAddedIfNotActive();
        testReturnedPathIsStraightIfControlPointNotAdded();
        testReturnedPathIsCyrvedIfControlPointAdded();

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
        testIfDurationIsSetMoveByMakesBezierActiveAndChangesXYValuesOverTime();
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
        // test other props
        testLoadReturnsFalseIfIsOnPropertyMissing();

        // general behaviour
        testReturnsExpectdCurrentValuesDuringFullDurationWhenAddControlPointCalled();
        testReturnsExpectdCurrentValuesDuringFullDurationWhenAddControlPointNotCalled();
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


// starts inactive
// does not become active once duration is set
// does not become active once speed is set
// becomes active once valid duration is set and moveTo() is called
// becomes active once valid duration is set and moveBy() is called
// becomes active once valid speed is set and moveTo() is called
// becomes active once valid speed is set and moveBy() is called
// becomes inactive once duration has elapsed
// can be active whether on or off
function testStartsInactive(): void {
    test('', () => {

    });
}

function testDoesNotBecomeActiveOnceDurationIsSet(): void {
    test('', () => {

    });
}

function testDoesNotBecomeActiveOnceSpeedIsSet(): void {
    test('', () => {

    });
}

function testBecomesActiveOnceValidDurationIsSEtAndMoveToCalled(): void {
    test('', () => {

    });
}

function testBecomesActiveOnceValidDurationIsSetAndMoveByIsCalled(): void {
    test('', () => {

    });
}

function testBecomesActiveOnceValidSpeedIsSetAndMoveToIsCalled(): void {
    test('', () => {

    });
}

function testBecomesActiveOnceValidSpeedIsSetAndMoveByIsCalled(): void {
    test('', () => {

    });
}

function testBecomesInactiveOnceDurationHasElapsed(): void {
    test('', () => {

    });
}

function testCanBeActiveWhetherOnOrOff(): void {
    test('', () => {

    });
}


// initial current x y values are 0 if not set on instantiation
// initial current x y values are values set on instantiation
// x y are the same value whether unit is on or off
function testInitialCurrentXYValuesAre0IfNotSetOnInstantiation(): void { }
function testInitialCurrentXYValuesAreValuesSetOnInstantiation(): void { }
function testXYAreTheSameWhetherUnitIsOnOrOff(): void { }


// duration can only be set if not active
// duration must be greater than 0 to have an effect
function testDurationCanOnlyBeSetIfNotActive(): void { }
function testDurationMustBeGreaterThan0ToHaveAnEffect(): void { }


// speed can only be set if not active
// speed must be greater than 0 to have an effect
function testSpeedCanOnlyBeSetIfNotActive(): void { }
function testSpeedMustBeGreaterThan0ToHaveAnEffect(): void { }


// ease can only be set if not active
function testEaseCanOnlyBeSetIfNotActive(): void { }
function testEaseIsResetAfterDurationHasElapsed(): void { }


// addControlPoint
function testControlPointCanOnlyBeAddedIfNotActive(): void { }
function testReturnedPathIsStraightIfControlPointNotAdded(): void { }
function testReturnedPathIsCyrvedIfControlPointAdded(): void { }

// changeTo() position can only be changed if not active
// changeTo() does nothing if set to current x/y values
// changeTo() CAN change if x is different and y is the same
// changeTo() CAN change if y is different and x is the same
// if duration is not set, changeTo() changes current x/y values immediately
// if duration is set, changeTo makes vector active and changes x/y values dynamically over time
function testMoveToPositionCanOnlyBeChangedIfNotActive(): void { }
function testMoveToDoesNothingIfSetToCurentXYValues(): void { }
function testMoveToCANChangeIfXisDifferentAndYIsTheSame(): void { }
function testMoveToCANChangeIfYisDifferentAndXIsTheSame(): void { }
function testIfDurationIsNotSetMoveToChangesCurrentXYValuesImmediately(): void { }
function testIfDurationIsSetMoveToMAkesVectorActiveAndChangesXYValuesDynamicallyOverTime(): void { }


// changeBy() position can only be changed if not active
// changeBy() does nothing if x & y are 0
// changeBy() CAN change x if x is not 0 and y is 0
// changeBy() CAN change y if y is not 0 and x is 0
// if duration is not set, changeBy()  changes current x/y values immediately
// if duration is set, changeBy() makes vector active and changes x/y values dynamically over time
// changeBy() changes x y values by correct amount
function testMoveByPositionCanOnlyBeChangedIfNotActive(): void { }
function testMoveByDoesNothingIfXAndYAre0(): void { }
function testMoveByCanChangeXIfXIsNot0AndYIs0(): void { }
function testMoveByCanChangeYIfYIsNot0AndXIs0(): void { }
function testIfDurationIsNotSetMoveByChangesCurrentXYValuesImmediately(): void { }
function testIfDurationIsSetMoveByMakesBezierActiveAndChangesXYValuesOverTime(): void { }
function testMoveByChangesXYValuesBCorrectAmount(): void { }


// turning off and on stops and starts update
function testTurningOffAndOnStopsAndStartsUpdate(): void { }


// does not update if not active
// does not update if turned off
// updates if active and turned on and duration is greater than 0
function testDoesNotUpdateIfNotActive(): void { }
function testDoesNotUpdateIfNotTurnedOn(): void { }
function testUpdatesIfActiveAndTurnedOnAndDurationGreaterThan0(): void { }


// can be saved whether turned on or off
// behaves the same after save and load
// load returns true on valid load
// test other props
// load returns false if "isOn" property missing
function testCanBeSavedWhetherTurnedOnOrOff(): void { }
function testBehavesTheSameAfterSaveAndLoad(): void { }
function testLoadReturnsTrueOnValidLoad(): void { }
// test other props
function testLoadReturnsFalseIfIsOnPropertyMissing(): void { }


// returns expected current values during full duration
// returns expected current values during full duration when speed is set
// returns expected current values during full duration with ease applied
// works with x/y values 0 - 1
// works with positive x to higher x
// works with positive x to lower x
// works with negative x to higher x
// works with negative x to lower x
// works with positive y to higher y
// works with positive y to lower y
// works with negative y to higher y
// works with negative y to lower y
function testReturnsExpectdCurrentValuesDuringFullDurationWhenAddControlPointCalled(): void { }
function testReturnsExpectdCurrentValuesDuringFullDurationWhenAddControlPointNotCalled(): void { }
function testReturnsExpectdCurrentValuesDuringFullDurationWhenSpeedIsSet(): void { }
function testReturnsExpectdCurrentValuesDuringFullDurationWithEaseApplied(): void { }
function testWorksWithPositiveXToHigherX(): void { }
function testWorksWithPositiveXToLowerX(): void { }
function testWorksWithNegativeXToHigherX(): void { }
function testWorksWithNegativeXToLowerX(): void { }
function testWorksWithPositiveYToHigherY(): void { }
function testWorksWithPositiveYToLowerY(): void { }
function testWorksWithNegativeYToHigherY(): void { }
function testWorksWithNegativeYToLowerY(): void { }