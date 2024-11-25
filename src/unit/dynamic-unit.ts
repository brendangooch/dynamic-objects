/**
 * represents a unit of 0 - 1 changing over time
 * drives ALL other dynamic objects
 * 
 */

import type { iDynamicObject } from "../index.js";
import { type tEaseOption, type tEaseFunction, load as loadEase } from "@brendangooch/ease";
import { clamp } from "@brendangooch/maths";


type tDynamicUnitProperties = {
    isOn: boolean;
    isRunning: boolean;
    current: number;
    elapsed: number;
    duration: number;
    ease: tEaseOption;
    floored: boolean;
    inverted: boolean;
    amplitude: number;
    onComplete: Function | null;
    runRate: number;
};

export class DynamicUnit implements iDynamicObject {

    public static TICK_RATE: number = 1000 / 60;

    private static STEP_RATE: number = 0.05;
    private static MIN_AMPLITUDE: number = 0.1;
    private static MIN_RUN_RATE: number = 0.2;
    private static MIN_DURATION: number = 50;
    private static MAX_AMPLITUDE: number = 1;
    private static MAX_RUN_RATE: number = 5;
    private static RUN_RATE_INCREMENT_AMOUNT: number = 0.2;

    private properties: tDynamicUnitProperties = {
        isOn: true,
        isRunning: false,
        current: 0,
        elapsed: 0,
        duration: 0,
        ease: 'noEase',
        floored: false,
        inverted: false,
        amplitude: 1,
        onComplete: null,
        runRate: 1
    };

    private easeFn: tEaseFunction = loadEase('noEase');

    public get current(): number {
        let current = this.properties.current;
        if (this.properties.floored) current = Math.floor(current);
        if (this.properties.inverted) current = 1 - current;
        return current * this.properties.amplitude;
    }

    public get isActive(): boolean {
        return this.properties.elapsed < this.properties.duration;
    }

    public get isComplete(): boolean {
        return this.properties.current === 1;
    }

    public get isRunning(): boolean {
        return this.properties.isRunning;
    }

    public get isOn(): boolean {
        return this.properties.isOn;
    }

    public turnOn(): void {
        this.properties.isOn = true;
    }

    public turnOff(): void {
        this.properties.isOn = false;
    }

    public load(json: string): void {
        if (!this.isOn) {
            const state = JSON.parse(json);
            this.properties.isOn = state.isOn;
            this.properties.isRunning = state.isRunning;
            this.properties.current = state.current;
            this.properties.elapsed = state.elapsed;
            this.properties.duration = state.duration;
            this.properties.floored = state.floored;
            this.properties.inverted = state.inverted;
            this.properties.amplitude = state.amplitude;
            this.properties.runRate = state.runRate;
            this.setEase(state.ease);
        }
    }

    public save(): string {
        if (!this.isOn) {
            return JSON.stringify({
                isOn: this.properties.isOn,
                isRunning: this.properties.isRunning,
                current: this.properties.current,
                elapsed: this.properties.elapsed,
                duration: this.properties.duration,
                ease: this.properties.ease,
                floored: this.properties.floored,
                inverted: this.properties.inverted,
                amplitude: this.properties.amplitude,
                runRate: this.properties.runRate
            });
        }
        return '';
    }

    public start(): void {
        if (this.isOn) {
            this.properties.isRunning = true;
        }
    }

    public stop(): void {
        if (this.isOn) {
            this.properties.isRunning = false;
        }
    }

    public pause(): void {
        if (this.isOn) {
            this.properties.isRunning = !this.properties.isRunning;
        }
    }


    public duration(ms: number): DynamicUnit {
        if (this.isOn && !this.isActive) {
            this.properties.duration = Math.min(DynamicUnit.MIN_DURATION, ms);
        }
        return this;
    }

    public ease(ease: tEaseOption): DynamicUnit {
        if (this.isOn && !this.isActive) {
            this.setEase(ease);
        }
        return this;
    }

    public onComplete(fn: Function): DynamicUnit {
        if (this.isOn && !this.isActive) {
            this.properties.onComplete = fn;
        }
        return this;
    }


    public update(ms: number): void {
        if (this.isOn && this.isRunning && this.isActive) this.increment(ms);
    }

    public tick(): void {
        if (this.isOn && this.isRunning && this.isActive) this.increment(DynamicUnit.TICK_RATE);
    }

    public stepForwards(): void {
        if (this.isOn && this.isActive) this.increment(this.stepSize);
    }

    public stepBackwards(): void {
        if (this.isOn && this.isActive) this.increment(-this.stepSize);
    }

    public complete(): void {
        if (this.isOn && this.isActive) this.updateComplete();
    }

    public rewind(): void {
        if (this.isOn && this.isActive) {
            this.properties.elapsed = 0;
            this.updateCurrent();
        }
    }


