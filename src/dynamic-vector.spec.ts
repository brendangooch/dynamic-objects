/**
 * 
 */

import * as EXPECT from '@brendangooch/jest-expect';
import * as EASE from '@brendangooch/ease';
import { DynamicVector } from './dynamic-vector.js';
import { Vector2D } from '@brendangooch/maths';
import { DynamicUnit } from './dynamic-unit.js';

type tFullDurationTestParams = {
    start: Vector2D;
    end: Vector2D;
    speed?: number;
    duration?: number;
    ease: EASE.tEaseOption;
};

let vector: DynamicVector;
beforeEach(() => {
    vector = new DynamicVector();
});

testAll();
function testAll(): void {
    describe('DynamicVector', () => {

        testStartsInactive();
        testInitialCurrentValuesAre00IfNotSetInConstructor();
        testInitialCurrentValuesAreValuesSetInConstructor();
        testCannotSetDurationIfVectorIsActive();
        testCannotSetDurationOf0();
        testCannotSetDurationOfLessThan0();
        testSettingDurationDoesNotMakeTheVectorActive();
        testDurationGoesBackTo0OnceDurationHasElapsed();
        testCannotSetSpeedIfVectorIsActive();
        testCannotSetSpeedOf0();
        testCannotSetSpeedOfLessThan0();
        testSettingSpeedDoesNotMakeTheVectorActive();
        testSpeedGoesBackTo0OnceDurationHasElapsed();
        testCannotSetEaseIfVectorIsActive();
        testEaseReturnsToNoEaseOnceDurationHasElapsed();
        testCannotChangeIfVectorIsActive();
        testChangingToTheSamePositionDoesNothing();
        testChangingWithoutSettingTheDurationChangesTheCurrentPositionsImmediately();
        testChangingInstantlyResetsTheEase();
        testValidLoadReturnsTrue();
        testThrowsErrorIfMissingParentProperty();
        testThrowsErrorIfMissingPreviousProperty();
        testThrowsErrorIfMissingNextProperty();
        testThrowsErrorIfMissingDistanceBetweenProperty();
        testThrowsErrorIfMissingCurrentValueProperty();
        testSaveThenLoadDoesNotChangeBehaviour();
        testCanSaveWhetherVectorIsOnOrOff();
        testCanStopAndStartUpdate();
        testCanBeOffAndActive();
        testCurrentValuesAreTheSameWhetherOnOrOff();
        testReturnsExpectedCurrentValuesDuringFullDuration();
        testReturnsExpectedCurrentValuesDuringFullDurationWithEaseApplied();
        testReturnsExpectedCurrentValuesDuringFullDurationAfterSettingSpeed();
        testReturnsExpectedCurrentValuesDuringFullDurationAfterSettingSpeedWithEaseApplied();
        testWorksAsExpectedWithPositiveXToHigherX();
        testWorksAsExpectedWithPositiveXToLowerX();
        testWorksAsExpectedWithPositiveXToNegativeX();
        testWorksAsExpectedWithNegativeXToHigherX();
        testWorksAsExpectedWithNegativeXToLowerX();
        testWorksAsExpectedWithNegativeXToNPositiveX();
        testWorksAsExpectedWithPositiveYToHigherY();
        testWorksAsExpectedWithPositiveYToLowerY();
        testWorksAsExpectedWithPositiveYToNegativeY();
        testWorksAsExpectedWithNegativeYToHigherY();
        testWorksAsExpectedWithNegativeYToLowerY();
        testWorksAsExpectedWithNegativeYToPositiveY();

    });
}

function testStartsInactive(): void {
    test('starts inactive', () => {
        EXPECT.falsy(vector.isActive);
    });
}

function testInitialCurrentValuesAre00IfNotSetInConstructor(): void {
    test('initial current values are 0,0 if not set in constructor', () => {
        EXPECT.toBe(vector.current.x, 0);
        EXPECT.toBe(vector.current.y, 0);
    });
}

function testInitialCurrentValuesAreValuesSetInConstructor(): void {
    test('initial current values are values set in constructor', () => {
        vector = new DynamicVector(new Vector2D(100, 200));
        EXPECT.toBe(vector.current.x, 100);
        EXPECT.toBe(vector.current.y, 200);
    });
}

