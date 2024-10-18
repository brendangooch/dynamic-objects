/**
 * 
 */

testAll();
function testAll(): void {
    describe('DynamicNumber', () => {
        test('dummy', () => { });
    });
}

// import { DynamicNumber } from "./dynamic-number.js";
// import { DynamicUnit } from "../unit/dynamic-unit.js";

// testAll();
// function testAll(): void {
//     describe('DynamicNumber', () => {
//         testConstructor();
//         testGetIsActive();
//         testgetCurrent();
//         testLoadAndSave();
//         testUpdate();
//         testTurnOnOff();
//         testChange();
//     });
// }

// function testConstructor(): void {
//     describe('constructor()', () => {
//         test('initial value defaults to 0 if not supplied', () => {
//             const number = new DynamicNumber();
//             expect(number.current).toBe(0);
//         });
//     });

// }

// // public get isActive(): boolean
// function testGetIsActive(): void {
//     describe('get isActive()', () => {
//         testNotActiveOnInstantiation();
//         testActiveAfterChangeCalledWithPositiveDuration();
//         testActiveWhilstNotComplete();
//         testNotActiveAfterChangeCalledWithDurationOf0();
//         testNotActiveAfterChangeCalledWithNoDuration();
//         testNotActiveOnceComplete();
//     });
// }

// function testNotActiveOnInstantiation(): void {
//     test('not active on instantiation', () => {
//         const number = new DynamicNumber(10);
//         expect(number.isActive).not.toBeTruthy();
//     });
// }

// function testActiveAfterChangeCalledWithPositiveDuration(): void {
//     test('is active after change called with positive duration', () => {
//         const number = new DynamicNumber(10);
//         number.change(20, 1000);
//         expect(number.isActive).toBeTruthy();
//     });
// }

// function testActiveWhilstNotComplete(): void {
//     test('is active whilst transition from previous to next number not complete', () => {
//         const number = new DynamicNumber(10);
//         number.change(20, 1000);
//         expect(number.isActive).toBeTruthy();
//         number.update(200);
//         expect(number.isActive).toBeTruthy();
//         number.update(200);
//         expect(number.isActive).toBeTruthy();
//         number.update(200);
//         expect(number.isActive).toBeTruthy();
//         number.update(200);
//         expect(number.isActive).toBeTruthy();
//         number.update(201);
//         expect(number.isActive).not.toBeTruthy();

//     });
// }

// function testNotActiveAfterChangeCalledWithDurationOf0(): void {
//     test('not active after change() called with duration of 0', () => {
//         const number = new DynamicNumber(10);
//         number.change(20, 0);
//         expect(number.isActive).not.toBeTruthy();
//     });
// }

// function testNotActiveAfterChangeCalledWithNoDuration(): void {
//     test('not active after change() called with duration of 0', () => {
//         const number = new DynamicNumber(10);
//         number.change(20);
//         expect(number.isActive).not.toBeTruthy();
//     });
// }

// function testNotActiveOnceComplete(): void {
//     test('not active once transition from previous to next is complete', () => {
//         const number = new DynamicNumber(10);
//         number.change(20, 1000);
//         number.update(200);
//         number.update(200);
//         number.update(200);
//         number.update(200);
//         number.update(201);
//         expect(number.isActive).not.toBeTruthy();
//     });
// }






// // public get current(): number
// function testgetCurrent(): void {
//     describe('get current()', () => {
//         testReturnsInitialValueUntilChangeCalled();
//         testReturnsGivenValueWhenChangeCalledWithDurationOf0();
//         testReturnsCorrectValuesWhenChangedFromPositiveToHigherNumber();
//         testReturnsCorrectValuesWhenChangedFromPositiveToLowerNumber();
//         testReturnsCorrectValuesWhenChangedFromPositiveToNegativeNumber();
//         testReturnsCorrectValuesWhenChangedFromNegativeToPositiveNumber();
//         testReturnsCorrectValuesWhenChangedFromNegativeToHigherNumber();
//         testReturnsCorrectValuesWhenChangedFromNegativeToLowerNumber();
//         testReturnsCorrectValuesWhenChangedFrom0ToPositiveNumber();
//         testReturnsCorrectValuesWhenChangedFrom0ToNegativeNumber();
//         testWorksWithNonIntegers();
//         testWorksWithNumbersBetween0And1();
//         testWorksWithNumbersBetween0AndMinus1();
//     });
// }

