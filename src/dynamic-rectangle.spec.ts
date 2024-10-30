/**
 * 
 */

import * as EXPECT from '@brendangooch/jest-expect';
// import * as EASE from '@brendangooch/ease';
import { DynamicRectangle } from './dynamic-rectangle.js';
import { roundToPlaces } from '@brendangooch/maths';
import { DynamicPosition } from './dynamic-position.js';
import { DynamicRotation } from './dynamic-rotation.js';
import { DynamicNumber } from './dynamic-number.js';

let rectangle: DynamicRectangle;
beforeEach(() => {
    rectangle = new DynamicRectangle();
});

testAll();
function testAll(): void {
    describe('DynamicRectangle', () => {

        testRectangleIsInactiveOnInstantiation();
        testChangingANYComponentDynamicallyMakesTheRectangleActive();
        testRectangleIsInactiveOnceUpdateCompleteOnALLComponents();
        testInitialCurrentXValueIs0();
        testInitialCurrentYValueIs0();
        testInitialCurrentRotationValueIs0();
        testInitialCurrentOpacityValueIs1();
        testInitialCurrentScaleValueIs1();
        testInitialCurrentWidthValueIs100();
        testInitialCurrentHeightValueIs100();
        testRectangleIsInitiallyVisible();
        testCanShowAndHideRectangleIfOnOrOff();
        testCanShowAndHideRectangleIfActiveOrNot();
        testDurationCANBeSetIfRectangleIsActive();
        testDurationCorrectlyAppliedOnNextChangeMethodCall();
        testDurationMustBe0OrOverToHaveAnEffect();
        testDurationIsResetOnceNextChangeMethodIsCalled();
        testSpeedCANBeSetIfRectangleIsActive();
        testSpeedCorrectlyAppliedOnNextChangeMethodCall();
        testSpeedMustBe0OrOverToHaveAnEffect();
        testSpeedIsResetOnceNextChangeMethodIsCalled();
        testEaseCANBeSetIfRectangleIsActive();
        testEaseCorrectlyAppliedOnNextChangeMethodCall();
        testEaseCorrectlyResetOnInstantChange();
        testEaseIsResetOnceNextChangeMethodIsCalled();
        testCanCallMultipleChangeMethodsAtOnceEvenIfRectangleIsActive();
        testFadeToParamIsClampedBetween0And1();
        testScaleToParamIsClampedBetween0And1000();
        testWidthToParamIsClampedBetween0And5000();
        testHeightToParamIsClampedBetween0And5000();
        testRectangleBehavesAsExpectedDuringFullDuration();
        testRectangleBehavesAsExpectedDuringFullDurationWithEaseSet();
        testRectangleBehavesAsExpectedDuringFullDurationWithSpeedSet();
        testRectangleContinuesToBehaveAsExpectedAfterSaveThenLoad();
        testValidLoadReturnsTrue();
        testLoadReturnsFalseIfMissingParentProperty();
        testLoadReturnsFalseIfMissingPositionProperty();
        testLoadReturnsFalseIfMissingRotationProperty();
        testLoadReturnsFalseIfMissingOpacityProperty();
        testLoadReturnsFalseIfMissingScaleProperty();
        testLoadReturnsFalseIfMissingWidthProperty();
        testLoadReturnsFalseIfMissingHeightProperty();
        testLoadReturnsFalseIfMissingCurrentValuesProperty();
        testLoadReturnsFalseIfMissingSpeedProperty();
        testLoadReturnsFalseIfMissingVisibleProperty();

    });
}

function testRectangleIsInactiveOnInstantiation(): void {
    test('rectangle is inactive on instantiation', () => {
        EXPECT.falsy(rectangle.isActive);
    });
}

function testChangingANYComponentDynamicallyMakesTheRectangleActive(): void {
    test('changing ANY component dynamically makes the rectangle active', () => {

        rectangle = new DynamicRectangle();
        rectangle.duration(1000).moveTo(100, 100);
        EXPECT.truthy(rectangle.isActive);

        rectangle = new DynamicRectangle();
        rectangle.duration(1000).curveTo(100, 100, 500, 1.5);
        EXPECT.truthy(rectangle.isActive);

        rectangle = new DynamicRectangle();
        rectangle.duration(1000).rotateTo(Math.PI / 2);
        EXPECT.truthy(rectangle.isActive);

        rectangle = new DynamicRectangle();
        rectangle.duration(1000).spinTo(1, Math.PI / 2);
        EXPECT.truthy(rectangle.isActive);

        rectangle = new DynamicRectangle();
        rectangle.duration(1000).fadeTo(0.5);
        EXPECT.truthy(rectangle.isActive);

        rectangle = new DynamicRectangle();
        rectangle.duration(1000).scaleTo(0.5);
        EXPECT.truthy(rectangle.isActive);

        rectangle = new DynamicRectangle();
        rectangle.duration(1000).widthTo(200);
        EXPECT.truthy(rectangle.isActive);

        rectangle = new DynamicRectangle();
        rectangle.duration(1000).heightTo(200);
        EXPECT.truthy(rectangle.isActive);

    });
}

