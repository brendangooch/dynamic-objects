/**
 * 
 */

import { DynamicUnit } from "./dynamic-unit.js";

let unit: DynamicUnit
beforeEach(() => {
    unit = new DynamicUnit();
});

testAll();
function testAll(): void {
    describe('DynamicUnit', () => {

        // public get isActive(): boolean
        testStartsInactive();
        testDoesNotBecomeActiveOnceDurationIsSet();
        testBecomesActiveOnceDurationIsSetAndRunIsCalled();
        testBecomesNotActiveOnceDurationHasElapsed();
        testCanBeActiveWhetherTurnedOnOrOff();

        // public get current(): number
        testInitialCurrentValueIs0();
        testCurrentReturns1OnceDurationHasElapsed();
        testCurrentIsTheSameValueWhetherUnitIsOnOrOff();

        // public duration(ms: number): DynamicUnit
        testDurationCanOnlyBeSetIfNotActive();
        testDurationMustBeGreaterThan0();

        // public ease(easeOption: tEaseOption): DynamicUnit
        testEaseCanOnlyBeSetIfNotActive();
        testEaseIsSetBackToNoneOnceDurationHasElapsed();

        // public run(): boolean
        testDoesNotRunIfDurationHasNotBeenSet();
        testDoesNothingIfAlreadyActive();
        testDoesRunIfDurationHasBeenSetAndIsNotActive();

        // public turnOn(): void
        // public turnOff(): void
        testTurningOnAndOffStopsAndStartsUpdate();

        // public update(ms: number): void
        testDoesNotUpdateIfNotActive();
        testUpdatesIfActiveAndTurnedOn();

        // public load(json: string): boolean
        // public save(): string
        testCanBeSavedWhetherTurnedOnOrOff();
        testBehavesTheSameAfterSaveAndLoad();
        testLoadReturnsTrueOnValidLoad();
        testLoadReturnsFalseIfElapsedPropertyMissing();
        testLoadReturnsFalseIfDurationPropertyMissing();
        testLoadReturnsFalseIfEaseOptionPropertyMissing();
        testLoadReturnsFalseIfInOnPropertyMissing();

        testReturnsExpectedCurrentValueDuringFullDuration();
        testReturnsExpectedCurrentValueDuringFullDurationWithEaseApplied();

    });
}


function testStartsInactive(): void {
    test('starts inactive', () => {
        expect(unit.isActive).not.toBeTruthy();
    });
}

function testDoesNotBecomeActiveOnceDurationIsSet(): void {
    test('does not becomes active once duration is set', () => {
        unit.duration(10);
        expect(unit.isActive).not.toBeTruthy();
    });
}

function testBecomesActiveOnceDurationIsSetAndRunIsCalled(): void {
    test('becomes active once duration is set and run() is called', () => {
        unit.duration(10).run();
        expect(unit.isActive).toBeTruthy();
    });
}

function testBecomesNotActiveOnceDurationHasElapsed(): void {
    test('becomes inactive once duration has elapsed', () => {
        unit.duration(1000).run();
        expect(unit.isActive).toBeTruthy();
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        expect(unit.isActive).not.toBeTruthy();
    });
}

function testCanBeActiveWhetherTurnedOnOrOff(): void {
    test('can be active whether turned on or off', () => {
        unit.duration(10).run();
        unit.turnOff();
        expect(unit.isActive).toBeTruthy();
        unit.turnOn();
        expect(unit.isActive).toBeTruthy();
    });
}


function testInitialCurrentValueIs0(): void {
    test('initial current value is 0', () => {
        expect(unit.current).toBe(0);
    });
}

function testCurrentReturns1OnceDurationHasElapsed(): void {
    test('current returns 1 once duration has elapsed', () => {
        unit.duration(1000).run();
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        expect(unit.current).toBe(1);
    });
}

function testCurrentIsTheSameValueWhetherUnitIsOnOrOff(): void {
    test('current is the same value whether unit is on or off', () => {
        unit.turnOff();
        expect(unit.current).toBe(0);
        unit.turnOn();
        expect(unit.current).toBe(0);
        unit.duration(1000).run();
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.turnOff();
        expect(unit.current).toBe(1);
        unit.turnOn();
        expect(unit.current).toBe(1);
    });
}


