/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicUnit } from "./dynamic-unit.js";

const EXPECT = new JestExpect();

// class static properties
const TICK_RATE: number = 1000 / 60;
const STEP_RATE: number = 0.05;
const MAX_AMPLITUDE: number = 1;
const MIN_AMPLITUDE: number = 0.1;
const MIN_RUN_RATE: number = 0.2;
const MAX_RUN_RATE: number = 5;
const MIN_DURATION: number = 50;

let unit: DynamicUnit
beforeEach(() => {
    unit = new DynamicUnit();
});

testAll();
function testAll(): void {

    describe('DynamicUnit', () => {

        testDefaultAmplitudeIs1();
        testCurrentValueHasCorrectAmplitude();
        testAmplitudeIsClampedToMin();
        testAmplitudeIsClampedToMax();
        testAmplitudeIsCorrectlyPersisted();
        testDefaultInvertedValueIsFalse();
        testCurrentValueIsCorrectlyInverted();
        testInvertedPropertyIsCorrectlyPersisted();
        testDefaultFlooredValueIsFalse();
        testCurrentValueIsCorrectlyFloored();
        testFlooredPropertyCorrectlyPersisted();
        testCurrentValueIsCorrectlyFlooredThenInverted();
        testUnitIsInitiallyOn();
        testCanTurnUnitOnAndOffAtAnyTime();
        testCanOnlyPersistObjectWhenTurnedOff();
        testInitialCurrentValueIs0();
        testCurrentValueIs1WhenUpdateComplete();
        testCurrentValueIsCorrectlyPersisted();
        testUnitIsInitiallyInactive();
        testUnitIsActiveOnceADurationIsSetAndChangeIsCalled();
        testUnitIsActiveRegardlessOfRunningState();
        testUnitIsInactiveOnceUpdateComplete();
        testIsActiveStateIsCorrectlyPersisted();
        testUnitIsInitiallyNotComplete();
        testUnitIsCompleteOnceUpdateHasCompleted();
        testUnitIsCompleteOnceEndMethodCalled();
        testUnitIsNoLongerCompleteOnceANewUpdateCycleHasBegun();
        testIsCompleteStateIsCorrectlyPersisted();
        testUnitIsInitiallyNotRunning();
        testUnitIsNoLongerRunningOnceComplete();
        testCannotStartUnitIfItIsOff();
        testCannotPauseUnitIfItIsOff();
        testCannotStartUnitIfItIsNotActive();
        testCannotPauseUnitIfItIsNotActive();
        testCANStartUnitIfItIsOnAndActive();
        testCanStopUnitIfItIsOnAndActive();
        testCanPauseUnitIfItIsOnAndActive();
        testPauseTogglesBetweenRunningAndNotRunningStates();
        testIsRunningIsCorrectlyPersisted();
        testDurationCannotBeSetIfUnitIsOff();
        testDurationCannotBeSetIfUnitIsActive();
        testSettingDurationDoesNotMakeTHeUnitActive();
        testDurationIsClampedToAMinimumValue();
        testDurationIsResetOnceUpdateComplete();
        testDurationIsResetIfEndNowIsCalled();
        testDurationIsCorrectlyPersisted();
        testEaseCannotBeSetIfUnitIsOff();
        testEaseCannotBeSetIfUnitIsActive();
        testSettingEaseDoesNotMakeTheUnitActive();
        testEaseIsResetOnceUpdateComplete();
        testEaseIsResetOnCallingEndNow();
        testEaseIsCorrectlyPersisted();
        testCannotChangeIfUnitIsOff();
        testCannotChangeIfUnitIsActive();
        testCannotChangeIfDurationNotSet();
        testUnitBecomesActiveOnValidChangeCall();
        testUnitIsNotRunningValidChangeCall();
        testUnitIsNoLongerCompleteOnValidChangeCall();
        testCurrentValueBecomes0OnValidChangeCall();
        testDoesNotUpdateIfUnitIsOff();
        testDoesNotUpdateIfUnitIsNotRunning();
        testDoesNotUpdateIfUnitIsNotActive();
        testUpdatesCurrentValueByExpectedAmountAtRunRateOf1();
        testUpdatesCurrentValueByExpectedAmountAtRunRateOf0Point5();
        testUpdatesCurrentValueByExpectedAmountAtRunRateOf2();
        testUpdateAppliesCorrectEaseAtRunRateOf1();
        testUpdateAppliesCorrectEaseAtRunRateOf0Point5();
        testUpdateAppliesCorrectEaseAtRunRateOf2();
        testNoLongerUpdatesWhenDurationReached();
        testContinuesToUpdateAsExpectedAfterUnitIsPersisted();
        testDoesNotTickIfUnitIsOff();
        testDoesNotTickIfUnitIsNotRunning();
        testDoesNotTickIfUnitIsNotActive();
        testTickUpdatesCurrentValueByExpectedAmount();
        testTickUpdatesCurrentValueByExpectedAmountWithRunRateOf0Point5();
        testTickUpdatesCurrentValueByExpectedAmountWithRunRateOf2();
        testTickAppliesCorrectEaseAtRunRateOf1();
        testTickAppliesCorrectEaseAtRunRateOf0Point5();
        testTickAppliesCorrectEaseAtRunRateOf2();
        testNoLongerTicksWhenDurationReached();
        testUnitContinuesToTickAsExpectedAfterUnitIsPersisted();
        testCannotStepIfUnitIsOff();
        testCannotStepIfUnitISRunning();
        testCannotStepIfUnitIsNotActive();
        testStepsCurrentValueForwardsByExpectedAmountWithRunRateOf1();
        testStepsCurrentValueForwardsByExpectedAmountWithRunRateOf0Point5();
        testStepsCurrentValueForwardsByExpectedAmountWithRunRateOf2();
        testStepsCurrentValueBackwardsByExpectedAmountWithRunRateOf1();
        testStepsCurrentValueBackwardsByExpectedAmountWithRunRateOf0Point5();
        testStepsCurrentValueBackwardsByExpectedAmountWithRunRateOf2();
        testCannotStepBeyondDuration();
        testUnitIsNotCompleteOnceDurationReachedByStep();
        testCANStepBackwardsAfterReachingDurationValue();
        testCannotStepBelow0();
        testCANStepForwardsAfterReaching0();
        testAppliesCorrectEaseWhenSteppingForwardsAtRunRateOf1();
        testAppliesCorrectEaseWhenSteppingForwardsAtRunRateOf0Point5();
        testAppliesCorrectEaseWhenSteppingForwardsAtRunRateOf2();
        testAppliesCorrectEaseWhenSteppingBackwardsAtRunRateOf1();
        testAppliesCorrectEaseWhenSteppingBackwardsAtRunRateOf0Point5();
        testAppliesCorrectEaseWhenSteppingBackwardsAtRunRateOf2();
        testCannotRewindIfTurnedOff();
        testCannotRewindIfRunning();
        testCurrentValueIs0AfterValidRewind();
        testCannotEndNowIfTurnedOff();
        testCannotEndNowIfNotActive();
        testUnitIsCompleteAfterCallingEndNow();
        testUnitIsNotActiveAfterCallingEndNow();
        testUnitIsNoLongerRunningAfterCallingEndNow();
        testCannotAdjustRunRateIfUnitIsOff();
        testCanAdjustRunRateIfUnitIsRunning();
        testCanAdjustRunRateIfUnitIsNotRunning();
        testCanAdjustRunRateIfUnitIsActive();
        testCanAdjustRunRateIfUnitIsNotActive();
        testRunRateIsClampedToMinimum();
        testRunRateIsClampedToMaximum();
        testRunRateCorrectlyPersisted();

    });

}