function testRectangleIsInactiveOnceUpdateCompleteOnALLComponents(): void {
    test('rectangle is inactive once update complete on ALL components', () => {
        rectangle.duration(200).moveTo(500, 500);
        rectangle.duration(300).spinTo(1, -Math.PI / 2);
        rectangle.duration(400).fadeTo(0.5);
        EXPECT.truthy(rectangle.isActive);
        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        rectangle.update(100);
        EXPECT.falsy(rectangle.isActive);
    });
}

function testInitialCurrentXValueIs0(): void {
    test('initial current x value is 0', () => {
        EXPECT.toBe(rectangle.current.x, 0);
    });
}

function testInitialCurrentYValueIs0(): void {
    test('initial current y value is 0', () => {
        EXPECT.toBe(rectangle.current.y, 0);
    });
}

function testInitialCurrentRotationValueIs0(): void {
    test('initial current rotation value is 0', () => {
        EXPECT.toBe(rectangle.current.rotation, 0);
    });
}

function testInitialCurrentOpacityValueIs1(): void {
    test('initial current opacity value is 1', () => {
        EXPECT.toBe(rectangle.current.opacity, 1);
    });
}

function testInitialCurrentScaleValueIs1(): void {
    test('initial current scale value is 1', () => {
        EXPECT.toBe(rectangle.current.scale, 1);
    });
}

function testInitialCurrentWidthValueIs100(): void {
    test('initial current width value is 100', () => {
        EXPECT.toBe(rectangle.current.width, 100);
    });
}

function testInitialCurrentHeightValueIs100(): void {
    test('initial current height value is 100', () => {
        EXPECT.toBe(rectangle.current.height, 100);
    });
}

function testRectangleIsInitiallyVisible(): void {
    test('rectangle is initially visible', () => {
        EXPECT.truthy(rectangle.isVisible);
    });
}

function testCanShowAndHideRectangleIfOnOrOff(): void {
    test('can show and hide rectangle if on or off', () => {
        EXPECT.truthy(rectangle.isVisible);
        rectangle.turnOff();
        rectangle.hide();
        EXPECT.falsy(rectangle.isVisible);
        rectangle.show();
        EXPECT.truthy(rectangle.isVisible);
        rectangle.turnOn();
        rectangle.hide();
        EXPECT.falsy(rectangle.isVisible);
        rectangle.show();
        EXPECT.truthy(rectangle.isVisible);

    });
}

function testCanShowAndHideRectangleIfActiveOrNot(): void {
    test('can show and hide rectangle if active or not', () => {
        EXPECT.falsy(rectangle.isActive);
        EXPECT.truthy(rectangle.isVisible);
        rectangle.hide();
        EXPECT.falsy(rectangle.isVisible);
        rectangle.show();
        EXPECT.truthy(rectangle.isVisible);
        rectangle.duration(1000).fadeTo(0);
        EXPECT.truthy(rectangle.isActive);
        rectangle.hide();
        EXPECT.falsy(rectangle.isVisible);
        rectangle.show();
        EXPECT.truthy(rectangle.isVisible);
    });
}

function testDurationCANBeSetIfRectangleIsActive(): void {
    test('duration CAN be set if rectangle is active', () => {
        rectangle.duration(1000).moveTo(500, 500);
        EXPECT.truthy(rectangle.isActive);
        rectangle.update(100);
        EXPECT.toBeCloseTo(rectangle.current.x, 50);
        EXPECT.toBeCloseTo(rectangle.current.y, 50);
        rectangle.duration(500).rotateTo(Math.PI / 2);
        rectangle.update(50);
        EXPECT.toBeCloseTo(rectangle.current.rotation, (Math.PI / 2) * 0.1);

    });
}

