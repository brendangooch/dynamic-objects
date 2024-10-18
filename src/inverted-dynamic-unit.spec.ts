/**
 *
 */

testAll();
function testAll(): void {
    describe('InvertedDynamicUnit', () => {
        test('dummy', () => { });
    });
}

// import { DynamicUnit } from "../dynamic-unit.js";
// import { InvertedDynamicUnit } from "../inverted-dynamic-unit.js";
// import { RoundedDynamicUnit } from "./rounded-dynamic-unit.js";
// import { NegativeDynamicUnit } from "./negative-dynamic-unit.js";
// import { RoundedDownDynamicUnit } from "./rounded-down-dynamic-unit.js";
// import { RoundedUpDynamicUnit } from "./rounded-up-dynamic-unit.js";
// import { ShiftedUpDynamicUnit } from "./shifted-up-dynamic-unit.js";
// import { ShiftedDownDynamicUnit } from "./shifted-down-dynamic-unit.js";
// import { HalvedDynamicUnit } from "./halved-dynamic-unit.js";

// testAll();
// function testAll(): void {
//     describe('DynamicUnit decorators', () => {
//         testInverted();
//         testRounded();
//         testNegative();
//         testRoundedDown();
//         testRoundedUp();
//         testShiftedUp();
//         testShiftedDown();
//         testHalved();
//         testCanCombineDecorators();
//     });
// }

// function testInverted(): void {
//     test('inverted.current returns 1 - unit.current (ie goes backwards)', () => {
//         const unit = new InvertedDynamicUnit(new DynamicUnit());
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.8);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.6);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.4);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.2);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0);
//     });
// }

// function testRounded(): void {
//     test('rounded rounds unit.current to either 0 or 1', () => {
//         const unit = new RoundedDynamicUnit(new DynamicUnit());
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBe(0);
//         unit.update(200);
//         expect(unit.current).toBe(0);
//         unit.update(99);
//         expect(unit.current).toBe(0);
//         unit.update(1);
//         expect(unit.current).toBe(1);
//         unit.update(200);
//         expect(unit.current).toBe(1);
//         unit.update(200);
//         expect(unit.current).toBe(1);
//         unit.update(200);
//         expect(unit.current).toBe(1);
//     });
// }

// function testNegative(): void {
//     test('negative negates unit.current to the negative of original output', () => {
//         const unit = new NegativeDynamicUnit(new DynamicUnit());
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.2);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.4);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.6);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.8);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-1);

//     });
// }

// function testRoundedDown(): void {
//     test('roundedDown floors the output to 0 for duration', () => {
//         const unit = new RoundedDownDynamicUnit(new DynamicUnit());
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1);
//     });
// }

// function testRoundedUp(): void {
//     test('roundedUp rounds output to 1 (ceiling) for duration', () => {
//         const unit = new RoundedUpDynamicUnit(new DynamicUnit());
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1);
//     });
// }

// function testShiftedUp(): void {
//     test('shiftedUp adds 0.5 to output', () => {
//         const unit = new ShiftedUpDynamicUnit(new DynamicUnit());
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.7);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.9);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1.1);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1.3);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1.5);
//     });
// }

// function testShiftedDown(): void {
//     test('shiftedDown subtracts 0.5 from output', () => {
//         const unit = new ShiftedDownDynamicUnit(new DynamicUnit());
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.3);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.1);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.1);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.3);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.5);
//     });
// }

// function testHalved(): void {
//     test('halved halves the output', () => {
//         const unit = new HalvedDynamicUnit(new DynamicUnit());
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.1);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.2);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.3);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.4);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.5);
//     });
// }


// function testCanCombineDecorators(): void {
//     describe('can combine decorators', () => {
//         testInvertedThenRounded();
//         testInvertedThenNegative();
//         testHalvedThenShiftedUp();
//         testNegativeThenInverted();
//         testInvertedThenNegativeThenHalvedThenShiftedDown();
//     });
// }

// function testInvertedThenRounded(): void {
//     test('inverted then rounded behaves as expected', () => {
//         const unit = new RoundedDynamicUnit(new InvertedDynamicUnit(new DynamicUnit()));
//         unit.run(1000);
//         unit.update(200); // 0.2 -> 0.8 -> 1
//         expect(unit.current).toBe(1);
//         unit.update(200); // 0.4 -> 0.6 -> 1
//         expect(unit.current).toBe(1);
//         unit.update(99); // 0.499 -> 0.501 -> 1
//         expect(unit.current).toBe(1);
//         unit.update(1); // 0.5 -> 0.5 -> 1
//         expect(unit.current).toBe(1);
//         unit.update(1); // 0.501 -> 0.499 -> 0
//         expect(unit.current).toBe(0);
//         unit.update(199); // 0.7 -> 0.3 -> 0
//         expect(unit.current).toBe(0);
//         unit.update(200);// 0.9 -> 0.1 -> 0
//         expect(unit.current).toBe(0);
//         unit.update(200);// 1 -> 0 -> 0
//         expect(unit.current).toBe(0);
//     });
// }

// function testInvertedThenNegative(): void {
//     test('inverted then negative behaves as expected', () => {
//         const unit = new NegativeDynamicUnit(new InvertedDynamicUnit(new DynamicUnit()));
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.8); // 0.2 -> 0.8 -> -0.8
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.6); // 0.4 -> 0.6 -> -0.6
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.4); // 0.6 -> 0.4 -> -0.4
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.2); // 0.8 -> 0.2 -> -0.2
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0); // 1 -> 0 -> -0
//     });
// }

// function testHalvedThenShiftedUp(): void {
//     test('halved then shifted up behaves as expcted', () => {
//         const unit = new ShiftedUpDynamicUnit(new HalvedDynamicUnit(new DynamicUnit()));
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.6); // 0.2 -> 0.1 -> 0.6
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.7); // 0.4 -> 0.2 -> 0.7
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.8); // 0.6 -> 0.3 -> 0.8
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(0.9); // 0.8 -> 0.4 -> 0.9
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1); // 1.0 -> 0.5 -> 1.0
//     });
// }

// function testNegativeThenInverted(): void {
//     test('negative then inverted behaves as expected', () => {
//         const unit = new InvertedDynamicUnit(new NegativeDynamicUnit(new DynamicUnit()));
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1.2); // 0.2 -> -0.2 -> 1.2
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1.4); // 0.4 -> -0.4 -> 1.4
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1.6); // 0.6 -> -0.6 -> 1.6
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(1.8); // 0.8 -> -0.8 -> 1.8
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(2); // 1 -> -1 -> 2
//     });
// }

// function testInvertedThenNegativeThenHalvedThenShiftedDown(): void {
//     test('inverted then negative then halved then shifted down behaves as expected', () => {
//         const unit = new ShiftedDownDynamicUnit(new HalvedDynamicUnit(new NegativeDynamicUnit(new InvertedDynamicUnit(new DynamicUnit()))));
//         unit.run(1000);
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.9); // 0.2 -> 0.8 -> -0.8 -> -0.4 -> -0.9
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.8); // 0.4 -> 0.6 -> -0.6 -> -0.3 -> -0.8
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.7); // 0.6 -> 0.4 -> -0.4 -> -0.2 -> -0.7
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.6); // 0.8 -> 0.2 -> -0.2 -> -0.1 -> -0.6
//         unit.update(200);
//         expect(unit.current).toBeCloseTo(-0.5); // 1.0 -> 0.0 -> 0.0 -> 0 -> -0.5
//     });
// }
