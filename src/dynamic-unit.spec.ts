/**
 * 
 */

testAll();
function testAll(): void {
    describe('DynamicUnit', () => {
        test('dummy', () => { });
    });
}



// import { DynamicUnit } from "./dynamic-unit.js";



// let unit: DynamicUnit;
// beforeEach(() => {
//     unit = new DynamicUnit();
// });

// describe('DynamicUnit', () => {
//     testAll();
// });

// function testAll(): void {
//     describe('DynamicUnit', () => {
//         testGetIsActive();
//         testGetCurrent();
//         testTurnOnOff();
//         testLoadAndSave();
//         testUpdate();
//         testRun();
//     });
// }

// // public get isActive(): boolean
// function testGetIsActive(): void {
//     describe('get isActive()', () => {

//         test('false on instantiation', () => {
//             expect(unit.isActive).not.toBeTruthy();
//         });

//         test('unit is active if elapsed !== duration', () => {
//             unit.run(1000);
//             expect(unit.isActive).toBeTruthy();
//             unit.update(200);
//             expect(unit.isActive).toBeTruthy();
//             unit.update(200);
//             expect(unit.isActive).toBeTruthy();
//             unit.update(200);
//             expect(unit.isActive).toBeTruthy();
//             unit.update(200);
//             expect(unit.isActive).toBeTruthy();
//             unit.update(200);
//             expect(unit.isActive).not.toBeTruthy();
//         });

//         test('unit is active regardless of whether it is on or off', () => {
//             unit.run(1000);
//             unit.update(200);
//             unit.turnOff();
//             expect(unit.isActive).toBeTruthy();
//         });

//     });
// }

// // public get current(): number
// function testGetCurrent(): void {
//     describe('get current()', () => {
//         testGetCurrentReturns0OnInstantiation();
//         testGetCurrentReturnsExpecttedValuesWithNoEase();
//         testGetCurrentReturnsExpecttedValuesWithEase();

//     });
// }

// function testGetCurrentReturns0OnInstantiation(): void {
//     test('returns 0 on instantiation', () => {
//         expect(unit.current).toBe(0);
//     });
// }

// function testGetCurrentReturnsExpecttedValuesWithNoEase(): void {
//     describe('returns expected values over 1000 ms with no ease', () => {

//         test('at 0%', () => {
//             unit.run(1000, 'noEase');
//             expect(unit.current).toBe(0);
//         });

//         test('at 25%', () => {
//             unit.run(1000, 'noEase');
//             unit.update(250);
//             expect(unit.current).toBeCloseTo(0.25);
//         });

//         test('at 50%', () => {
//             unit.run(1000, 'noEase');
//             unit.update(250);
//             unit.update(250);
//             expect(unit.current).toBeCloseTo(0.5);
//         });

//         test('at 75%', () => {
//             unit.run(1000, 'noEase');
//             unit.update(250);
//             unit.update(250);
//             unit.update(250);
//             expect(unit.current).toBeCloseTo(0.75);
//         });

//         test('at 100%', () => {
//             unit.run(1000, 'noEase');
//             unit.update(250);
//             unit.update(250);
//             unit.update(250);
//             unit.update(250);
//             expect(unit.current).toBeCloseTo(1);
//         });

//         test('cannot go over 100%', () => {
//             unit.run(1000, 'noEase');
//             unit.update(250);
//             unit.update(250);
//             unit.update(250);
//             unit.update(250);
//             expect(unit.current).toBeCloseTo(1);
//             unit.update(100);
//             expect(unit.current).toBe(1);
//             unit.update(100);
//             expect(unit.current).toBe(1);
//         });

//     });
// }

// function testGetCurrentReturnsExpecttedValuesWithEase(): void {
//     describe('returns expected values over 1000 ms with ease in quad', () => {

//         test('at 0%', () => {
//             unit.run(1000, 'easeInQuad');
//             expect(unit.current).toBe(0);
//         });

//         test('at 25%', () => {
//             unit.run(1000, 'easeInQuad');
//             unit.update(250);
//             expect(unit.current).toBeCloseTo(Math.pow(0.25, 2));
//         });

//         test('at 50%', () => {
//             unit.run(1000, 'easeInQuad');
//             unit.update(250);
//             unit.update(250);
//             expect(unit.current).toBeCloseTo(Math.pow(0.5, 2));
//         });

//         test('at 75%', () => {
//             unit.run(1000, 'easeInQuad');
//             unit.update(250);
//             unit.update(250);
//             unit.update(250);
//             expect(unit.current).toBeCloseTo(Math.pow(0.75, 2));
//         });

//         test('at 100%', () => {
//             unit.run(1000, 'easeInQuad');
//             unit.update(250);
//             unit.update(250);
//             unit.update(250);
//             unit.update(250);
//             expect(unit.current).toBeCloseTo(1);
//         });

//         test('cannot go over 100%', () => {
//             unit.run(1000, 'easeInQuad');
//             unit.update(250);
//             unit.update(250);
//             unit.update(250);
//             unit.update(250);
//             expect(unit.current).toBeCloseTo(1);
//             unit.update(100);
//             expect(unit.current).toBe(1);
//             unit.update(100);
//             expect(unit.current).toBe(1);
//         });

//     });
// }



// // public turnOn(): void
// // public turnOff(): void
// function testTurnOnOff(): void {
//     describe('turnOn() / turnOff()', () => {
//         test('turns update() method on and off', () => {
//             unit.run(1000);
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.2);
//             const beforeState = JSON.parse(unit.save());
//             expect(beforeState.isOn).toBeTruthy();
//             unit.turnOff(); // <--
//             const afterState = JSON.parse(unit.save());
//             expect(afterState.isOn).not.toBeTruthy();
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.2);
//             unit.turnOn(); // <--
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.4);
//         });
//     });
// }