function testDurationCorrectlyAppliedOnNextChangeMethodCall(): void {
    test('duration correctly applied on next change method call', () => {
        rectangle.duration(1000).moveTo(500, 500);
        EXPECT.truthy(rectangle.isActive);
        rectangle.update(100);
        EXPECT.toBeCloseTo(rectangle.current.x, 50);
        EXPECT.toBeCloseTo(rectangle.current.y, 50);
    });
}

function testDurationMustBe0OrOverToHaveAnEffect(): void {
    test('duration must be 0 or over to have an effect', () => {
        rectangle.duration(0).moveTo(500, 500);
        EXPECT.falsy(rectangle.isActive);
        EXPECT.toBeCloseTo(rectangle.current.x, 500);
        EXPECT.toBeCloseTo(rectangle.current.y, 500);
        rectangle.duration(-100).moveTo(1500, 1500);
        EXPECT.falsy(rectangle.isActive);
        EXPECT.toBeCloseTo(rectangle.current.x, 1500);
        EXPECT.toBeCloseTo(rectangle.current.y, 1500);
    });
}

function testDurationIsResetOnceNextChangeMethodIsCalled(): void {
    test('duration is reset once next change method is called', () => {
        EXPECT.toBe(rectangle.duration(1000).rotateTo(Math.PI), 1000);
        EXPECT.toBe(rectangle.widthTo(500), 0);
        EXPECT.toBe(rectangle.current.width, 500);
    });
}

function testSpeedCANBeSetIfRectangleIsActive(): void {
    test('speed CAN be set if rectangle is active', () => {
        rectangle.speed(1).widthTo(500);
        EXPECT.truthy(rectangle.isActive);
        rectangle.speed(2).moveTo(1000, 0); // 500ms duration
        rectangle.update(50); // 10%
        EXPECT.toBeCloseTo(rectangle.current.x, 100);
    });
}

function testSpeedCorrectlyAppliedOnNextChangeMethodCall(): void {
    test('speed correctly applied on next change method call', () => {
        EXPECT.toBeCloseTo(rectangle.speed(2).moveTo(1000, 0), 500); // 500ms duration
        rectangle.update(50); // 10%
        EXPECT.toBeCloseTo(rectangle.current.x, 100);
    });
}

function testSpeedMustBe0OrOverToHaveAnEffect(): void {
    test('speed must be 0 or over to have an effect', () => {
        EXPECT.toBe(rectangle.speed(0).moveTo(800, 600), 0);
        EXPECT.falsy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 800);
        EXPECT.toBe(rectangle.current.y, 600);
    });
}

function testSpeedIsResetOnceNextChangeMethodIsCalled(): void {
    test('speed is reset once next change method is called', () => {
        rectangle.speed(5).moveTo(500, 600);
        rectangle.fadeTo(0);
        EXPECT.toBe(rectangle.current.opacity, 0);
    });
}

function testEaseCANBeSetIfRectangleIsActive(): void {
    test('ease CAN be set if rectangle is active', () => {
        rectangle.duration(1000).moveTo(500, 600);
        EXPECT.truthy(rectangle.isActive);
        rectangle.duration(1000).ease('easeInQuad').rotateTo(Math.PI / 2);
        rectangle.update(100);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces((Math.PI / 2) * Math.pow(0.1, 2), 2));
    });
}

function testEaseCorrectlyAppliedOnNextChangeMethodCall(): void {
    test('ease correctly applied on next change method call', () => {
        rectangle.duration(1000).ease('easeInQuad').rotateTo(Math.PI / 2);
        rectangle.update(100);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces((Math.PI / 2) * Math.pow(0.1, 2), 2));
    });
}

function testEaseCorrectlyResetOnInstantChange(): void {
    test('ease correctly reset on instant change', () => {
        rectangle.ease('easeInQuart').rotateTo(Math.PI / 2);
        EXPECT.falsy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2, 2));
        rectangle.duration(1000).moveTo(100, 200);
        rectangle.update(100);
        EXPECT.toBe(rectangle.current.x, 10);
        EXPECT.toBe(rectangle.current.y, 20);
    });
}

function testEaseIsResetOnceNextChangeMethodIsCalled(): void {
    test('ease is reset once next change method is called', () => {
        rectangle.duration(500).ease('easeInQuart').rotateTo(Math.PI / 2);
        rectangle.duration(1000).moveTo(100, 200);
        rectangle.update(100);
        EXPECT.toBe(rectangle.current.x, 10);
        EXPECT.toBe(rectangle.current.y, 20);
    });
}

