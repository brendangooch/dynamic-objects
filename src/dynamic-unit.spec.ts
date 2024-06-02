/**
 * uses load() and save() to conveniently set and retrieve internal state
 */

import { DynamicUnit } from "./dynamic-unit.js";
import * as Ease from '@brendangooch/ease';

let unit: DynamicUnit;
beforeEach(() => {
    unit = new DynamicUnit();
});

describe('DynamicUnit', () => {
    testAll();
});

function testAll(): void {

    testLoadAndSave();
    testStart();
    testGetCurrent();
    testGetIsComplete();
    testGetIsActive();
    testGetIsOn();
    testUpdate();
    testReset();

}

function testLoadAndSave(): void {
    describe('load() & save()', () => {

        // can save and load state
        testCanSaveAndLoadState();

        // load throws error if invalid json
        testLoadThrowsErrorIfInvalidJSON();

        // load throws error if ANY property is missing
        testLoadThrowsErrorIfAnyPropertyIsMissing();

        // reloads correct ease function
        testReloadsCorrectEaseFn();

    });
}

// can save and load state
function testCanSaveAndLoadState(): void {
    test('can save and load state', () => {

        // default
        const savedA = unit.save();
        unit.load(savedA);
        const savedB = unit.save();

        // saves then loads
        expect(savedA).toBe(savedB);

        // altered properties
        unit.load(JSON.stringify({
            on: true,
            elapsed: 100,
            duration: 1000,
            ease: 'easeInExpo',
            repeat: true,
            invert: true,
            alternate: true,
            round: true
        }));

        const savedC = unit.save();
        unit.load(savedC);
        const savedD = unit.save();
        // saves then loads
        expect(savedC).toBe(savedD);

        unit.reset();
        unit.start(1000, { repeat: 2, alternate: true, invert: true, round: true, ease: 'easeInOutBounce' });
        unit.update(100);
        unit.update(100);
        const savedE = unit.save();
        unit.load(savedE);
        const savedF = unit.save();
        expect(savedE).toBe(savedF);

    });
}

// load throws error if invalid json
function testLoadThrowsErrorIfInvalidJSON(): void {
    test('load throws error if invalid json', () => {
        expect(() => { unit.load('{foo}') }).toThrow();
    });
}

// load throws error if ANY property is missing
function testLoadThrowsErrorIfAnyPropertyIsMissing(): void {
    describe('load throws error if ANY property is missing', () => {
        testValidLoad();
        testInvalidLoadMissingOn();
        testInvalidLoadMissingElapsed();
        testInvalidLoadMissingDuration();
        testInvalidLoadMissingEase();
        testInvalidLoadMissingRepeat();
        testInvalidLoadMissingInvert();
        testInvalidLoadMissingAlternate();
        testInvalidLoadMissingRound();
    });
}

function testValidLoad(): void {
    test('valid load - nothing missing', () => {
        expect(() => {
            unit.load(JSON.stringify({
                on: false,
                elapsed: 0,
                duration: 0,
                ease: 'noEase',
                repeat: false,
                invert: false,
                alternate: false,
                round: false
            }));
        }).not.toThrow();
    });
}

function testInvalidLoadMissingOn(): void {
    test('invalid load - "on" missing', () => {
        expect(() => {
            unit.load(JSON.stringify({
                elapsed: 0,
                duration: 0,
                ease: 'noEase',
                repeat: false,
                invert: false,
                alternate: false,
                round: false
            }));
        }).toThrow();
    });
}

function testInvalidLoadMissingElapsed(): void {
    test('invalid load - "elapsed" missing', () => {
        expect(() => {
            unit.load(JSON.stringify({
                on: false,
                duration: 0,
                ease: 'noEase',
                repeat: false,
                invert: false,
                alternate: false,
                round: false
            }));
        }).toThrow();
    });
}

function testInvalidLoadMissingDuration(): void {
    test('invalid load - "duration" missing', () => {
        expect(() => {
            unit.load(JSON.stringify({
                on: false,
                elapsed: 0,
                ease: 'noEase',
                repeat: false,
                invert: false,
                alternate: false,
                round: false
            }));
        }).toThrow();
    });
}

