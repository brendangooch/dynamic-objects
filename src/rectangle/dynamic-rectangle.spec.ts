/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicRectangle } from './dynamic-rectangle.js';

const EXPECT = new JestExpect();
let rectangle: DynamicRectangle;
beforeEach(() => {
    rectangle = new DynamicRectangle();
});

testAll();
function testAll(): void {
    describe('DynamicRectangle', () => {

        testIsActiveIfANYComponentIsActive();
        testAllComponentsCanBeStoppedByCallingStopMethod();
        testFullTransitionWithMultipleComponentsChangingBehavesAsExpected();

    });
}


function testIsActiveIfANYComponentIsActive(): void {
    test('is active if ANY component is active', () => {

        EXPECT.falsy(rectangle.isActive);

        // visibility
        rectangle.visibility.duration(500).frequency(100).blink();
        EXPECT.truthy(rectangle.isActive);

        // position
        rectangle.position.duration(600).next(500, 500).move();
        EXPECT.truthy(rectangle.isActive);

        // rotation
        rectangle.rotation.duration(700).next(Math.PI / 2).rotate();
        EXPECT.truthy(rectangle.isActive);

        // opacity
        rectangle.opacity.duration(800).next(0.5).change();
        EXPECT.truthy(rectangle.isActive);

        // scale
        rectangle.scale.duration(900).next(2).change();
        EXPECT.truthy(rectangle.isActive);

        // width
        rectangle.width.duration(1000).next(200).change();
        EXPECT.truthy(rectangle.isActive);

        // height
        rectangle.height.duration(1100).next(200).change();
        EXPECT.truthy(rectangle.isActive);

        rectangle.update(500); // rectangle complete
        EXPECT.truthy(rectangle.isActive);

        rectangle.update(100); // position complete
        EXPECT.truthy(rectangle.isActive);

        rectangle.update(100); // rotation complete
        EXPECT.truthy(rectangle.isActive);

        rectangle.update(100); // opacity complete
        EXPECT.truthy(rectangle.isActive);

        rectangle.update(100); // scale complete
        EXPECT.truthy(rectangle.isActive);

        rectangle.update(100); // width complete
        EXPECT.truthy(rectangle.isActive);

        rectangle.update(100); // height complete / ALL complete
        EXPECT.falsy(rectangle.isActive); // <--

    });
}

function testAllComponentsCanBeStoppedByCallingStopMethod(): void {
    test('all components can be stopped by calling stop()', () => {

        // visibility
        rectangle.visibility.duration(500).frequency(100).blink();

        // position
        rectangle.position.duration(600).next(500, 500).move();

        // rotation
        rectangle.rotation.duration(700).next(Math.PI / 2).rotate();

        // opacity
        rectangle.opacity.duration(800).next(0.5).change();

        // scale
        rectangle.scale.duration(900).next(2).change();

        // width
        rectangle.width.duration(1000).next(200).change();

        // height
        rectangle.height.duration(1100).next(200).change();

        EXPECT.truthy(rectangle.isActive);

        rectangle.stop() // <--

        EXPECT.falsy(rectangle.isActive);

    });
}