function testCanCallMultipleChangeMethodsAtOnceEvenIfRectangleIsActive(): void {
    test('can call multiple change methods at once, even if rectangle is active', () => {
        EXPECT.toBe(rectangle.duration(1000).moveTo(500, 500), 1000);
        EXPECT.toBe(rectangle.duration(1000).rotateTo(Math.PI), 1000);
        EXPECT.toBe(rectangle.duration(1000).scaleTo(0.8), 1000);
        rectangle.update(100);
        EXPECT.toBe(rectangle.current.x, 50);
        EXPECT.toBe(rectangle.current.y, 50);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI * 0.1, 2));
        EXPECT.toBe(rectangle.current.scale, 0.98);
    });
}

function testFadeToParamIsClampedBetween0And1(): void {
    test('fadeTo param is clamped between 0 and 1', () => {
        rectangle.fadeTo(-0.1);
        EXPECT.toBe(rectangle.current.opacity, 0);
        rectangle.fadeTo(1.1);
        EXPECT.toBe(rectangle.current.opacity, 1);
    });
}

function testScaleToParamIsClampedBetween0And1000(): void {
    test('scaleTo param is clamped between 0 and 1000', () => {
        rectangle.scaleTo(-0.1);
        EXPECT.toBe(rectangle.current.scale, 0);
        rectangle.scaleTo(1001);
        EXPECT.toBe(rectangle.current.scale, 1000);
    });
}

function testWidthToParamIsClampedBetween0And5000(): void {
    test('widthTo param is clamped between 0 and 5000', () => {
        rectangle.widthTo(-1);
        EXPECT.toBe(rectangle.current.width, 0);
        rectangle.widthTo(5001);
        EXPECT.toBe(rectangle.current.width, 5000);
    });
}

function testHeightToParamIsClampedBetween0And5000(): void {
    test('heightTo param is clamped between 0 and 5000', () => {
        rectangle.heightTo(-1);
        EXPECT.toBe(rectangle.current.height, 0);
        rectangle.heightTo(5001);
        EXPECT.toBe(rectangle.current.height, 5000);
    });
}

function testRectangleBehavesAsExpectedDuringFullDuration(): void {
    test('rectangle behaves as expected during full duration', () => {

        EXPECT.toBe(rectangle.duration(1000).moveTo(500, 800), 1000);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(900).rotateTo(Math.PI / 2), 900);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(800).fadeTo(0.5), 800);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(700).scaleTo(10), 700);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(600).widthTo(500), 600);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(500).heightTo(800), 500);
        EXPECT.truthy(rectangle.isActive);

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 50);
        EXPECT.toBe(rectangle.current.y, 80);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (100 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (100 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (100 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (100 / 600))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (100 / 500))));


        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 100);
        EXPECT.toBe(rectangle.current.y, 160);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (200 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (200 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (200 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (200 / 600))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (200 / 500))));

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 150);
        EXPECT.toBe(rectangle.current.y, 240);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (300 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (300 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (300 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (300 / 600))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (300 / 500))));

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 200);
        EXPECT.toBe(rectangle.current.y, 320);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (400 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (400 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (400 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (400 / 600))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (400 / 500))));

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 250);
        EXPECT.toBe(rectangle.current.y, 400);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (500 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (500 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (500 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (500 / 600))));
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 300);
        EXPECT.toBe(rectangle.current.y, 480);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (600 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (600 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (600 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 350);
        EXPECT.toBe(rectangle.current.y, 560);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (700 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (700 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 400);
        EXPECT.toBe(rectangle.current.y, 640);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (800 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, 0.50);
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 450);
        EXPECT.toBe(rectangle.current.y, 720);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2, 2));
        EXPECT.toBe(rectangle.current.opacity, 0.50);
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        EXPECT.falsy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 500);
        EXPECT.toBe(rectangle.current.y, 800);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2, 2));
        EXPECT.toBe(rectangle.current.opacity, 0.50);
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

    });
}