function testDefaultAmplitudeIs1(): void {
    test('default amplitude is 1', () => {
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
    });
}

function testCurrentValueHasCorrectAmplitude(): void {
    test('current value has correct amplitude applied', () => {
        const amplitude = 0.2;
        unit = new DynamicUnit(amplitude);
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1 * amplitude);
    });
}

function testAmplitudeIsClampedToMin(): void {
    test('amplitude is clamped to min value allowed', () => {
        const amplitude = MIN_AMPLITUDE - 0.05;
        unit = new DynamicUnit(amplitude);
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1 * MIN_AMPLITUDE);
    });
}

function testAmplitudeIsClampedToMax(): void {
    test('amplitude is clamped to max value allowed (1)', () => {
        const amplitude = MAX_AMPLITUDE + 0.05;
        unit = new DynamicUnit(amplitude);
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1 * MAX_AMPLITUDE);
    });
}

function testAmplitudeIsCorrectlyPersisted(): void {
    test('amplitude is correctly persisted', () => {
        const amplitude = 0.2;
        unit = new DynamicUnit(amplitude);
        unit.load(unit.save()); // <--
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1 * amplitude);
    });
}

function testDefaultInvertedValueIsFalse(): void {
    test('default inverted value is false', () => {
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1); // <-- not inverted
    });
}

function testCurrentValueIsCorrectlyInverted(): void {
    test('current value is correctly inverted', () => {
        unit = new DynamicUnit(1, true);
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.9); // <-- inverted
    });
}

function testInvertedPropertyIsCorrectlyPersisted(): void {
    test('inverted property is correctly persisted', () => {
        unit = new DynamicUnit(1, true);
        unit.load(unit.save()); // <--
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.9); // <-- inverted
    });
}

function testDefaultFlooredValueIsFalse(): void {
    test('default floored value is false', () => {
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1); // <-- not floored
    });
}

function testCurrentValueIsCorrectlyFloored(): void {
    test('current value is correctly floored', () => {
        unit = new DynamicUnit(1, false, true);
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBe(unit.current, 0); // <-- floored
        unit.update(100);
        EXPECT.toBe(unit.current, 0); // <-- floored
    });
}

function testFlooredPropertyCorrectlyPersisted(): void {
    test('floored property correctly persisted', () => {
        unit = new DynamicUnit(1, false, true);
        unit.load(unit.save()); // <--
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBe(unit.current, 0); // <-- floored
        unit.update(100);
        EXPECT.toBe(unit.current, 0); // <-- floored
    });
}

function testCurrentValueIsCorrectlyFlooredThenInverted(): void {
    test('current value is correctly floored then inverted', () => {
        unit = new DynamicUnit(1, true, true);
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBe(unit.current, 1); // <-- floored & inverted
        unit.update(100);
        EXPECT.toBe(unit.current, 1); // <-- floored & inverted
    });
}


function testUnitIsInitiallyOn(): void {
    test('unit is initally on', () => {
        EXPECT.truthy(unit.isOn);
    });
}

function testCanTurnUnitOnAndOffAtAnyTime(): void {
    test('can turn unit on and off at any time', () => {

        EXPECT.truthy(unit.isOn);

        unit.turnOff();
        EXPECT.falsy(unit.isOn);

        unit.turnOn();
        EXPECT.truthy(unit.isOn);

        unit.duration(1000).change();
        EXPECT.truthy(unit.isActive);

        unit.turnOff();
        EXPECT.falsy(unit.isOn);

        unit.turnOn();
        EXPECT.truthy(unit.isOn);

        unit.start();
        EXPECT.truthy(unit.isRunning);

        unit.turnOff();
        EXPECT.falsy(unit.isOn);

        unit.turnOn();
        EXPECT.truthy(unit.isOn);

        unit.update(1000);
        EXPECT.truthy(unit.isComplete);

        unit.turnOff();
        EXPECT.falsy(unit.isOn);

        unit.turnOn();
        EXPECT.truthy(unit.isOn);

    });
}

function testCanOnlyPersistObjectWhenTurnedOff(): void {
    test('can only save and load unit when it is turned off', () => {

        unit.duration(1000).change();
        unit.start();
        EXPECT.truthy(unit.isActive);
        EXPECT.truthy(unit.isRunning);
        EXPECT.falsy(unit.load(unit.save()));

        unit.turnOff();
        const state = unit.save();
        unit.turnOn();

        unit.update(1000);
        EXPECT.falsy(unit.isActive);
        EXPECT.falsy(unit.isRunning);
        EXPECT.truthy(unit.isComplete);

        unit.turnOff();
        EXPECT.truthy(unit.load(unit.save()));

        unit.load(state);
        EXPECT.truthy(unit.isActive);
        EXPECT.truthy(unit.isRunning);
        EXPECT.falsy(unit.isComplete);

    });
}