function testInvalidLoadMissingEase(): void {
    test('invalid load - "ease" missing', () => {
        expect(() => {
            unit.load(JSON.stringify({
                on: false,
                elapsed: 0,
                duration: 0,
                repeat: false,
                invert: false,
                alternate: false,
                round: false
            }));
        }).toThrow();
    });
}

function testInvalidLoadMissingRepeat(): void {
    test('invalid load - "repeat" missing', () => {
        expect(() => {
            unit.load(JSON.stringify({
                on: false,
                elapsed: 0,
                duration: 0,
                ease: 'noEase',
                invert: false,
                alternate: false,
                round: false
            }));
        }).toThrow();
    });
}

function testInvalidLoadMissingInvert(): void {
    test('invalid load - "invert" missing', () => {
        expect(() => {
            unit.load(JSON.stringify({
                on: false,
                elapsed: 0,
                duration: 0,
                ease: 'noEase',
                repeat: false,
                alternate: false,
                round: false
            }));
        }).toThrow();
    });
}

function testInvalidLoadMissingAlternate(): void {
    test('invalid load - "alternate" missing', () => {
        expect(() => {
            unit.load(JSON.stringify({
                on: false,
                elapsed: 0,
                duration: 0,
                ease: 'noEase',
                repeat: false,
                invert: false,
                round: false
            }));
        }).toThrow();
    });
}

function testInvalidLoadMissingRound(): void {
    test('invalid load - "round" missing', () => {
        expect(() => {
            unit.load(JSON.stringify({
                on: false,
                elapsed: 0,
                duration: 0,
                ease: 'noEase',
                repeat: false,
                invert: false,
                alternate: false
            }));
        }).toThrow();
    });
}

// reloads correct ease function
function testReloadsCorrectEaseFn(): void {
    test('reloads correct ease function', () => {

        unit.start(100, { ease: 'easeInQuart' });

        unit.update(20);
        expect(unit.current).toBeCloseTo(Ease.easeInQuart(20 / 100));

        // save and reload
        const savedState = unit.save();
        unit.load(savedState);

        unit.update(20);
        expect(unit.current).toBeCloseTo(Ease.easeInQuart(40 / 100));

    });
}



function testStart(): void {
    describe('start()', () => {

        // can only start new cycle if !isActive && duration > 0
        testCanOnlyStartNewCycleIfNotIsActiveAndDurationGreaterThan0();

        // state is reset
        testStateIsReset();

        // isOn is true
        testIsOnIsTrue();

        // only duration is changed if no options are passed
        testNoPopertiesAreAlteredIfNotPassedAsParams();

        // duration is updated correctly
        testDurationIsUpdatedCorrectly();

        // ease is set, if passed as a parameter
        testEaseIsSetIfPassedAsAParam();

        // repeat is set correctly, if passed as parameter
        testRepeatIsSetIfPassedAsAParam();

        // repeat is not set if it is not a whole number
        testRepeatIsNotSetIfItIsNotAWholeNumber();

        // repeat is 0 if not passed as a parameter
        testRepeatIs0IfNotPassedAsAParam();

        // alternate has no effect if repeat is not set as a parameter
        testAlternateHasNoEffectIfRepeatIsNotSetAsAParam();

        // alternate IS set if repeat is also set
        testAlternateISSetIfRepeatIsAlsoSet();

        // alternate can be set to true or false
        testAlternateCanBeSetToTrueOrFalse();

        // invert can be set to true or false
        testInvertCanBeSetToTrueOrFalse();

        // round can be set to true or false
        testRoundCanBeSetToTrueOrFalse();

    });
}

// can only start new cycle if !isActive && duration > 0
function testCanOnlyStartNewCycleIfNotIsActiveAndDurationGreaterThan0(): void {
    describe('can only start new cycle if !isActive && duration > 0', () => {
        testStartsSuccessfully();
        testFailsToStartIfIsCompleteIsFalse();
        testFailsToStartIfDurationIsLessThan0();
    });
};

