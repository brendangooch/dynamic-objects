/**
 * 
 */

import { JestExpect } from "@brendangooch/jest-expect";
import { DynamicWaveForm } from "./dynamic-wave-form.js";

const EXPECT = new JestExpect();
let wave: DynamicWaveForm;
beforeEach(() => {
    wave = new DynamicWaveForm();
});

testAll();
function testAll(): void {
    describe('DynamicWaveForm', () => {

        test('dummy', () => { });

        // testStartsInactive();
        // testBecomesActiveOnceWaveFormSetAndStartCalled();
        // testBecomesInactiveOnceStartCalled();
        // testCurrentValueStartsAt0();
        // testCurrentValueStaysWhereItIsAfterStopCalled();
        // testCannotChangeWaveformTypeOnceActive();
        // testStartDoesNothingIfAlreadyActiveORNoWaveformTypeSelected();
        // testTriangleWaveBehavesAsExpected();
        // testSquareWaveBehavesAsExpected();
        // testSawtoothBehavesAsExpected();

    });
}

// function testStartsInactive(): void {
//     test('starts inactive', () => {
//         EXPECT.falsy(wave.isActive);
//     });
// }

// function testBecomesActiveOnceWaveFormSetAndStartCalled(): void {
//     test('becomes active once waveform set and start called', () => {
//         wave.sawtooth(200).start();
//         EXPECT.truthy(wave.isActive);
//     });
// }

// function testBecomesInactiveOnceStartCalled(): void {
//     test('becomes inactive once stop called', () => {
//         wave.sawtooth(200).start();
//         EXPECT.truthy(wave.isActive);
//         wave.stop();
//         EXPECT.falsy(wave.isActive);
//     });
// }

// function testCurrentValueStartsAt0(): void {
//     test('current value starts on 0', () => {
//         EXPECT.toBe(wave.current, 0);
//     });
// }

// function testCurrentValueStaysWhereItIsAfterStopCalled(): void {
//     test('current value stays where it is after stop called', () => {
//         wave.sawtooth(200).start();
//         EXPECT.toBe(wave.current, 0);
//         wave.update(10);
//         EXPECT.toBe(wave.current, 0.1);
//         wave.stop();
//         EXPECT.toBe(wave.current, 0.1);
//     });
// }

// function testCannotChangeWaveformTypeOnceActive(): void {
//     test('cannot change waveform type once active', () => {
//         wave.sawtooth(200).start();
//         EXPECT.toBe(wave.current, 0);
//         wave.square(200); // <--
//         wave.update(10);
//         EXPECT.toBe(wave.current, 0.1);
//         wave.stop();
//         EXPECT.toBe(wave.current, 0.1);
//     });
// }

// function testStartDoesNothingIfAlreadyActiveORNoWaveformTypeSelected(): void {
//     test('start() does nothing if already active OR no waveform type selected', () => {
//         wave.start();
//         wave.update(100);
//         EXPECT.falsy(wave.isActive);
//         EXPECT.toBe(wave.current, 0);
//         wave.triangle(200).start();
//         EXPECT.truthy(wave.isActive);
//         wave.update(25);
//         EXPECT.toBe(wave.current, 0.25);
//         wave.start(); // <--
//         EXPECT.toBe(wave.current, 0.25);
//         wave.update(25);
//         EXPECT.toBe(wave.current, 0.5);
//     });
// }

// function testTriangleWaveBehavesAsExpected(): void {
//     test('triangle wave behaves as expected', () => {

//         wave.triangle(500).start();
//         EXPECT.truthy(wave.isActive);
//         EXPECT.toBe(wave.current, 0);

//         wave.update(50); // 20% up
//         EXPECT.toBeCloseTo(wave.current, 0.2);

//         wave.update(50); // 40% up
//         EXPECT.toBeCloseTo(wave.current, 0.4);

//         wave.update(50); // 60% up
//         EXPECT.toBeCloseTo(wave.current, 0.6);

