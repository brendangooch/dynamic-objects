/**
 * 
 */

import { DynamicNumber } from "./dynamic-number.js";
import { DynamicUnit } from "./dynamic-unit.js";

testAll();
function testAll(): void {
    describe('DynamicNumber', () => {

        // public get isActive(): boolean
        testStartsInactive();
        testDoesNotBecomeActiveOnceDurationIsSet();
        testDoesNotBecomeActiveOnceSpeedIsSet();
        testBecomesActiveOnceValidDurationIsSetAndChangeToIsCalled();
        testBecomesActiveOnceDurationIsSetAndChangeByIsCalled();
        testBecomesActiveOnceSpeedIsSetAndChangeToIsCalled();
        testBecomesActiveOnceSpeedIsSetAndChangeByIsCalled();
        testBecomesInactiveOnceDurationHasElapsed();
        testCanBeActiveWhetherOnOrOff();

        // public get current(): number
        testInitialCurrentValueIs0IfNotSetInTheConstructor();
        testInitialCurrentValueIsValueSetInConstructor();
        testValueCanStartNegative();
        testCurrentIsTheSameValueWhetherNumberIsOnOrOff();

        // public setDuration(ms: number): DynamicNumber
        testDurationCanOnlyBeSetIfNotActive();
        testDurationMustBeGreateThan0ToHaveAnEffect();

        // public setSpeed(units: number): DynamicNumber
        testSpeedCanOnlyBeSetIfNotActive();
        testSpeedMustBeGreaterThan0ToHaveAnEffect();

        // public setEase(easeOption: tEaseOption): DynamicUnit
        testEaseCanOnlyBeSetIfNotActive();
        testEaseIsResetAfterDurationHasElapsed();

        // public changeTo(n: number): boolean
        testNumberCanOnlyBeChangedIfNotActive();
        testChangeToDoesNothingIfSetToCurrentValue();
        testIfDurationIsNotSetChangeToChangesCurrentValueImmediately();
        testIfDurationIsSetChangeToMakesNumberActiveAndChangesValueDynamicallyOverTime();

        // public changeBy(n: number): boolean
        testChangeByCanOnlyChangeNumberIfNotActive();
        testChangeByDoesNothingIfNIs0();
        testIfDurationIsNotSetChangeByChangesValueImmediately();
        testIfDurationIsSetChangeByMakesNumberActiveAndChangesValueDynamicallyOverTime();
        testChangeByChangesNumberByCorrectAmountImmediately();
        testChangeByChangesNumberByCorrectAmountOverTime();
        testChangeByCanChangeNumberByANegativeAmount();

        // public turnOn(): void
        // public turnOff(): void
        testTurningOnAndOffStopsAndStartsUpdate();

        // public update(ms: number): void
        testDoesNotUpdateIfNotActive();
        testDoesNotUpdateIfTurnedOff();
        testUpdatesIfActiveAndTurnedOn();

        // public load(json: string): boolean
        testCanBeSavedWhetherTurnedOnOrOff();
        testBehavesTheSameAfterSaveAndLoad();
        testReturnsTrueOnValidLoad();
        testReturnsFalseIfUnitPropertyMissing();
        testReturnsFalseIfPreviousPropertyMissing();
        testReturnsFalseIfNextPropertyMissing();
        testReturnsFalseIfDifferencePropertyMissing();
        testReturnsFalseIfCurrentPropertyMissing();
        testReturnsFalseIfDurationPropertyMissing();
        testReturnsFalseIfSpeedPropertyMissing();
        testReturnsFalseIfIsOnPropertyMissing();

        // general behaviour
        testReturnsExpectedCurrentValueDuringFullDuration();
        testReturnsExpectedCurrentValueDuringFullDurationWhenSpeedIsSet();
        testReturnsExpectedCurrentValueDuringFullDurationWithEaseApplied();
        testWorksWithNumbers0To1();
        testWorksWithPositiveToHigherNumbers();
        testWorksWithPositiveToLowerNumber();
        testWorksWithNegativeToHigherNumbers();
        testWorksWithNegativeToLowerNumbers();

    });

}


function testStartsInactive(): void {
    test('starts inactive', () => {
        const number = new DynamicNumber();
        expect(number.isActive).not.toBeTruthy();
    });
}

function testDoesNotBecomeActiveOnceDurationIsSet(): void {
    test('does not become active once duration is set', () => {
        const number = new DynamicNumber();
        number.duration(1000);
        expect(number.isActive).not.toBeTruthy();
    });
}