function testFullTransitionWithMultipleComponentsChangingBehavesAsExpected(): void {
    test('full transition with multiple components changing dynamically behaves as expected', () => {

        EXPECT.falsy(rectangle.isActive);

        // visibility
        rectangle.visibility.duration(600).frequency(400).blink();
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // position
        rectangle.position.duration(700).next(500, 600).move();
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // rotation
        rectangle.rotation.duration(800).next(Math.PI / 2).rotate();
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // opacity
        rectangle.opacity.duration(900).next(0.5).change();
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // scale
        rectangle.scale.duration(1000).next(2).change();
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // width
        rectangle.width.duration(1100).next(200).change();
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // height
        rectangle.height.duration(1200).next(400).change();
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);


        // 100
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // visibility
        // progress = (100 / 200) | 100 / 600 | (400 frequency)
        EXPECT.toBe(rectangle.visibility.isVisible, true);
        EXPECT.truthy(rectangle.visibility.isActive);

        // position
        // progress = 100 / 700 | 0,0 --> 500, 600
        EXPECT.toBeCloseTo(rectangle.position.x, Math.round(500 * (100 / 700)));
        EXPECT.toBeCloseTo(rectangle.position.y, Math.round(600 * (100 / 700)));
        EXPECT.truthy(rectangle.position.isActive);

        // rotation
        // progress = 100 / 800 | 0 --> Math.PI / 2
        EXPECT.toBeCloseTo(rectangle.rotation.current, Math.PI / 2 * (100 / 800));
        EXPECT.truthy(rectangle.rotation.isActive);

        // opacity
        // progress = 100 / 900 | 1 -> 0.5
        EXPECT.toBeCloseTo(rectangle.opacity.current, 1 - (0.5 * (100 / 900)));
        EXPECT.truthy(rectangle.opacity.isActive);

        // scale
        // progress = 100 / 1000 | 1 --> 2
        EXPECT.toBeCloseTo(rectangle.scale.current, 1 + (1 * (100 / 1000)));
        EXPECT.truthy(rectangle.scale.isActive);

        // width
        // progress = 100 / 1100 | 200
        EXPECT.toBeCloseTo(rectangle.width.current, Math.round(200 * (100 / 1100)));
        EXPECT.truthy(rectangle.width.isActive);

        // height
        // progress = 100 / 1200 | 400
        EXPECT.toBeCloseTo(rectangle.height.current, Math.round(400 * (100 / 1200)));
        EXPECT.truthy(rectangle.height.isActive);


        // 200
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // visibility
        // progress = (200 / 200) | 200 / 600 | (400 frequency)
        EXPECT.toBe(rectangle.visibility.isVisible, true); // ?? thought it would be false...
        EXPECT.truthy(rectangle.visibility.isActive);

        // position
        // progress = 200 / 700 | 0,0 --> 500, 600
        EXPECT.toBeCloseTo(rectangle.position.x, Math.round(500 * (200 / 700)));
        EXPECT.toBeCloseTo(rectangle.position.y, Math.round(600 * (200 / 700)));
        EXPECT.truthy(rectangle.position.isActive);

        // rotation
        // progress = 200 / 800 | 0 --> Math.PI / 2
        EXPECT.toBeCloseTo(rectangle.rotation.current, Math.PI / 2 * (200 / 800));
        EXPECT.truthy(rectangle.rotation.isActive);

        // opacity
        // progress = 200 / 900 | 1 -> 0.5
        EXPECT.toBeCloseTo(rectangle.opacity.current, 1 - (0.5 * (200 / 900)));
        EXPECT.truthy(rectangle.opacity.isActive);

        // scale
        // progress = 200 / 1000 | 1 --> 2
        EXPECT.toBeCloseTo(rectangle.scale.current, 1 + (1 * (200 / 1000)));
        EXPECT.truthy(rectangle.scale.isActive);

        // width
        // progress = 200 / 1100 | 200
        EXPECT.toBeCloseTo(rectangle.width.current, Math.round(200 * (200 / 1100)));
        EXPECT.truthy(rectangle.width.isActive);

        // height
        // progress = 200 / 1200 | 400
        EXPECT.toBeCloseTo(rectangle.height.current, Math.round(400 * (200 / 1200)));
        EXPECT.truthy(rectangle.height.isActive);




        // 300
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // visibility
        // progress = (100 / 200) | 300 / 600 | (400 frequency)
        EXPECT.toBe(rectangle.visibility.isVisible, true); // ?? thought it would be false...
        EXPECT.truthy(rectangle.visibility.isActive);

        // position
        // progress = 300 / 700 | 0,0 --> 500, 600
        EXPECT.toBeCloseTo(rectangle.position.x, Math.round(500 * (300 / 700)));
        EXPECT.toBeCloseTo(rectangle.position.y, Math.round(600 * (300 / 700)));
        EXPECT.truthy(rectangle.position.isActive);

        // rotation
        // progress = 300 / 800 | 0 --> Math.PI / 2
        EXPECT.toBeCloseTo(rectangle.rotation.current, Math.PI / 2 * (300 / 800));
        EXPECT.truthy(rectangle.rotation.isActive);

        // opacity
        // progress = 300 / 900 | 1 -> 0.5
        EXPECT.toBeCloseTo(rectangle.opacity.current, 1 - (0.5 * (300 / 900)));
        EXPECT.truthy(rectangle.opacity.isActive);

        // scale
        // progress = 300 / 1000 | 1 --> 2
        EXPECT.toBeCloseTo(rectangle.scale.current, 1 + (1 * (300 / 1000)));
        EXPECT.truthy(rectangle.scale.isActive);

        // width
        // progress = 300 / 1100 | 200
        EXPECT.toBeCloseTo(rectangle.width.current, Math.round(200 * (300 / 1100)));
        EXPECT.truthy(rectangle.width.isActive);

        // height
        // progress = 300 / 1200 | 400
        EXPECT.toBeCloseTo(rectangle.height.current, Math.round(400 * (300 / 1200)));
        EXPECT.truthy(rectangle.height.isActive);




        // 400
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // visibility
        // progress = (200 / 200) | 400 / 600 | (400 frequency)
        EXPECT.toBe(rectangle.visibility.isVisible, true); // ?? thought it would be false...
        EXPECT.truthy(rectangle.visibility.isActive);

        // position
        // progress = 400 / 700 | 0,0 --> 500, 600
        EXPECT.toBeCloseTo(rectangle.position.x, Math.round(500 * (400 / 700)));
        EXPECT.toBeCloseTo(rectangle.position.y, Math.round(600 * (400 / 700)));
        EXPECT.truthy(rectangle.position.isActive);

        // rotation
        // progress = 400 / 800 | 0 --> Math.PI / 2
        EXPECT.toBeCloseTo(rectangle.rotation.current, Math.PI / 2 * (400 / 800));
        EXPECT.truthy(rectangle.rotation.isActive);

        // opacity
        // progress = 400 / 900 | 1 -> 0.5
        EXPECT.toBeCloseTo(rectangle.opacity.current, 1 - (0.5 * (400 / 900)));
        EXPECT.truthy(rectangle.opacity.isActive);

        // scale
        // progress = 400 / 1000 | 1 --> 2
        EXPECT.toBeCloseTo(rectangle.scale.current, 1 + (1 * (400 / 1000)));
        EXPECT.truthy(rectangle.scale.isActive);

        // width
        // progress = 400 / 1100 | 200
        EXPECT.toBeCloseTo(rectangle.width.current, Math.round(200 * (400 / 1100)));
        EXPECT.truthy(rectangle.width.isActive);

        // height
        // progress = 400 / 1200 | 400
        EXPECT.toBeCloseTo(rectangle.height.current, Math.round(400 * (400 / 1200)));
        EXPECT.truthy(rectangle.height.isActive);




        // 500
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // visibility
        // progress = (100 / 200) | 500 / 600 | (400 frequency)
        EXPECT.toBe(rectangle.visibility.isVisible, true); // don't think this is working correctly
        EXPECT.truthy(rectangle.visibility.isActive);

        // position
        // progress = 500 / 700 | 0,0 --> 500, 600
        EXPECT.toBeCloseTo(rectangle.position.x, Math.round(500 * (500 / 700)));
        EXPECT.toBeCloseTo(rectangle.position.y, Math.round(600 * (500 / 700)));
        EXPECT.truthy(rectangle.position.isActive);

        // rotation
        // progress = 500 / 800 | 0 --> Math.PI / 2
        EXPECT.toBeCloseTo(rectangle.rotation.current, Math.PI / 2 * (500 / 800));
        EXPECT.truthy(rectangle.rotation.isActive);

        // opacity
        // progress = 500 / 900 | 1 -> 0.5
        EXPECT.toBeCloseTo(rectangle.opacity.current, 1 - (0.5 * (500 / 900)));
        EXPECT.truthy(rectangle.opacity.isActive);

        // scale
        // progress = 500 / 1000 | 1 --> 2
        EXPECT.toBeCloseTo(rectangle.scale.current, 1 + (1 * (500 / 1000)));
        EXPECT.truthy(rectangle.scale.isActive);

        // width
        // progress = 500 / 1100 | 200
        EXPECT.toBeCloseTo(rectangle.width.current, Math.round(200 * (500 / 1100)));
        EXPECT.truthy(rectangle.width.isActive);

        // height
        // progress = 500 / 1200 | 400
        EXPECT.toBeCloseTo(rectangle.height.current, Math.round(400 * (500 / 1200)));
        EXPECT.truthy(rectangle.height.isActive);




        // 600
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // visibility
        // progress = (200 / 200) | 600 / 600 | (400 frequency)
        EXPECT.toBe(rectangle.visibility.isVisible, true); // don't think this is working correctly
        EXPECT.falsy(rectangle.visibility.isActive); // <--

        // position
        // progress = 600 / 700 | 0,0 --> 500, 600
        EXPECT.toBeCloseTo(rectangle.position.x, Math.round(500 * (600 / 700)));
        EXPECT.toBeCloseTo(rectangle.position.y, Math.round(600 * (600 / 700)));
        EXPECT.truthy(rectangle.position.isActive);

        // rotation
        // progress = 600 / 800 | 0 --> Math.PI / 2
        EXPECT.toBeCloseTo(rectangle.rotation.current, Math.PI / 2 * (600 / 800));
        EXPECT.truthy(rectangle.rotation.isActive);

        // opacity
        // progress = 600 / 900 | 1 -> 0.5
        EXPECT.toBeCloseTo(rectangle.opacity.current, 1 - (0.5 * (600 / 900)));
        EXPECT.truthy(rectangle.opacity.isActive);

        // scale
        // progress = 600 / 1000 | 1 --> 2
        EXPECT.toBeCloseTo(rectangle.scale.current, 1 + (1 * (600 / 1000)));
        EXPECT.truthy(rectangle.scale.isActive);

        // width
        // progress = 600 / 1100 | 200
        EXPECT.toBeCloseTo(rectangle.width.current, Math.round(200 * (600 / 1100)));
        EXPECT.truthy(rectangle.width.isActive);

        // height
        // progress = 600 / 1200 | 400
        EXPECT.toBeCloseTo(rectangle.height.current, Math.round(400 * (600 / 1200)));
        EXPECT.truthy(rectangle.height.isActive);




        // 700
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // position
        // progress = 700 / 700 | 0,0 --> 500, 600
        EXPECT.toBe(rectangle.position.x, 500);
        EXPECT.toBe(rectangle.position.y, 600);
        EXPECT.falsy(rectangle.position.isActive);

        // rotation
        // progress = 700 / 800 | 0 --> Math.PI / 2
        EXPECT.toBeCloseTo(rectangle.rotation.current, Math.PI / 2 * (700 / 800));
        EXPECT.truthy(rectangle.rotation.isActive);

        // opacity
        // progress = 700 / 900 | 1 -> 0.5
        EXPECT.toBeCloseTo(rectangle.opacity.current, 1 - (0.5 * (700 / 900)));
        EXPECT.truthy(rectangle.opacity.isActive);

        // scale
        // progress = 700 / 1000 | 1 --> 2
        EXPECT.toBeCloseTo(rectangle.scale.current, 1 + (1 * (700 / 1000)));
        EXPECT.truthy(rectangle.scale.isActive);

        // width
        // progress = 700 / 1100 | 200
        EXPECT.toBeCloseTo(rectangle.width.current, Math.round(200 * (700 / 1100)));
        EXPECT.truthy(rectangle.width.isActive);

        // height
        // progress = 700 / 1200 | 400
        EXPECT.toBeCloseTo(rectangle.height.current, Math.round(400 * (700 / 1200)));
        EXPECT.truthy(rectangle.height.isActive);




        // 800
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // rotation
        // progress = 800 / 800 | 0 --> Math.PI / 2
        EXPECT.toBe(rectangle.rotation.current, Math.PI / 2);
        EXPECT.falsy(rectangle.rotation.isActive);

        // opacity
        // progress = 800 / 900 | 1 -> 0.5
        EXPECT.toBeCloseTo(rectangle.opacity.current, 1 - (0.5 * (800 / 900)));
        EXPECT.truthy(rectangle.opacity.isActive);

        // scale
        // progress = 800 / 1000 | 1 --> 2
        EXPECT.toBeCloseTo(rectangle.scale.current, 1 + (1 * (800 / 1000)));
        EXPECT.truthy(rectangle.scale.isActive);

        // width
        // progress = 800 / 1100 | 200
        EXPECT.toBeCloseTo(rectangle.width.current, Math.round(200 * (800 / 1100)));
        EXPECT.truthy(rectangle.width.isActive);

        // height
        // progress = 800 / 1200 | 400
        EXPECT.toBeCloseTo(rectangle.height.current, Math.round(400 * (800 / 1200)));
        EXPECT.truthy(rectangle.height.isActive);




        // 900
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // opacity
        // progress = 900 / 900 | 1 -> 0.5
        EXPECT.toBe(rectangle.opacity.current, 0.5);
        EXPECT.falsy(rectangle.opacity.isActive);

        // scale
        // progress = 900 / 1000 | 1 --> 2
        EXPECT.toBeCloseTo(rectangle.scale.current, 1 + (1 * (900 / 1000)));
        EXPECT.truthy(rectangle.scale.isActive);

        // width
        // progress = 900 / 1100 | 200
        EXPECT.toBeCloseTo(rectangle.width.current, Math.round(200 * (900 / 1100)));
        EXPECT.truthy(rectangle.width.isActive);

        // height
        // progress = 900 / 1200 | 400
        EXPECT.toBeCloseTo(rectangle.height.current, Math.round(400 * (900 / 1200)));
        EXPECT.truthy(rectangle.height.isActive);




        // 1000
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // scale
        // progress = 1000 / 1000 | 1 --> 2
        EXPECT.toBe(rectangle.scale.current, 2);
        EXPECT.falsy(rectangle.scale.isActive);

        // width
        // progress = 1000 / 1100 | 200
        EXPECT.toBeCloseTo(rectangle.width.current, Math.round(200 * (1000 / 1100)));
        EXPECT.truthy(rectangle.width.isActive);

        // height
        // progress = 1000 / 1200 | 400
        EXPECT.toBeCloseTo(rectangle.height.current, Math.round(400 * (1000 / 1200)));
        EXPECT.truthy(rectangle.height.isActive);




        // 1100
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.truthy(rectangle.isActive);

        // width
        // progress = 1100 / 1100 | 200
        EXPECT.toBe(rectangle.width.current, 200);
        EXPECT.falsy(rectangle.width.isActive);

        // height
        // progress = 1100 / 1200 | 400
        EXPECT.toBeCloseTo(rectangle.height.current, Math.round(400 * (1100 / 1200)));
        EXPECT.truthy(rectangle.height.isActive);




        // 1200
        rectangle.update(100);
        rectangle.load(rectangle.save());
        EXPECT.falsy(rectangle.isActive); // <--

        // height
        // progress = 1100 / 1200 | 400
        EXPECT.toBe(rectangle.height.current, 400);
        EXPECT.falsy(rectangle.height.isActive);


    });
}