/**
 * 
 */

import { type tEaseOption, type tEaseFunction, load as loadEase } from '@brendangooch/ease';
import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicPosition } from './dynamic-position.js';
import { Vector2D } from '@brendangooch/maths';
import { QuadraticBezierCurve } from '@brendangooch/maths';


const EXPECT = new JestExpect();
let position: DynamicPosition;
beforeEach(() => {
    position = new DynamicPosition();
});

testAll();
function testAll(): void {
    describe('DynamicPosition', () => {

        test('dummy', () => { });

        // testStartsInactive();
        // testDefaultStartPositionIs00();
        // testStartsWithPositionSetOnInstantiation();
        // testPositionValuesAreRounded();
        // testCanBeStopped();
        // testCanMoveToANewPositionInstantly();
        // testCANNOTCurveToANewPositionInstantly();
        // testCanMoveToANewPositionDynamically();
        // testCanCurveToANewPositionDynamically();
        // testCanMoveToANewPositionDynamicallyWithEaseApplied();
        // testCanCurveToANewPositionDynamicallyWithEaseApplied();
        // testCanMoveToANewPositionDynamicallyWithSpeedSet();
        // testCanCurveToANewPositionDynamicallyWithSpeedSet();
        // testCanMoveToANewPositionDynamicallyWithSpeedSetAndEaseApplied();
        // testCanCurveToANewPositionDynamicallyWithSpeedSetAndEaseApplied();
        // testCanMoveInstantlyThenCurveToANewPosition();
        // testCanMoveDynamicallyThenCurveToANewPosition();
        // testCanCurveToThenMoveToANewPositionInstantly();
        // testCanCurveToThenMoveToANewPositionDynamically();
        // testCanMoveToThenMoveToAgain();
        // testCanCurveToThenCurveToAgain();

    });
}


// function testStartsInactive(): void {
//     test('starts inactive', () => {
//         EXPECT.falsy(position.isActive);
//     });
// }

// function testDefaultStartPositionIs00(): void {
//     test('default start position is 0,0', () => {
//         EXPECT.toBe(position.x, 0);
//         EXPECT.toBe(position.y, 0);
//     });
// }

// function testStartsWithPositionSetOnInstantiation(): void {
//     test('starts with position set on instantiation or 0,0 by default', () => {
//         position = new DynamicPosition(500, 600);
//         EXPECT.toBe(position.x, 500);
//         EXPECT.toBe(position.y, 600);
//     });
// }

// function testPositionValuesAreRounded(): void {
//     test('position values are rounded to nearest whole number', () => {
//         position.next(100.56, 678.23).move();
//         EXPECT.toBe(position.x, 101);
//         EXPECT.toBe(position.y, 678);
//     });
// }

// function testCanBeStopped(): void {
//     test('can be stopped', () => {
//         position.duration(1000).next(500, -600).move();
//         EXPECT.truthy(position.isActive);
//         position.update(100);
//         EXPECT.toBe(position.x, 50);
//         EXPECT.toBe(position.y, -60);
//         position.stop(); // <--
//         EXPECT.falsy(position.isActive);
//         position.update(100);
//         EXPECT.toBe(position.x, 50);
//         EXPECT.toBe(position.y, -60);
//     });
// }

// function testCanMoveToANewPositionInstantly(): void {
//     test('can move to a new position instantly', () => {
//         position.next(500, 600).move();
//         EXPECT.toBe(position.x, 500);
//         EXPECT.toBe(position.y, 600);
//     });
// }

// function testCANNOTCurveToANewPositionInstantly(): void {
//     test('CANNOT curve to a new position instantly', () => {
//         position.next(500, 600).curveTo(0, 0);
//         EXPECT.toBe(position.x, 0);
//         EXPECT.toBe(position.y, 0);
//     });
// }

// function testCanMoveToANewPositionDynamically(): void {
//     test('can move to a new position dynamically', () => {
//         position.next(100, 200).move();
//         testFullDuration({
//             position: position,
//             next: new Vector2D(500, 600),
//             duration: 1000
//             // speed: 0,
//             // controlDistance: 0,
//             // controlAngle: 0,
//             // ease: 'noEase'
//         });
//     });
// }

// function testCanCurveToANewPositionDynamically(): void {
//     test('can curve to a new position dynamically', () => {
//         position.next(100, 200).move();
//         testFullDuration({
//             position: position,
//             next: new Vector2D(1000, 800),
//             duration: 800,
//             // speed: 0,
//             controlDistance: 500,
//             controlAngle: -1
//             // ease: 'noEase'
//         });
//     });
// }