function testInitialCurrentValueIs0(): void {
    test('initial current value is 0', () => {
        EXPECT.toBe(unit.current, 0);
    });
}

function testCurrentValueIs1WhenUpdateComplete(): void {
    test('current valus is 1 when update complete', () => {
        unit.duration(100).change();
        unit.start();
        for (let i = 0; i < 5; i++) {
            unit.update(20);
        }
        EXPECT.truthy(unit.isComplete);
        EXPECT.toBe(unit.current, 1);
    });
}

function testCurrentValueIsCorrectlyPersisted(): void {
    test('current value is correctly persisted', () => {
        unit.duration(100).change();
        unit.start();
        for (let i = 1; i <= 5; i++) {
            unit.update(20);
            unit.turnOff();
            unit.load(unit.save()); // <--
            unit.turnOn();
            EXPECT.toBeCloseTo(unit.current, 0.2 * i);
        }
    });
}


function testUnitIsInitiallyInactive(): void {
    test('unit is initially inactive', () => {
        EXPECT.falsy(unit.isActive);
    });
}

function testUnitIsActiveOnceADurationIsSetAndChangeIsCalled(): void {
    test('unit is active once a duration is set and change is called', () => {
        unit.duration(1000).change();
        EXPECT.truthy(unit.isActive);
    });
}

function testUnitIsActiveRegardlessOfRunningState(): void {
    test('unit is active regardless of running state', () => {
        unit.duration(1000).change();
        EXPECT.truthy(unit.isActive);
        unit.start();
        EXPECT.truthy(unit.isRunning);
        EXPECT.truthy(unit.isActive);
        unit.stop();
        EXPECT.falsy(unit.isRunning);
        EXPECT.truthy(unit.isActive);
    });
}

function testUnitIsInactiveOnceUpdateComplete(): void {
    test('unit is inactive once update complete', () => {
        unit.duration(1000).change();
        unit.start();
        for (let i = 0; i < 5; i++) {
            unit.update(200);
        }
        EXPECT.truthy(unit.isComplete);
        EXPECT.falsy(unit.isActive);
    });
}

function testIsActiveStateIsCorrectlyPersisted(): void {
    test('isActive state is correctly persisted', () => {
        unit.duration(1000).change();
        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();
        EXPECT.truthy(unit.isActive);
        unit.start();
        for (let i = 0; i < 4; i++) {
            unit.update(200);
            unit.turnOff();
            unit.load(unit.save()); // <--
            unit.turnOn();
            EXPECT.truthy(unit.isActive);
        }
        unit.update(200);
        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();
        EXPECT.truthy(unit.isComplete);
        EXPECT.falsy(unit.isActive);
    });
}


function testUnitIsInitiallyNotComplete(): void {
    test('unit is initially not complete', () => {
        EXPECT.falsy(unit.isComplete);
    });
}

function testUnitIsCompleteOnceUpdateHasCompleted(): void {
    test('unit is complete once update has completed', () => {
        unit.duration(1000).change();
        unit.start();
        for (let i = 0; i < 10; i++) {
            unit.update(100);
        }
        EXPECT.truthy(unit.isComplete);
    });
}

function testUnitIsCompleteOnceEndMethodCalled(): void {
    test('unit is complete once end() method called', () => {
        unit.duration(1000).change();
        unit.start();
        unit.endNow();
        EXPECT.truthy(unit.isComplete);
    });
}

function testUnitIsNoLongerCompleteOnceANewUpdateCycleHasBegun(): void {
    test('unit is no longer complete once a new update cycle has begun', () => {
        unit.duration(1000).change();
        unit.start();
        for (let i = 0; i < 10; i++) {
            unit.update(100);
        }
        EXPECT.truthy(unit.isComplete);

        unit.duration(1000).change();
        unit.start();
        EXPECT.falsy(unit.isComplete); // <--

    });
}

function testIsCompleteStateIsCorrectlyPersisted(): void {
    test('isComplete state is correctly persisted', () => {
        unit.duration(1000).change();
        unit.start();
        for (let i = 0; i < 10; i++) {
            unit.update(100);
        }
        EXPECT.truthy(unit.isComplete);
        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();
        EXPECT.truthy(unit.isComplete);

        unit.duration(1000).change();
        unit.start();
        EXPECT.falsy(unit.isComplete);

        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();

        EXPECT.falsy(unit.isComplete);

    });
}


function testUnitIsInitiallyNotRunning(): void {
    test('unit is initially not running', () => {
        EXPECT.falsy(unit.isRunning);
    });
}

function testUnitIsNoLongerRunningOnceComplete(): void {
    test('unit is no longer running once update complete', () => {
        unit.duration(1000).change();
        unit.start();
        EXPECT.truthy(unit.isRunning);
        for (let i = 0; i < 10; i++) {
            unit.update(100);
        }
        EXPECT.truthy(unit.isComplete);
        EXPECT.falsy(unit.isRunning); // <--
    });
}

function testCannotStartUnitIfItIsOff(): void {
    test('cannot start unit if it is turned off', () => {
        unit.duration(1000).change()
        unit.turnOff();
        unit.start();
        EXPECT.falsy(unit.isRunning);
    });
}

function testCannotPauseUnitIfItIsOff(): void {
    test('cannot pause unit if it is turned off', () => {
        unit.duration(1000).change()
        unit.start();
        EXPECT.truthy(unit.isRunning);
        unit.turnOff();
        unit.pause();
        EXPECT.truthy(unit.isRunning);
    });
}

