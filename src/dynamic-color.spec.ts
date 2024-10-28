/**
 * 
 */

import * as EXPECT from '@brendangooch/jest-expect';
import * as EASE from '@brendangooch/ease';
import { DynamicColor } from './dynamic-color.js';
import { DynamicNumberExtended } from './dynamic-number-extended.js';

let color: DynamicColor;
beforeEach(() => {
    color = new DynamicColor(0, 0, 0);
});

testAll();
function testAll(): void {
    describe('DynamicColor', () => {

        testColorStartsInactive();
        testInitialCurrentValueIsValueSetInConstructor();
        testDruationCannotBeSetIfColorIsActive();
        testDurationOf0DoesNothing();
        testDurationOfLessThan0DoesNothing();
        testSettingDurationDoesNotMakeTheUnitActive();
        testDurationIsResetTo0AfterUpdateComplete();
        testEaseCannotBeSetIfTheColorIsActive();
        testSettingEaseDoesNotMAkeTheColorActive();
        testEaseIsResetToNoEaseOnceUpdateComplete();
        testCannotChangeIfColorIsActive();
        testChangingToExistingColorDoesNothing();
        testCanChangIfAtLeastOneColorParamDifferentFromCurrent();
        testChangeToParamsAreClampedBetween0And255();
        testChangingColorWithNoDurationChangesCurrentValueInstantly();
        testChangingValueWithDurationChangesCurrentValueOverTime();
        testLoadReturnsTrueOnValidLoad();
        testLoadReturnsFalseIfMissingParentProperty();
        testLoadReturnsFalseIfMissingRProperty();
        testLoadReturnsFalseIfMissingGProperty();
        testLoadReturnsFalseIfMissingBProperty();
        testLoadReturnsFalseIfMissingCurrentValueProperty();
        testBehavesAsExpectedDuringFullDuration();
        testBehavesAsExpectedDuringFullDurationWithEase();
        testSaveThenLoadContinuesToBehaveAsExpected();


    });
}

function testColorStartsInactive(): void {
    test('color starts inactive', () => {
        EXPECT.falsy(color.isActive);
    });
}

function testInitialCurrentValueIsValueSetInConstructor(): void {
    test('initial current value is value set in constructor', () => {
        color = new DynamicColor(100, 100, 100);
        EXPECT.toBe(color.current, rgb(100, 100, 100));
    });
}

function testDruationCannotBeSetIfColorIsActive(): void {
    test('duration cannot be set if color is active', () => {
        EXPECT.toBe(color.duration(1000).changeTo(100, 100, 100), 1000);
        EXPECT.truthy(color.isActive);
        color.duration(2000);
        color.update(100); // 10%
        EXPECT.toBe(color.current, rgb(10, 10, 10));
    });
}

function testDurationOf0DoesNothing(): void {
    test('duration of 0 does nothing', () => {
        EXPECT.toBe(color.duration(0).changeTo(255, 255, 255), 0);
        EXPECT.falsy(color.isActive);
        EXPECT.toBe(color.current, rgb(255, 255, 255));
    });
}

function testDurationOfLessThan0DoesNothing(): void {
    test('duration of less than 0 does nothing', () => {
        EXPECT.toBe(color.duration(-100).changeTo(255, 255, 255), 0);
        EXPECT.falsy(color.isActive);
        EXPECT.toBe(color.current, rgb(255, 255, 255));
    });
}

function testSettingDurationDoesNotMakeTheUnitActive(): void {
    test('setting duration does not make the unit active', () => {
        color.duration(1000);
        EXPECT.falsy(color.isActive);
    });
}

function testDurationIsResetTo0AfterUpdateComplete(): void {
    test('duration is reset to 0 after update complete', () => {
        EXPECT.toBe(color.duration(1000).changeTo(10, 10, 10), 1000);
        EXPECT.truthy(color.isActive);
        for (let i = 0; i < 10; i++) {
            color.update(100);
        }
        EXPECT.falsy(color.isActive);
        EXPECT.toBe(color.changeTo(20, 20, 20), 0);
        EXPECT.falsy(color.isActive);
    });
}

function testEaseCannotBeSetIfTheColorIsActive(): void {
    test('ease cannot be set if the color is active', () => {
        color.duration(1000).changeTo(100, 100, 100);
        EXPECT.truthy(color.isActive);
        color.ease('easeInOutQuint');
        color.update(100); // 10%
        EXPECT.toBe(color.current, rgb(10, 10, 10));
    });
}

function testSettingEaseDoesNotMAkeTheColorActive(): void {
    test('setting ease does not make the color active', () => {
        color.ease('easeInOutBounce');
        EXPECT.falsy(color.isActive);
    });
}

