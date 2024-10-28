/**
 * 
 */

import * as EXPECT from '@brendangooch/jest-expect';
import * as EASE from '@brendangooch/ease';
import { DynamicString } from './dynamic-string.js';

const SAMPLE_STRING = 'love is just a bourgeois concept';
let string: DynamicString;
beforeEach(() => {
    string = new DynamicString();
});

testAll();
function testAll(): void {
    describe('DynamicString', () => {
        testStringIsNotActiveOnInstantiation();
        testInitialCurrentValueIsEmptyString();
        testCanOnyChangeStringIfNotActive();
        testChangeToEmptyStringDoesNothing();
        testCurrentValueChangesInstantlyIfNoDurationSet();
        testSettingDurationDoesNotMakeStringActive();
        testDurationResetTo0AfterUpdateComplete();
        testEaseResetToNoEaseAfterUpdateComplete();
        testCurrentStringRemainsCurrentStringAfterUpdateCompleteUntilChanged();
        testCalidLoadReturnsTrue();
        testLoadReturnsFalseIfMissingParentProperty();
        testLoadReturnsFalseIfMissingStringProperty();
        testLoadReturnsFalseIfMissingCurrentValueProperty();
        testLoadReturnsFalseIfMissingIndexProperty();
        testSaveThenLoadContinuesToBehaveAsExpected();
        testBehavesAsExpectedDuringFullDuration();
        testBehavesAsExpectedDuringFullDurationWithEase();


    });
}

function testStringIsNotActiveOnInstantiation(): void {
    test('string is not active on instantiation', () => {
        EXPECT.falsy(string.isActive);
    });
}

function testInitialCurrentValueIsEmptyString(): void {
    test('initial current value is empty string', () => {
        EXPECT.toBe(string.current, '');
    });
}

function testCanOnyChangeStringIfNotActive(): void {
    test('can only change string if not active', () => {
        EXPECT.toBe(string.duration(1000).changeTo(SAMPLE_STRING), 1000);
        EXPECT.truthy(string.isActive);
    });
}

function testChangeToEmptyStringDoesNothing(): void {
    test('change to empty string does nothing', () => {
        EXPECT.toBe(string.duration(1000).changeTo(''), 0);
        EXPECT.falsy(string.isActive);
        EXPECT.toBe(string.current, '');
    });
}

function testCurrentValueChangesInstantlyIfNoDurationSet(): void {
    test('current value changes instantly if no duration set', () => {
        string.changeTo(SAMPLE_STRING);
        EXPECT.toBe(string.current, SAMPLE_STRING);
    });
}

function testSettingDurationDoesNotMakeStringActive(): void {
    test('setting duration does not make the string active', () => {
        string.duration(1000);
        EXPECT.falsy(string.isActive);
    });
}

function testDurationResetTo0AfterUpdateComplete(): void {
    test('duration reset to 0 after update complete', () => {
        EXPECT.toBe(string.duration(1000).changeTo(SAMPLE_STRING), 1000);
        string.update(200);
        string.update(200);
        string.update(200);
        string.update(200);
        string.update(200);
        EXPECT.falsy(string.isActive);
        string.changeTo('another string');
        EXPECT.falsy(string.isActive);
        EXPECT.toBe(string.current, 'another string');
    });
}

function testEaseResetToNoEaseAfterUpdateComplete(): void {
    test('ease resets to noEase after update complete', () => {
        string.duration(1000).ease('easeInCubic').changeTo(SAMPLE_STRING);
        string.update(200);
        string.update(200);
        string.update(200);
        string.update(200);
        string.update(200);
        EXPECT.falsy(string.isActive);
        string.duration(1000).changeTo(SAMPLE_STRING);
        string.update(200);
        const length = SAMPLE_STRING.length;
        const index = Math.round(length * 0.2);
        const current = SAMPLE_STRING.substring(0, index);
        EXPECT.toBe(string.current, current);
    });
}

function testCurrentStringRemainsCurrentStringAfterUpdateCompleteUntilChanged(): void {
    test('current string remains current string after update complete until changed', () => {
        string.duration(1000).ease('easeInCubic').changeTo(SAMPLE_STRING);
        string.update(200);
        string.update(200);
        string.update(200);
        string.update(200);
        string.update(200);
        EXPECT.falsy(string.isActive);
        EXPECT.toBe(string.current, SAMPLE_STRING);
        string.changeTo('something else');
        EXPECT.toBe(string.current, 'something else');
    });
}

