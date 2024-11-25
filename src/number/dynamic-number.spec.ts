/**
 * 
 */

import { JestExpect } from '@brendangooch/jest-expect';
import { DynamicNumber } from './dynamic-number.js';

const EXPECT = new JestExpect();
let number: DynamicNumber
beforeEach(() => {
    number = new DynamicNumber();
});

testAll();
function testAll(): void {
    describe('DynamicNumber', () => {

        testCanTurnOnAndOff();
        testCanStopAndStart();
        testPauseTogglesBetweenOnAndOff();
        testCanSetDuration();
        testCanAddEase();
        testCanUpdate();
        testCanTickForwards();
        testCanStepForwards();
        testCanStepBackwards();
        testCanCompleteUpodate();
        testCanRewindToTheBeginning();
        testCanFloorTheCurrentValue();
        testCanInvertTheCurrentValue();
        testCanFloorANDInvertTheCurrentValue();
        testCanAdjustAmplitudeOfCurrentValue();
        testCanAdjustRunRate();
        testCanSpeedUp();
        testCanSlowDown();
        testCanReturnToNormalSpeed();

    });
}


function testCanTurnOnAndOff(): void {
    test('can turn on an off', () => {
        // EXPECT.truthy(unit.isOn);
        // unit.turnOff();
        // EXPECT.falsy(unit.isOn);
        // unit.turnOn();
        // EXPECT.truthy(unit.isOn);
    });
}

function testCanStopAndStart(): void {
    test('can stop and start', () => {
        // test no functionality when unit is off
    });
}

function testPauseTogglesBetweenOnAndOff(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanSetDuration(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanAddEase(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanUpdate(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanTickForwards(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanStepForwards(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanStepBackwards(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanCompleteUpodate(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanRewindToTheBeginning(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanFloorTheCurrentValue(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanInvertTheCurrentValue(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanFloorANDInvertTheCurrentValue(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanAdjustAmplitudeOfCurrentValue(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanAdjustRunRate(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanSpeedUp(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanSlowDown(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}

function testCanReturnToNormalSpeed(): void {
    test('', () => {
        // test load then save
        // test no functionality when unit is off
    });
}