function testEaseIsResetToNoEaseOnceUpdateComplete(): void {
    test('ease is reset to noEase once update complete', () => {
        color.duration(1000).ease('easeInCubic').changeTo(100, 100, 100);
        for (let i = 0; i < 10; i++) {
            color.update(100);
        }
        EXPECT.falsy(color.isActive);
        color.duration(1000).changeTo(200, 200, 200);
        color.update(100);
        EXPECT.toBe(color.current, rgb(110, 110, 110));
        color.update(100);
        EXPECT.toBe(color.current, rgb(120, 120, 120));
    });
}

function testCannotChangeIfColorIsActive(): void {
    test('cannot change if color is active', () => {
        color.duration(1000).changeTo(50, 60, 70);
        EXPECT.truthy(color.isActive);
        EXPECT.toBe(color.changeTo(100, 100, 100), 0);
        EXPECT.toBe(color.current, rgb(0, 0, 0));
    });
}

function testChangingToExistingColorDoesNothing(): void {
    test('changing to existing color does nothing', () => {
        color.changeTo(50, 50, 50);
        EXPECT.toBe(color.duration(1000).changeTo(50, 50, 50), 0);
        EXPECT.falsy(color.isActive);
        EXPECT.toBe(color.current, rgb(50, 50, 50));
    });
}

function testCanChangIfAtLeastOneColorParamDifferentFromCurrent(): void {
    test('can change if at least one color param is different from current', () => {
        color.changeTo(0, 0, 255);
        EXPECT.toBe(color.current, rgb(0, 0, 255));
        color.changeTo(0, 255, 255);
        EXPECT.toBe(color.current, rgb(0, 255, 255));
        color.changeTo(255, 255, 255);
        EXPECT.toBe(color.current, rgb(255, 255, 255));
    });
}

function testChangeToParamsAreClampedBetween0And255(): void {
    test('changeTo() params are clamped between 0 and 255', () => {
        color.changeTo(-1, -1, -1);
        EXPECT.toBe(color.current, rgb(0, 0, 0));
        color.changeTo(256, 256, 256);
        EXPECT.toBe(color.current, rgb(255, 255, 255));
    });
}

function testChangingColorWithNoDurationChangesCurrentValueInstantly(): void {
    test('changing color with no duration changes current value instantly', () => {
        color.changeTo(100, 200, 100);
        EXPECT.falsy(color.isActive);
        EXPECT.toBe(color.current, rgb(100, 200, 100));
    });
}

function testChangingValueWithDurationChangesCurrentValueOverTime(): void {
    test('changing value with duration changes current value over time', () => {
        color.duration(1000).changeTo(50, 50, 50);
        EXPECT.truthy(color.isActive);
        EXPECT.toBe(color.current, rgb(0, 0, 0));
        color.update(100); // 10%
        EXPECT.toBe(color.current, rgb(5, 5, 5));
    });
}