function testDurationCanOnlyBeSetIfNotActive(): void {
    test('duration can only be set if not active', () => {
        unit.duration(1000).run();
        expect(unit.isActive).toBeTruthy();
        unit.duration(2000);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        expect(unit.isActive).not.toBeTruthy();
    });
}

function testDurationMustBeGreaterThan0(): void {
    test('duration must be greater than 0', () => {
        unit.duration(0).run();
        expect(unit.isActive).not.toBeTruthy();
        unit.duration(-1).run();
        expect(unit.isActive).not.toBeTruthy();
    });
}


function testEaseCanOnlyBeSetIfNotActive(): void {
    test('ease can only be set if not active', () => {
        unit.duration(1000).run();
        expect(unit.isActive).toBeTruthy();
        unit.ease('easeInQuad');
        unit.update(200);
        expect(unit.current).toBe(0.2);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        expect(unit.isActive).not.toBeTruthy();
        unit.duration(1000).ease('easeInQuad').run();
        expect(unit.isActive).toBeTruthy();
        unit.update(200);
        expect(unit.current).toBe(Math.pow(0.2, 2));
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
    });
}

function testEaseIsSetBackToNoneOnceDurationHasElapsed(): void {
    test('current ease is reset back to none once duration has elapsed', () => {
        unit.duration(1000).ease('easeInOutCubic').run();
        unit.update(1000);
        unit.duration(1000).run();
        unit.update(200);
        expect(unit.current).not.toBe(Math.pow(0.2, 2));
        expect(unit.current).toBe(0.2);
    });
}


function testDoesNotRunIfDurationHasNotBeenSet(): void {
    test('does not run if duration has not been set', () => {
        unit.run();
        expect(unit.isActive).not.toBeTruthy();
    });
}

function testDoesNothingIfAlreadyActive(): void {
    test('does nothing if already active', () => {
        unit.duration(1000).run();
        expect(unit.isActive).toBeTruthy();
        unit.duration(500).ease('easeInExpo').run();
        expect(unit.isActive).toBeTruthy();
        unit.update(200);
        expect(unit.current).toBe(0.2);
    });
}

function testDoesRunIfDurationHasBeenSetAndIsNotActive(): void {
    test('does run if duration has been set and is not active', () => {
        expect(unit.isActive).not.toBeTruthy();
        unit.duration(1000).run();
        expect(unit.isActive).toBeTruthy();
    });
}


function testTurningOnAndOffStopsAndStartsUpdate(): void {
    test('turning off and on stops and starts update', () => {
        unit.duration(1000).run();
        unit.update(200);
        expect(unit.current).toBe(0.2);
        unit.turnOff();
        unit.update(200);
        expect(unit.current).toBe(0.2);
        unit.turnOn();
        unit.update(200);
        expect(unit.current).toBe(0.4);
    });
}


function testDoesNotUpdateIfNotActive(): void {
    test('does not update if not active', () => {
        expect(unit.current).toBe(0);
        expect(unit.isActive).not.toBeTruthy();
        unit.update(200);
        expect(unit.current).toBe(0);
        expect(unit.isActive).not.toBeTruthy();
    });
}

function testUpdatesIfActiveAndTurnedOn(): void {
    test('updates if active and turned on', () => {
        unit.duration(1000).run();
        expect(unit.isActive).toBeTruthy();
        expect(unit.current).toBe(0);
        unit.update(200);
        expect(unit.current).toBe(0.2);
        unit.turnOff();
        unit.update(200);
        expect(unit.current).toBe(0.2);
        unit.turnOn();
        unit.update(200);
        expect(unit.current).toBe(0.4);
    });
}


function testCanBeSavedWhetherTurnedOnOrOff(): void {
    test('can be saved whether turned on or off', () => {

        unit.duration(1000).run();
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.update(200);
        unit.load(unit.save());

        unit.duration(1000).run();

        unit.update(200);
        expect(unit.isActive).toBeTruthy();
        expect(unit.current).toBe(0.2);

        unit.turnOff(); // <--
        unit.load(unit.save());
        expect(unit.isActive).toBeTruthy();
        expect(unit.current).toBe(0.2);

        unit.turnOn(); // <--
        unit.update(200);
        unit.load(unit.save());
        expect(unit.isActive).toBeTruthy();
        expect(unit.current).toBe(0.4);

    });
}

