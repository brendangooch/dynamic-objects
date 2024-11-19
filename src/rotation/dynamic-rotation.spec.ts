/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicRotation } from './dynamic-rotation.js';

const PI = Math.PI;
const TAU = PI * 2;
const HALF_PI = PI / 2;
const EXPECT = new JestExpect();
let rotation: DynamicRotation;
beforeEach(() => {
    rotation = new DynamicRotation();
});

testAll();
function testAll(): void {
    describe('DynamicRotation', () => {

        test('dummy', () => { });

    });
}

// starts inactive
// function testStartsInactive(): void {}
// initial value is value set on instantiation
// function testInitialValueIsValueSetOnInstantiation(): void {}
// default initial value is 0
// function testDefaultInitialValueIs0(): void {}
// can be stopped
// function testCanBeStopped(): void {}
// spin is ignored if rotating instantly
// function testSpinIsIgnoredIfRotatingInstantly(): void {}
// rotate to current rotation does nothing
// function testRotateToCurrentRotationDoesNothing(): void {}
// can rotate instantly
// function testCanRotateInstantly(): void {}
// can rotate dynamically
// function testCanRotateDynamically(): void {}
// can spin dynamically
// function testCanSpinDynamically(): void {}
// can rotate dynamically in a negative direction
// function testCanRotateDynamicallyInANegativeDirection(): void {}
// can spin dynamically in a negative direction
// function testCanSpinDynamicallyInANegativeDirection(): void {}
// can rotate dynamically with ease set
// function testX(): void {}
// can spin dynamically with ease set
// function testX(): void {}
// can rotate dynamically with speed and ease set
// function testX(): void {}
// can spin dynamically with speed and ease set
// function testX(): void {}
// can spin dynamically then rotate instantly
// function testX(): void {}
// can spin dynamically then rotate dynamically
// function testX(): void {}
// can rotate dynamically then spin dynamically
// function testX(): void {}

/**
 * UTILITY FUNCTIONS
 */
function testFullDuration(props: {
    rotation: DynamicRotation
}): void {

    // check spin is removed
    // check load save
    // check get duration

}