function testDoesNotBecomeActiveOnceSpeedIsSet(): void {
    test('does not become active once speed is set', () => {
        const number = new DynamicNumber();
        number.speed(1000);
        expect(number.isActive).not.toBeTruthy();
    });
}

function testBecomesActiveOnceValidDurationIsSetAndChangeToIsCalled(): void {
    test('becomes active once valid duration is set and changeTo() is called', () => {
        const number = new DynamicNumber();
        number.duration(1000).changeTo(100);
        expect(number.isActive).toBeTruthy();
    });
}

function testBecomesActiveOnceDurationIsSetAndChangeByIsCalled(): void {
    test('becomes active once valid duration is set and changeBy() is called', () => {
        const number = new DynamicNumber();
        number.duration(1000).changeBy(100);
        expect(number.isActive).toBeTruthy();
    });
}

function testBecomesActiveOnceSpeedIsSetAndChangeToIsCalled(): void {
    test('becomes active once valid speed is set and changeTo() is called', () => {
        const number = new DynamicNumber();
        number.speed(100).changeTo(200);
        expect(number.isActive).toBeTruthy();
    });
}

function testBecomesActiveOnceSpeedIsSetAndChangeByIsCalled(): void {
    test('becomes active once valid speed is set and changeBy() is called', () => {
        const number = new DynamicNumber();
        number.speed(100).changeBy(200);
        expect(number.isActive).toBeTruthy();
    });
}

function testBecomesInactiveOnceDurationHasElapsed(): void {
    test('becomes inactive once duration has elapsed', () => {
        const number = new DynamicNumber();
        number.duration(1000).changeTo(500);
        expect(number.isActive).toBeTruthy();
        expect(number.current).toBe(0);
        number.update(200);
        number.update(200);
        number.update(200);
        number.update(200);
        number.update(200);
        expect(number.isActive).not.toBeTruthy();
    });
}

function testCanBeActiveWhetherOnOrOff(): void {
    test('can be active whether on or off', () => {
        const number = new DynamicNumber();
        number.duration(1000).changeTo(500);
        number.turnOff();
        expect(number.isActive).toBeTruthy();
        number.turnOn();
        expect(number.isActive).toBeTruthy();
        expect(number.current).toBe(0);
        number.update(200);
        number.update(200);
        number.update(200);
        number.update(200);
        number.update(200);
        number.turnOff();
        expect(number.isActive).not.toBeTruthy();
        number.turnOn();
        expect(number.isActive).not.toBeTruthy();
    });
}


function testInitialCurrentValueIs0IfNotSetInTheConstructor(): void {
    test('initial current value is 0 if not set in the constructor', () => {
        const number = new DynamicNumber();
        expect(number.current).toBe(0);
    });
}

function testInitialCurrentValueIsValueSetInConstructor(): void {
    test('initial current value is value set in constuctor', () => {
        const number = new DynamicNumber(100);
        expect(number.current).toBe(100);
    });
}

function testValueCanStartNegative(): void {
    test('current value can start negative', () => {
        const number = new DynamicNumber(-100);
        expect(number.current).toBe(-100);
    });
}

function testCurrentIsTheSameValueWhetherNumberIsOnOrOff(): void {
    test('current is the same value whether number is on or off', () => {
        const number = new DynamicNumber(100);
        expect(number.current).toBe(100);
        number.turnOff();
        expect(number.current).toBe(100);
        number.duration(1000).changeTo(200);
        expect(number.current).toBe(100);
        number.turnOn();
        number.update(200);
        expect(number.current).toBe(120);
        number.turnOff();
        expect(number.current).toBe(120);
    });
}


function testDurationCanOnlyBeSetIfNotActive(): void {
    test('duration can only be set if not active', () => {
        const number = new DynamicNumber();
        expect(number.isActive).not.toBeTruthy();
        number.duration(1000).changeTo(100);
        expect(number.isActive).toBeTruthy();
        number.duration(2000);
        number.update(200);
        expect(number.current).not.toBe(10);
        expect(number.current).toBe(20);
    });
}

function testDurationMustBeGreateThan0ToHaveAnEffect(): void {
    test('duration must be greater than 0 to have an effect', () => {
        const number = new DynamicNumber();
        number.duration(0).changeTo(100);
        expect(number.isActive).not.toBeTruthy();
        expect(number.current).toBe(100);
        number.duration(-100).changeTo(200);
        expect(number.isActive).not.toBeTruthy();
        expect(number.current).toBe(200);
    });
}


