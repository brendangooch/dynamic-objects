/**
 * 
 */

import { type tEaseOption, type tEaseFunction, load as loadEase } from '@brendangooch/ease';
import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicRotation } from './dynamic-rotation.js';
import { DynamicNumber } from '../number/dynamic-number.js';

const PI = Math.PI;
const TAU = PI * 2;
const DEGREES_90 = PI / 2;
const DEGREES_45 = PI / 4;
const EXPECT = new JestExpect();
let rotation: DynamicRotation;
beforeEach(() => {
    rotation = new DynamicRotation();
});

testAll();
function testAll(): void {
    describe('DynamicRotation', () => {

        test('dummy', () => { });

        // testStartsInactive();
        // testIntitialValueDefaultsTo0();
        // testInitialValueCanBeSetInConstructor();
        // testReturnsCorrectDurationAfterSettingSpeedAndNext();
        // testReturnsCorrectDurationAfterSettingSpeedAndNextWithSpin();
        // testDefaultIsNoSpinAdded();
        // testCanBeStopped();
        // testCanRotateInstantly();
        // testCanSpinInstantly();
        // testCanRotateDynamically();
        // testCanSpinDynamically();
        // testCanRotateDynamicallyWithEaseApplied();
        // testCanSpinDynamicallyWithEaseApplied();
        // testCanRotateDynamicallyWithSpeedSet();
        // testCanSpinDynamicallyWithSpeedSet();
        // testCanRotateDynamicallyWithSpeedSetAndEaseApplied();
        // testCanSpinDynamicallyWithSpeedSetAndEaseApplied();
        // testCanRotateDynamicallyInANegativeDirection();
        // testCanSpinynamicallyInANegativeDirectionWithAPositiveRotation();
        // testCanSpinynamicallyInANegativeDirectionWithANegativeRotation();
        // testCanSpinDynamicallyThenSpinDynamicallyAgain();
        // testCanSpinDynamicallyThenRotateDynamically();
        // testCanRotateDynamicallyThenSpinDynamically();
        // testCanRotateDynamicallyThenRotateDynamically();

    });
}


// function testStartsInactive(): void {
//     test('starts inactive', () => {
//         EXPECT.falsy(rotation.isActive);
//     });
// }

// function testIntitialValueDefaultsTo0(): void {
//     test('initial value defaults to 0', () => {
//         EXPECT.toBe(rotation.current, 0);
//     });
// }

// function testInitialValueCanBeSetInConstructor(): void {
//     test('initial value can be set in constructor', () => {
//         rotation = new DynamicRotation(DEGREES_45);
//         EXPECT.toBe(rotation.current, DEGREES_45);
//     });
// }

// function testReturnsCorrectDurationAfterSettingSpeedAndNext(): void {
//     test('returns correct duration after setting speed and next', () => {

//         rotation.speed(0.1).next(PI);
//         EXPECT.toBe(rotation.getDuration(), PI / 0.1);

//         rotation = new DynamicRotation();
//         rotation.speed(0.2).next(TAU);
//         EXPECT.toBe(rotation.getDuration(), TAU / 0.2);

//         rotation = new DynamicRotation(-DEGREES_90);
//         rotation.speed(0.05).next(DEGREES_90);
//         EXPECT.toBe(rotation.getDuration(), PI / 0.05);

//     });
// }

// function testReturnsCorrectDurationAfterSettingSpeedAndNextWithSpin(): void {
//     test('correct duration returned after setting speed and next with spin', () => {

//         rotation.speed(0.1).next(PI, 1);
//         EXPECT.toBe(rotation.getDuration(), (PI + TAU) / 0.1);

//         rotation = new DynamicRotation(-DEGREES_45);
//         rotation.speed(0.2).next(DEGREES_45, -1);
//         EXPECT.toBe(rotation.getDuration(), (TAU - DEGREES_90) / 0.2);

//         rotation = new DynamicRotation(-DEGREES_90);
//         rotation.speed(0.05).next(DEGREES_90, 2);
//         EXPECT.toBe(rotation.getDuration(), (PI + TAU + TAU) / 0.05);

//     });
// }

// function testDefaultIsNoSpinAdded(): void {
//     test('default is no spin added', () => {
//         rotation.duration(1000).next(DEGREES_90).rotate();
//         rotation.update(100);
//         EXPECT.toBeCloseTo(rotation.current, DEGREES_90 * 0.1); // <-- no spin added
//     });
// }