function testCannotSetDurationIfVectorIsActive(): void {
    test('cannot set duration if vector is active', () => {
        EXPECT.toBe(vector.duration(1000).changeTo(new Vector2D(100, 200)), 1000);
        EXPECT.truthy(vector.isActive);
        EXPECT.toBe(vector.duration(2000).changeTo(new Vector2D(400, 500)), 0);
    });
}

function testCannotSetDurationOf0(): void {
    test('cannot set duration of 0', () => {
        EXPECT.toBe(vector.duration(0).changeTo(new Vector2D(100, 200)), 0);
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.current.x, 100);
        EXPECT.toBe(vector.current.y, 200);
    });
}

function testCannotSetDurationOfLessThan0(): void {
    test('cannot set duration of less than 0', () => {
        EXPECT.toBe(vector.duration(-100).changeTo(new Vector2D(100, 200)), 0);
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.current.x, 100);
        EXPECT.toBe(vector.current.y, 200);
    });
}

function testSettingDurationDoesNotMakeTheVectorActive(): void {
    test('setting duration does not make the vector active', () => {
        vector.duration(1000);
        EXPECT.falsy(vector.isActive);
    });
}

function testDurationGoesBackTo0OnceDurationHasElapsed(): void {
    test('duration goes back to 0 once duration has elapsed', () => {
        vector.duration(1000).changeTo(new Vector2D(400, 600));
        vector.update(200);
        vector.update(200);
        vector.update(200);
        vector.update(200);
        vector.update(200);
        vector.changeTo(new Vector2D(600, -600));
        EXPECT.toBe(vector.current.x, 600);
        EXPECT.toBe(vector.current.y, -600);
    });
}

function testCannotSetSpeedIfVectorIsActive(): void {
    test('cannot set speed if vector is active', () => {
        const start = new Vector2D(100, 100);
        const end = new Vector2D(200, 400);
        const distanceBetween = end.subtract(start);
        vector = new DynamicVector(start);
        vector.duration(1000).changeTo(end);
        EXPECT.truthy(vector.isActive);
        vector.speed(5); // <-- no effect
        vector.update(100);
        const current = start.add(distanceBetween.multiply(0.1));
        EXPECT.toBeCloseTo(vector.current.x, current.x);
        EXPECT.toBeCloseTo(vector.current.y, current.y);
    });
}

function testCannotSetSpeedOf0(): void {
    test('cannot set speed of 0', () => {
        EXPECT.toBe(vector.speed(0).changeTo(new Vector2D(1000, -500)), 0);
        EXPECT.falsy(vector.isActive);
    });
}

function testCannotSetSpeedOfLessThan0(): void {
    test('cannot set speed of less than 0', () => {
        EXPECT.toBe(vector.speed(-5).changeTo(new Vector2D(1000, -500)), 0);
        EXPECT.falsy(vector.isActive);
    });
}

function testSettingSpeedDoesNotMakeTheVectorActive(): void {
    test('setting speed does not make the vector active', () => {
        vector.speed(5);
        EXPECT.falsy(vector.isActive);
    });
}

function testSpeedGoesBackTo0OnceDurationHasElapsed(): void {
    test('speed goes back to 0 once duration has elapsed', () => {
        const start = new Vector2D(100, 200);
        const end = new Vector2D(500, 600);
        const diff = end.subtract(start);
        const distance = diff.length;
        const speed = 2;
        const duration = distance / speed;
        vector = new DynamicVector(start);
        EXPECT.toBeCloseTo(vector.speed(2).changeTo(end), duration);
        vector.update(duration / 5);
        vector.update(duration / 5);
        vector.update(duration / 5);
        vector.update(duration / 5);
        vector.update((duration / 5) + 1); // for rounding errors
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.changeTo(new Vector2D(1000, -1000)), 0);
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.current.x, 1000);
        EXPECT.toBe(vector.current.y, -1000);
    });
}