// function testReturnsInitialValueUntilChangeCalled(): void {
//     test('returns initial value until change is called and updated', () => {
//         const number = new DynamicNumber(100);
//         expect(number.current).toBe(100);
//         number.change(200, 1000);
//         expect(number.current).toBe(100);
//         number.update(100);
//         expect(number.current).toBeCloseTo(110);
//     });
// }

// function testReturnsGivenValueWhenChangeCalledWithDurationOf0(): void {
//     test('returns given value when change called with duration of 0', () => {
//         const number = new DynamicNumber(100);
//         number.change(200, 0);
//         expect(number.current).toBe(200);
//     });
// }

// function testReturnsCorrectValuesWhenChangedFromPositiveToHigherNumber(): void {
//     test('returns correct values when changed from positive to higher number with positive duration', () => {
//         const number = new DynamicNumber(100);
//         number.change(200, 1000);
//         number.update(200);
//         expect(number.current).toBeCloseTo(120);
//         number.update(200);
//         expect(number.current).toBeCloseTo(140);
//         number.update(200);
//         expect(number.current).toBeCloseTo(160);
//         number.update(200);
//         expect(number.current).toBeCloseTo(180);
//         number.update(201);
//         expect(number.current).toBe(200);
//     });
// }

// function testReturnsCorrectValuesWhenChangedFromPositiveToLowerNumber(): void {
//     test('returns correct values when changed from positive to lower number with positive duration', () => {
//         const number = new DynamicNumber(100);
//         number.change(50, 1000);
//         number.update(200);
//         expect(number.current).toBeCloseTo(90);
//         number.update(200);
//         expect(number.current).toBeCloseTo(80);
//         number.update(200);
//         expect(number.current).toBeCloseTo(70);
//         number.update(200);
//         expect(number.current).toBeCloseTo(60);
//         number.update(201);
//         expect(number.current).toBe(50);
//     });
// }

// function testReturnsCorrectValuesWhenChangedFromPositiveToNegativeNumber(): void {
//     test('returns correct values when changed from positive to negative number with positive duration', () => {
//         const number = new DynamicNumber(100);
//         number.change(-100, 1000);
//         number.update(200);
//         expect(number.current).toBeCloseTo(60);
//         number.update(200);
//         expect(number.current).toBeCloseTo(20);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-20);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-60);
//         number.update(201);
//         expect(number.current).toBe(-100);
//     });
// }

// function testReturnsCorrectValuesWhenChangedFromNegativeToPositiveNumber(): void {
//     test('returns correct values when changed from negative to positive number with positive duration', () => {
//         const number = new DynamicNumber(-100);
//         number.change(100, 1000);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-60);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-20);
//         number.update(200);
//         expect(number.current).toBeCloseTo(20);
//         number.update(200);
//         expect(number.current).toBeCloseTo(60);
//         number.update(201);
//         expect(number.current).toBe(100);
//     });
// }

// function testReturnsCorrectValuesWhenChangedFromNegativeToHigherNumber(): void {
//     test('returns correct values when changed from negative to higher number with positive duration', () => {
//         const number = new DynamicNumber(-200);
//         number.change(-100, 1000);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-180);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-160);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-140);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-120);
//         number.update(201);
//         expect(number.current).toBe(-100);
//     });
// }

// function testReturnsCorrectValuesWhenChangedFromNegativeToLowerNumber(): void {
//     test('returns correct values when changed from negative to lower number with positive duration', () => {
//         const number = new DynamicNumber(-100);
//         number.change(-200, 1000);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-120);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-140);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-160);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-180);
//         number.update(201);
//         expect(number.current).toBe(-200);
//     });
// }