function testCalidLoadReturnsTrue(): void {
    test('valid load returns true', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 1000,
            easeOption: 'noEase'
        });
        EXPECT.truthy(
            string.load(
                JSON.stringify({
                    parent: parent,
                    string: '',
                    currentValue: '',
                    index: 0
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingParentProperty(): void {
    test('load returns false if missing "parent" property', () => {
        // const parent = JSON.stringify({
        //     isOn: false,
        //     duration: 1000,
        //     easeOption: 'noEase'
        // });
        EXPECT.falsy(
            string.load(
                JSON.stringify({
                    // parent: parent,
                    string: '',
                    currentValue: '',
                    index: 0
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingStringProperty(): void {
    test('load returns false if missing "string" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 1000,
            easeOption: 'noEase'
        });
        EXPECT.falsy(
            string.load(
                JSON.stringify({
                    parent: parent,
                    // string: '',
                    currentValue: '',
                    index: 0
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingCurrentValueProperty(): void {
    test('load returns false if missing "currentValue" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 1000,
            easeOption: 'noEase'
        });
        EXPECT.falsy(
            string.load(
                JSON.stringify({
                    parent: parent,
                    string: '',
                    // currentValue: '',
                    index: 0
                })
            )
        )
    });
}

function testLoadReturnsFalseIfMissingIndexProperty(): void {
    test('load returns false if missing "index" property', () => {
        const parent = JSON.stringify({
            isOn: false,
            duration: 1000,
            easeOption: 'noEase'
        });
        EXPECT.falsy(
            string.load(
                JSON.stringify({
                    parent: parent,
                    string: '',
                    currentValue: '',
                    // index: 0
                })
            )
        )
    });
}

function testSaveThenLoadContinuesToBehaveAsExpected(): void {
    test('save then load continues to behave as expected', () => {
        let beforeSave: string;
        string.duration(1000).ease('easeInElastic').changeTo(SAMPLE_STRING);
        EXPECT.truthy(string.isActive);
        string.load(string.save()); // <--
        EXPECT.truthy(string.isActive);

        for (let i = 0; i < 9; i++) {
            string.update(100);
            beforeSave = string.current;
            string.load(string.save()); // <--
            EXPECT.truthy(string.isActive);
            EXPECT.toBe(string.current, beforeSave);
        }

        string.update(100);
        string.load(string.save()); // <--
        EXPECT.falsy(string.isActive);
        EXPECT.toBe(string.current, SAMPLE_STRING);


    });
}

function testBehavesAsExpectedDuringFullDuration(): void {
    test('behaves as expected during full duration', () => {
        const length = SAMPLE_STRING.length;
        let index: number;
        let current: string;
        EXPECT.toBe(string.duration(1000).changeTo(SAMPLE_STRING), 1000);
        EXPECT.truthy(string.isActive);

        for (let i = 1; i < 10; i++) {
            string.update(100); // 10%
            index = Math.round(length * i * 0.1);
            current = SAMPLE_STRING.substring(0, index);
            EXPECT.toBe(string.current, current);
        }

        string.update(100);
        EXPECT.falsy(string.isActive);
        EXPECT.toBe(string.current, SAMPLE_STRING);

    });
}

function testBehavesAsExpectedDuringFullDurationWithEase(): void {
    test('behaves as expected during full duration with ease', () => {
        const length = SAMPLE_STRING.length;
        const easeOption: EASE.tEaseOption = 'easeInOutBounce';
        const easeFn: EASE.tEaseFunction = EASE.load(easeOption);
        const duration = 1000;
        let progress = 0;
        let elapsed = 0;
        let index: number;
        let current: string;
        EXPECT.toBe(string.duration(duration).ease(easeOption).changeTo(SAMPLE_STRING), 1000);
        EXPECT.truthy(string.isActive);

        for (let i = 1; i < 10; i++) {
            string.update(100);
            elapsed += 100;
            progress = easeFn(elapsed / duration);
            index = Math.round(length * progress);
            current = SAMPLE_STRING.substring(0, index);
            EXPECT.toBe(string.current, current);
        }

        string.update(100);
        EXPECT.falsy(string.isActive);
        EXPECT.toBe(string.current, SAMPLE_STRING);
    });
}