/**
 * 
 */

import { type tEaseOption } from "@brendangooch/ease";
import { JestExpect } from "@brendangooch/jest-expect";
import { DynamicColor } from "./dynamic-color.js";
import { DynamicNumber } from "../number/dynamic-number.js";


const EXPECT = new JestExpect();
let color: DynamicColor;
beforeEach(() => {
    color = new DynamicColor(0, 0, 0);
});

testAll();
function testAll(): void {
    describe('DynamicColor', () => {

        test('dummy', () => { });

        // testStartsInactive();
        // testInitialValueMUSTBeSetInConsructor();
        // testInitialValueParamsAreClampedAbove0();
        // testInitialValueParamsAreClampedBelow255();
        // testReturnsCorrectDurationAfterSettingSpeedAndNext();
        // testCanBeStopped();
        // testCannotChangeIfAlreadyActive();
        // testCanChangeInstantly();
        // testNextValueParamsAreClampedAbove0();
        // testNextValueParamsAreClampedBelow255();
        // testCanChangeDynamically();
        // testCanChangeDynamicallyWithEase();
        // testCanChangeDynamicallyWithSpeedSet();
        // testCanChangeDynamicallyWithSpeedSetAndEaseApplied();
        // testCanChangeDynamicallyThenChangeDynamicallyAgain();
        // testCanChangeJustASingleValue();
        // testCanChangeSomeValuesHigherSomeLower();

    });
}

// function testStartsInactive(): void {
//     test('starts inactive', () => {
//         EXPECT.falsy(color.isActive);
//     });
// }

// function testInitialValueMUSTBeSetInConsructor(): void {
//     test('initial value MUST be set in constructor', () => {
//         color = new DynamicColor(100, 100, 100);
//         EXPECT.toBe(color.current, makeColorString(100, 100, 100));
//     });
// }

// function testInitialValueParamsAreClampedAbove0(): void {
//     test('initial value is clamped above 0', () => {
//         color = new DynamicColor(-1, -1, -1);
//         EXPECT.toBe(color.current, makeColorString(0, 0, 0));
//     });
// }

// function testInitialValueParamsAreClampedBelow255(): void {
//     test('initial value is clamped below 255', () => {
//         color = new DynamicColor(256, 256, 256);
//         EXPECT.toBe(color.current, makeColorString(255, 255, 255));
//     });
// }

// function testReturnsCorrectDurationAfterSettingSpeedAndNext(): void {
//     test('returns correct duration after setting speed and next', () => {

//         let speed = 0.5;
//         let red = 255; // <-- largest distance
//         let green = 150;
//         let blue = 100;
//         let duration = red / speed;
//         color.speed(speed).next(red, green, blue);
//         EXPECT.toBe(color.getDuration(), duration);

//     });
// }

// function testCanBeStopped(): void {
//     test('can be stopped', () => {
//         color.duration(1000).next(255, 255, 255).change();
//         EXPECT.truthy(color.isActive);
//         color.update(100); // 10%
//         EXPECT.toBe(color.current, makeColorString(Math.round(255 * 0.1), Math.round(255 * 0.1), Math.round(255 * 0.1)));
//         color.stop();
//         EXPECT.falsy(color.isActive);
//         EXPECT.toBe(color.current, makeColorString(Math.round(255 * 0.1), Math.round(255 * 0.1), Math.round(255 * 0.1)));
//         color.change();
//         EXPECT.toBe(color.current, makeColorString(Math.round(255 * 0.1), Math.round(255 * 0.1), Math.round(255 * 0.1)));
//     });
// }

// function testCannotChangeIfAlreadyActive(): void {
//     test('cannot change if already active', () => {
//         color.duration(1000).next(255, 255, 255).change();
//         EXPECT.truthy(color.isActive);
//         color.update(100); // 10%
//         EXPECT.toBe(color.current, makeColorString(Math.round(255 * 0.1), Math.round(255 * 0.1), Math.round(255 * 0.1)));
//         color.next(100, 100, 100);
//         color.update(100); // 20%
//         EXPECT.toBe(color.current, makeColorString(Math.round(255 * 0.2), Math.round(255 * 0.2), Math.round(255 * 0.2)));
//     });
// }

// function testCanChangeInstantly(): void {
//     test('can change instantly', () => {
//         color.next(150, 200, 250).change();
//         EXPECT.falsy(color.isActive);
//         EXPECT.toBe(color.current, makeColorString(150, 200, 250));
//     });
// }

// function testNextValueParamsAreClampedAbove0(): void {
//     test('next value is clamped above 0', () => {
//         color.next(100, 100, 100).change();
//         color.next(-1, -1, -1).change();
//         EXPECT.toBe(color.current, makeColorString(0, 0, 0));
//     });
// }

// function testNextValueParamsAreClampedBelow255(): void {
//     test('next value is clamped below 255', () => {
//         color.next(256, 256, 256).change();
//         EXPECT.toBe(color.current, makeColorString(255, 255, 255));
//     });
// }

// function testCanChangeDynamically(): void {
//     test('can change dynamically', () => {
//         fullDurationTest({
//             color: color,
//             previous: { red: 0, green: 0, blue: 0 },
//             next: { red: 100, green: 100, blue: 100 },
//             duration: 800,
//             // speed: 0.05,
//             // ease: 'easeInOutQuint'
//         });
//     });
// }