function testCannotStartUnitIfItIsNotActive(): void {
    test('cannot start unit if it is not active', () => {
        unit.duration(1000);
        EXPECT.falsy(unit.isActive);
        EXPECT.falsy(unit.isRunning);
        unit.start();
        EXPECT.falsy(unit.isRunning);
    });
}

function testCannotPauseUnitIfItIsNotActive(): void {
    test('cannot pause unit if it is not active', () => {
        unit.duration(1000);
        EXPECT.falsy(unit.isActive);
        EXPECT.falsy(unit.isRunning);
        unit.start();
        EXPECT.falsy(unit.isRunning);
    });
}

function testCANStartUnitIfItIsOnAndActive(): void {
    test('CAN start unit if it is on and active', () => {
        unit.duration(1000).change();
        EXPECT.truthy(unit.isOn);
        EXPECT.truthy(unit.isActive);
        unit.start();
        EXPECT.truthy(unit.isRunning);
    });
}

function testCanStopUnitIfItIsOnAndActive(): void {
    test('can stop unit if it is on and active', () => {
        unit.duration(1000).change();
        EXPECT.truthy(unit.isOn);
        EXPECT.truthy(unit.isActive);
        unit.start();
        EXPECT.truthy(unit.isRunning);
        unit.stop();
        EXPECT.falsy(unit.isRunning);
    });
}

function testCanPauseUnitIfItIsOnAndActive(): void {
    test('can pause unit if it is on and active', () => {
        unit.duration(1000).change();
        EXPECT.truthy(unit.isOn);
        EXPECT.truthy(unit.isActive);
        unit.start();
        EXPECT.truthy(unit.isRunning);
        unit.pause();
        EXPECT.falsy(unit.isRunning);
    });
}

function testPauseTogglesBetweenRunningAndNotRunningStates(): void {
    test('pause toggles between running and not running state', () => {
        unit.duration(1000).change();
        unit.start();
        EXPECT.truthy(unit.isRunning);
        unit.pause();
        EXPECT.falsy(unit.isRunning);
        unit.pause();
        EXPECT.truthy(unit.isRunning);
    });
}

function testIsRunningIsCorrectlyPersisted(): void {
    test('isRunning state is correctly persisted', () => {
        unit.duration(1000).change();
        EXPECT.truthy(unit.isOn);
        EXPECT.truthy(unit.isActive);

        unit.start();
        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();
        EXPECT.truthy(unit.isRunning);

        unit.stop();
        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();
        EXPECT.falsy(unit.isRunning);

        unit.start();
        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();
        EXPECT.truthy(unit.isRunning);

        unit.pause();
        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();
        EXPECT.falsy(unit.isRunning);

        unit.pause();
        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();
        EXPECT.truthy(unit.isRunning);

    });
}


function testDurationCannotBeSetIfUnitIsOff(): void {
    test('duration cannot be set if unit is off', () => {
        unit.turnOff();
        unit.duration(1000);
        EXPECT.toBe(unit.getDuration(), 0);
    });
}

function testDurationCannotBeSetIfUnitIsActive(): void {
    test('duration cannot be set if unit is active', () => {
        unit.duration(1000).change();
        EXPECT.truthy(unit.isActive);
        EXPECT.toBe(unit.getDuration(), 1000);
        unit.duration(2000);
        EXPECT.toBe(unit.getDuration(), 1000);
    });
}

function testSettingDurationDoesNotMakeTHeUnitActive(): void {
    test('setting duration does not make the unit active', () => {
        unit.duration(500);
        EXPECT.falsy(unit.isActive);
    });
}

function testDurationIsClampedToAMinimumValue(): void {
    test('duration is clamped to a miminimum value', () => {
        unit.duration(MIN_DURATION - 1);
        EXPECT.toBe(unit.getDuration(), MIN_DURATION);
    });
}

function testDurationIsResetOnceUpdateComplete(): void {
    test('duration is reset once update complete', () => {
        unit.duration(1000).change();
        unit.start();
        EXPECT.toBe(unit.getDuration(), 1000);
        for (let i = 0; i < 10; i++) {
            unit.update(100);
        }
        EXPECT.truthy(unit.isComplete);
        EXPECT.toBe(unit.getDuration(), 0);
    });
}

function testDurationIsResetIfEndNowIsCalled(): void {
    test('duration is reset if endNow() is called', () => {
        unit.duration(1000).change();
        unit.start();
        EXPECT.toBe(unit.getDuration(), 1000);
        unit.endNow();
        EXPECT.truthy(unit.isComplete);
        EXPECT.toBe(unit.getDuration(), 0);
    });
}

function testDurationIsCorrectlyPersisted(): void {
    test('duration is correctly persisted', () => {

        unit.duration(1000).change();
        unit.start();

        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();

        EXPECT.toBe(unit.getDuration(), 1000);
        for (let i = 0; i < 10; i++) {
            unit.update(100);
        }
        EXPECT.truthy(unit.isComplete);

        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();

        EXPECT.toBe(unit.getDuration(), 0);

    });
}


function testEaseCannotBeSetIfUnitIsOff(): void {
    test('ease cannot be set if unit is off', () => {
        unit.turnOff();
        unit.ease('easeInCubic'); // <-- has no effect
        unit.turnOn();
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
    });
}

function testEaseCannotBeSetIfUnitIsActive(): void {
    test('ease cannot be set if unit is active', () => {
        unit.duration(1000).change();
        EXPECT.truthy(unit.isActive);
        unit.ease('easeOutCubic'); // <-- has no effect
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
    });
}

function testSettingEaseDoesNotMakeTheUnitActive(): void {
    test('setting ease does not make the unit active', () => {
        unit.ease('easeInCubic');
        EXPECT.falsy(unit.isActive);
    });
}

function testEaseIsResetOnceUpdateComplete(): void {
    test('ease is reset once update complete', () => {
        unit.duration(1000).ease('easeInCubic').change();
        unit.start();
        for (let i = 0; i < 10; i++) {
            unit.update(100);
        }
        EXPECT.truthy(unit.isComplete);
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBe(unit.current, 0.1);
    });
}