// function testCanMoveToANewPositionDynamicallyWithEaseApplied(): void {
//     test('can move to a new position dynamically with ease applied', () => {
//         position.next(100, 200).move();
//         testFullDuration({
//             position: position,
//             next: new Vector2D(-600, -800),
//             duration: 600,
//             // speed: 0,
//             // controlDistance: 0,
//             // controlAngle: 0,
//             ease: 'easeInOutExpo'
//         });
//     });
// }

// function testCanCurveToANewPositionDynamicallyWithEaseApplied(): void {
//     test('can curve to a new position dynamically with ease applied', () => {
//         position.next(100, 200).move();
//         testFullDuration({
//             position: position,
//             next: new Vector2D(-600, -800),
//             duration: 600,
//             // speed: 0,
//             controlDistance: 750,
//             controlAngle: 2,
//             ease: 'easeInOutExpo'
//         });
//     });
// }

// function testCanMoveToANewPositionDynamicallyWithSpeedSet(): void {
//     test('can move to a new position dynamically with speed set', () => {
//         position.next(100, 200).move();
//         testFullDuration({
//             position: position,
//             next: new Vector2D(-600, -800),
//             // duration: 600,
//             speed: 0.5,
//             // controlDistance: 0,
//             // controlAngle: 0,
//             // ease: 'easeInOutExpo'
//         });
//     });
// }

// function testCanCurveToANewPositionDynamicallyWithSpeedSet(): void {
//     test('can curve to a new position dynamically with speed set', () => {
//         position.next(100, 200).move();
//         testFullDuration({
//             position: position,
//             next: new Vector2D(-600, -800),
//             // duration: 600,
//             speed: 0.5,
//             controlDistance: 600,
//             controlAngle: 1.5
//             // ease: 'easeInOutExpo'
//         });
//     });
// }

// function testCanMoveToANewPositionDynamicallyWithSpeedSetAndEaseApplied(): void {
//     test('can move to a new position dynamically with speed set and ease applied', () => {
//         position.next(-100, -200).move();
//         testFullDuration({
//             position: position,
//             next: new Vector2D(800, 0),
//             // duration: 0,
//             speed: 2,
//             // controlDistance: 0,
//             // controlAngle: 0,
//             ease: 'easeOutQuart'
//         });
//     });
// }

// function testCanCurveToANewPositionDynamicallyWithSpeedSetAndEaseApplied(): void {
//     test('can curve to a new position dynamically with speed set and ease applied', () => {
//         position.next(-100, -200).move();
//         testFullDuration({
//             position: position,
//             next: new Vector2D(800, 0),
//             // duration: 0,
//             speed: 2,
//             controlDistance: 500,
//             controlAngle: 1,
//             ease: 'easeOutQuart'
//         });
//     });
// }

// function testCanMoveInstantlyThenCurveToANewPosition(): void {
//     test('can move instantly then curve to a new position', () => {
//         position.next(100, 200).move();
//         testFullDuration({
//             position: position,
//             next: new Vector2D(500, 800),
//             duration: 800,
//             // speed: 0,
//             controlDistance: 1000,
//             controlAngle: -1.5
//             // ease: 'noEase'
//         });
//     });
// }

// function testCanMoveDynamicallyThenCurveToANewPosition(): void {
//     test('can move dynamically then curve to a new position', () => {

//         position.next(500, 600).move();

//         // move
//         testFullDuration({
//             position: position,
//             next: new Vector2D(-500, -800),
//             duration: 800,
//             // speed: 0,
//             // controlDistance: 1000,
//             // controlAngle: -1.5
//             // ease: 'noEase'
//         });

//         // curve
//         testFullDuration({
//             position: position,
//             next: new Vector2D(1500, 1800),
//             duration: 600,
//             // speed: 0,
//             controlDistance: 1000,
//             controlAngle: -1.5
//             // ease: 'noEase'
//         });

//     });
// }

// function testCanCurveToThenMoveToANewPositionInstantly(): void {
//     test('can curve to then move to a new position instantly', () => {

//         position.next(500, 600).move();

//         // curve
//         testFullDuration({
//             position: position,
//             next: new Vector2D(1500, 1800),
//             duration: 600,
//             // speed: 0,
//             controlDistance: 1000,
//             controlAngle: -1.5
//             // ease: 'noEase'
//         });

//         EXPECT.toBe(position.x, 1500);
//         EXPECT.toBe(position.y, 1800);

//         position.next(500, 600).move();

//         EXPECT.toBe(position.x, 500);
//         EXPECT.toBe(position.y, 600);

//     });
// }

// function testCanCurveToThenMoveToANewPositionDynamically(): void {
//     test('can curve to then move to a new position dynamically', () => {

//         position.next(500, 600).move();

//         // curve
//         testFullDuration({
//             position: position,
//             next: new Vector2D(1500, 1800),
//             duration: 600,
//             // speed: 0,
//             controlDistance: 1000,
//             controlAngle: -1.5
//             // ease: 'noEase'
//         });