function testRectangleBehavesAsExpectedDuringFullDurationWithEaseSet(): void {
    test('rectangle behaves as expected during full duration with ease set', () => {

        EXPECT.toBe(rectangle.duration(1000).ease('easeInQuint').moveTo(500, 800), 1000);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(900).ease('easeInQuart').rotateTo(Math.PI / 2), 900);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(800).ease('easeInCubic').fadeTo(0.5), 800);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(700).ease('easeInQuad').scaleTo(10), 700);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(600).ease('easeOutCubic').widthTo(500), 600);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(500).ease('easeOutQuart').heightTo(800), 500);
        EXPECT.truthy(rectangle.isActive);

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, Math.round(500 * Math.pow(0.1, 5)));
        EXPECT.toBe(rectangle.current.y, Math.round(800 * Math.pow(0.1, 5)));
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * Math.pow((100 / 900), 4), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * Math.pow((100 / 800), 3)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * Math.pow((100 / 700), 2)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (1 - Math.pow(1 - (100 / 600), 3)))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (1 - Math.pow(1 - (100 / 500), 4)))));

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, Math.round(500 * Math.pow(0.2, 5)));
        EXPECT.toBe(rectangle.current.y, Math.round(800 * Math.pow(0.2, 5)));
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * Math.pow((200 / 900), 4), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * Math.pow((200 / 800), 3)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * Math.pow((200 / 700), 2)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (1 - Math.pow(1 - (200 / 600), 3)))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (1 - Math.pow(1 - (200 / 500), 4)))));

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, Math.round(500 * Math.pow(0.3, 5)));
        EXPECT.toBe(rectangle.current.y, Math.round(800 * Math.pow(0.3, 5)));
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * Math.pow((300 / 900), 4), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * Math.pow((300 / 800), 3)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * Math.pow((300 / 700), 2)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (1 - Math.pow(1 - (300 / 600), 3)))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (1 - Math.pow(1 - (300 / 500), 4)))));

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, Math.round(500 * Math.pow(0.4, 5)));
        EXPECT.toBe(rectangle.current.y, Math.round(800 * Math.pow(0.4, 5)));
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * Math.pow((400 / 900), 4), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * Math.pow((400 / 800), 3)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * Math.pow((400 / 700), 2)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (1 - Math.pow(1 - (400 / 600), 3)))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (1 - Math.pow(1 - (400 / 500), 4)))));

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, Math.round(500 * Math.pow(0.5, 5)));
        EXPECT.toBe(rectangle.current.y, Math.round(800 * Math.pow(0.5, 5)));
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * Math.pow((500 / 900), 4), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * Math.pow((500 / 800), 3)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * Math.pow((500 / 700), 2)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (1 - Math.pow(1 - (500 / 600), 3)))));
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, Math.round(500 * Math.pow(0.6, 5)));
        EXPECT.toBe(rectangle.current.y, Math.round(800 * Math.pow(0.6, 5)));
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * Math.pow((600 / 900), 4), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * Math.pow((600 / 800), 3)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * Math.pow((600 / 700), 2)), 2));
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, Math.round(500 * Math.pow(0.7, 5)));
        EXPECT.toBe(rectangle.current.y, Math.round(800 * Math.pow(0.7, 5)));
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * Math.pow((700 / 900), 4), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * Math.pow((700 / 800), 3)), 2));
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, Math.round(500 * Math.pow(0.8, 5)));
        EXPECT.toBe(rectangle.current.y, Math.round(800 * Math.pow(0.8, 5)));
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * Math.pow((800 / 900), 4), 2));
        EXPECT.toBe(rectangle.current.opacity, 0.50);
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, Math.round(500 * Math.pow(0.9, 5)));
        EXPECT.toBe(rectangle.current.y, Math.round(800 * Math.pow(0.9, 5)));
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2, 2));
        EXPECT.toBe(rectangle.current.opacity, 0.50);
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        EXPECT.falsy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 500);
        EXPECT.toBe(rectangle.current.y, 800);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2, 2));
        EXPECT.toBe(rectangle.current.opacity, 0.50);
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

    });
}