function testEaseIsResetOnCallingEndNow(): void {
    test('ease is reset on calling endNow()', () => {
        unit.duration(1000).ease('easeInCubic').change();
        unit.start();
        unit.endNow();
        EXPECT.truthy(unit.isComplete);
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBe(unit.current, 0.1);
    });
}

function testEaseIsCorrectlyPersisted(): void {
    test('ease is correctly persisted', () => {
        unit.duration(1000).ease('easeInQuad').change();

        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();

        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.1, 2)); // <-- ease applied

    });
}


function testCannotChangeIfUnitIsOff(): void {
    test('cannot change unit if it is turned off', () => {
        unit.turnOff();
        EXPECT.falsy(unit.duration(1000).change());
    });
}

function testCannotChangeIfUnitIsActive(): void {
    test('cannot change if unit already active', () => {
        EXPECT.truthy(unit.duration(1000).change());
        EXPECT.truthy(unit.isActive);
        EXPECT.falsy(unit.duration(2000).change());
    });
}

function testCannotChangeIfDurationNotSet(): void {
    test('cannot change if duration not set', () => {
        EXPECT.falsy(unit.change());
    });
}

function testUnitBecomesActiveOnValidChangeCall(): void {
    test('unit becomes active on valid change call', () => {
        EXPECT.truthy(unit.duration(1000).change());
        EXPECT.truthy(unit.isActive);
    });
}

function testUnitIsNotRunningValidChangeCall(): void {
    test('unit is not running after valid change call', () => {
        EXPECT.truthy(unit.duration(1000).change());
        EXPECT.falsy(unit.isRunning);
    });
}

function testUnitIsNoLongerCompleteOnValidChangeCall(): void {
    test('unit is no longer complete on valid change call', () => {
        unit.duration(1000).change();
        unit.endNow();
        EXPECT.truthy(unit.isComplete);
        unit.duration(1000).change();
        EXPECT.falsy(unit.isComplete);
    });
}

function testCurrentValueBecomes0OnValidChangeCall(): void {
    test('current value becomes 0 on valid change call', () => {
        unit.duration(1000).change();
        unit.endNow();
        EXPECT.toBe(unit.current, 1);
        unit.duration(1000).change();
        EXPECT.toBe(unit.current, 0);
    });
}


function testDoesNotUpdateIfUnitIsOff(): void {
    test('does not update if unit is off', () => {
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
        unit.turnOff(); // <-- 
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
    });
}

function testDoesNotUpdateIfUnitIsNotRunning(): void {
    test('does not update if unit is not running', () => {
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
        unit.stop(); // <-- 
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
    });
}

function testDoesNotUpdateIfUnitIsNotActive(): void {
    test('does not update if unit not active', () => {
        unit.duration(1000).change();
        unit.start();
        unit.endNow();
        EXPECT.falsy(unit.isActive);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);
    });
}

function testUpdatesCurrentValueByExpectedAmountAtRunRateOf1(): void {
    test('updates current value by expected amount at run rate of 1', () => {

        unit.runRate(1);
        unit.duration(1000).change();
        unit.start();

        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.2);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.3);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.4);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.5);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.6);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.7);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.8);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.9);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);

        EXPECT.truthy(unit.isComplete);

    });
}

function testUpdatesCurrentValueByExpectedAmountAtRunRateOf0Point5(): void {
    test('updates current value by expected amount at run rate of 0.5', () => {

        unit.runRate(0.5);
        unit.duration(1000).change();
        unit.start();

        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.05);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.15);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.2);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.25);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.3);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.35);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.4);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.45);
        unit.update(100);
        EXPECT.toBe(unit.current, 0.5);

        EXPECT.falsy(unit.isComplete);

    });
}

function testUpdatesCurrentValueByExpectedAmountAtRunRateOf2(): void {
    test('updates current value by expected amount at run rate of 2', () => {

        unit.runRate(2);
        unit.duration(1000).change();
        unit.start();

        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.2);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.4);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.6);
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.8);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);

        EXPECT.truthy(unit.isComplete);

    });
}

function testUpdateAppliesCorrectEaseAtRunRateOf1(): void {
    test('update applies correct ease at run rate of 1', () => {
        unit.runRate(1);
        unit.duration(1000).ease('easeInQuad').change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.1, 2));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.2, 2));
    });
}

function testUpdateAppliesCorrectEaseAtRunRateOf0Point5(): void {
    test('update applies correct ease at run rate of 0.5', () => {
        unit.runRate(0.5);
        unit.duration(1000).ease('easeInQuad').change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.05, 2));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.1, 2));
    });
}

function testUpdateAppliesCorrectEaseAtRunRateOf2(): void {
    test('update applies correct ease at run rate of 2', () => {
        unit.runRate(2);
        unit.duration(1000).ease('easeInQuad').change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.2, 2));
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.4, 2));
    });
}

function testNoLongerUpdatesWhenDurationReached(): void {
    test('no longer updates when duration reached', () => {
        unit.duration(1000).change();
        unit.start();
        for (let i = 0; i < 10; i++) {
            unit.update(100);
        }
        EXPECT.truthy(unit.isComplete);
        EXPECT.toBe(unit.current, 1);
        unit.update(100);
        EXPECT.toBe(unit.current, 1);
    });
}

function testContinuesToUpdateAsExpectedAfterUnitIsPersisted(): void {
    test('unit continues to update as expected after unit is persisted', () => {
        unit.duration(1000).ease('easeInCubic').change();
        unit.start();
        for (let i = 1; i <= 10; i++) {
            unit.update(100);
            unit.turnOff();
            unit.load(unit.save()); // <--
            unit.turnOn();
            EXPECT.toBeCloseTo(unit.current, Math.pow(i * 0.1, 3));
        }
    });
}


function testDoesNotTickIfUnitIsOff(): void {
    test('does not tick if unit is off', () => {
        unit.duration(1000).change();
        unit.start();
        unit.tick();
        EXPECT.toBeCloseTo(unit.current, TICK_RATE / 1000);
        unit.turnOff(); // <--
        unit.tick();
        EXPECT.toBeCloseTo(unit.current, TICK_RATE / 1000);
    });
}