// function testCanBeStopped(): void {
//     test('can be stopped', () => {
//         rotation.duration(1000).next(DEGREES_90, 1).rotate();
//         EXPECT.truthy(rotation.isActive);
//         rotation.update(100);
//         EXPECT.toBeCloseTo(rotation.current, (DEGREES_90 + TAU) * 0.1);
//         rotation.stop();
//         EXPECT.falsy(rotation.isActive);
//         rotation.update(100);
//         EXPECT.toBeCloseTo(rotation.current, (DEGREES_90 + TAU) * 0.1);
//     });
// }

// function testCanRotateInstantly(): void {
//     test('can rotate instantly', () => {
//         rotation.next(-DEGREES_45).rotate();
//         EXPECT.falsy(rotation.isActive);
//         EXPECT.toBe(rotation.current, -DEGREES_45);
//     });
// }

// function testCanSpinInstantly(): void {
//     test('can spin instantly', () => {
//         rotation.next(-DEGREES_45, -1).rotate();
//         EXPECT.falsy(rotation.isActive);
//         EXPECT.toBe(rotation.current, -DEGREES_45 - TAU);
//     });
// }

// function testCanRotateDynamically(): void {
//     test('can rotate dynamically', () => {
//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             // spins: 0,
//             duration: 1000,
//             // speed: 0.1,
//             // ease: 'noEase'
//         });
//     });
// }

// function testCanSpinDynamically(): void {
//     test('can spin dynamically', () => {
//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             spins: 1,
//             duration: 1000,
//             // speed: 0.1,
//             // ease: 'noEase'
//         });
//     });
// }

// function testCanRotateDynamicallyWithEaseApplied(): void {
//     test('can rotate dynamically with ease applied', () => {
//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             // spins: 0,
//             duration: 1000,
//             // speed: 0.1,
//             ease: 'easeOutQuint'
//         });
//     });
// }

// function testCanSpinDynamicallyWithEaseApplied(): void {
//     test('can spin dynamically with ease applied', () => {
//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             spins: 2,
//             duration: 1000,
//             // speed: 0.1,
//             ease: 'easeOutQuint'
//         });
//     });
// }

// function testCanRotateDynamicallyWithSpeedSet(): void {
//     test('can rotate dynamically with speed set', () => {
//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             // spins: 0,
//             // duration: 1000,
//             speed: 0.1,
//             // ease: 'easeOutQuint'
//         });
//     });
// }

// function testCanSpinDynamicallyWithSpeedSet(): void {
//     test('can spin dynamically with speed set', () => {
//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             spins: 1,
//             // duration: 1000,
//             speed: 0.1,
//             // ease: 'easeOutQuint'
//         });
//     });
// }

// function testCanRotateDynamicallyWithSpeedSetAndEaseApplied(): void {
//     test('can rotate dynamically with speed set and ease applied', () => {
//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             // spins: 0,
//             // duration: 1000,
//             speed: 0.1,
//             ease: 'easeOutQuint'
//         });
//     });
// }

// function testCanSpinDynamicallyWithSpeedSetAndEaseApplied(): void {
//     test('can spin dynamically with speed set and ease applied', () => {
//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             spins: 1,
//             // duration: 1000,
//             speed: 0.1,
//             ease: 'easeOutQuint'
//         });
//     });
// }

// function testCanRotateDynamicallyInANegativeDirection(): void {
//     test('can rotate dynamically in a negative direction', () => {
//         testFullDuration({
//             rotation: rotation,
//             next: -DEGREES_45,
//             // spins: 0,
//             duration: 1000,
//             // speed: 0.1,
//             // ease: 'easeOutQuint'
//         });
//     });
// }

// function testCanSpinynamicallyInANegativeDirectionWithAPositiveRotation(): void {
//     test('can spin dynamically in a negative direction with a positive rotation', () => {
//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             spins: -1,
//             duration: 1000
//             // speed: 0.1,
//             // ease: 'easeOutQuint'
//         });
//     });
// }

// function testCanSpinynamicallyInANegativeDirectionWithANegativeRotation(): void {
//     test('can spin dynamically in a negative direction with a negative rotation', () => {
//         testFullDuration({
//             rotation: rotation,
//             next: -DEGREES_45,
//             spins: -2,
//             duration: 1000,
//             // speed: 0.1,
//             // ease: 'easeOutQuint'
//         });
//     });
// }

// // BUG
// function testCanSpinDynamicallyThenSpinDynamicallyAgain(): void {
//     test('can spin dynamically then spin dynamically again', () => {

//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             spins: 1,
//             duration: 1000,
//             // speed: 0.1,
//             // ease: 'easeOutQuint'
//         });