function testStartsSuccessfully(): void {
    test('starts successfully', () => {
        unit.start(1000);
        const updatedState = JSON.parse(unit.save());
        expect(updatedState.duration).toBe(1000);
    });
}

function testFailsToStartIfIsCompleteIsFalse(): void {
    test('isActive === true fails', () => {
        const initState = JSON.parse(unit.save());
        initState.elapsed = 100;
        initState.duration = 200;
        unit.load(JSON.stringify(initState));
        unit.start(1000);
        const updatedState = JSON.parse(unit.save());
        expect(updatedState.duration).toBe(200);
    });
}

function testFailsToStartIfDurationIsLessThan0(): void {
    test('duration < 0 fails', () => {
        const initState = JSON.parse(unit.save());
        const initDuration = initState.duration;
        unit.start(-1);
        const updatedState = JSON.parse(unit.save());
        expect(updatedState.duration).toBe(initDuration);
    });
}

// state is reset
function testStateIsReset(): void {
    test('state is reset', () => {
        const initState = JSON.parse(unit.save());
        initState.invert = true;
        initState.alternate = true;
        initState.round = true;
        initState.ease = 'easeInOutElastic';
        unit.load(JSON.stringify(initState));
        unit.start(1000);
        const updatedState = JSON.parse(unit.save());
        expect(updatedState.invert).toBe(false);
        expect(updatedState.alternate).toBe(false);
        expect(updatedState.round).toBe(false);
        expect(updatedState.ease).toBe('noEase');
    });
};

// isOn is true
function testIsOnIsTrue(): void {
    test('isOn is true', () => {
        expect(unit.isOn).toBe(false);
        unit.start(1000);
        expect(unit.isOn).toBe(true);
    });
};

// no properties are altered if not passed as optional params
function testNoPopertiesAreAlteredIfNotPassedAsParams(): void {
    test('no properties are altered if not passed as optional params', () => {
        const initState = JSON.parse(unit.save());
        unit.start(500);
        const updatedState = JSON.parse(unit.save());
        expect(initState.ease).toBe(updatedState.ease);
        expect(initState.repeat).toBe(updatedState.repeat);
        expect(initState.invert).toBe(updatedState.invert);
        expect(initState.alternate).toBe(updatedState.alternate);
        expect(initState.round).toBe(updatedState.round);
    });
};

// duration is updated correctly
function testDurationIsUpdatedCorrectly(): void {
    test('duration is updated correctly', () => {
        unit.start(1500);
        const state = JSON.parse(unit.save());
        expect(state.duration).toBe(1500);
    });
};

// ease is set, if passed as a parameter
function testEaseIsSetIfPassedAsAParam(): void {
    test('ease is set, if passed as a parameter', () => {
        unit.start(1000, { ease: 'easeInQuad' });
        const state = JSON.parse(unit.save());
        expect(state.ease).toBe('easeInQuad');
    });
};

// repeat is set correctly, if passed as parameter
function testRepeatIsSetIfPassedAsAParam(): void {
    test('repeat is set correctly, if passed as parameter', () => {
        unit.start(1000, { repeat: 5 });
        const state = JSON.parse(unit.save());
        expect(state.repeat).toBe(5);
    })
};

// repeat is not set if it is not a whole number
function testRepeatIsNotSetIfItIsNotAWholeNumber(): void {
    test('repeat is not set if it is not a whole number', () => {
        unit.start(1000, { repeat: 1.123 });
        const state = JSON.parse(unit.save());
        expect(state.repeat).toBe(0);
    })
};

// repeat is 0 if not passed as a parameter
function testRepeatIs0IfNotPassedAsAParam(): void {
    test('repeat is 0 if not passed as a parameter', () => {
        unit.start(1000);
        const state = JSON.parse(unit.save());
        expect(state.repeat).toBe(0);
    })
};

// alternate has no effect if repeat is not set as a parameter
function testAlternateHasNoEffectIfRepeatIsNotSetAsAParam(): void {
    test('alternate has no effect if repeat is not set as a parameter', () => {
        unit.start(1000, { alternate: true });
        const state = JSON.parse(unit.save());
        expect(state.alternate).toBe(false);
    });
};