function testCannotSetEaseIfVectorIsActive(): void {
    test('cannot set ease if vector is active', () => {
        const start = new Vector2D(100, 100);
        const end = new Vector2D(200, 400);
        const distanceBetween = end.subtract(start);
        vector = new DynamicVector(start);
        vector.duration(1000).changeTo(end);
        EXPECT.truthy(vector.isActive);
        vector.ease('easeInElastic'); // <-- no effect
        vector.update(200);
        const current = start.add(distanceBetween.multiply(0.2));
        EXPECT.toBeCloseTo(vector.current.x, current.x);
        EXPECT.toBeCloseTo(vector.current.y, current.y);

    });
}

function testEaseReturnsToNoEaseOnceDurationHasElapsed(): void {
    test('ease returns to "noEase" once duration has elapsed', () => {

        const startA = new Vector2D(100, 100);
        const endA = new Vector2D(200, 400);
        const distanceBetweenA = endA.subtract(startA);
        vector = new DynamicVector(startA);
        vector.duration(1000).ease('easeInQuad').changeTo(endA);
        EXPECT.truthy(vector.isActive);
        vector.update(200);
        const currentA = startA.add(distanceBetweenA.multiply(Math.pow(0.2, 2)));
        EXPECT.toBeCloseTo(vector.current.x, currentA.x);
        EXPECT.toBeCloseTo(vector.current.y, currentA.y);
        vector.update(200);
        vector.update(200);
        vector.update(200);
        vector.update(201);
        EXPECT.falsy(vector.isActive);

        const startB = new Vector2D().copy(endA);
        const endB = new Vector2D(1200, 1400);
        const distanceBetweenB = endB.subtract(startB);
        vector.duration(1000).changeTo(endB);
        EXPECT.truthy(vector.isActive);
        vector.update(200);
        const currentB = startB.add(distanceBetweenB.multiply(0.2));
        EXPECT.toBeCloseTo(vector.current.x, currentB.x);
        EXPECT.toBeCloseTo(vector.current.y, currentB.y);

    });
}

function testCannotChangeIfVectorIsActive(): void {
    test('cannot change if vector is active', () => {
        vector = new DynamicVector(new Vector2D(-100, -200));
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.duration(500).changeTo(new Vector2D(400, 500)), 500);
        EXPECT.truthy(vector.isActive);
        EXPECT.toBe(vector.changeTo(new Vector2D(1000, 2000)), 0); // <--
        EXPECT.toBe(vector.current.x, -100);
        EXPECT.toBe(vector.current.y, -200);
    });
}

function testChangingToTheSamePositionDoesNothing(): void {
    test('changing to the same position does nothing', () => {
        vector = new DynamicVector(new Vector2D(100, 200));
        EXPECT.toBe(vector.duration(500).changeTo(new Vector2D(100, 200)), 0);
        EXPECT.falsy(vector.isActive);
    });
}

function testChangingWithoutSettingTheDurationChangesTheCurrentPositionsImmediately(): void {
    test('changing without setting the duration changes the current position immediately', () => {
        EXPECT.toBe(vector.changeTo(new Vector2D(200, 400)), 0);
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.current.x, 200);
        EXPECT.toBe(vector.current.y, 400);
    });
}

function testChangingInstantlyResetsTheEase(): void {
    test('changing position instantly resets the ease', () => {
        vector.ease('easeOutQuint');
        EXPECT.toBe(vector.changeTo(new Vector2D(200, 400)), 0);
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.current.x, 200);
        EXPECT.toBe(vector.current.y, 400);
        vector.duration(1000).changeTo(new Vector2D(100, 200));
        vector.update(100);
        EXPECT.toBeCloseTo(vector.current.x, 190);
    });
}

function testValidLoadReturnsTrue(): void {
    test('valid load returns true', () => {
        const grandParent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const parent = JSON.stringify({
            parent: grandParent,
            unit: unit.save(),
            speed: 0
        });
        const previous = new Vector2D();
        const next = new Vector2D();
        const distanceBetween = new Vector2D();
        const currentValue = new Vector2D();
        EXPECT.truthy(
            vector.load(
                JSON.stringify({
                    parent: parent,
                    previous: previous.save(),
                    next: next.save(),
                    distanceBetween: distanceBetween.save(),
                    currentValue: currentValue.save()
                })
            )
        );
    });
}