//         testFullDuration({
//             rotation: rotation,
//             next: -DEGREES_45,
//             spins: -1,
//             duration: 1000,
//             // speed: 0.1,
//             // ease: 'easeOutQuint'
//         });

//     });
// }

// function testCanSpinDynamicallyThenRotateDynamically(): void {
//     test('can spin dynamically then rotate dynamically', () => {

//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             spins: 1,
//             duration: 1000,
//             // speed: 0.1,
//             // ease: 'easeOutQuint'
//         });

//         testFullDuration({
//             rotation: rotation,
//             next: -DEGREES_45,
//             spins: 0,
//             duration: 1000,
//             // speed: 0.1,
//             // ease: 'easeOutQuint'
//         });

//     });
// }

// function testCanRotateDynamicallyThenSpinDynamically(): void {
//     test('can rotate dynamically then spin dynamically', () => {

//         testFullDuration({
//             rotation: rotation,
//             next: -DEGREES_45,
//             // spins: 0,
//             duration: 1000,
//             // speed: 0.1,
//             // ease: 'easeOutQuint'
//         });

//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_90,
//             spins: 2,
//             duration: 1000,
//             // speed: 0.1,
//             // ease: 'easeOutQuint'
//         });

//     });
// }

// function testCanRotateDynamicallyThenRotateDynamically(): void {
//     test('can rotate dynamically then rotate dynamically again', () => {

//         testFullDuration({
//             rotation: rotation,
//             next: DEGREES_45,
//             // spins: 0,
//             duration: 1000,
//             speed: 0.05,
//             ease: 'easeOutQuint'
//         });

//         testFullDuration({
//             rotation: rotation,
//             next: -DEGREES_45,
//             // spins: 0,
//             // duration: 1000,
//             speed: 0.1,
//             ease: 'easeOutQuint'
//         });

//     });
// }


// /**
//  * UTILITY FUNCTIONS
//  */
// function testFullDuration(props: {
//     rotation: DynamicRotation;
//     next: number;
//     spins?: number;
//     duration?: number;
//     speed?: number;
//     ease?: tEaseOption;

// }): void {

//     EXPECT.falsy(props.rotation.isActive);

//     const NUM_STEPS = 20;
//     const previous = rotation.current;
//     const next = props.next;
//     const spins = (props.spins) ? props.spins : 0;
//     const spinAmount = spins * TAU;
//     let duration: number = 0;
//     let speed: number = 0;
//     let distance: number = 0;
//     let stepSize: number = 0;
//     const ease: tEaseOption = (props.ease) ? props.ease : 'noEase';
//     const number = new DynamicNumber(previous);

//     if (props.duration) duration = props.duration;

//     if (props.speed) {
//         speed = props.speed;
//         distance = Math.abs(next + spinAmount - previous);
//         duration = distance / speed;
//     }

//     stepSize = duration / NUM_STEPS;

//     // set speed
//     if (speed) {
//         props.rotation.speed(speed);
//         number.speed(speed);
//         props.rotation.load(props.rotation.save()); // <-- test load then save
//     }

//     // or duration
//     else {
//         props.rotation.duration(duration);
//         number.duration(duration);
//         props.rotation.load(props.rotation.save()); // <-- test load then save
//     }

//     // set ease
//     props.rotation.ease(ease);
//     number.ease(ease);
//     props.rotation.load(props.rotation.save()); // <-- test load then save

//     // set next
//     rotation.next(next, spins);
//     number.next(next + spinAmount);
//     props.rotation.load(props.rotation.save()); // <-- test load then save

//     // test getDuration()
//     EXPECT.toBe(props.rotation.getDuration(), duration);

//     // rotate
//     props.rotation.rotate();
//     number.change();

//     EXPECT.truthy(rotation.isActive); // <-- test get isActive()

//     props.rotation.next(5000).rotate(); // <-- test CANNOT rotate if active

//     for (let i = 0; i < NUM_STEPS - 1; i++) {
//         props.rotation.update(stepSize);
//         number.update(stepSize);
//         props.rotation.load(props.rotation.save()); // <-- test load then save
//         EXPECT.toBeCloseTo(props.rotation.current, number.current);

//     }

//     props.rotation.update(stepSize + 10);
//     props.rotation.load(props.rotation.save()); // <-- test load then save
//     EXPECT.falsy(props.rotation.isActive);
//     EXPECT.toBeCloseTo(props.rotation.current, next); // <-- test SPIN IS REMOVED


// }