function testRectangleBehavesAsExpectedDuringFullDurationWithSpeedSet(): void {
    test('rectangle behaves as expected during full duration with speed set', () => {

        const NUM_STEPS = 50;
        const MAX_DURATION = 500; // move
        const STEP = MAX_DURATION / NUM_STEPS;
        let elapsed = 0;

        const DISTANCE = {
            move: 1000,
            rotate: (-Math.PI / 2) - (Math.PI * 2 * 2), // simulate spinTo(-2)
            fade: 0.2,
            scale: 0.5,
            width: 10,
            height: 600
        };

        const SPEED = {
            move: 2,
            rotate: 0.1,
            fade: 0.05,
            scale: 0.05,
            width: 0.25,
            height: 2
        };

        const DURATION = {
            move: 500,
            rotate: Math.abs(DISTANCE.rotate / SPEED.rotate),
            fade: Math.abs((1 - DISTANCE.fade) / SPEED.fade),
            scale: Math.abs((1 - DISTANCE.scale) / SPEED.scale),
            width: Math.abs((100 - DISTANCE.width) / SPEED.width),
            height: Math.abs((DISTANCE.height - 100) / SPEED.height)
        };

        EXPECT.toBeCloseTo(rectangle.speed(SPEED.move).moveTo(DISTANCE.move, 0), DURATION.move);
        EXPECT.truthy(rectangle.isActive);

        EXPECT.toBeCloseTo(rectangle.speed(SPEED.rotate).rotateTo(DISTANCE.rotate), DURATION.rotate);
        EXPECT.truthy(rectangle.isActive);

        EXPECT.toBeCloseTo(rectangle.speed(SPEED.fade).fadeTo(DISTANCE.fade), DURATION.fade);
        EXPECT.truthy(rectangle.isActive);

        EXPECT.toBeCloseTo(rectangle.speed(SPEED.scale).scaleTo(DISTANCE.scale), DURATION.scale);
        EXPECT.truthy(rectangle.isActive);

        EXPECT.toBeCloseTo(rectangle.speed(SPEED.width).widthTo(DISTANCE.width), DURATION.width);
        EXPECT.truthy(rectangle.isActive);

        EXPECT.toBeCloseTo(rectangle.speed(SPEED.height).heightTo(DISTANCE.height), DURATION.height);
        EXPECT.truthy(rectangle.isActive);

        for (let i = 0; i < NUM_STEPS - 1; i++) {

            rectangle.update(STEP);
            EXPECT.truthy(rectangle.isActive);
            elapsed += STEP;

            EXPECT.toBe(rectangle.current.x, DISTANCE.move * (elapsed / DURATION.move));
            EXPECT.toBe(rectangle.current.y, 0);

            if (elapsed >= DURATION.rotate) EXPECT.toBe(rectangle.current.rotation, roundToPlaces(DISTANCE.rotate, 2));
            else EXPECT.toBe(rectangle.current.rotation, roundToPlaces(DISTANCE.rotate * (elapsed / DURATION.rotate), 2));

            if (elapsed >= DURATION.fade) EXPECT.toBe(rectangle.current.opacity, DISTANCE.fade);
            else EXPECT.toBe(rectangle.current.opacity, roundToPlaces((1 - DISTANCE.fade) * (elapsed / DURATION.fade), 2));

            if (elapsed >= DURATION.scale) EXPECT.toBe(rectangle.current.scale, DISTANCE.scale);
            else EXPECT.toBe(rectangle.current.scale, roundToPlaces((1 - DISTANCE.scale) * (elapsed / DURATION.scale), 2));

            if (elapsed >= DURATION.width) EXPECT.toBe(rectangle.current.width, DISTANCE.width);
            else EXPECT.toBe(rectangle.current.width, Math.round((100 - ((100 - DISTANCE.width) * (elapsed / DURATION.width)))));

            if (elapsed >= DURATION.height) EXPECT.toBe(rectangle.current.height, DISTANCE.height);
            else EXPECT.toBe(rectangle.current.height, Math.round((100 + ((DISTANCE.height - 100) * (elapsed / DURATION.height)))));

        }

        rectangle.update(STEP + 1); // +1 for rounding errors
        EXPECT.falsy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, DISTANCE.move);
        EXPECT.toBe(rectangle.current.y, 0);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(DISTANCE.rotate, 2));
        EXPECT.toBe(rectangle.current.opacity, DISTANCE.fade);
        EXPECT.toBe(rectangle.current.scale, DISTANCE.scale);
        EXPECT.toBe(rectangle.current.width, DISTANCE.width);
        EXPECT.toBe(rectangle.current.height, DISTANCE.height);

    });

}