function testSpeedCanOnlyBeSetIfNotActive(): void {
    test('speed can only be set if not active', () => {
        const number = new DynamicNumber();
        expect(number.isActive).not.toBeTruthy();
        number.speed(2).changeTo(500); // duration = 500 units distance / 2 units per ms = 250 ms
        expect(number.isActive).toBeTruthy();
        number.speed(1);
        number.update(50); // 20% of 250
        expect(number.current).not.toBe(50);
        expect(number.current).toBe(100); // 20% of 500
    });
}

function testSpeedMustBeGreaterThan0ToHaveAnEffect(): void {
    test('speed must be greater than 0 to have an effect', () => {
        const number = new DynamicNumber();
        number.speed(0).changeTo(100);
        expect(number.isActive).not.toBeTruthy();
        expect(number.current).toBe(100);
        number.speed(-100).changeTo(200);
        expect(number.isActive).not.toBeTruthy();
        expect(number.current).toBe(200);
    });
}


function testEaseCanOnlyBeSetIfNotActive(): void {
    test('ease can only be set if not active', () => {
        const number = new DynamicNumber();
        expect(number.isActive).not.toBeTruthy();
        number.speed(2).ease('easeInQuad').changeBy(1000); // duration = 1000 units distance / 2 units per ms = 500 ms
        expect(number.isActive).toBeTruthy();
        number.ease('easeInCubic');
        number.update(100); // 20%
        expect(number.current).not.toBe(Math.pow(0.2, 3));
        expect(number.current).not.toBeCloseTo(Math.pow(0.2, 2));
    });
}

function testEaseIsResetAfterDurationHasElapsed(): void {
    test('ease() is reset to no ease after duration has elapsed', () => {
        const number = new DynamicNumber();
        number.speed(2).ease('easeInQuad').changeBy(1000); // duration = 1000 units / 2 units per ms = 500 ms
        expect(number.isActive).toBeTruthy();
        number.update(100); // 20%
        expect(number.current).toBeCloseTo(Math.pow(0.2, 2) * 1000);
        number.update(100);
        number.update(100);
        number.update(100);
        number.update(100);
        expect(number.isActive).not.toBeTruthy();
        number.speed(2).changeBy(800); // duration = 800 units / 2 units per ms = 400 ms
        number.update(40); // 10%
        expect(number.current).not.toBeCloseTo(Math.pow(0.1, 2) * 1000);
        expect(number.current).toBeCloseTo(1080);
    });
}


function testNumberCanOnlyBeChangedIfNotActive(): void {
    test('number can only be changed if not active', () => {
        const number = new DynamicNumber();
        expect(number.isActive).not.toBeTruthy();
        number.changeTo(100);
        expect(number.current).toBe(100);
        expect(number.isActive).not.toBeTruthy();
        number.duration(1000).changeTo(200);
        expect(number.isActive).toBeTruthy();
        number.changeTo(300);
        number.update(200);
        expect(number.current).not.toBeCloseTo(140);
        expect(number.current).toBeCloseTo(120);
    });
}

function testChangeToDoesNothingIfSetToCurrentValue(): void {
    test('changeTo() does nothing if set to current value', () => {
        const number = new DynamicNumber(500);
        number.duration(500).changeTo(500);
        expect(number.isActive).not.toBeTruthy();
        number.update(50);
        expect(number.current).toBe(500);
    });
}

function testIfDurationIsNotSetChangeToChangesCurrentValueImmediately(): void {
    test('if duration is not set, changeTo() changes current value immediately', () => {
        const number = new DynamicNumber(100);
        number.changeTo(200);
        expect(number.isActive).not.toBeTruthy();
        expect(number.current).toBe(200);
    });
}

function testIfDurationIsSetChangeToMakesNumberActiveAndChangesValueDynamicallyOverTime(): void {
    test('if duration is set, changeTo() makes number active and changes value dynamically over time', () => {
        const number = new DynamicNumber(500);
        number.duration(800).changeTo(1000);
        expect(number.isActive).toBeTruthy();
        number.update(80); // 10%
        expect(number.current).toBeCloseTo(550);
    });
}


function testChangeByCanOnlyChangeNumberIfNotActive(): void {
    test('number can only be changed if not active', () => {
        const number = new DynamicNumber(100);
        expect(number.isActive).not.toBeTruthy();
        number.changeBy(100);
        expect(number.current).toBe(200);
    });
}