// function testReturnsCorrectValuesWhenChangedFrom0ToPositiveNumber(): void {
//     test('returns correct values when changed from 0 to positive number with positive duration', () => {
//         const number = new DynamicNumber(0);
//         number.change(100, 1000);
//         number.update(200);
//         expect(number.current).toBeCloseTo(20);
//         number.update(200);
//         expect(number.current).toBeCloseTo(40);
//         number.update(200);
//         expect(number.current).toBeCloseTo(60);
//         number.update(200);
//         expect(number.current).toBeCloseTo(80);
//         number.update(201);
//         expect(number.current).toBe(100);
//     });
// }

// function testReturnsCorrectValuesWhenChangedFrom0ToNegativeNumber(): void {
//     test('returns correct values when changed from 0 to negative number with positive duration', () => {
//         const number = new DynamicNumber(0);
//         number.change(-100, 1000);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-20);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-40);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-60);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-80);
//         number.update(201);
//         expect(number.current).toBe(-100);
//     });
// }

// function testWorksWithNonIntegers(): void {
//     test('works with non-integers', () => {
//         const number = new DynamicNumber(0.5);
//         number.change(1.5, 1000);
//         number.update(200);
//         expect(number.current).toBeCloseTo(0.7);
//         number.update(200);
//         expect(number.current).toBeCloseTo(0.9);
//         number.update(200);
//         expect(number.current).toBeCloseTo(1.1);
//         number.update(200);
//         expect(number.current).toBeCloseTo(1.3);
//         number.update(201);
//         expect(number.current).toBe(1.5);
//     });
// }

// function testWorksWithNumbersBetween0And1(): void {
//     test('works with numbers between 0 and 1', () => {
//         const number = new DynamicNumber(0);
//         number.change(1, 1000);
//         number.update(200);
//         expect(number.current).toBeCloseTo(0.2);
//         number.update(200);
//         expect(number.current).toBeCloseTo(0.4);
//         number.update(200);
//         expect(number.current).toBeCloseTo(0.6);
//         number.update(200);
//         expect(number.current).toBeCloseTo(0.8);
//         number.update(201);
//         expect(number.current).toBe(1);
//     });
// }

// function testWorksWithNumbersBetween0AndMinus1(): void {
//     test('works with numbers between 0 and -1', () => {
//         const number = new DynamicNumber(0);
//         number.change(-1, 1000);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-0.2);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-0.4);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-0.6);
//         number.update(200);
//         expect(number.current).toBeCloseTo(-0.8);
//         number.update(201);
//         expect(number.current).toBe(-1);
//     });
// }





// // public load(json: string): void
// function testLoadAndSave(): void {
//     describe('load(...) / save()', () => {
//         testLoadDoesNotThrowErrorIfValidLoad();
//         testLoadThrowsErrorIfInvalidJSON();
//         testLoadThrowsErrorIfUnitPropertyMissing();
//         testLoadThrowsErrorIfPreviousPropertyMissing();
//         testLoadThrowsErrorIfNextPropertyMissing();
//         testLoadThrowsErrorIfIsOnPropertyMissing();
//         testContinuesToBehaveAsExpectedAfterSaveAndReload();
//     });
// }

// function testLoadDoesNotThrowErrorIfValidLoad(): void {
//     test('load does not throw error on valid load', () => {
//         const unit = new DynamicUnit();
//         const number = new DynamicNumber(50);
//         expect(() => number.load(JSON.stringify({
//             unit: unit.save(),
//             previous: 50,
//             next: 100,
//             isOn: true
//         }))).not.toThrow();
//     });
// }

// function testLoadThrowsErrorIfInvalidJSON(): void {
//     test('load throws error if invalid JSON passed to it', () => {
//         const number = new DynamicNumber(50);
//         expect(() => number.load('{')).toThrow();
//     });
// }

// function testLoadThrowsErrorIfUnitPropertyMissing(): void {
//     test('load throws error if "unit" property missing', () => {
//         // const unit = new DynamicUnit();
//         const number = new DynamicNumber(50);
//         expect(() => number.load(JSON.stringify({
//             // unit: unit.load(unit.save()),
//             previous: 50,
//             next: 100,
//             isOn: true
//         }))).toThrow();
//     });
// }