// // public save(): string
// // public load(json: string): void
// function testLoadAndSave(): void {
//     describe('save()/load(...)', () => {
//         testLoadAndSaveThrowsErrorIfAnyPropertyIsMissingOnReload();
//         testLoadAndSaveLoadsAndSavesAUnitCorrectly();
//         testLoadThrowsErrorIfInvalidJSONReceived();
//     });
// }

// function testLoadAndSaveThrowsErrorIfAnyPropertyIsMissingOnReload(): void {
//     describe('throws errors if ANY property is missing on reload', () => {

//         test('nothing missing', () => {
//             expect(() => unit.load(JSON.stringify({
//                 elapsed: 500,
//                 duration: 1000,
//                 easeOption: 'easeInQuint',
//                 isOn: true
//             }))).not.toThrow();
//         });

//         test('missing elapsed', () => {
//             expect(() => unit.load(JSON.stringify({
//                 // elapsed: 500,
//                 duration: 1000,
//                 easeOption: 'easeInQuint',
//                 isOn: true
//             }))).toThrow();
//         });

//         test('missing duration', () => {
//             expect(() => unit.load(JSON.stringify({
//                 elapsed: 500,
//                 // duration: 1000,
//                 easeOption: 'easeInQuint',
//                 isOn: true
//             }))).toThrow();
//         });

//         test('missing easeOption', () => {
//             expect(() => unit.load(JSON.stringify({
//                 elapsed: 500,
//                 duration: 1000,
//                 // easeOption: 'easeInQuint',
//                 isOn: true
//             }))).toThrow();
//         });

//         test('missing isOn', () => {
//             expect(() => unit.load(JSON.stringify({
//                 elapsed: 500,
//                 duration: 1000,
//                 easeOption: 'easeInQuint'
//                 // isOn: true
//             }))).toThrow();
//         });

//     });

// }

// function testLoadAndSaveLoadsAndSavesAUnitCorrectly(): void {
//     describe('loads and saves a unit, maintaining properties correctly', () => {

//         test('has the same current value (duration and elapsed the same)', () => {
//             unit.run(1000);
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.2);
//             unit.load(unit.save()); // <--
//             expect(unit.current).toBeCloseTo(0.2);
//         });

//         test('has the same ease', () => {
//             unit.run(1000, 'easeInCubic');
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(Math.pow(0.2, 3));
//             unit.load(unit.save()); // <--
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(Math.pow(0.4, 3));
//         });

//         test('unit is still on/off', () => {
//             unit.run(1000);
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.2);
//             unit.turnOff();
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.2);
//             unit.load(unit.save()); // <--
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.2);
//             unit.turnOn();
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.4);
//             unit.load(unit.save()); // <--
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.6);

//         });

//     });
// }

// function testLoadThrowsErrorIfInvalidJSONReceived(): void {
//     expect(() => unit.load('{')).toThrow();
// }


// // public update(ms: number): void
// function testUpdate(): void {
//     describe('update(...)', () => {
//         testUpdateOnlyUpdatesIfUnitIsOnAndActive();
//         testUnitTurnsOffOnceUnitNoLongerActive();
//     });
// }

// function testUpdateOnlyUpdatesIfUnitIsOnAndActive(): void {
//     test('only updates if unit is on AND active (not complete)', () => {
//         expect(unit.current).toBe(0);
//         unit.update(200);
//         expect(unit.current).toBe(0);
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.2);
//         unit.turnOff();
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.2);
//         unit.turnOn();
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.4);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.6);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.8);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1);
//     });
// }

// function testUnitTurnsOffOnceUnitNoLongerActive(): void {
//     test('unit turns itself off once no longer active (elapsed >= duration)', () => {
//         unit.run(1000);
//         unit.update(200);
//         unit.update(200);
//         unit.update(200);
//         unit.update(200);
//         const beforeState = JSON.parse(unit.save());
//         expect(beforeState.isOn).toBeTruthy();
//         unit.update(201);
//         const afterState = JSON.parse(unit.save());
//         expect(afterState.isOn).not.toBeTruthy();
//     });
// }


// // public run(duration: number, easeOption: Ease.tEaseOption = 'noEase'): void { }
// function testRun(): void {
//     describe('run(...)', () => {

//         test('turns unit on, ready to update', () => {
//             const beforeState = JSON.parse(unit.save());
//             expect(beforeState.isOn).not.toBeTruthy();
//             unit.run(1000);
//             const afterState = JSON.parse(unit.save());
//             expect(afterState.isOn).toBeTruthy();
//             expect(unit.isActive).toBeTruthy();
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.2);
//         });

//         test('does nothing if unit is already active', () => {
//             unit.run(1000);
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.2);
//             const beforeState = JSON.parse(unit.save());
//             unit.run(2000, 'easeInElastic');
//             const afterState = JSON.parse(unit.save());
//             expect(afterState.elapsed).toBe(beforeState.elapsed);
//             expect(afterState.duration).toBe(beforeState.duration);
//             expect(afterState.easeOption).toBe(beforeState.easeOption);
//             expect(afterState.isOn).toBe(beforeState.isOn);
//             unit.update(200);
//             expect(unit.current).toBeCloseTo(0.4);

//         });

//         test('does nothing if duration <= 0', () => {
//             unit.run(-1000);
//             expect(unit.isActive).not.toBeTruthy();
//             unit.update(200);
//             expect(unit.current).toBe(0);
//         });

//     });
// }