// alternate IS set if repeat is also set
function testAlternateISSetIfRepeatIsAlsoSet(): void {
    test('alternate IS set if repeat is also set', () => {
        unit.start(1000, { alternate: true, repeat: 5 });
        const state = JSON.parse(unit.save());
        expect(state.alternate).toBe(true);
    });
}

// alternate can be set to true or false
function testAlternateCanBeSetToTrueOrFalse(): void {
    describe('alternate can be set to true or false', () => {
        test('true', () => {
            unit.start(1000, { alternate: true, repeat: 5 });
            const state = JSON.parse(unit.save());
            expect(state.alternate).toBe(true);
        });
        test('false', () => {
            unit.start(1000, { alternate: false, repeat: 5 });
            const state = JSON.parse(unit.save());
            expect(state.alternate).toBe(false);
        });
    });
};

// invert can be set to true or false
function testInvertCanBeSetToTrueOrFalse(): void {
    describe('invert can be set to true or false', () => {
        test('true', () => {
            unit.start(1000, { invert: true });
            const state = JSON.parse(unit.save());
            expect(state.invert).toBe(true);
        });
        test('false', () => {
            unit.start(1000, { invert: false });
            const state = JSON.parse(unit.save());
            expect(state.invert).toBe(false);
        });
    });
};

// round can be set to true or false
function testRoundCanBeSetToTrueOrFalse(): void {
    describe('round can be set to true or false', () => {
        test('true', () => {
            unit.start(1000, { round: true });
            const state = JSON.parse(unit.save());
            expect(state.round).toBe(true);
        });
        test('false', () => {
            unit.start(1000, { round: false });
            const state = JSON.parse(unit.save());
            expect(state.round).toBe(false);
        });
    });
};





function testGetCurrent(): void {
    describe('get current()', () => {

        // initial returned value is 0
        testInitialReturnedValueIs0();

        // value is 1 if elapsed equals duration
        testValueIs1IfElapsedEqualsDuration();

        // value is < 1 if isActive
        testValueIeLessThan1IfIsActive();

        // value can NEVER be less than 0 or more than 1
        testValueCanNEVERBeLessThan0OrMoreThan1();

        // default is to apply no ease, no invert, no round to returned value
        testDefaultIsToApplyNoEaseNoInvertNoRoundToReturnedValue();

        // applies current ease correctly
        testAppliesCurrentEaseCorrectly();

        // return value is inverted if invert is true
        testReturnValueIsInvertedIfInvertIsTrue();

        // return value is rounded if round is true
        testReturnedValueIsRoundedIfRoundIsTrue();

    });
}

// initial returned value is 0
function testInitialReturnedValueIs0(): void {
    test('initial returned value is 0', () => {
        expect(unit.current).toBe(0);
    });
}

// value is 1 if elapsed equals duration
function testValueIs1IfElapsedEqualsDuration(): void {
    test('value is 1 if elapsed === duration', () => {
        unit.start(100);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(21); // 101 -> 100
        expect(unit.current).toBe(1);
    });
}

// value is < 1 if isActive
function testValueIeLessThan1IfIsActive(): void {
    test('value is < 1 if isActive', () => {
        unit.start(100);
        expect(unit.isActive).toBe(true);
        expect(unit.current).toBeLessThan(1);
        unit.update(20);
        expect(unit.isActive).toBe(true);
        expect(unit.current).toBeLessThan(1);
        unit.update(20);
        expect(unit.isActive).toBe(true);
        expect(unit.current).toBeLessThan(1);
        unit.update(20);
        expect(unit.isActive).toBe(true);
        expect(unit.current).toBeLessThan(1);
        unit.update(20);
        expect(unit.isActive).toBe(true);
        expect(unit.current).toBeLessThan(1);
        unit.update(20);
        expect(unit.isActive).toBe(false);
        expect(unit.current).toBe(1);
    });
}