//         // move
//         testFullDuration({
//             position: position,
//             next: new Vector2D(-500, -800),
//             duration: 800,
//             // speed: 0,
//             // controlDistance: 1000,
//             // controlAngle: -1.5
//             // ease: 'noEase'
//         });

//     });
// }

// function testCanMoveToThenMoveToAgain(): void {
//     test('can move to dynamically then move to dynamically again', () => {

//         position.next(500, 600).move();

//         // move
//         testFullDuration({
//             position: position,
//             next: new Vector2D(1500, 1800),
//             duration: 600,
//             // speed: 0,
//             // controlDistance: 1000,
//             // controlAngle: -1.5
//             // ease: 'noEase'
//         });

//         // move
//         testFullDuration({
//             position: position,
//             next: new Vector2D(500, 600),
//             duration: 1600,
//             // speed: 0,
//             // controlDistance: 500,
//             // controlAngle: 1.5
//             // ease: 'noEase'
//         });

//     });
// }

// function testCanCurveToThenCurveToAgain(): void {
//     test('can curve to then curve to again', () => {

//         position.next(500, 600).move();

//         // curve
//         testFullDuration({
//             position: position,
//             next: new Vector2D(1500, 1800),
//             duration: 600,
//             // speed: 0,
//             controlDistance: 1000,
//             controlAngle: -1.5
//             // ease: 'noEase'
//         });

//         // curve
//         testFullDuration({
//             position: position,
//             next: new Vector2D(500, 600),
//             duration: 1600,
//             // speed: 0,
//             controlDistance: 500,
//             controlAngle: 1.5
//             // ease: 'noEase'
//         });

//     });
// }

// /**
//  * UTILITY FUNCTIONS
//  */

// function testFullDuration(props: {
//     position: DynamicPosition;
//     next: Vector2D;
//     duration?: number;
//     speed?: number;
//     controlDistance?: number;
//     controlAngle?: number;
//     ease?: tEaseOption;

// }): void {

//     EXPECT.falsy(position.isActive);

//     const NUM_STEPS = 20;
//     const previous = new Vector2D(props.position.x, props.position.y);
//     let duration: number = 0;
//     let speed: number = 0;
//     let distance: number = 0;
//     let stepSize: number = 0;
//     const ease: tEaseOption = (props.ease) ? props.ease : 'noEase';
//     const easeFn: tEaseFunction = loadEase(ease);
//     const bezier = new QuadraticBezierCurve();
//     const moveOrCurve = (props.controlDistance && props.controlAngle) ? 'curveTo' : 'moveTo';
//     let elapsed: number = 0;
//     let progress: number = 0;
//     let current = new Vector2D();

//     if (props.duration) duration = props.duration;

//     if (props.speed) {
//         speed = props.speed;
//         distance = previous.distanceTo(props.next);
//         duration = distance / speed;
//     }

//     stepSize = duration / NUM_STEPS;

//     if (speed) position.speed(speed);
//     else position.duration(duration!);

//     position.ease(ease);

//     if (moveOrCurve === 'moveTo') {
//         position.next(props.next.x, props.next.y);
//         EXPECT.toBe(position.getDuration(), duration); // <-- test getDuration()
//         position.move();
//     }
//     else {
//         position.next(props.next.x, props.next.y);
//         EXPECT.toBe(position.getDuration(), duration); // <-- test getDuration()
//         position.curveTo(props.controlDistance!, props.controlAngle!);
//         bezier.setStart(previous.x, previous.y);
//         bezier.setEnd(props.next.x, props.next.y);
//         bezier.setControlByDistanceAndAngleFromStart(props.controlDistance!, props.controlAngle!);
//     }

//     position.load(position.save()); // <-- test load and save
//     EXPECT.truthy(position.isActive); // <-- test get isActive()

//     position.next(5000, 5000).move(); // <-- test CANNOT moveTo if active
//     position.next(5000, 5000).curveTo(1000, 2); // <-- test CANNOT curveTo if active

//     for (let i = 0; i < NUM_STEPS - 1; i++) {
//         position.update(stepSize);
//         position.load(position.save()); // <-- test load and save
//         elapsed += stepSize;
//         progress = easeFn(elapsed / duration!);
//         if (moveOrCurve === 'moveTo') current.copy(previous.add(props.next.subtract(previous).multiply(progress)));
//         else current.setXY(bezier.x(progress), bezier.y(progress));
//         EXPECT.toBe(position.x, Math.round(current.x));
//         EXPECT.toBe(position.y, Math.round(current.y));
//     }

//     position.update(stepSize + 10);
//     position.load(position.save()); // <-- test load and save
//     EXPECT.falsy(position.isActive);
//     EXPECT.toBe(position.x, props.next.x);
//     EXPECT.toBe(position.y, props.next.y);

// }