function testRectangleContinuesToBehaveAsExpectedAfterSaveThenLoad(): void {
    test('rectangle continues to behave as expected after save then load', () => {

        EXPECT.toBe(rectangle.duration(1000).moveTo(500, 800), 1000);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(900).rotateTo(Math.PI / 2), 900);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(800).fadeTo(0.5), 800);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(700).scaleTo(10), 700);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(600).widthTo(500), 600);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.duration(500).heightTo(800), 500);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);

        rectangle.update(100);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 50);
        EXPECT.toBe(rectangle.current.y, 80);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (100 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (100 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (100 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (100 / 600))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (100 / 500))));


        rectangle.update(100);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 100);
        EXPECT.toBe(rectangle.current.y, 160);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (200 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (200 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (200 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (200 / 600))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (200 / 500))));

        rectangle.update(100);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 150);
        EXPECT.toBe(rectangle.current.y, 240);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (300 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (300 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (300 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (300 / 600))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (300 / 500))));

        rectangle.update(100);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 200);
        EXPECT.toBe(rectangle.current.y, 320);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (400 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (400 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (400 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (400 / 600))));
        EXPECT.toBe(rectangle.current.height, Math.round(100 + (700 * (400 / 500))));

        rectangle.update(100);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 250);
        EXPECT.toBe(rectangle.current.y, 400);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (500 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (500 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (500 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, Math.round(100 + (400 * (500 / 600))));
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 300);
        EXPECT.toBe(rectangle.current.y, 480);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (600 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (600 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, roundToPlaces(1 + (9 * (600 / 700)), 2));
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 350);
        EXPECT.toBe(rectangle.current.y, 560);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (700 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, roundToPlaces(1 - (0.5 * (700 / 800)), 2));
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 400);
        EXPECT.toBe(rectangle.current.y, 640);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2 * (800 / 900), 2));
        EXPECT.toBe(rectangle.current.opacity, 0.50);
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        rectangle.load(rectangle.save()); // <--
        EXPECT.truthy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 450);
        EXPECT.toBe(rectangle.current.y, 720);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2, 2));
        EXPECT.toBe(rectangle.current.opacity, 0.50);
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

        rectangle.update(100);
        rectangle.load(rectangle.save()); // <--
        EXPECT.falsy(rectangle.isActive);
        EXPECT.toBe(rectangle.current.x, 500);
        EXPECT.toBe(rectangle.current.y, 800);
        EXPECT.toBe(rectangle.current.rotation, roundToPlaces(Math.PI / 2, 2));
        EXPECT.toBe(rectangle.current.opacity, 0.50);
        EXPECT.toBe(rectangle.current.scale, 10.00);
        EXPECT.toBe(rectangle.current.width, 500);
        EXPECT.toBe(rectangle.current.height, 800);

    });
}