// value can NEVER be less than 0 or more than 1
// set some dodgy state to check that value is clamped, in case ease function gives dodgy output
function testValueCanNEVERBeLessThan0OrMoreThan1(): void {
    describe('value can NEVER be less than 0 or more than 1', () => {
        test('derived ~ > 1', () => {
            const initState = JSON.parse(unit.save());
            initState.elapsed = 1100;
            initState.duration = 1000;
            unit.load(JSON.stringify(initState));
            expect(unit.current).toBeLessThanOrEqual(1);
        });
        test('derived ~ < 0', () => {
            const initState = JSON.parse(unit.save());
            initState.elapsed = -100;
            initState.duration = 1000;
            unit.load(JSON.stringify(initState));
            expect(unit.current).toBeGreaterThanOrEqual(0);
        });
    });
}

// default is to apply no ease, no invert, no round to returned value
function testDefaultIsToApplyNoEaseNoInvertNoRoundToReturnedValue(): void {
    test('default is to apply no ease, no invert, no round to returned value', () => {
        unit.start(500);
        unit.update(100);
        expect(unit.current).toBeCloseTo(0.2);
        unit.update(100);
        expect(unit.current).toBeCloseTo(0.4);
        unit.update(100);
        expect(unit.current).toBeCloseTo(0.6);
        unit.update(100);
        expect(unit.current).toBeCloseTo(0.8);
        unit.update(100);
        expect(unit.current).toBeCloseTo(1);
    });
}

// applies current ease correctly
function testAppliesCurrentEaseCorrectly(): void {
    test('applies current ease correctly', () => {
        let current: number;
        unit.start(900, { ease: 'easeInCubic' });
        unit.update(50);
        current = Math.pow(50 / 900, 3);
        expect(unit.current).toBeCloseTo(current);
        unit.update(50);
        current = Math.pow(100 / 900, 3);
        expect(unit.current).toBeCloseTo(current);
        unit.update(50);
        current = Math.pow(150 / 900, 3);
        expect(unit.current).toBeCloseTo(current);
        unit.update(50);
        current = Math.pow(200 / 900, 3);
        expect(unit.current).toBeCloseTo(current);
    });
}

// return value is inverted if invert is true
function testReturnValueIsInvertedIfInvertIsTrue(): void {
    test('return value is inverted if invert is true', () => {
        unit.start(1000, { invert: true, repeat: 1 });
        expect(unit.current).toBeCloseTo(1);
        unit.update(200);
        expect(unit.current).toBeCloseTo(0.8);
        unit.update(200);
        expect(unit.current).toBeCloseTo(0.6);
        unit.update(200);
        expect(unit.current).toBeCloseTo(0.4);
        unit.update(200);
        expect(unit.current).toBeCloseTo(0.2);
        unit.update(200);
        expect(unit.current).toBeCloseTo(1);

        unit.update(200);
        expect(unit.current).toBeCloseTo(0.8);
        unit.update(200);
        expect(unit.current).toBeCloseTo(0.6);
        unit.update(200);
        expect(unit.current).toBeCloseTo(0.4);
        unit.update(200);
        expect(unit.current).toBeCloseTo(0.2);
        unit.update(200);
        expect(unit.current).toBeCloseTo(0);
    });
}

// return value is rounded if round is true
function testReturnedValueIsRoundedIfRoundIsTrue(): void {
    test('return value is rounded if round is true', () => {
        unit.start(1000, { round: true });
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(0);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
        unit.update(100);
        expect(unit.current).toBe(1);
    });
}






function testGetIsComplete(): void {
    describe('get isComplete()', () => {

        // default value is true
        testDefaultGetIsCompleteValueIsTrue();

        // false whilst elapsed < duration
        testGetIsCompleteIsFalseWhileElapsedIsLessThanDuration();

        // true once elapsed === duration && repeat === 0
        testIsCompleteIsTrueOnceElapsedEqualsDurationANDRepeatIs0();

    });
}

// default value is true
function testDefaultGetIsCompleteValueIsTrue(): void {
    test('default value is true', () => {
        expect(unit.isComplete).toBe(true);
        expect(unit.isActive).toBe(false);
    });
}