function testDoesNotTickIfUnitIsNotRunning(): void {
    test('does not tick if unit is not running', () => {
        unit.duration(1000).change();
        unit.start();
        unit.tick();
        EXPECT.toBeCloseTo(unit.current, TICK_RATE / 1000);
        unit.stop(); // <--
        unit.tick();
        EXPECT.toBeCloseTo(unit.current, TICK_RATE / 1000);
    });
}

function testDoesNotTickIfUnitIsNotActive(): void {
    test('does not tick if unit is not active', () => {
        unit.duration(1000).change();
        unit.start();
        unit.endNow();
        EXPECT.falsy(unit.isActive);
        EXPECT.toBe(unit.current, 1);
        unit.tick();
        EXPECT.toBe(unit.current, 1);
    });
}

function testTickUpdatesCurrentValueByExpectedAmount(): void {
    test('tick updates current value by expected amount', () => {

        unit.duration(1000).change();
        unit.start();

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1 * TICK_RATE / 1000);

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 2 * TICK_RATE / 1000);

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 3 * TICK_RATE / 1000);

        for (let i = 0; i < 20; i++) {
            unit.tick();
        }

        EXPECT.toBeCloseTo(unit.current, 23 * TICK_RATE / 1000);

        for (let i = 0; i < 20; i++) {
            unit.tick();
        }

        EXPECT.toBeCloseTo(unit.current, 43 * TICK_RATE / 1000);

        for (let i = 0; i < 16; i++) {
            unit.tick();
        }

        EXPECT.toBeCloseTo(unit.current, 59 * TICK_RATE / 1000);

        unit.tick(); // <-- rounding error leaves elapsed slightly less than 1
        EXPECT.toBeCloseTo(unit.current, 1);

        unit.tick();
        EXPECT.truthy(unit.isComplete);

    });
}

function testTickUpdatesCurrentValueByExpectedAmountWithRunRateOf0Point5(): void {
    test('tick updates current value by expected amount when runRate is 0.5', () => {

        unit.runRate(0.5);
        unit.duration(1000).change();
        unit.start();

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 0.5 * TICK_RATE / 1000);

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1 * TICK_RATE / 1000);

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1.5 * TICK_RATE / 1000);

    });
}

function testTickUpdatesCurrentValueByExpectedAmountWithRunRateOf2(): void {
    test('tick updates current value by expected amount when runRate is 2', () => {

        unit.runRate(2);
        unit.duration(1000).change();
        unit.start();

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 2 * TICK_RATE / 1000);

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 4 * TICK_RATE / 1000);

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 6 * TICK_RATE / 1000);

    });
}

function testTickAppliesCorrectEaseAtRunRateOf1(): void {
    test('tick applies correct ease at run rate of 1', () => {

        unit.runRate(1);
        unit.duration(1000).ease('easeOutQuart').change();
        unit.start();

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1 - Math.pow(1 - (1 * TICK_RATE / 1000), 4));

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1 - Math.pow(1 - (2 * TICK_RATE / 1000), 4));

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1 - Math.pow(1 - (3 * TICK_RATE / 1000), 4));

    });
}

function testTickAppliesCorrectEaseAtRunRateOf0Point5(): void {
    test('tick applies correct ease at run rate of 0.5', () => {

        unit.runRate(0.5);
        unit.duration(1000).ease('easeOutQuart').change();
        unit.start();

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1 - Math.pow(1 - (0.5 * TICK_RATE / 1000), 4));

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1 - Math.pow(1 - (1 * TICK_RATE / 1000), 4));

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1 - Math.pow(1 - (1.5 * TICK_RATE / 1000), 4));

    });
}

function testTickAppliesCorrectEaseAtRunRateOf2(): void {
    test('tick applies correct ease at run rate of 2', () => {

        unit.runRate(2);
        unit.duration(1000).ease('easeOutQuart').change();
        unit.start();

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1 - Math.pow(1 - (2 * TICK_RATE / 1000), 4));

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1 - Math.pow(1 - (4 * TICK_RATE / 1000), 4));

        unit.tick();
        EXPECT.toBeCloseTo(unit.current, 1 - Math.pow(1 - (6 * TICK_RATE / 1000), 4));

    });
}

function testNoLongerTicksWhenDurationReached(): void {
    test('no longer ticks when duration reached', () => {

        unit.runRate(1);
        unit.duration(1000).ease('easeOutQuart').change();
        unit.start();

        for (let i = 0; i < 61; i++) {
            unit.tick();
        }

        EXPECT.truthy(unit.isComplete);
        EXPECT.toBe(unit.current, 1);

        unit.tick();
        EXPECT.truthy(unit.isComplete);
        EXPECT.toBe(unit.current, 1);

    });
}

function testUnitContinuesToTickAsExpectedAfterUnitIsPersisted(): void {
    test('unit continues to tick as expected after unit is persisted', () => {

        unit.duration(1000).change();
        unit.start();

        for (let i = 1; i <= 59; i++) {
            unit.tick();
            unit.turnOff();
            unit.load(unit.save()); // <--
            unit.turnOn();
            EXPECT.toBeCloseTo(unit.current, i * TICK_RATE / 1000);
        }

    });
}


function testCannotStepIfUnitIsOff(): void {
    test('cannot step if unit is off', () => {
        unit.duration(1000).change();
        unit.turnOff();
        unit.step(1);
        EXPECT.toBe(unit.current, 0);
        unit.step(-1);
        EXPECT.toBe(unit.current, 0);
    });
}

function testCannotStepIfUnitISRunning(): void {
    test('cannot step if unit is running', () => {
        unit.duration(1000).change();
        unit.start();
        unit.step(1);
        EXPECT.toBe(unit.current, 0);
        unit.step(-1);
        EXPECT.toBe(unit.current, 0);
    });
}

function testCannotStepIfUnitIsNotActive(): void {
    test('cannot step if unit is not active', () => {
        EXPECT.toBe(unit.current, 0);
        EXPECT.falsy(unit.isActive);
        unit.step(1);
        EXPECT.toBe(unit.current, 0);
        unit.step(-1);
        EXPECT.toBe(unit.current, 0);
    });
}