function testValidLoadReturnsTrue(): void {
    test('valid load returns true', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const position = new DynamicPosition();
        const rotation = new DynamicRotation();
        const opacity = new DynamicNumber();
        const scale = new DynamicNumber();
        const width = new DynamicNumber();
        const height = new DynamicNumber();
        EXPECT.truthy(
            rectangle.load(
                JSON.stringify({
                    parent: parent,
                    position: position.save(),
                    rotation: rotation.save(),
                    opacity: opacity.save(),
                    scale: scale.save(),
                    width: width.save(),
                    height: height.save(),
                    currentValues: {},
                    speed: 0,
                    visible: true
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingParentProperty(): void {
    test('load returns false if missing "parent" property', () => {
        // const parent = JSON.stringify({
        //     isOn: false,
        //     duration: 0,
        //     easeOption: 'noEase'
        // });
        const position = new DynamicPosition();
        const rotation = new DynamicRotation();
        const opacity = new DynamicNumber();
        const scale = new DynamicNumber();
        const width = new DynamicNumber();
        const height = new DynamicNumber();
        EXPECT.falsy(
            rectangle.load(
                JSON.stringify({
                    // parent: parent,
                    position: position.save(),
                    rotation: rotation.save(),
                    opacity: opacity.save(),
                    scale: scale.save(),
                    width: width.save(),
                    height: height.save(),
                    currentValues: {},
                    speed: 0,
                    visible: true
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingPositionProperty(): void {
    test('load returns false if missing "position" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        // const position = new DynamicPosition();
        const rotation = new DynamicRotation();
        const opacity = new DynamicNumber();
        const scale = new DynamicNumber();
        const width = new DynamicNumber();
        const height = new DynamicNumber();
        EXPECT.falsy(
            rectangle.load(
                JSON.stringify({
                    parent: parent,
                    // position: position.save(),
                    rotation: rotation.save(),
                    opacity: opacity.save(),
                    scale: scale.save(),
                    width: width.save(),
                    height: height.save(),
                    currentValues: {},
                    speed: 0,
                    visible: true
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingRotationProperty(): void {
    test('load returns false if missing "rotation" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const position = new DynamicPosition();
        // const rotation = new DynamicRotation();
        const opacity = new DynamicNumber();
        const scale = new DynamicNumber();
        const width = new DynamicNumber();
        const height = new DynamicNumber();
        EXPECT.falsy(
            rectangle.load(
                JSON.stringify({
                    parent: parent,
                    position: position.save(),
                    // rotation: rotation.save(),
                    opacity: opacity.save(),
                    scale: scale.save(),
                    width: width.save(),
                    height: height.save(),
                    currentValues: {},
                    speed: 0,
                    visible: true
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingOpacityProperty(): void {
    test('load returns false if missing "opacity" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const position = new DynamicPosition();
        const rotation = new DynamicRotation();
        // const opacity = new DynamicNumber();
        const scale = new DynamicNumber();
        const width = new DynamicNumber();
        const height = new DynamicNumber();
        EXPECT.falsy(
            rectangle.load(
                JSON.stringify({
                    parent: parent,
                    position: position.save(),
                    rotation: rotation.save(),
                    // opacity: opacity.save(),
                    scale: scale.save(),
                    width: width.save(),
                    height: height.save(),
                    currentValues: {},
                    speed: 0,
                    visible: true
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingScaleProperty(): void {
    test('load returns false if missing "scale" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const position = new DynamicPosition();
        const rotation = new DynamicRotation();
        const opacity = new DynamicNumber();
        // const scale = new DynamicNumber();
        const width = new DynamicNumber();
        const height = new DynamicNumber();
        EXPECT.falsy(
            rectangle.load(
                JSON.stringify({
                    parent: parent,
                    position: position.save(),
                    rotation: rotation.save(),
                    opacity: opacity.save(),
                    // scale: scale.save(),
                    width: width.save(),
                    height: height.save(),
                    currentValues: {},
                    speed: 0,
                    visible: true
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingWidthProperty(): void {
    test('load returns false if missing "width" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const position = new DynamicPosition();
        const rotation = new DynamicRotation();
        const opacity = new DynamicNumber();
        const scale = new DynamicNumber();
        // const width = new DynamicNumber();
        const height = new DynamicNumber();
        EXPECT.falsy(
            rectangle.load(
                JSON.stringify({
                    parent: parent,
                    position: position.save(),
                    rotation: rotation.save(),
                    opacity: opacity.save(),
                    scale: scale.save(),
                    // width: width.save(),
                    height: height.save(),
                    currentValues: {},
                    speed: 0,
                    visible: true
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingHeightProperty(): void {
    test('load returns false if missing "height" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const position = new DynamicPosition();
        const rotation = new DynamicRotation();
        const opacity = new DynamicNumber();
        const scale = new DynamicNumber();
        const width = new DynamicNumber();
        // const height = new DynamicNumber();
        EXPECT.falsy(
            rectangle.load(
                JSON.stringify({
                    parent: parent,
                    position: position.save(),
                    rotation: rotation.save(),
                    opacity: opacity.save(),
                    scale: scale.save(),
                    width: width.save(),
                    // height: height.save(),
                    currentValues: {},
                    speed: 0,
                    visible: true
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingCurrentValuesProperty(): void {
    test('load returns false if missing "currentValues" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const position = new DynamicPosition();
        const rotation = new DynamicRotation();
        const opacity = new DynamicNumber();
        const scale = new DynamicNumber();
        const width = new DynamicNumber();
        const height = new DynamicNumber();
        EXPECT.falsy(
            rectangle.load(
                JSON.stringify({
                    parent: parent,
                    position: position.save(),
                    rotation: rotation.save(),
                    opacity: opacity.save(),
                    scale: scale.save(),
                    width: width.save(),
                    height: height.save(),
                    // currentValues: {},
                    speed: 0,
                    visible: true
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingSpeedProperty(): void {
    test('load returns false if missing "speed" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const position = new DynamicPosition();
        const rotation = new DynamicRotation();
        const opacity = new DynamicNumber();
        const scale = new DynamicNumber();
        const width = new DynamicNumber();
        const height = new DynamicNumber();
        EXPECT.falsy(
            rectangle.load(
                JSON.stringify({
                    parent: parent,
                    position: position.save(),
                    rotation: rotation.save(),
                    opacity: opacity.save(),
                    scale: scale.save(),
                    width: width.save(),
                    height: height.save(),
                    currentValues: {},
                    // speed: 0,
                    visible: true
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingVisibleProperty(): void {
    test('load returns false if missing "visible" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const position = new DynamicPosition();
        const rotation = new DynamicRotation();
        const opacity = new DynamicNumber();
        const scale = new DynamicNumber();
        const width = new DynamicNumber();
        const height = new DynamicNumber();
        EXPECT.falsy(
            rectangle.load(
                JSON.stringify({
                    parent: parent,
                    position: position.save(),
                    rotation: rotation.save(),
                    opacity: opacity.save(),
                    scale: scale.save(),
                    width: width.save(),
                    height: height.save(),
                    currentValues: {},
                    speed: 0,
                    // visible: true
                })
            )
        )
    });
}