function testLoadReturnsTrueOnValidLoad(): void {
    test('load returns true on valid load', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const r = new DynamicNumberExtended(0, 0, 255);
        const g = new DynamicNumberExtended(0, 0, 255);
        const b = new DynamicNumberExtended(0, 0, 255);
        EXPECT.truthy(
            color.load(
                JSON.stringify({
                    parent: parent,
                    r: r.save(),
                    g: g.save(),
                    b: b.save(),
                    currentValue: 'rgb(0,0,0)'
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
        const r = new DynamicNumberExtended(0, 0, 255);
        const g = new DynamicNumberExtended(0, 0, 255);
        const b = new DynamicNumberExtended(0, 0, 255);
        EXPECT.falsy(
            color.load(
                JSON.stringify({
                    // parent: parent,
                    r: r.save(),
                    g: g.save(),
                    b: b.save(),
                    currentValue: 'rgb(0,0,0)'
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingRProperty(): void {
    test('load returns false if missing "r" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        // const r = new DynamicNumberExtended(0, 0, 255);
        const g = new DynamicNumberExtended(0, 0, 255);
        const b = new DynamicNumberExtended(0, 0, 255);
        EXPECT.falsy(
            color.load(
                JSON.stringify({
                    parent: parent,
                    // r: r.save(),
                    g: g.save(),
                    b: b.save(),
                    currentValue: 'rgb(0,0,0)'
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingGProperty(): void {
    test('load returns false if missing "g" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const r = new DynamicNumberExtended(0, 0, 255);
        // const g = new DynamicNumberExtended(0, 0, 255);
        const b = new DynamicNumberExtended(0, 0, 255);
        EXPECT.falsy(
            color.load(
                JSON.stringify({
                    parent: parent,
                    r: r.save(),
                    // g: g.save(),
                    b: b.save(),
                    currentValue: 'rgb(0,0,0)'
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingBProperty(): void {
    test('load returns false if missing "b" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const r = new DynamicNumberExtended(0, 0, 255);
        const g = new DynamicNumberExtended(0, 0, 255);
        // const b = new DynamicNumberExtended(0, 0, 255);
        EXPECT.falsy(
            color.load(
                JSON.stringify({
                    parent: parent,
                    r: r.save(),
                    g: g.save(),
                    // b: b.save(),
                    currentValue: 'rgb(0,0,0)'
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingCurrentValueProperty(): void {
    test('load returns false if missing "currentValue" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const r = new DynamicNumberExtended(0, 0, 255);
        const g = new DynamicNumberExtended(0, 0, 255);
        const b = new DynamicNumberExtended(0, 0, 255);
        EXPECT.falsy(
            color.load(
                JSON.stringify({
                    parent: parent,
                    r: r.save(),
                    g: g.save(),
                    b: b.save(),
                    // currentValue: 'rgb(0,0,0)'
                })
            )
        )
    });
}

function testBehavesAsExpectedDuringFullDuration(): void {
    test('behaves as expected during full duration', () => {
        EXPECT.toBe(color.duration(1000).changeTo(50, 100, 200), 1000);
        EXPECT.truthy(color.isActive);
        color.update(200);
        EXPECT.toBe(color.current, rgb(10, 20, 40));
        color.update(200);
        EXPECT.toBe(color.current, rgb(20, 40, 80));
        color.update(200);
        EXPECT.toBe(color.current, rgb(30, 60, 120));
        color.update(200);
        EXPECT.toBe(color.current, rgb(40, 80, 160));
        color.update(200);
        EXPECT.toBe(color.current, rgb(50, 100, 200));
        EXPECT.falsy(color.isActive);
    });
}

function testBehavesAsExpectedDuringFullDurationWithEase(): void {
    test('behaves as expected during full duration with ease', () => {

        const duration = 800;
        const numSteps = 10;
        const step = duration / numSteps;
        const ease: EASE.tEaseOption = 'easeInOutCirc';

        color.changeTo(40, 40, 40);

        const r = new DynamicNumberExtended(40, 0, 255);
        const g = new DynamicNumberExtended(40, 0, 255);
        const b = new DynamicNumberExtended(40, 0, 255);

        EXPECT.toBe(color.duration(duration).ease(ease).changeTo(50, 100, 200), duration);
        EXPECT.truthy(color.isActive);

        r.duration(duration).ease(ease).changeTo(50);
        g.duration(duration).ease(ease).changeTo(100);
        b.duration(duration).ease(ease).changeTo(200);

        for (let i = 0; i < numSteps; i++) {
            color.update(step);
            r.update(step);
            g.update(step);
            b.update(step);
            EXPECT.toBe(color.current, rgb(r.rounded, g.rounded, b.rounded));
        }

        EXPECT.falsy(color.isActive);
        EXPECT.toBe(color.current, rgb(50, 100, 200));

    });
}

function testSaveThenLoadContinuesToBehaveAsExpected(): void {
    test('save then load continues to behave as expected', () => {

        const duration = 800;
        const numSteps = 10;
        const step = duration / numSteps;
        const ease: EASE.tEaseOption = 'easeInOutCirc';

        color.changeTo(40, 40, 40);
        color.load(color.save()); // <--

        const r = new DynamicNumberExtended(40, 0, 255);
        const g = new DynamicNumberExtended(40, 0, 255);
        const b = new DynamicNumberExtended(40, 0, 255);

        EXPECT.toBe(color.duration(duration).ease(ease).changeTo(50, 100, 200), duration);
        color.load(color.save()); // <--
        EXPECT.truthy(color.isActive);

        r.duration(duration).ease(ease).changeTo(50);
        g.duration(duration).ease(ease).changeTo(100);
        b.duration(duration).ease(ease).changeTo(200);

        for (let i = 0; i < numSteps; i++) {
            color.update(step);
            color.load(color.save()); // <--
            r.update(step);
            g.update(step);
            b.update(step);
            EXPECT.toBe(color.current, rgb(r.rounded, g.rounded, b.rounded));
        }

        EXPECT.falsy(color.isActive);
        EXPECT.toBe(color.current, rgb(50, 100, 200));

    });
}


/**
 * UTILITY FUNCTIONS
 */

function rgb(r: number, g: number, b: number): string {
    return `rgb(${r},${g},${b})`;
}