function testStepsCurrentValueForwardsByExpectedAmountWithRunRateOf1(): void {
    test('steps current value forwards by expected amount when runRate is 1', () => {

        unit.runRate(1);
        unit.duration(2000).change();

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, STEP_RATE);

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, STEP_RATE * 2);

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, STEP_RATE * 3);

    });
}

function testStepsCurrentValueForwardsByExpectedAmountWithRunRateOf0Point5(): void {
    test('steps current value forwards by expected amount when runRate is 0.5', () => {

        unit.runRate(0.5);
        unit.duration(2000).change();

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, STEP_RATE * 0.5);

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, STEP_RATE * 2 * 0.5);

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, STEP_RATE * 3 * 0.5);

    });
}

function testStepsCurrentValueForwardsByExpectedAmountWithRunRateOf2(): void {
    test('steps current value forwards by expected amount when runRate is 2', () => {

        unit.runRate(2);
        unit.duration(2000).change();

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, STEP_RATE * 2);

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, STEP_RATE * 2 * 2);

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, STEP_RATE * 3 * 2);

    });
}

function testStepsCurrentValueBackwardsByExpectedAmountWithRunRateOf1(): void {
    test('steps current value backwards by expected amount when runRate is 1', () => {

        unit.runRate(1);
        unit.duration(2000).change();

        unit.start();
        unit.update(1000);
        EXPECT.toBeCloseTo(unit.current, 0.5);
        unit.stop();

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, 0.5 - STEP_RATE);

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, 0.5 - (STEP_RATE * 2));

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, 0.5 - (STEP_RATE * 3));

    });
}

function testStepsCurrentValueBackwardsByExpectedAmountWithRunRateOf0Point5(): void {
    test('steps current value backwards by expected amount when runRate is 0.5', () => {

        unit.runRate(0.5);
        unit.duration(2000).change();

        unit.start();
        unit.update(1000);
        EXPECT.toBeCloseTo(unit.current, 0.25);
        unit.stop();

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, 0.25 - (STEP_RATE * 0.5));

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, 0.25 - (STEP_RATE * 2 * 0.5));

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, 0.25 - (STEP_RATE * 3 * 0.5));

    });
}

function testStepsCurrentValueBackwardsByExpectedAmountWithRunRateOf2(): void {
    test('steps current value backwards by expected amount when runRate is 2', () => {

        unit.runRate(2);
        unit.duration(2000).change();

        unit.start();
        unit.update(500);
        EXPECT.toBeCloseTo(unit.current, 0.5);
        unit.stop();

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, 0.5 - (STEP_RATE * 2));

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, 0.5 - (STEP_RATE * 2 * 2));

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, 0.5 - (STEP_RATE * 3 * 2));

    });
}

function testCannotStepBeyondDuration(): void {
    test('cannot step beyond duration', () => {

        unit.duration(2000).change();

        for (let i = 0; i < Math.round(1 / STEP_RATE) * 10; i++) {
            unit.step(1);
            EXPECT.toBeLesshanOrEqual(unit.current, 1);
        }

    });
}

function testUnitIsNotCompleteOnceDurationReachedByStep(): void {
    test('unit is not complete when duration reached by step', () => {

        unit.duration(2000).change();

        for (let i = 0; i < Math.round(1 / STEP_RATE); i++) {
            unit.step(1);
        }

        EXPECT.toBe(unit.current, 1);
        EXPECT.falsy(unit.isActive);
        EXPECT.falsy(unit.isComplete);

    });
}

function testCANStepBackwardsAfterReachingDurationValue(): void {
    test('CAN step backwards after reaching duration value', () => {

        unit.duration(2000).change();

        for (let i = 0; i < Math.round(1 / STEP_RATE); i++) {
            unit.step(1);
        }

        EXPECT.toBe(unit.current, 1);

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, 1 - STEP_RATE);

    });
}

function testCannotStepBelow0(): void {
    test('cannot step below 0', () => {

        unit.duration(1000).change();
        EXPECT.toBe(unit.current, 0);

        for (let i = 0; i < 100; i++) {
            unit.step(-1);
            EXPECT.toBe(unit.current, 0);
        }

    });
}

function testCANStepForwardsAfterReaching0(): void {
    test('CAN step forwards after reaching 0', () => {
        unit.duration(1000).change();
        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, STEP_RATE);
        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, 0);
        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, STEP_RATE);
    });
}

function testAppliesCorrectEaseWhenSteppingForwardsAtRunRateOf1(): void {
    test('applies correct ease when stepping forwards at a runRate of 1', () => {

        unit.runRate(1);
        unit.duration(2000).ease('easeInCubic').change();

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(STEP_RATE, 3));

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(STEP_RATE * 2, 3));

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(STEP_RATE * 3, 3));

    });
}

function testAppliesCorrectEaseWhenSteppingForwardsAtRunRateOf0Point5(): void {
    test('applies correct ease when stepping forwards at a runRate of 0.5', () => {

        unit.runRate(0.5);
        unit.duration(2000).ease('easeInCubic').change();

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(STEP_RATE * 0.5, 3));

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(STEP_RATE * 2 * 0.5, 3));

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(STEP_RATE * 3 * 0.5, 3));

    });
}

function testAppliesCorrectEaseWhenSteppingForwardsAtRunRateOf2(): void {
    test('applies correct ease when stepping forwards at a runRate of 2', () => {

        unit.runRate(2);
        unit.duration(2000).ease('easeInCubic').change();

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(STEP_RATE * 2, 3));

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(STEP_RATE * 2 * 2, 3));

        unit.step(1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(STEP_RATE * 3 * 2, 3));

    });
}

function testAppliesCorrectEaseWhenSteppingBackwardsAtRunRateOf1(): void {
    test('applies correct ease when stepping backwards at a runRate of 1', () => {

        unit.runRate(1);
        unit.duration(2000).ease('easeInCubic').change();

        unit.start();
        unit.update(1000);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.5, 3));
        unit.stop();

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.5 - STEP_RATE, 3));

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.5 - (STEP_RATE * 2), 3));

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.5 - (STEP_RATE * 3), 3));

    });
}