// false whilst elapsed < duration
function testGetIsCompleteIsFalseWhileElapsedIsLessThanDuration(): void {
    test('false whilst elapsed < duration', () => {
        unit.start(100);
        unit.update(20);
        expect(unit.isComplete).toBe(false);
        unit.update(20);
        expect(unit.isComplete).toBe(false);
        unit.update(20);
        expect(unit.isComplete).toBe(false);
        unit.update(20);
        expect(unit.isComplete).toBe(false);
        unit.update(20);
        expect(unit.isComplete).toBe(true);
    });
}

// true once elapsed === duration && repeat === 0
function testIsCompleteIsTrueOnceElapsedEqualsDurationANDRepeatIs0(): void {
    describe('true once elapsed === duration && repeat === 0', () => {
        test('no repeat', () => {
            unit.start(100);
            unit.update(20);
            expect(unit.isComplete).toBe(false);
            unit.update(20);
            expect(unit.isComplete).toBe(false);
            unit.update(20);
            expect(unit.isComplete).toBe(false);
            unit.update(20);
            expect(unit.isComplete).toBe(false);
            unit.update(20);
            expect(unit.isComplete).toBe(true);
        });
        test('2 repeats', () => {
            unit.start(100, { repeat: 2 });
            // repeat = 2
            for (let ms = 20; ms <= 100; ms += 20) {
                unit.update(20);
                expect(unit.isComplete).toBe(false);
            }
            // repeat = 1
            for (let ms = 20; ms <= 100; ms += 20) {
                unit.update(20);
                expect(unit.isComplete).toBe(false);
            }
            // repeat = 0
            for (let ms = 20; ms <= 80; ms += 20) {
                unit.update(20);
                expect(unit.isComplete).toBe(false);
            }
            unit.update(20);
            expect(unit.isComplete).toBe(true);
        });
    });
}






function testGetIsActive(): void {
    describe('get isActive()', () => {

        // default value is false
        testGetIsActiveDefaultsToFalse();

        // true whilst elapsed < duration
        testGetIsActiveIsTrueWhilstElapsedIsLessThanDuration();

        // false once elapsed === duration && repeat === 0
        testGetIsActiveIsFalseOnceElapsedEqualsDurationAndRepeatIs0();

    });
}

// default value is false
function testGetIsActiveDefaultsToFalse(): void {
    test('default value is false', () => {
        expect(unit.isActive).toBe(false);
    });
}

// true whilst elapsed < duration
function testGetIsActiveIsTrueWhilstElapsedIsLessThanDuration(): void {
    test('true whilst elapsed < duration', () => {
        unit.start(1000);
        unit.update(200);
        expect(unit.isActive).toBe(true);
        unit.update(200);
        expect(unit.isActive).toBe(true);
        unit.update(200);
        expect(unit.isActive).toBe(true);
        unit.update(200);
        expect(unit.isActive).toBe(true);
        unit.update(200);
        expect(unit.isActive).toBe(false);
    });
}

// false once elapsed === duration && repeat === 0
function testGetIsActiveIsFalseOnceElapsedEqualsDurationAndRepeatIs0(): void {
    describe('false once elapsed === duration && repeat === 0', () => {
        test('no repeat', () => {
            unit.start(100);
            unit.update(20);
            expect(unit.isActive).toBe(true);
            unit.update(20);
            expect(unit.isActive).toBe(true);
            unit.update(20);
            expect(unit.isActive).toBe(true);
            unit.update(20);
            expect(unit.isActive).toBe(true);
            unit.update(20);
            expect(unit.isActive).toBe(false);
        });
        test('2 repeats', () => {
            unit.start(100, { repeat: 2 });
            // repeat = 2
            for (let ms = 20; ms <= 100; ms += 20) {
                unit.update(20);
                expect(unit.isActive).toBe(true);
            }
            // repeat = 1
            for (let ms = 20; ms <= 100; ms += 20) {
                unit.update(20);
                expect(unit.isActive).toBe(true);
            }
            // repeat = 0
            for (let ms = 20; ms <= 80; ms += 20) {
                unit.update(20);
                expect(unit.isActive).toBe(true);
            }
            unit.update(20);
            expect(unit.isActive).toBe(false);
        });
    });
}