//         wave.update(50); // 80% up
//         EXPECT.toBeCloseTo(wave.current, 0.8);

//         wave.update(50); // 100% up / 0% down
//         EXPECT.toBeCloseTo(wave.current, 1);

//         wave.update(50); // 20% down
//         EXPECT.toBeCloseTo(wave.current, 0.8);

//         wave.update(50); // 40% down
//         EXPECT.toBeCloseTo(wave.current, 0.6);

//         wave.update(50); // 60% down
//         EXPECT.toBeCloseTo(wave.current, 0.4);

//         wave.update(50); // 80% down
//         EXPECT.toBeCloseTo(wave.current, 0.2);

//         wave.update(50); // 100% down
//         EXPECT.toBeCloseTo(wave.current, 0);

//         wave.update(50); // 20% up
//         EXPECT.toBeCloseTo(wave.current, 0.2);

//         wave.stop();
//         EXPECT.falsy(wave.isActive);
//         EXPECT.toBeCloseTo(wave.current, 0.2);

//     });
// }

// function testSquareWaveBehavesAsExpected(): void {
//     test('square wave behaves as expected', () => {

//         wave.square(500).start();
//         EXPECT.truthy(wave.isActive);
//         EXPECT.toBe(wave.current, 1);

//         wave.update(50); // 20% up
//         EXPECT.toBe(wave.current, 1);

//         wave.update(50); // 40% up
//         EXPECT.toBe(wave.current, 1);

//         wave.update(50); // 60% up
//         EXPECT.toBe(wave.current, 1);

//         wave.update(50); // 80% up
//         EXPECT.toBe(wave.current, 1);

//         wave.update(50); // 100% up / 0% down
//         EXPECT.toBe(wave.current, 0);

//         wave.update(50); // 20% down
//         EXPECT.toBe(wave.current, 0);

//         wave.update(50); // 40% down
//         EXPECT.toBe(wave.current, 0);

//         wave.update(50); // 60% down
//         EXPECT.toBe(wave.current, 0);

//         wave.update(50); // 80% down
//         EXPECT.toBe(wave.current, 0);

//         wave.update(50); // 100% down
//         EXPECT.toBe(wave.current, 1);

//         wave.update(50); // 20% up
//         EXPECT.toBe(wave.current, 1);

//         wave.stop();
//         EXPECT.falsy(wave.isActive);
//         EXPECT.toBeCloseTo(wave.current, 1);

//     });
// }

// function testSawtoothBehavesAsExpected(): void {
//     test('sawtooth behaves as expected', () => {

//         wave.sawtooth(500).start();
//         EXPECT.truthy(wave.isActive);
//         EXPECT.toBe(wave.current, 0);

//         wave.update(50); // 20% up
//         EXPECT.toBe(wave.current, 0.2);

//         wave.update(50); // 40% up
//         EXPECT.toBe(wave.current, 0.4);

//         wave.update(50); // 60% up
//         EXPECT.toBe(wave.current, 0.6);

//         wave.update(50); // 80% up
//         EXPECT.toBe(wave.current, 0.8);

//         wave.update(50); // 100% up / 0% up
//         EXPECT.toBe(wave.current, 0);

//         wave.update(50); // 20% up
//         EXPECT.toBe(wave.current, 0.2);

//         wave.update(50); // 40% up
//         EXPECT.toBe(wave.current, 0.4);

//         wave.update(50); // 60% up
//         EXPECT.toBe(wave.current, 0.6);

//         wave.update(50); // 80% up
//         EXPECT.toBe(wave.current, 0.8);

//         wave.update(50); // 100% up
//         EXPECT.toBe(wave.current, 0);

//         wave.update(50); // 20% up
//         EXPECT.toBe(wave.current, 0.2);

//         wave.stop();
//         EXPECT.falsy(wave.isActive);
//         EXPECT.toBeCloseTo(wave.current, 0.2);

//     });
// }