// function testLoadThrowsErrorIfPreviousPropertyMissing(): void {
//     test('load throws error if "previous" property missing', () => {
//         const unit = new DynamicUnit();
//         const number = new DynamicNumber(50);
//         expect(() => number.load(JSON.stringify({
//             unit: unit.load(unit.save()),
//             // previous: 50,
//             next: 100,
//             isOn: true
//         }))).toThrow();
//     });
// }

// function testLoadThrowsErrorIfNextPropertyMissing(): void {
//     test('load throws error if "next" property missing', () => {
//         const unit = new DynamicUnit();
//         const number = new DynamicNumber(50);
//         expect(() => number.load(JSON.stringify({
//             unit: unit.load(unit.save()),
//             previous: 50,
//             // next: 100,
//             isOn: true
//         }))).toThrow();
//     });
// }

// function testLoadThrowsErrorIfIsOnPropertyMissing(): void {
//     test('load throws error if "isOn" property missing', () => {
//         const unit = new DynamicUnit();
//         const number = new DynamicNumber(50);
//         expect(() => number.load(JSON.stringify({
//             unit: unit.load(unit.save()),
//             previous: 50,
//             next: 100,
//             // isOn: true
//         }))).toThrow();
//     });
// }

// function testContinuesToBehaveAsExpectedAfterSaveAndReload(): void {
//     test('continues to behave as expected after save and reload', () => {
//         const number = new DynamicNumber(100);
//         number.load(number.save()); // <--
//         number.change(500, 2000);
//         expect(number.isActive).toBeTruthy();
//         number.update(100);
//         expect(number.current).toBeCloseTo(120);
//         number.load(number.save()); // <--
//         expect(number.isActive).toBeTruthy();
//         expect(number.current).toBeCloseTo(120);
//         number.update(100);
//         expect(number.current).toBeCloseTo(140);
//         number.load(number.save()); // <--
//         expect(number.isActive).toBeTruthy();
//         expect(number.current).toBeCloseTo(140);
//         number.update(200);
//         number.load(number.save()); // <--
//         expect(number.isActive).toBeTruthy();
//         expect(number.current).toBeCloseTo(180);
//         number.update(1400);
//         number.load(number.save()); // <--
//         expect(number.isActive).toBeTruthy();
//         expect(number.current).toBeCloseTo(460);
//         number.update(201);
//         number.load(number.save()); // <--
//         expect(number.isActive).not.toBeTruthy();
//         expect(number.current).toBe(500);
//     });

// }






// // public update(ms: number): void
// function testUpdate(): void {
//     describe('update(...)', () => {
//         testOnlyUpdatesWhenNumberIsTurnedOnAndActive();
//         testUpdatesNumberCorrectlyWithNoEase();
//         testUpdatesNumberCorrectlyWithEase();
//         testDoesNotUpdateOnceTransitionComplete();
//     });
// }

// function testOnlyUpdatesWhenNumberIsTurnedOnAndActive(): void {
//     test('only updates when number is turned on and active', () => {
//         const number = new DynamicNumber(10);
//         const prev = number.current;
//         number.update(100);
//         expect(number.current).toBe(prev);
//         number.change(20, 1000);
//         number.update(100);
//         expect(number.current).toBeCloseTo(11);
//         number.turnOff(); // <--
//         number.update(100);
//         expect(number.current).toBeCloseTo(11);
//     });
// }

// function testUpdatesNumberCorrectlyWithNoEase(): void {
//     test('updates number correctly with no ease (default)', () => {
//         const number = new DynamicNumber(1000);
//         number.change(2000, 100);
//         number.update(20);
//         expect(number.current).toBeCloseTo(1200);
//         number.update(20);
//         expect(number.current).toBeCloseTo(1400);
//         number.update(20);
//         expect(number.current).toBeCloseTo(1600);
//         number.update(20);
//         expect(number.current).toBeCloseTo(1800);
//         number.update(20);
//         expect(number.current).toBe(2000);
//     });
// }