// function testCanChangeDynamicallyWithEase(): void {
//     test('can change dynamically with ease', () => {
//         fullDurationTest({
//             color: color,
//             previous: { red: 0, green: 0, blue: 0 },
//             next: { red: 100, green: 100, blue: 100 },
//             duration: 800,
//             // speed: 0.05,
//             ease: 'easeInOutQuint'
//         });
//     });
// }

// function testCanChangeDynamicallyWithSpeedSet(): void {
//     test('can change dynamically with speed set', () => {
//         fullDurationTest({
//             color: color,
//             previous: { red: 0, green: 0, blue: 0 },
//             next: { red: 100, green: 100, blue: 100 },
//             // duration: 800,
//             speed: 0.05,
//             // ease: 'easeInOutQuint'
//         });
//     });
// }

// function testCanChangeDynamicallyWithSpeedSetAndEaseApplied(): void {
//     test('can change dynamically with speed set and ease applied', () => {
//         fullDurationTest({
//             color: color,
//             previous: { red: 0, green: 0, blue: 0 },
//             next: { red: 100, green: 100, blue: 100 },
//             // duration: 800,
//             speed: 0.05,
//             ease: 'easeInOutQuint'
//         });
//     });
// }

// function testCanChangeDynamicallyThenChangeDynamicallyAgain(): void {
//     test('can change dynamically then change dynamically again', () => {

//         fullDurationTest({
//             color: color,
//             previous: { red: 0, green: 0, blue: 0 },
//             next: { red: 255, green: 255, blue: 255 },
//             duration: 800,
//             // speed: 0.05,
//             // ease: 'easeInOutQuint'
//         });

//         fullDurationTest({
//             color: color,
//             previous: { red: 255, green: 255, blue: 255 },
//             next: { red: 0, green: 0, blue: 0 },
//             duration: 800,
//             // speed: 0.05,
//             // ease: 'easeInOutQuint'
//         });

//     });
// }

// function testCanChangeJustASingleValue(): void {
//     test('can change just a single value', () => {

//         fullDurationTest({
//             color: color,
//             previous: { red: 0, green: 0, blue: 0 },
//             next: { red: 255, green: 0, blue: 0 },
//             duration: 800,
//             // speed: 0.05,
//             // ease: 'easeInOutQuint'
//         });

//     });
// }

// function testCanChangeSomeValuesHigherSomeLower(): void {
//     test('can change some values higher, some lower', () => {

//         color.next(255, 0, 255).change();

//         fullDurationTest({
//             color: color,
//             previous: { red: 255, green: 0, blue: 255 },
//             next: { red: 0, green: 255, blue: 0 },
//             duration: 800,
//             // speed: 0.05,
//             // ease: 'easeInOutQuint'
//         });

//     });
// }

// function fullDurationTest(props: {
//     color: DynamicColor;
//     previous: { red: number; green: number; blue: number };
//     next: { red: number; green: number; blue: number };
//     duration?: number;
//     speed?: number;
//     ease?: tEaseOption;
// }): void {

//     EXPECT.falsy(props.color.isActive);

//     const NUM_STEPS = 20;
//     const DISTANCE = Math.max(props.next.red, props.next.green, props.next.blue);
//     const red = new DynamicNumber(props.previous.red);
//     const green = new DynamicNumber(props.previous.green);
//     const blue = new DynamicNumber(props.previous.blue);
//     let duration: number;
//     let stepSize: number;
//     let current = '';

//     if (props.duration) {
//         duration = props.duration;
//         stepSize = duration / NUM_STEPS;
//         props.color.duration(duration);
//         red.duration(duration);
//         green.duration(duration);
//         blue.duration(duration);
//     }

//     if (props.speed) {
//         duration = DISTANCE / props.speed;
//         stepSize = duration / NUM_STEPS;
//         props.color.speed(props.speed);
//         red.speed(props.speed);
//         green.speed(props.speed);
//         blue.speed(props.speed);
//     }

//     if (props.ease) {
//         props.color.ease(props.ease);
//         red.ease(props.ease);
//         green.ease(props.ease);
//         blue.ease(props.ease);
//     }

//     props.color.load(props.color.save()); // <-- test save then load

//     props.color.next(props.next.red, props.next.green, props.next.blue);
//     red.next(props.next.red);
//     green.next(props.next.green);
//     blue.next(props.next.blue);
//     EXPECT.toBe(props.color.getDuration(), duration!); // <-- test get duration
//     props.color.change();
//     red.change();
//     green.change();
//     blue.change();
//     EXPECT.truthy(props.color.isActive);

//     props.color.load(props.color.save()); // <-- test save then load

//     for (let i = 0; i < NUM_STEPS - 1; i++) {
//         props.color.update(stepSize!);
//         props.color.load(props.color.save()); // <-- test save then load
//         red.update(stepSize!);
//         green.update(stepSize!);
//         blue.update(stepSize!);
//         current = makeColorString(red.rounded, green.rounded, blue.rounded);
//         EXPECT.toBe(props.color.current, current);
//     }

//     props.color.update(stepSize! + 10);
//     props.color.load(props.color.save()); // <-- test save then load
//     EXPECT.falsy(props.color.isActive);
//     EXPECT.toBe(props.color.current, makeColorString(props.next.red, props.next.green, props.next.blue));

// }

// function makeColorString(r: number, g: number, b: number): string {
//     return `rgb(${r},${g},${b})`;
// }