function testThrowsErrorIfMissingParentProperty(): void {
    test('throws error if missing "parent" property', () => {
        // const grandParent = JSON.stringify({
        //     isOn: false,
        //     duration: 0,
        //     easeOption: 'noEase'
        // });
        // const unit = new DynamicUnit();
        // const parent = JSON.stringify({
        //     parent: grandParent,
        //     unit: unit.save(),
        //     speed: 0
        // });
        const previous = new Vector2D();
        const next = new Vector2D();
        const distanceBetween = new Vector2D();
        const currentValue = new Vector2D();
        EXPECT.falsy(
            vector.load(
                JSON.stringify({
                    // parent: parent,
                    previous: previous.save(),
                    next: next.save(),
                    distanceBetween: distanceBetween.save(),
                    currentValue: currentValue.save()
                })
            )
        );
    });
}

function testThrowsErrorIfMissingPreviousProperty(): void {
    test('throws error if missing "previous" property', () => {
        const grandParent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const parent = JSON.stringify({
            parent: grandParent,
            unit: unit.save(),
            speed: 0
        });
        // const previous = new Vector2D();
        const next = new Vector2D();
        const distanceBetween = new Vector2D();
        const currentValue = new Vector2D();
        EXPECT.falsy(
            vector.load(
                JSON.stringify({
                    parent: parent,
                    // previous: previous.save(),
                    next: next.save(),
                    distanceBetween: distanceBetween.save(),
                    currentValue: currentValue.save()
                })
            )
        );
    });
}

function testThrowsErrorIfMissingNextProperty(): void {
    test('throws error if missing "next" property', () => {
        const grandParent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const parent = JSON.stringify({
            parent: grandParent,
            unit: unit.save(),
            speed: 0
        });
        const previous = new Vector2D();
        // const next = new Vector2D();
        const distanceBetween = new Vector2D();
        const currentValue = new Vector2D();
        EXPECT.falsy(
            vector.load(
                JSON.stringify({
                    parent: parent,
                    previous: previous.save(),
                    // next: next.save(),
                    distanceBetween: distanceBetween.save(),
                    currentValue: currentValue.save()
                })
            )
        );
    });
}

function testThrowsErrorIfMissingDistanceBetweenProperty(): void {
    test('throws error if missing "distanceBetween" property', () => {
        const grandParent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const parent = JSON.stringify({
            parent: grandParent,
            unit: unit.save(),
            speed: 0
        });
        const previous = new Vector2D();
        const next = new Vector2D();
        // const distanceBetween = new Vector2D();
        const currentValue = new Vector2D();
        EXPECT.falsy(
            vector.load(
                JSON.stringify({
                    parent: parent,
                    previous: previous.save(),
                    next: next.save(),
                    // distanceBetween: distanceBetween.save(),
                    currentValue: currentValue.save()
                })
            )
        );
    });
}

function testThrowsErrorIfMissingCurrentValueProperty(): void {
    test('throws error if missing "currentValue" property', () => {
        const grandParent = JSON.stringify({
            isOn: false,
            duration: 0,
            easeOption: 'noEase'
        });
        const unit = new DynamicUnit();
        const parent = JSON.stringify({
            parent: grandParent,
            unit: unit.save(),
            speed: 0
        });
        const previous = new Vector2D();
        const next = new Vector2D();
        const distanceBetween = new Vector2D();
        // const currentValue = new Vector2D();
        EXPECT.falsy(
            vector.load(
                JSON.stringify({
                    parent: parent,
                    previous: previous.save(),
                    next: next.save(),
                    distanceBetween: distanceBetween.save(),
                    // currentValue: currentValue.save()
                })
            )
        );
    });
}

function testSaveThenLoadDoesNotChangeBehaviour(): void {
    test('save then load does not change behaviour', () => {
        EXPECT.toBe(vector.duration(1000).changeTo(new Vector2D(1000, 0)), 1000);
        EXPECT.truthy(vector.isActive);
        vector.load(vector.save()); // <--
        EXPECT.truthy(vector.isActive);
        for (let i = 0; i < 9; i++) {
            vector.update(100);
            vector.load(vector.save()); // <--
            EXPECT.truthy(vector.isActive);
            EXPECT.toBeCloseTo(vector.current.x, 100 + (i * 100));
            EXPECT.toBe(vector.current.y, 0);
        }

        vector.update(101);
        vector.load(vector.save()); // <--
        EXPECT.falsy(vector.isActive);
        EXPECT.toBe(vector.current.x, 1000);
        EXPECT.toBe(vector.current.y, 0);

    });
}