function testChangeByDoesNothingIfNIs0(): void {
    test('does nothing if n is 0', () => {
        const number = new DynamicNumber();
        number.duration(1000).changeBy(0);
        expect(number.isActive).not.toBeTruthy();
    });
}

function testIfDurationIsNotSetChangeByChangesValueImmediately(): void {
    test('if duration is not set, changes current value immediately', () => {
        const number = new DynamicNumber(50);
        number.changeBy(100);
        expect(number.isActive).not.toBeTruthy();
        expect(number.current).toBe(150);
    });
}

function testIfDurationIsSetChangeByMakesNumberActiveAndChangesValueDynamicallyOverTime(): void {
    test('if duration is set, makes number active and changes value dynamically over time', () => {
        const number = new DynamicNumber(50);
        number.duration(1000).changeBy(100);
        expect(number.isActive).toBeTruthy();
        expect(number.current).toBe(50);
        number.update(200);
        number.update(200);
        number.update(200);
        number.update(200);
        number.update(200);
        expect(number.isActive).not.toBeTruthy();
        expect(number.current).toBe(150);
    });
}

function testChangeByChangesNumberByCorrectAmountImmediately(): void {
    test('changes number by correct amount immediately', () => {
        const number = new DynamicNumber(200);
        number.changeBy(200);
        expect(number.isActive).not.toBeTruthy();
        expect(number.current).toBe(400);
    });
}

function testChangeByChangesNumberByCorrectAmountOverTime(): void {
    test('changes number by correct amount dynamically over time', () => {
        const number = new DynamicNumber(10);
        number.duration(500).changeBy(10);
        number.update(100);
        number.update(100);
        number.update(100);
        number.update(100);
        number.update(100);
        expect(number.current).toBe(20);
    });
}

function testChangeByCanChangeNumberByANegativeAmount(): void {
    test('can be a negative value', () => {
        const number = new DynamicNumber(10);
        number.changeBy(-20);
        expect(number.current).toBe(-10);
    });
}


function testTurningOnAndOffStopsAndStartsUpdate(): void {
    test('turning off and on stops and starts update', () => {
        const number = new DynamicNumber(500);
        number.duration(1000).changeTo(1000);
        number.turnOff();
        number.update(200);
        expect(number.current).toBe(500);
        number.turnOn();
        number.update(200);
        expect(number.current).toBe(600);
    });
}


function testDoesNotUpdateIfNotActive(): void {
    test('does not update if not active', () => {
        const number = new DynamicNumber(100);
        expect(number.isActive).not.toBeTruthy();
        number.update(200);
        expect(number.current).toBe(100);
    });
}

function testDoesNotUpdateIfTurnedOff(): void {
    test('does not update if turned off', () => {
        const number = new DynamicNumber(100);
        number.duration(1000).changeBy(-100);
        number.turnOff();
        number.update(100);
        expect(number.current).toBe(100);
        number.update(1000);
        expect(number.current).toBe(100);
    });
}

function testUpdatesIfActiveAndTurnedOn(): void {
    test('updates if active and turned on (if duration set, change method called, having been inactive)', () => {
        const number = new DynamicNumber(100);
        number.duration(1000).changeTo(500);
        expect(number.isActive).toBeTruthy();
        number.turnOn();
        number.update(100);
        expect(number.current).toBe(140);
    });
}


function testCanBeSavedWhetherTurnedOnOrOff(): void {
    test('can be saved whether turned on or off', () => {
        const number = new DynamicNumber(-500);
        number.duration(500).changeTo(500);
        expect(number.isActive).toBeTruthy();
        number.turnOff();
        number.load(number.save());
        expect(number.isActive).toBeTruthy();
        number.turnOn();
        number.update(100);
        expect(number.current).toBe(-300);

    });
}