function testBehavesTheSameAfterSaveAndLoad(): void {
    test('behaves the same after save and load', () => {

        unit.load(unit.save()); // <--
        unit.duration(1000).run();

        unit.load(unit.save()); // <--
        unit.update(200);

        unit.load(unit.save()); // <--
        expect(unit.isActive).toBeTruthy();
        expect(unit.current).toBe(0.2);
        unit.update(200);

        unit.load(unit.save()); // <--
        expect(unit.isActive).toBeTruthy();
        expect(unit.current).toBe(0.4);
        unit.update(200);

        unit.load(unit.save()); // <--
        expect(unit.isActive).toBeTruthy();
        expect(unit.current).toBe(0.6);
        unit.update(200);

        unit.load(unit.save()); // <--
        expect(unit.isActive).toBeTruthy();
        expect(unit.current).toBe(0.8);
        unit.update(200);

        unit.load(unit.save()); // <--
        expect(unit.isActive).not.toBeTruthy();
        expect(unit.current).toBe(1);

        unit.duration(1000).run();

        unit.load(unit.save()); // <--
        unit.update(200);
        unit.load(unit.save()); // <--
        expect(unit.isActive).toBeTruthy();
        expect(unit.current).toBe(0.2);

    });
}

function testLoadReturnsTrueOnValidLoad(): void {
    test('load returns true on valid load', () => {
        expect(
            unit.load(
                JSON.stringify({
                    elapsed: 100,
                    duration: 1000,
                    easeOption: 'noEase',
                    isOn: true
                })
            )
        ).toBeTruthy();
    });
}

function testLoadReturnsFalseIfElapsedPropertyMissing(): void {
    test('load returns false if "elapsed" property missing', () => {
        expect(
            unit.load(
                JSON.stringify({
                    // elapsed: 100,
                    duration: 1000,
                    easeOption: 'noEase',
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfDurationPropertyMissing(): void {
    test('load returns false if "duration" property missing', () => {
        expect(
            unit.load(
                JSON.stringify({
                    elapsed: 100,
                    // duration: 1000,
                    easeOption: 'noEase',
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfEaseOptionPropertyMissing(): void {
    test('load returns false if "easeOption" property missing', () => {
        expect(
            unit.load(
                JSON.stringify({
                    elapsed: 100,
                    duration: 1000,
                    // easeOption: 'noEase',
                    isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}

function testLoadReturnsFalseIfInOnPropertyMissing(): void {
    test('load returns false if "isOn" property missing', () => {
        expect(
            unit.load(
                JSON.stringify({
                    elapsed: 100,
                    duration: 1000,
                    easeOption: 'noEase',
                    // isOn: true
                })
            )
        ).not.toBeTruthy();
    });
}



function testReturnsExpectedCurrentValueDuringFullDuration(): void {
    test('returns expected current value during full duration', () => {
        unit.duration(1000).run();
        expect(unit.isActive).toBeTruthy();
        expect(unit.current).toBe(0);
        unit.update(200);
        expect(unit.current).toBe(0.2);
        unit.update(200);
        expect(unit.current).toBe(0.4);
        unit.update(200);
        expect(unit.current).toBe(0.6);
        unit.update(200);
        expect(unit.current).toBe(0.8);
        unit.update(200);
        expect(unit.isActive).not.toBeTruthy();
        expect(unit.current).toBe(1);
        unit.update(200);
        expect(unit.isActive).not.toBeTruthy();
        expect(unit.current).toBe(1);
    });
}

function testReturnsExpectedCurrentValueDuringFullDurationWithEaseApplied(): void {
    test('returns expected current value during full duration with ease applied', () => {
        unit.duration(1000).ease('easeInCubic').run();
        expect(unit.isActive).toBeTruthy();
        expect(unit.current).toBe(0);
        unit.update(200);
        expect(unit.current).toBeCloseTo(Math.pow(0.2, 3));
        unit.update(200);
        expect(unit.current).toBeCloseTo(Math.pow(0.4, 3));
        unit.update(200);
        expect(unit.current).toBeCloseTo(Math.pow(0.6, 3));
        unit.update(200);
        expect(unit.current).toBeCloseTo(Math.pow(0.8, 3));
        unit.update(200);
        expect(unit.isActive).not.toBeTruthy();
        expect(unit.current).toBe(1);
        unit.update(200);
        expect(unit.isActive).not.toBeTruthy();
        expect(unit.current).toBe(1);
    });
}