function testGetIsOn(): void {
    describe('get isOn()', () => {

        // default value is false
        testGetIsOnDefaultIsFalse();

        // turns on once start called
        testTurnsOnOnceStartCalled();

        // turns off correctly once isComplete true
        turnsOffCorrectlyOnceIsCompleteTrue();


    });
}

// default value is false
function testGetIsOnDefaultIsFalse(): void {
    test('default value is false', () => {
        expect(unit.isOn).toBe(false);
    });
}

// turns on once start called
function testTurnsOnOnceStartCalled(): void {
    test('turns on once start called', () => {
        expect(unit.isOn).toBe(false);
        unit.start(100);
        expect(unit.isOn).toBe(true);
    });
}

// turns off correctly once isComplete true
function turnsOffCorrectlyOnceIsCompleteTrue(): void {
    describe('turns off correctly once isComplete true', () => {
        test('no repeat', () => {
            unit.start(1000);
            for (let ms = 100; ms <= 1000; ms += 100) {
                unit.update(100);
                expect(unit.isOn).toBe(true);
            }
            unit.update(100);
            expect(unit.isOn).toBe(false);
        });
        test('repeat: 3', () => {
            unit.start(1000, { repeat: 3 });
            // repeat: 3 means FOUR cycles
            for (let rp = 0; rp < 4; rp++) {
                for (let ms = 100; ms <= 1000; ms += 100) {
                    unit.update(100);
                    expect(unit.isOn).toBe(true);
                }
            }
            unit.update(100);
            expect(unit.isOn).toBe(false);
        });
    });
}




function testUpdate(): void {
    describe('update()', () => {

        // increases elapsed by correct amount of time
        testIncreasesElapsedByCorrectAmountOfTime();

        // elapsed === duration once it surpasses duration
        testElapsedEqualsDurationOnceItSurpassesDuration();

        // repeats cycle if repeat > 0
        testRepeatsCycleIfRepeatIsGreaterThan0();

        // alternates current output if repeat > 0 && alternate is true
        testAlternatesCurrentOutputIfRepeatAndAlternateAreTrue();

        // elapsed goes back to 0 if repeat > 0
        testElapsedGoesBackTo0IfRepeatIsGreaterThan0();

        // invert is flipped if alternate is true
        testInvertIsFlippedIfAlternateIsTrue();

        // turns off IF no more repeats
        testTurnsOffIFNorMoreRepeats();

    });
}

// increases elapsed by correct amount of time
function testIncreasesElapsedByCorrectAmountOfTime(): void {
    test('increases elapsed by correct amount of time', () => {
        let state: string = unit.save();
        expect(JSON.parse(state).elapsed).toBe(0);
        unit.start(100);
        expect(JSON.parse(state).elapsed).toBe(0);
        unit.update(21);
        state = unit.save();
        expect(JSON.parse(state).elapsed).toBe(21);
        unit.update(18);
        state = unit.save();
        expect(JSON.parse(state).elapsed).toBe(39);
        unit.update(21);
        state = unit.save();
        expect(JSON.parse(state).elapsed).toBe(60);
        unit.update(20);
        state = unit.save();
        expect(JSON.parse(state).elapsed).toBe(80);
        unit.update(20);
        state = unit.save();
        expect(JSON.parse(state).elapsed).toBe(100);
        unit.start(100);
        state = unit.save();
        expect(JSON.parse(state).elapsed).toBe(0);

    });
}

// elapsed === duration once it surpasses duration
function testElapsedEqualsDurationOnceItSurpassesDuration(): void {
    test('elapsed === duration once it surpasses duration', () => {
        let state: string = unit.save();
        expect(JSON.parse(state).elapsed).toBe(0);
        unit.start(100);
        expect(JSON.parse(state).elapsed).toBe(0);
        unit.update(50);
        state = unit.save();
        expect(JSON.parse(state).elapsed).toBe(50);
        unit.update(50);
        state = unit.save();
        expect(JSON.parse(state).elapsed).toBe(100);
        unit.update(10);
        state = unit.save();
        expect(JSON.parse(state).elapsed).toBe(100);
        unit.update(10);
        state = unit.save();
        expect(JSON.parse(state).elapsed).toBe(100);
        unit.update(10);
        state = unit.save();
        expect(JSON.parse(state).elapsed).toBe(100);
    });
}