function testBehavesTheSameAfterSaveAndLoad(): void {
    test('behaves the same after save and load', () => {

        let number: DynamicNumber;

        number = new DynamicNumber(500);
        number.speed(1).changeTo(1000);
        expect(number.isActive).toBeTruthy();
        expect(number.current).toBe(500);
        number.update(100);
        expect(number.current).toBeCloseTo(600);
        number.update(100);
        expect(number.current).toBeCloseTo(700);
        number.update(100);
        expect(number.current).toBeCloseTo(800);
        number.update(100);
        expect(number.current).toBeCloseTo(900);
        number.update(100);
        expect(number.current).toBe(1000);


        number = new DynamicNumber(500);
        number.load(number.save()); // <==
        number.speed(1).changeTo(1000);
        number.load(number.save()); // <==
        expect(number.isActive).toBeTruthy();
        expect(number.current).toBe(500);
        number.update(100);
        number.load(number.save()); // <==
        expect(number.current).toBeCloseTo(600);
        number.update(100);
        number.load(number.save()); // <==
        expect(number.current).toBeCloseTo(700);
        number.update(100);
        number.load(number.save()); // <==
        expect(number.current).toBeCloseTo(800);
        number.update(100);
        number.load(number.save()); // <==
        expect(number.current).toBeCloseTo(900);
        number.update(100);
        number.load(number.save()); // <==
        expect(number.current).toBe(1000);


    });
}

function testReturnsTrueOnValidLoad(): void {
    test('load returns true on valid load', () => {
        const unit = new DynamicUnit();
        const number = new DynamicNumber();
        expect(
            number.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: 1000,
                    next: 1500,
                    difference: 500,
                    current: 1250,
                    duration: 1000,
                    speed: 0,
                    isOn: true
                })
            )
        ).toBeTruthy();
    });
}