function testCanSaveWhetherVectorIsOnOrOff(): void {
    test('can save whether vector is on or off', () => {
        vector.duration(1000).changeTo(new Vector2D(500, 0));
        vector.load(vector.save());
        vector.update(100);
        EXPECT.toBeCloseTo(vector.current.x, 50);
        vector.turnOff();
        vector.load(vector.save());
        vector.turnOn();
        vector.update(100);
        EXPECT.toBeCloseTo(vector.current.x, 100);
    });
}

function testCanStopAndStartUpdate(): void {
    test('can stop and start update', () => {
        vector.duration(1000).changeTo(new Vector2D(500, 0));
        vector.update(100);
        EXPECT.toBeCloseTo(vector.current.x, 50);
        vector.turnOff();
        vector.update(100);
        EXPECT.toBeCloseTo(vector.current.x, 50);
        vector.turnOn();
        vector.update(100);
        EXPECT.toBeCloseTo(vector.current.x, 100);
    });
}

function testCanBeOffAndActive(): void {
    test('can be off and active', () => {
        vector.duration(1000).changeTo(new Vector2D(500, -500));
        EXPECT.truthy(vector.isActive);
        vector.turnOff();
        EXPECT.truthy(vector.isActive);
    });
}

function testCurrentValuesAreTheSameWhetherOnOrOff(): void {
    test('current values are the same whether on or off', () => {
        vector.duration(1000).changeTo(new Vector2D(500, 0));
        vector.update(100);
        EXPECT.toBeCloseTo(vector.current.x, 50);
        vector.turnOff();
        EXPECT.toBeCloseTo(vector.current.x, 50);
        vector.turnOn();
        vector.update(100);
        EXPECT.toBeCloseTo(vector.current.x, 100);
        vector.turnOff();
        EXPECT.toBeCloseTo(vector.current.x, 100);
    });
}