// function testUpdatesNumberCorrectlyWithEase(): void {
//     test('updates number correctly with ease', () => {
//         const number = new DynamicNumber(10);
//         number.change(20, 1000, 'easeInCubic');
//         number.update(200);
//         expect(number.current).toBeCloseTo(10 + (10 * Math.pow(0.2, 3)));
//         number.update(200);
//         expect(number.current).toBeCloseTo(10 + (10 * Math.pow(0.4, 3)));
//         number.update(200);
//         expect(number.current).toBeCloseTo(10 + (10 * Math.pow(0.6, 3)));
//         number.update(200);
//         expect(number.current).toBeCloseTo(10 + (10 * Math.pow(0.8, 3)));
//         number.update(200);
//         expect(number.current).toBe(20);
//     });
// }

// function testDoesNotUpdateOnceTransitionComplete(): void {
//     test('does not update once transition from previous to next number complete', () => {
//         const number = new DynamicNumber(0);
//         number.change(10, 1000);
//         for (let ms = 100; ms < 1000; ms += 100) {
//             number.update(100);
//             expect(number.isActive).toBeTruthy();
//         }
//         for (let i = 1; i < 1000; i++) {
//             number.update(i * 100);
//             expect(number.isActive).not.toBeTruthy();
//         }
//     });
// }






// // public turnOn(): void
// function testTurnOnOff(): void {
//     describe('turnOn() / turnOff()', () => {
//         test('stops and starts number from updating', () => {
//             const number = new DynamicNumber(100);
//             number.change(200, 1000);
//             number.update(100);
//             expect(number.current).toBeCloseTo(110);
//             number.turnOff(); // <--
//             number.update(100);
//             expect(number.current).toBeCloseTo(110);
//             number.turnOn(); // <--
//             number.update(100);
//             expect(number.current).toBeCloseTo(120);
//             number.turnOff(); // <--
//             number.update(100);
//             expect(number.current).toBeCloseTo(120);
//             number.turnOn(); // <--
//             number.update(100);
//             expect(number.current).toBeCloseTo(130);
//         });
//     });
// }







// // public change(to: number, duration: number, ease: Ease.tEaseOption = 'noEase'): void
// function testChange(): void {
//     describe('change(...)', () => {
//         testNegativeDurationDoesNothing();
//         testDurationOf0InstantlyChangesCurrentValueAndDoesNotTurnOnOrMakeNumberActive();
//         testPostiveDurationChangesCurrentValueOverTimeAndTurnsNumberOnAndMakesItActive();
//         testNothingHappensIfToValueIsSameAsCurrentValue();

//     });
// }

// function testNegativeDurationDoesNothing(): void {
//     test('a negative duration changes nothing', () => {
//         const number = new DynamicNumber(100);
//         number.change(200, -1000);
//         expect(number.isActive).not.toBeTruthy();
//     });
// }

// function testDurationOf0InstantlyChangesCurrentValueAndDoesNotTurnOnOrMakeNumberActive(): void {
//     test('a duration of 0 (or no duration parameter provided) instantly changes current value and does not turn on or activate number', () => {
//         const number = new DynamicNumber(100);
//         number.change(200);
//         expect(number.isActive).not.toBeTruthy();
//         expect(number.current).toBe(200);
//     });
// }

// function testPostiveDurationChangesCurrentValueOverTimeAndTurnsNumberOnAndMakesItActive(): void {
//     test('a positive duration changes current value over time and turns on and activates number', () => {
//         const number = new DynamicNumber(100);
//         number.change(200, 1000);
//         expect(number.isActive).toBeTruthy();
//         expect(number.current).toBe(100);
//         number.update(100);
//         expect(number.current).toBeCloseTo(110);
//     });
// }

// function testNothingHappensIfToValueIsSameAsCurrentValue(): void {
//     test('nothing happens it To parameter === current value', () => {
//         const number = new DynamicNumber(100);
//         number.change(100, 1000);
//         expect(number.isActive).not.toBeTruthy();
//     });
// }