function testReturnsFalseIfUnitPropertyMissing(): void {
    test('load returns false if "unit" property missing', () => {
        // const unit = new DynamicUnit();
        const number = new DynamicNumber();
        expect(
            number.load(
                JSON.stringify({
                    // unit: unit.save(),
                    previous: 1000,
                    next: 1500,
                    difference: 500,
                    current: 1250,
                    duration: 1000,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testReturnsFalseIfPreviousPropertyMissing(): void {
    test('load returns false if "previous" property missing', () => {
        const unit = new DynamicUnit();
        const number = new DynamicNumber();
        expect(
            number.load(
                JSON.stringify({
                    unit: unit.save(),
                    // previous: 1000,
                    next: 1500,
                    difference: 500,
                    current: 1250,
                    duration: 1000,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testReturnsFalseIfNextPropertyMissing(): void {
    test('load returns false if "next" property missing', () => {
        const unit = new DynamicUnit();
        const number = new DynamicNumber();
        expect(
            number.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: 1000,
                    // next: 1500,
                    difference: 500,
                    current: 1250,
                    duration: 1000,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testReturnsFalseIfDifferencePropertyMissing(): void {
    test('load returns false if "difference" property missing', () => {
        const unit = new DynamicUnit();
        const number = new DynamicNumber();
        expect(
            number.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: 1000,
                    next: 1500,
                    // difference: 500,
                    current: 1250,
                    duration: 1000,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testReturnsFalseIfCurrentPropertyMissing(): void {
    test('load returns false if "current" property missing', () => {
        const unit = new DynamicUnit();
        const number = new DynamicNumber();
        expect(
            number.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: 1000,
                    next: 1500,
                    difference: 500,
                    // current: 1250,
                    duration: 1000,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testReturnsFalseIfDurationPropertyMissing(): void {
    test('load returns false if "duration" property missing', () => {
        const unit = new DynamicUnit();
        const number = new DynamicNumber();
        expect(
            number.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: 1000,
                    next: 1500,
                    difference: 500,
                    current: 1250,
                    // duration: 1000,
                    speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testReturnsFalseIfSpeedPropertyMissing(): void {
    test('load returns false if "speed" property missing', () => {
        const unit = new DynamicUnit();
        const number = new DynamicNumber();
        expect(
            number.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: 1000,
                    next: 1500,
                    difference: 500,
                    current: 1250,
                    duration: 1000,
                    // speed: 0,
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testReturnsFalseIfIsOnPropertyMissing(): void {
    test('load returns false if "isOn" property missing', () => {
        const unit = new DynamicUnit();
        const number = new DynamicNumber();
        expect(
            number.load(
                JSON.stringify({
                    unit: unit.save(),
                    previous: 1000,
                    next: 1500,
                    difference: 500,
                    current: 1250,
                    duration: 1000,
                    speed: 0,
                    // isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}


function testReturnsExpectedCurrentValueDuringFullDuration(): void {
    test('returns expected current value during full duration', () => {
        const number = new DynamicNumber();
        number.duration(1000).changeTo(1000);
        expect(number.current).toBe(0);
        number.update(100);
        expect(number.current).toBe(100);
        number.update(100);
        expect(number.current).toBe(200);
        number.update(100);
        expect(number.current).toBe(300);
        number.update(100);
        expect(number.current).toBe(400);
        number.update(100);
        expect(number.current).toBe(500);
        number.update(100);
        expect(number.current).toBe(600);
        number.update(100);
        expect(number.current).toBe(700);
        number.update(100);
        expect(number.current).toBe(800);
        number.update(100);
        expect(number.current).toBe(900);
        number.update(100);
        expect(number.current).toBe(1000);
    });
}

function testReturnsExpectedCurrentValueDuringFullDurationWhenSpeedIsSet(): void {
    test('returns expected current value during full duration when speed is set', () => {
        const number = new DynamicNumber(500);
        number.speed(2).changeTo(1000); // duration = 500 units / 2 units per ms = 250ms
        expect(number.current).toBe(500);
        number.update(25);
        expect(number.current).toBeCloseTo(550);
        number.update(25);
        expect(number.current).toBeCloseTo(600);
        number.update(25);
        expect(number.current).toBeCloseTo(650);
        number.update(25);
        expect(number.current).toBeCloseTo(700);
        number.update(25);
        expect(number.current).toBeCloseTo(750);
        number.update(25);
        expect(number.current).toBeCloseTo(800);
        number.update(25);
        expect(number.current).toBeCloseTo(850);
        number.update(25);
        expect(number.current).toBeCloseTo(900);
        number.update(25);
        expect(number.current).toBeCloseTo(950);
        number.update(25);
        expect(number.current).toBe(1000);

    });
}

function testReturnsExpectedCurrentValueDuringFullDurationWithEaseApplied(): void {
    test('returns expected current value during full duration with ease applied', () => {
        const number = new DynamicNumber(500);
        number.duration(1000).ease('easeInQuint').changeTo(1000);
        number.update(100);
        expect(number.current).toBeCloseTo(500 + (Math.pow(0.1, 5) * 500));
        number.update(100);
        expect(number.current).toBeCloseTo(500 + (Math.pow(0.2, 5) * 500));
        number.update(100);
        expect(number.current).toBeCloseTo(500 + (Math.pow(0.3, 5) * 500));
        number.update(100);
        expect(number.current).toBeCloseTo(500 + (Math.pow(0.4, 5) * 500));
        number.update(100);
        expect(number.current).toBeCloseTo(500 + (Math.pow(0.5, 5) * 500));
        number.update(100);
        expect(number.current).toBeCloseTo(500 + (Math.pow(0.6, 5) * 500));
        number.update(100);
        expect(number.current).toBeCloseTo(500 + (Math.pow(0.7, 5) * 500));
        number.update(100);
        expect(number.current).toBeCloseTo(500 + (Math.pow(0.8, 5) * 500));
        number.update(100);
        expect(number.current).toBeCloseTo(500 + (Math.pow(0.9, 5) * 500));
        number.update(100);
        expect(number.current).toBe(1000);
    });
}

function testWorksWithNumbers0To1(): void {
    test('works with numbers 0 - 1', () => {
        const number = new DynamicNumber();
        number.duration(500).changeTo(0.5);
        number.update(100);
        expect(number.current).toBeCloseTo(0.1);
        number.update(100);
        expect(number.current).toBeCloseTo(0.2);
        number.update(100);
        expect(number.current).toBeCloseTo(0.3);
        number.update(100);
        expect(number.current).toBeCloseTo(0.4);
        number.update(100);
        expect(number.current).toBe(0.5);
    });
}

function testWorksWithPositiveToHigherNumbers(): void {
    test('works with positive to higher numbers', () => {
        const number = new DynamicNumber(10);
        number.duration(1000).changeTo(20);
        number.update(100);
        expect(number.current).toBe(11);
    });
}

function testWorksWithPositiveToLowerNumber(): void {
    test('works with positive to lower numbers', () => {
        const number = new DynamicNumber(10);
        number.duration(1000).changeTo(5);
        number.update(100);
        expect(number.current).toBeCloseTo(9.5);
    });
}

function testWorksWithNegativeToHigherNumbers(): void {
    test('works with negative to higher numbers', () => {
        const number = new DynamicNumber(-10);
        number.duration(1000).changeTo(-5);
        number.update(100);
        expect(number.current).toBeCloseTo(-9.5);
    });
}

function testWorksWithNegativeToLowerNumbers(): void {
    test('works with negative to lower numbers', () => {
        const number = new DynamicNumber(-10);
        number.duration(1000).changeTo(-20);
        number.update(100);
        expect(number.current).toBeCloseTo(-11);
    });
}