function testReturnsExpectedCurrentValuesDuringFullDuration(): void {
    test('returns expected current values during full duration', () => {
        testFullDuration({
            start: new Vector2D(500, 200),
            end: new Vector2D(1000, 1500),
            duration: 1000,
            ease: 'noEase'
        });
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationWithEaseApplied(): void {
    test('returns expected current values during full duration with ease applied', () => {
        testFullDuration({
            start: new Vector2D(500, 200),
            end: new Vector2D(1000, 1500),
            duration: 1000,
            ease: 'easeInQuint'
        });
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationAfterSettingSpeed(): void {
    test('returns expected current values during full duration after setting speed', () => {
        testFullDuration({
            start: new Vector2D(500, 200),
            end: new Vector2D(1000, 1500),
            speed: 2,
            ease: 'noEase'
        });
    });
}

function testReturnsExpectedCurrentValuesDuringFullDurationAfterSettingSpeedWithEaseApplied(): void {
    test('returns expected current values during full duration after setting speed with ease applied', () => {
        testFullDuration({
            start: new Vector2D(500, 200),
            end: new Vector2D(1000, 1500),
            speed: 2,
            ease: 'easeOutBounce'
        });
    });
}

function testWorksAsExpectedWithPositiveXToHigherX(): void {
    test('works as expected with positive X to higher X', () => {
        testFullDuration({
            start: new Vector2D(500, 200),
            end: new Vector2D(1000, 1500),
            duration: 500,
            ease: 'noEase'
        });
    });
}

function testWorksAsExpectedWithPositiveXToLowerX(): void {
    test('works as expected with positive X to lower X', () => {
        testFullDuration({
            start: new Vector2D(500, 200),
            end: new Vector2D(100, 1500),
            duration: 500,
            ease: 'noEase'
        });
    });
}

function testWorksAsExpectedWithPositiveXToNegativeX(): void {
    test('works as expected with positive X to negative X', () => {
        testFullDuration({
            start: new Vector2D(500, 200),
            end: new Vector2D(-1000, 1500),
            duration: 500,
            ease: 'noEase'
        });
    });
}

function testWorksAsExpectedWithNegativeXToHigherX(): void {
    test('works as expected with negative X to higher X', () => {
        testFullDuration({
            start: new Vector2D(-500, 200),
            end: new Vector2D(-100, 1500),
            duration: 500,
            ease: 'noEase'
        });
    });
}

function testWorksAsExpectedWithNegativeXToLowerX(): void {
    test('works as expected with negative X to lower X', () => {
        testFullDuration({
            start: new Vector2D(-500, 200),
            end: new Vector2D(-1000, 1500),
            duration: 500,
            ease: 'noEase'
        });
    });
}

function testWorksAsExpectedWithNegativeXToNPositiveX(): void {
    test('works as expected with negative X to positive X', () => {
        testFullDuration({
            start: new Vector2D(-500, 200),
            end: new Vector2D(1000, 1500),
            duration: 500,
            ease: 'noEase'
        });
    });
}

function testWorksAsExpectedWithPositiveYToHigherY(): void {
    test('works as expected with positive Y to higher Y', () => {
        testFullDuration({
            start: new Vector2D(500, 200),
            end: new Vector2D(1000, 1500),
            duration: 500,
            ease: 'noEase'
        });
    });
}

function testWorksAsExpectedWithPositiveYToLowerY(): void {
    test('works as expected with positive Y to lower Y', () => {
        testFullDuration({
            start: new Vector2D(500, 2000),
            end: new Vector2D(1000, 1500),
            duration: 500,
            ease: 'noEase'
        });
    });
}

function testWorksAsExpectedWithPositiveYToNegativeY(): void {
    test('works as expected with positive Y to negative Y', () => {
        testFullDuration({
            start: new Vector2D(500, 800),
            end: new Vector2D(1000, -150),
            duration: 500,
            ease: 'noEase'
        });
    });
}

function testWorksAsExpectedWithNegativeYToHigherY(): void {
    test('works as expected with negative Y to higher Y', () => {
        testFullDuration({
            start: new Vector2D(500, -800),
            end: new Vector2D(1000, -150),
            duration: 500,
            ease: 'noEase'
        });
    });
}

function testWorksAsExpectedWithNegativeYToLowerY(): void {
    test('works as expected with negative Y to lower Y', () => {
        testFullDuration({
            start: new Vector2D(500, -100),
            end: new Vector2D(1000, -150),
            duration: 500,
            ease: 'noEase'
        });
    });
}

function testWorksAsExpectedWithNegativeYToPositiveY(): void {
    test('works as expected with negative Y to positive Y', () => {
        testFullDuration({
            start: new Vector2D(500, -800),
            end: new Vector2D(1000, 150),
            duration: 500,
            ease: 'noEase'
        });
    });
}



/**
 * UTILITY FUNCTIONS
 */

function testFullDuration(params: tFullDurationTestParams): void {

    const DEFAULT_DURATION = 1000;
    const diff = params.end.subtract(params.start);
    const distanceBetween = diff.length;
    const speed = (params.speed !== undefined) ? params.speed : false;
    const duration = (speed) ? distanceBetween / speed : (params.duration) ? params.duration : DEFAULT_DURATION;
    const numSteps = 10;
    const step = duration / numSteps;
    let easeFn: EASE.tEaseFunction = EASE.load(params.ease);
    let elapsed: number = 0;
    let progress: number = 0;
    let current = new Vector2D();

    vector = new DynamicVector(params.start);
    if (speed) vector.speed(speed);
    else vector.duration(duration);
    EXPECT.toBeCloseTo(vector.ease(params.ease).changeTo(params.end), duration);
    EXPECT.truthy(vector.isActive);

    // loop to 1 step before completion
    for (let i = 0; i < numSteps - 1; i++) {
        vector.update(step);
        elapsed += step;
        progress = easeFn(elapsed / duration);
        current = params.start.add(diff.multiply(progress));
        EXPECT.truthy(vector.isActive);
        EXPECT.toBeCloseTo(vector.current.x, current.x);
        EXPECT.toBeCloseTo(vector.current.y, current.y);
    }

    // final step (+ 1 for rounding errors)
    vector.update(step + 1);
    EXPECT.toBe(vector.current.x, params.end.x);
    EXPECT.toBe(vector.current.y, params.end.y);
    EXPECT.falsy(vector.isActive);

}