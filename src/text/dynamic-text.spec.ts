/**
 * 
 */

import { type tEaseOption } from "@brendangooch/ease";
import { JestExpect } from "@brendangooch/jest-expect";
import { DynamicText } from "./dynamic-text.js";
import { DynamicNumber } from "../number/dynamic-number.js";


const EXPECT = new JestExpect();
const SOME_TEXT = 'dynamic text dummy string';
const SOME_TEXT_LENGTH = SOME_TEXT.length;
let text: DynamicText;
beforeEach(() => {
    text = new DynamicText();
});

testAll();
function testAll(): void {
    describe('DynamicText', () => {

        test('dummy', () => { });

        // testStartsInactive();
        // testInitialValueDefaultsToEmptyString();
        // testInitialValueCanBeSetInConsructor();
        // testReturnsCorrectDurationAfterSettingSpeedAndNext();
        // testCanBeStopped();
        // testCannotChangeIfAlreadyActive();
        // testCanChangeInstantly();
        // testCanChangeDynamically();
        // testCanChangeDynamicallyWithEase();
        // testCanChangeDynamicallyWithSpeedSet();
        // testCanChangeDynamicallyWithSpeedSetAndEaseApplied();
        // testCanChangeDynamicallyThenChangeDynamicallyAgain();

    });
}

// function testStartsInactive(): void {
//     test('starts inactive', () => {
//         EXPECT.falsy(text.isActive);
//     });
// }

// function testInitialValueDefaultsToEmptyString(): void {
//     test('initial value defaults to empty string', () => {
//         EXPECT.toBe(text.current, '');
//     });
// }

// function testInitialValueCanBeSetInConsructor(): void {
//     test('initial value can be set in constructor', () => {
//         text = new DynamicText(SOME_TEXT);
//         EXPECT.toBe(text.current, SOME_TEXT);
//     });
// }

// function testReturnsCorrectDurationAfterSettingSpeedAndNext(): void {
//     test('returns correct duration after setting speed and next', () => {

//         let speed = 0.1;
//         let distance = SOME_TEXT_LENGTH;
//         let duration = distance / speed;
//         text.speed(speed).next(SOME_TEXT);
//         EXPECT.toBeCloseTo(text.getDuration(), duration);

//         speed = 0.05;
//         distance = (SOME_TEXT_LENGTH * 2);
//         duration = distance / speed;
//         text.speed(speed).next(SOME_TEXT + SOME_TEXT);
//         EXPECT.toBeCloseTo(text.getDuration(), duration);


//     });
// }

// function testCanBeStopped(): void {
//     test('can be stopped', () => {
//         text.duration(1000).next(SOME_TEXT).change();
//         EXPECT.truthy(text.isActive);
//         text.update(100); // 10%
//         EXPECT.toBe(text.current, SOME_TEXT.substring(0, Math.round((SOME_TEXT_LENGTH) * 0.1)));
//         text.stop();
//         EXPECT.falsy(text.isActive);
//         EXPECT.toBe(text.current, SOME_TEXT.substring(0, Math.round((SOME_TEXT_LENGTH) * 0.1)));
//         text.change();
//         EXPECT.toBe(text.current, '');
//     });
// }

// function testCannotChangeIfAlreadyActive(): void {
//     test('cannot change if already active', () => {
//         text.duration(1000).next(SOME_TEXT).change();
//         EXPECT.truthy(text.isActive);
//         text.update(100); // 10%
//         EXPECT.toBe(text.current, SOME_TEXT.substring(0, Math.round((SOME_TEXT_LENGTH) * 0.1)));
//         text.next('this is some other random text');
//         EXPECT.toBe(text.current, SOME_TEXT.substring(0, Math.round((SOME_TEXT_LENGTH) * 0.1)));
//     });
// }

// function testCanChangeInstantly(): void {
//     test('can change instantly', () => {
//         text.next('hello world!').change();
//         EXPECT.toBe(text.current, 'hello world!');
//     });
// }

// function testCanChangeDynamically(): void {
//     test('can change dynamically', () => {
//         fullDurationTest({
//             text: text,
//             next: SOME_TEXT,
//             duration: 800,
//             // speed: 0.05,
//             // ease: 'easeInOutBack'
//         });
//     });
// }

// function testCanChangeDynamicallyWithEase(): void {
//     test('can change dynamically with ease', () => {
//         fullDurationTest({
//             text: text,
//             next: SOME_TEXT,
//             duration: 800,
//             // speed: 0.05,
//             ease: 'easeInOutBack'
//         });
//     });
// }

// function testCanChangeDynamicallyWithSpeedSet(): void {
//     test('can change dynamically with speed set', () => {
//         fullDurationTest({
//             text: text,
//             next: SOME_TEXT,
//             // duration: 800,
//             speed: 0.05,
//             // ease: 'easeInOutBack'
//         });
//     });
// }

// function testCanChangeDynamicallyWithSpeedSetAndEaseApplied(): void {
//     test('can change dynamically with speed set and ease applied', () => {
//         fullDurationTest({
//             text: text,
//             next: SOME_TEXT,
//             // duration: 800,
//             speed: 0.05,
//             ease: 'easeInOutBack'
//         });
//     });
// }

// function testCanChangeDynamicallyThenChangeDynamicallyAgain(): void {
//     test('can change dynamically then change dynamically again', () => {

//         fullDurationTest({
//             text: text,
//             next: 'this is the first text',
//             duration: 800,
//             // speed: 0.05,
//             ease: 'easeOutCubic'
//         });

//         fullDurationTest({
//             text: text,
//             next: 'this is the second text',
//             // duration: 800,
//             speed: 0.05,
//             ease: 'easeInCubic'
//         });

//     });
// }

// function fullDurationTest(props: {
//     text: DynamicText;
//     next: string;
//     duration?: number;
//     speed?: number;
//     ease?: tEaseOption;
// }): void {

//     const NUM_STEPS = 20;
//     const DISTANCE = props.next.length;
//     const number = new DynamicNumber();
//     let duration: number;
//     let stepSize: number;
//     let current = '';

//     if (props.duration) {
//         duration = props.duration;
//         stepSize = duration / NUM_STEPS;
//         props.text.duration(duration);
//         number.duration(duration);
//     }

//     if (props.speed) {
//         duration = DISTANCE / props.speed;
//         stepSize = duration / NUM_STEPS;
//         props.text.speed(props.speed);
//         number.speed(props.speed);
//     }

//     if (props.ease) {
//         props.text.ease(props.ease);
//         number.ease(props.ease);
//     }

//     props.text.load(props.text.save()); // <-- test save then load

//     props.text.next(props.next);
//     number.next(props.next.length);
//     EXPECT.toBe(props.text.getDuration(), duration!); // <-- test get duration
//     props.text.change();
//     number.change();
//     EXPECT.truthy(props.text.isActive);

//     props.text.load(props.text.save()); // <-- test save then load

//     for (let i = 0; i < NUM_STEPS - 1; i++) {
//         props.text.update(stepSize!);
//         props.text.load(props.text.save()); // <-- test save then load
//         number.update(stepSize!);
//         current = props.next.substring(0, number.rounded);
//         EXPECT.toBe(props.text.current, current);
//     }

//     props.text.update(stepSize! + 10);
//     props.text.load(props.text.save()); // <-- test save then load
//     EXPECT.falsy(props.text.isActive);
//     EXPECT.toBe(props.text.current, props.next);

// }