// repeats cycle if repeat > 0
function testRepeatsCycleIfRepeatIsGreaterThan0(): void {
    test('repeats cycle if repeat > 0', () => {
        unit.start(100, { repeat: 1 });
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        expect(unit.isOn).toBe(true);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        expect(unit.isOn).toBe(true);
        unit.update(20);
        expect(unit.isOn).toBe(false);
    });
}

// alternates current output if repeat > 0 && alternate is true
function testAlternatesCurrentOutputIfRepeatAndAlternateAreTrue(): void {
    test('alternates current output if repeat > 0 && alternate is true', () => {

        unit.start(100, { repeat: 2, alternate: true });

        expect(unit.current).toBeCloseTo(0);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.2);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.4);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.6);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.8);
        unit.update(20);

        expect(unit.current).toBeCloseTo(1);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.8);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.6);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.4);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.2);
        unit.update(20);

        expect(unit.current).toBeCloseTo(0);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.2);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.4);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.6);
        unit.update(20);
        expect(unit.current).toBeCloseTo(0.8);
        unit.update(20);

    });
}

// elapsed goes back to 0 if repeat > 0
function testElapsedGoesBackTo0IfRepeatIsGreaterThan0(): void {
    describe('elapsed goes back to 0 if repeat > 0', () => {
        test('no repeat', () => {
            unit.start(100);
            unit.update(20);
            unit.update(20);
            unit.update(20);
            unit.update(20);
            unit.update(20);
            expect(JSON.parse(unit.save()).elapsed).toBe(100);
        });
        test('repeat: 1', () => {
            unit.start(100, { repeat: 1 });
            unit.update(20);
            unit.update(20);
            unit.update(20);
            unit.update(20);
            unit.update(20);
            expect(JSON.parse(unit.save()).elapsed).toBe(0);
        });
    });
}

// invert is flipped if alternate is true
function testInvertIsFlippedIfAlternateIsTrue(): void {
    test('reverse is flipped if alternate is true', () => {
        unit.start(100, { repeat: 1, alternate: true });
        expect(JSON.parse(unit.save()).invert).toBe(false);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        expect(JSON.parse(unit.save()).invert).toBe(true);
    });
}

// turns off IF no more repeats
function testTurnsOffIFNorMoreRepeats(): void {
    test('turns off IF no more repeats', () => {
        expect(unit.isOn).toBe(false);
        unit.start(100, { repeat: 1 });
        expect(unit.isOn).toBe(true);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        expect(unit.isOn).toBe(true);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        unit.update(20);
        expect(unit.isOn).toBe(true);
        unit.update(20);
        expect(unit.isOn).toBe(false);
    });
}






function testReset(): void {
    describe('reset()', () => {

        // resets all properties to default values
        testResetsAllPropertiesToDefaultValues();

    });
}

// resets all properties to default values
function testResetsAllPropertiesToDefaultValues(): void {
    test('resets all properties to default values', () => {

        const initState = JSON.parse(unit.save());
        const alteredState = JSON.parse(unit.save());

        alteredState.on = true;
        alteredState.elapsed = 10;
        alteredState.duration = 100;
        alteredState.ease = 'easeInQuint';
        alteredState.repeat = 4;
        alteredState.invert = true;
        alteredState.alternate = true;
        alteredState.round = true;

        unit.load(JSON.stringify(alteredState));

        unit.reset();
        const resetState = JSON.parse(unit.save());

        expect(resetState.on).toBe(initState.on);
        expect(resetState.elapsed).toBe(initState.elapsed);
        expect(resetState.duration).toBe(initState.duration);
        expect(resetState.ease).toBe(initState.ease);
        expect(resetState.repeat).toBe(initState.repeat);
        expect(resetState.invert).toBe(initState.invert);
        expect(resetState.alternate).toBe(initState.alternate);
        expect(resetState.round).toBe(initState.round);

    });
}