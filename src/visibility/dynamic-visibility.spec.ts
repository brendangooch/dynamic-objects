/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicVisibility } from './dynamic-visibility.js';

const EXPECT = new JestExpect();
let visibility: DynamicVisibility;
beforeEach(() => {
    visibility = new DynamicVisibility();
});

testAll();
function testAll(): void {
    describe('DynamicVisbility', () => {

        testStartsInactive();
        testStartsVisible();
        testCanHideAndShow();
        testBlinkBehavesAsExpected();
        testShowStopsBlinkEffect();
        testHideStopsBlinkEffect();
        testBehavesAsExpectedAfterSaveThenLoad();

    });
}

function testStartsInactive(): void {
    test('starts inactive', () => {
        EXPECT.falsy(visibility.isActive);
    });
}

function testStartsVisible(): void {
    test('starts visible', () => {
        EXPECT.truthy(visibility.isVisible);
    });
}

function testCanHideAndShow(): void {
    test('can be hidden and shown', () => {
        visibility.hide();
        EXPECT.falsy(visibility.isVisible);
        visibility.show();
        EXPECT.truthy(visibility.isVisible);
    });
}

function testBlinkBehavesAsExpected(): void {
    test('blink behaves as expected', () => {

        visibility.hide();

        visibility.duration(1000).frequency(200).blink();
        EXPECT.truthy(visibility.isActive);
        EXPECT.truthy(visibility.isVisible); // <-- becomes visible once object is active

        visibility.update(25); // 25% of 1st unit (1) / 2.5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 50% of 1st unit (1) / 5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 75% of 1st unit (1) / 7.5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 0% of 2nd unit (0) / 10% of unit
        EXPECT.falsy(visibility.isVisible);

        visibility.update(25); // 25% of 2nd unit (0) / 12.5% of unit
        EXPECT.falsy(visibility.isVisible);

        visibility.update(25); // 50% of 2nd unit (0) / 15% of unit
        EXPECT.falsy(visibility.isVisible);

        visibility.update(25); // 75% of 2nd unit (0) / 17.5% of unit
        EXPECT.falsy(visibility.isVisible);

        visibility.update(25); // 0% of 1st unit (1) / 20% of unit
        EXPECT.truthy(visibility.isVisible);

        // ...

        visibility.update(800); // 100% of unit
        EXPECT.falsy(visibility.isActive);
        EXPECT.falsy(visibility.isVisible); // <-- reverts back to visible property once no longer active

        visibility.blink(); // <-- does nothing because frequency and duration reset to 0
        EXPECT.falsy(visibility.isActive);

    });
}

function testShowStopsBlinkEffect(): void {
    test('show() stops blink effect', () => {

        visibility.duration(1000).frequency(200).blink();
        EXPECT.truthy(visibility.isActive);
        EXPECT.truthy(visibility.isVisible); // <-- becomes visible once object is active

        visibility.update(25); // 25% of 1st unit (1) / 2.5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 50% of 1st unit (1) / 5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.show(); // <--
        EXPECT.falsy(visibility.isActive);
        EXPECT.truthy(visibility.isVisible);

    });
}

function testHideStopsBlinkEffect(): void {
    test('hide() stops blink effect', () => {

        visibility.duration(1000).frequency(200).blink();
        EXPECT.truthy(visibility.isActive);
        EXPECT.truthy(visibility.isVisible); // <-- becomes visible once object is active

        visibility.update(25); // 25% of 1st unit (1) / 2.5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 50% of 1st unit (1) / 5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.hide(); // <--
        EXPECT.falsy(visibility.isActive);
        EXPECT.falsy(visibility.isVisible);

    });
}

function testBehavesAsExpectedAfterSaveThenLoad(): void {
    test('behaves as expected after save then load', () => {

        visibility.duration(1000).frequency(200).blink();
        EXPECT.truthy(visibility.isActive);
        EXPECT.truthy(visibility.isVisible);

        visibility.load(visibility.save()); // <--
        EXPECT.truthy(visibility.isActive);
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 25% of 1st unit (1) / 2.5% of unit
        visibility.load(visibility.save()); // <--
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 50% of 1st unit (1) / 5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 75% of 1st unit (1) / 7.5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 0% of 2nd unit (0) / 10% of unit
        visibility.load(visibility.save()); // <-- restarts the wave
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 25% of 1st unit (1) / 12.5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 55% of 1st unit (1) / 15% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 75% of 1st unit (1) / 17.5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 0% of 2nd unit (0) / 20% of unit
        EXPECT.falsy(visibility.isVisible);

        // ...

        visibility.update(800); // 100% of unit
        EXPECT.falsy(visibility.isActive);
        EXPECT.truthy(visibility.isVisible); // <-- reverts back to visible property once no longer active

        // ...

        visibility.duration(1000).frequency(200).blink();
        EXPECT.truthy(visibility.isActive);
        EXPECT.truthy(visibility.isVisible);

        visibility.update(25); // 25% of 1st unit (1) / 2.5% of unit
        EXPECT.truthy(visibility.isVisible);

        visibility.hide();
        EXPECT.falsy(visibility.isActive);
        EXPECT.falsy(visibility.isVisible);
        visibility.load(visibility.save()); // <--
        EXPECT.falsy(visibility.isActive);
        EXPECT.falsy(visibility.isVisible);

        visibility.show();
        EXPECT.truthy(visibility.isVisible);
        visibility.load(visibility.save()); // <--
        EXPECT.truthy(visibility.isVisible);

    });
}