    public floor(): DynamicUnit {
        if (this.isOn && !this.isRunning) {
            this.properties.floored = !this.properties.floored;
        }
        return this;
    }

    public invert(): DynamicUnit {
        if (this.isOn && !this.isRunning) {
            this.properties.inverted = !this.properties.inverted;
        }
        return this;
    }

    public amplitude(amplitude: number): DynamicUnit {
        if (this.isOn && !this.isRunning) {
            this.properties.amplitude = clamp(amplitude, DynamicUnit.MIN_AMPLITUDE, DynamicUnit.MAX_AMPLITUDE);
        }
        return this;
    }

    // make private?
    public runRate(speed: number): void {
        if (this.isOn && !this.isRunning) {
            this.properties.runRate = clamp(speed, DynamicUnit.MIN_RUN_RATE, DynamicUnit.MAX_RUN_RATE);
        }
    }

    public speedUp(): void {
        if (this.isOn) {
            this.runRate(this.properties.runRate + DynamicUnit.RUN_RATE_INCREMENT_AMOUNT);
        }
    }

    public slowDown(): void {
        if (this.isOn) {
            this.runRate(this.properties.runRate - DynamicUnit.RUN_RATE_INCREMENT_AMOUNT);
        }
    }

    public normalSpeed(): void {
        if (this.isOn) {
            this.runRate(1);
        }
    }

    private get stepSize(): number {
        return DynamicUnit.STEP_RATE * this.properties.duration;
    }

    private increment(ms: number): void {
        this.properties.elapsed += this.properties.runRate * ms;
        this.properties.elapsed = clamp(this.properties.elapsed, 0, this.properties.duration);
        this.updateCurrent();
    }

    private updateCurrent(): void {
        if (this.properties.elapsed === 0) this.properties.current = 0;
        else if (!this.isActive) this.updateComplete();
        else this.properties.current = this.easeFn(this.properties.elapsed / this.properties.duration);
    }

    private updateComplete(): void {
        if (this.properties.onComplete) this.properties.onComplete();
        this.properties.isRunning = false;
        this.properties.elapsed = 0;
        this.properties.duration = 0;
        this.properties.onComplete = null;
        this.properties.current = 1;
        this.setEase('noEase');

    }

    private setEase(ease: tEaseOption): void {
        this.properties.ease = ease;
        this.easeFn = loadEase(ease);
    }

}





// import { type tEaseFunction, type tEaseOption, load as loadEase } from "@brendangooch/ease";
// import type { iDynamicUnit } from "../types/i-dynamic-unit.js";
// import { BaseDynamicObject } from "../base-dynamic-object.js";

// export class DynamicUnit extends BaseDynamicObject implements iDynamicUnit {

//     private elapsed: number = 0;
//     private currentValue: number = 0;
//     private easeFn: tEaseFunction = loadEase(this.properties.ease);

//     public get isActive(): boolean {
//         return this.elapsed !== this.properties.duration;
//     }

//     public get current(): number {
//         return this.currentValue;
//     }

//     public override save(): string {
//         return JSON.stringify({
//             parent: super.save(),
//             elapsed: this.elapsed,
//             currentValue: this.currentValue
//         });
//     }

//     public override load(json: string): void {
//         const state = JSON.parse(json);
//         super.load(state.parent);
//         this.elapsed = state.elapsed;
//         this.currentValue = state.currentValue;
//         this.easeFn = loadEase(this.properties.ease);
//     }

//     public override duration(ms: number): iDynamicUnit {
//         if (!this.isActive && ms > 0) {
//             super.duration(ms);
//             this.elapsed = ms;
//         }
//         return this;
//     }

//     public override ease(easeOption: tEaseOption): iDynamicUnit {
//         if (!this.isActive) {
//             super.ease(easeOption);
//             this.easeFn = loadEase(easeOption);
//         }
//         return this;
//     }

//     public start(): void {
//         if (!this.isActive && this.properties.duration > 0) {
//             this.currentValue = 0;
//             this.elapsed = 0;
//         }
//     }

//     public stop(): void {
//         this.reset();
//     }

//     public clone(): iDynamicUnit {
//         const clone = new DynamicUnit();
//         clone.duration(this.properties.duration).ease(this.properties.ease);
//         return clone;
//     }

//     protected increment(ms: number): void {
//         this.elapsed += ms;
//         this.elapsed = Math.min(this.elapsed, this.properties.duration);
//         this.updateCurrent();
//     }

//     protected updateCurrent(): void {
//         this.currentValue = (this.elapsed === 0) ? 0 : this.easeFn(this.elapsed / this.properties.duration);
//     }

//     protected override postUpdateComplete(): void {
//         this.currentValue = 1;
//     }

//     protected override postReset(): void {
//         this.elapsed = 0;
//     }

// }