function testAppliesCorrectEaseWhenSteppingBackwardsAtRunRateOf0Point5(): void {
    test('applies correct ease when stepping backwards at a runRate of 0.5', () => {

        unit.runRate(0.5);
        unit.duration(2000).ease('easeInCubic').change();

        unit.start();
        unit.update(1000);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.5 * 0.5, 3));
        unit.stop();

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, Math.pow((0.5 * 0.5) - (STEP_RATE * 0.5), 3));

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, Math.pow((0.5 * 0.5) - (STEP_RATE * 2 * 0.5), 3));

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, Math.pow((0.5 * 0.5) - (STEP_RATE * 3 * 0.5), 3));

    });
}

function testAppliesCorrectEaseWhenSteppingBackwardsAtRunRateOf2(): void {
    test('applies correct ease when stepping backwards at a runRate of 2', () => {

        unit.runRate(2);
        unit.duration(2000).ease('easeInCubic').change();

        unit.start();
        unit.update(500);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.5, 3));
        unit.stop();

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.5 - (STEP_RATE * 2), 3));

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.5 - (STEP_RATE * 2 * 2), 3));

        unit.step(-1);
        EXPECT.toBeCloseTo(unit.current, Math.pow(0.5 - (STEP_RATE * 3 * 2), 3));

    });
}


function testCannotRewindIfTurnedOff(): void {
    test('cannot rewind if turned off', () => {
        unit.duration(1000).change();
        unit.start();
        unit.update(500);
        EXPECT.toBeCloseTo(unit.current, 0.5);
        unit.stop();
        unit.turnOff();
        unit.rewind();
        EXPECT.toBeCloseTo(unit.current, 0.5); // <-- did not rewind

    });
}

function testCannotRewindIfRunning(): void {
    test('cannot rewind if running', () => {
        unit.duration(1000).change();
        unit.start();
        unit.update(500);
        EXPECT.toBeCloseTo(unit.current, 0.5);
        unit.rewind();
        EXPECT.toBeCloseTo(unit.current, 0.5); // <-- did not rewind
    });
}

function testCurrentValueIs0AfterValidRewind(): void {
    test('current value is 0 after valid rewind', () => {
        unit.duration(1000).change();
        unit.start();
        unit.update(500);
        EXPECT.toBeCloseTo(unit.current, 0.5);
        unit.stop();
        unit.rewind();
        EXPECT.toBeCloseTo(unit.current, 0); // <-- did rewind
    });
}


function testCannotEndNowIfTurnedOff(): void {
    test('cannot end now if turned off', () => {
        unit.duration(1000).change();
        unit.turnOff();
        unit.endNow();
        EXPECT.falsy(unit.isComplete);
        EXPECT.truthy(unit.isActive);
    });
}

function testCannotEndNowIfNotActive(): void {
    test('cannot end now if not active', () => {
        unit.duration(1000);
        EXPECT.falsy(unit.isActive);
        unit.endNow();
        EXPECT.falsy(unit.isComplete);
    });
}

function testUnitIsCompleteAfterCallingEndNow(): void {
    test('unit is complete after calling endNow()', () => {
        unit.duration(1000).change();
        unit.start();
        unit.endNow();
        EXPECT.truthy(unit.isComplete);
    });
}

function testUnitIsNotActiveAfterCallingEndNow(): void {
    test('unit is not active after calling endNow()', () => {
        unit.duration(1000).change();
        EXPECT.truthy(unit.isActive);
        unit.start();
        unit.endNow();
        EXPECT.falsy(unit.isActive);
    });
}

function testUnitIsNoLongerRunningAfterCallingEndNow(): void {
    test('unit is no longer running after calling endNow()', () => {
        unit.duration(1000).change();
        unit.start();
        EXPECT.truthy(unit.isRunning);
        unit.endNow();
        EXPECT.falsy(unit.isRunning);
    });
}


function testCannotAdjustRunRateIfUnitIsOff(): void {
    test('cannot adjust run rate if unit is off', () => {
        unit.turnOff();
        unit.runRate(5);
        unit.turnOn();
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1);
    });
}

function testCanAdjustRunRateIfUnitIsRunning(): void {
    test('can adjust run rate if unit is running', () => {
        unit.duration(1000).change();
        unit.start();
        EXPECT.truthy(unit.isRunning);
        unit.runRate(2); // <--
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.2);
    });
}

function testCanAdjustRunRateIfUnitIsNotRunning(): void {
    test('can adjust run rate if unit is not running', () => {
        unit.duration(1000).change();
        unit.runRate(2); // <--
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.2);
    });
}

function testCanAdjustRunRateIfUnitIsActive(): void {
    test('can adjust run rate if unit is active', () => {
        unit.duration(1000).change();
        EXPECT.truthy(unit.isActive);
        unit.runRate(2); // <--
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.2);
    });
}

function testCanAdjustRunRateIfUnitIsNotActive(): void {
    test('can adjust run rate if unit is not active', () => {
        EXPECT.falsy(unit.isActive);
        unit.runRate(2); // <--
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.2);
    });
}

function testRunRateIsClampedToMinimum(): void {
    test('run rate is clamped to minimum', () => {
        unit.runRate(MIN_RUN_RATE - 0.05);
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1 * MIN_RUN_RATE);
    });
}

function testRunRateIsClampedToMaximum(): void {
    test('run rate is clamped to maxumum', () => {
        unit.runRate(MAX_RUN_RATE + 0.1);
        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.1 * MAX_RUN_RATE);
    });
}

function testRunRateCorrectlyPersisted(): void {
    test('run rate correctly persisted', () => {
        unit.runRate(5);

        unit.turnOff();
        unit.load(unit.save()); // <--
        unit.turnOn();

        unit.duration(1000).change();
        unit.start();
        unit.update(100);
        EXPECT.toBeCloseTo(unit.current, 0.5);
    });
}