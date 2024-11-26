/**
 * represents a unit of 0 - 1 changing over time
 * drives ALL other dynamic objects
 * 
 */

import type { iDynamic } from "../index.js";
import { type tEaseOption, type tEaseFunction, load as loadEase } from "@brendangooch/ease";
import { clamp } from "@brendangooch/maths";

type tDynamicUnitProperties = {
    isOn: boolean;
    isRunning: boolean;
    current: number;
    elapsed: number;
    duration: number;
    ease: tEaseOption;
    easeFn: tEaseFunction;
    floored: boolean;
    inverted: boolean;
    amplitude: number;
    onComplete: Function | null;
    runRate: number;
};

export class DynamicUnit implements iDynamic {

    public static TICK_RATE: number = 1000 / 60;

    private static STEP_RATE: number = 0.05;
    private static MAX_AMPLITUDE: number = 1;
    private static MIN_AMPLITUDE: number = 0.1;
    private static MIN_RUN_RATE: number = 0.2;
    private static MAX_RUN_RATE: number = 5;
    private static MIN_DURATION: number = 50;

    private properties: tDynamicUnitProperties = {
        isOn: true,
        isRunning: false,
        current: 0,
        elapsed: 0,
        duration: 0,
        ease: 'noEase',
        easeFn: loadEase('noEase'),
        floored: false,
        inverted: false,
        amplitude: 1,
        onComplete: null,
        runRate: 1
    };

    public constructor(amplitude: number = 1, inverted: boolean = false, floored: boolean = false) {
        this.properties.amplitude = clamp(amplitude, DynamicUnit.MIN_AMPLITUDE, DynamicUnit.MAX_AMPLITUDE);
        this.properties.inverted = inverted;
        this.properties.floored = floored;
    }

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
        return this.properties.current === 1 && this.properties.elapsed === 0;
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

    public load(json: string): boolean {
        if (!this.isOn) {
            const state = JSON.parse(json);
            if (state.isRunning === undefined) return false;
            if (state.current === undefined) return false;
            if (state.elapsed === undefined) return false;
            if (state.duration === undefined) return false;
            if (state.floored === undefined) return false;
            if (state.inverted === undefined) return false;
            if (state.amplitude === undefined) return false;
            if (state.runRate === undefined) return false;
            if (state.ease === undefined) return false;
            this.properties.isRunning = state.isRunning;
            this.properties.current = state.current;
            this.properties.elapsed = state.elapsed;
            this.properties.duration = state.duration;
            this.properties.floored = state.floored;
            this.properties.inverted = state.inverted;
            this.properties.amplitude = state.amplitude;
            this.properties.runRate = state.runRate;
            this.setEase(state.ease);
            return true;
        }
        return false;
    }

    public save(): string {
        if (!this.isOn) {
            return JSON.stringify({
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
        if (this.isOn && this.isActive) this.properties.isRunning = true;
    }

    public stop(): void {
        if (this.isOn) this.properties.isRunning = false;
    }

    public pause(): void {
        if (this.isOn && this.isActive) this.properties.isRunning = !this.properties.isRunning;
    }

    public getDuration(): number {
        return this.properties.duration;
    }

    // set elapsed to same value so unit does not become active
    public duration(ms: number): DynamicUnit {
        if (this.isOn && !this.isActive) this.properties.duration = this.properties.elapsed = Math.max(DynamicUnit.MIN_DURATION, ms);
        return this;
    }

    public ease(ease: tEaseOption): DynamicUnit {
        if (this.isOn && !this.isActive) this.setEase(ease);
        return this;
    }

    public onComplete(fn: Function): DynamicUnit {
        if (this.isOn && !this.isActive) this.properties.onComplete = fn;
        return this;
    }

    public change(): boolean {
        if (this.isOn && !this.isActive && this.properties.duration !== 0) {
            this.properties.elapsed = 0; // <-- makes unit active
            this.updateCurrent(false);
            return true;
        }
        return false;
    }

    public update(ms: number): void {
        if (this.isOn && this.isRunning && this.isActive) this.increment(ms, true);
    }

    public tick(): void {
        this.update(DynamicUnit.TICK_RATE);
    }

    public step(dir: 1 | -1): void {
        if (this.isOn && !this.isRunning && (this.isActive || (!this.isActive && !this.isComplete))) this.increment(this.stepSize * dir, false);
    }

    public rewind(): void {
        if (this.isOn && this.isActive && !this.isRunning) {
            this.properties.elapsed = 0;
            this.updateCurrent(false);
        }
    }

    // end update cycle prematurely
    public endNow(): void {
        if (this.isOn && this.isActive) this.updateComplete();
    }

    public runRate(speed: number): void {
        if (this.isOn) this.properties.runRate = clamp(speed, DynamicUnit.MIN_RUN_RATE, DynamicUnit.MAX_RUN_RATE);
    }

    private get stepSize(): number {
        return DynamicUnit.STEP_RATE * this.properties.duration;
    }

    // pretty inefficient
    private increment(ms: number, doComplete: boolean): void {
        this.properties.elapsed = clamp(this.properties.elapsed + (ms * this.properties.runRate), 0, this.properties.duration);
        this.updateCurrent(doComplete);
    }

    // doComplete flag enables step to reach current value of 1 then step backwards
    private updateCurrent(doComplete: boolean): void {
        if (this.properties.elapsed === 0) this.properties.current = 0;
        else if (!this.isActive && doComplete) this.updateComplete();
        else if (this.properties.elapsed === this.properties.duration) this.properties.current = 1;
        else this.properties.current = this.properties.easeFn(this.properties.elapsed / this.properties.duration);
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
        this.properties.easeFn = loadEase(ease);
    }

}