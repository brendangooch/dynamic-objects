/**
 * a number that changes its value over time
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iDynamic } from "../index.js";
import { DynamicUnit } from "../index.js";
import { clamp, roundToPlaces } from "@brendangooch/maths";

type tDynamicVectorProperties = {
    unit: DynamicUnit;
    speed: number;
    current: number;
    previous: number;
    next: number;
    distance: number;
    min: number | false;
    max: number | false;
    rounded: boolean;
    toPlaces: number | false;
};

export class DynamicNumber implements iDynamic {

    private properties: tDynamicVectorProperties = {
        unit: new DynamicUnit(),
        speed: 0,
        current: 0,
        previous: 0,
        next: 0,
        distance: 0,
        min: false,
        max: false,
        rounded: false,
        toPlaces: false
    };

    public constructor(initial: number = 0, min: number | false = false, max: number | false = false, rounded: boolean = false, toPlaces: number | false = false) {
        this.setAll(initial);
        this.properties.min = min;
        this.properties.max = max;
        this.properties.rounded = rounded;
        this.properties.toPlaces = toPlaces;
    }

    // rounded
    // toPlaces
    public get current(): number {
        if (this.properties.rounded) return Math.round(this.properties.current);
        if (this.properties.toPlaces) return roundToPlaces(this.properties.current, this.properties.toPlaces);
        return this.properties.current;
    }

    public get isActive(): boolean {
        return this.properties.unit.isActive;
    }

    public get isComplete(): boolean {
        return this.properties.unit.isComplete;
    }

    public get isRunning(): boolean {
        return this.properties.unit.isRunning;
    }

    public get isOn(): boolean {
        return this.properties.unit.isOn;
    }

    public turnOn(): void {
        this.properties.unit.turnOn();
    }

    public turnOff(): void {
        this.properties.unit.turnOff();
    }

    public load(json: string): boolean {
        if (!this.isOn) {
            const state = JSON.parse(json);
            if (state.unit === undefined || !this.properties.unit.load(state.unit)) return false;
            if (state.speed === undefined) return false;
            if (state.current === undefined) return false;
            if (state.previous === undefined) return false;
            if (state.next === undefined) return false;
            if (state.distance === undefined) return false;
            if (state.min === undefined) return false;
            if (state.max === undefined) return false;
            if (state.rounded === undefined) return false;
            if (state.toPlaces === undefined) return false;
            this.properties.speed = state.speed;
            this.properties.current = state.current;
            this.properties.previous = state.previous;
            this.properties.next = state.next;
            this.properties.distance = state.distance;
            this.properties.min = state.min;
            this.properties.max = state.max;
            this.properties.rounded = state.rounded;
            this.properties.toPlaces = state.toPlaces;
            return true;
        }
        return false;
    }

    public save(): string {
        if (!this.isOn) {
            return JSON.stringify({
                unit: this.properties.unit.save(),
                speed: this.properties.speed,
                current: this.properties.current,
                previous: this.properties.previous,
                next: this.properties.next,
                distance: this.properties.distance,
                min: this.properties.min,
                max: this.properties.max,
                rounded: this.properties.rounded,
                toPlaces: this.properties.toPlaces,
            })
        }
        return '';
    }

    public start(): void {
        this.properties.unit.start();
    }

    public stop(): void {
        this.properties.unit.stop();
    }

    public pause(): void {
        this.properties.unit.pause();
    }

    public getDuration(): number {
        return this.properties.unit.getDuration();
    }

    public duration(ms: number): DynamicNumber {
        this.properties.unit.duration(ms);
        return this;
    }

    public speed(unitsPerMS: number): DynamicNumber {
        if (this.isOn && !this.isActive && unitsPerMS > 0) {
            this.properties.speed = unitsPerMS;
        }
        return this;
    }

    public ease(ease: tEaseOption): DynamicNumber {
        this.properties.unit.ease(ease);
        return this;
    }

    public onComplete(fn: Function): DynamicNumber {
        this.properties.unit.onComplete(fn);
        return this;
    }

    public next(n: number): DynamicNumber {
        if (this.isOn && !this.isActive && n !== this.properties.current) {
            if (this.properties.min && this.properties.max) this.properties.next = clamp(n, this.properties.min, this.properties.max);
            else this.properties.next = n;
            this.updateDistance();
            this.updateDuration();
        }
        return this;
    }

    // if no duration, change immediately, else, trigger unit
    public change(): boolean {
        if (this.properties.unit.getDuration() === 0) this.setAll(this.properties.next);
        else return this.properties.unit.change();
        return true;
    }

    public update(ms: number): void {
        this.properties.unit.update(ms);
        this.updateCurrent(true);
    }

    public tick(): void {
        this.properties.unit.tick();
        this.updateCurrent(true);
    }

    public step(dir: 1 | -1): void {
        this.properties.unit.step(dir);
        this.updateCurrent(false);
    }

    public rewind(): void {
        this.properties.unit.rewind();
        this.updateCurrent(false);
    }

    public runRate(speed: number): void {
        this.properties.unit.runRate(speed);
    }

    public endNow(): void {
        this.properties.unit.endNow();
        this.reset();
    }

    protected updateCurrent(doComplete: boolean): void {
        this.properties.current = this.properties.previous + (this.properties.distance * this.properties.unit.current);
        if (this.properties.unit.isComplete && doComplete) this.updateComplete();
    }

    protected updateComplete(): void {
        this.reset();
    }

    protected updateDistance(): void {
        this.properties.distance = this.properties.next - this.properties.previous;
    }

    protected updateDuration(): void {
        if (this.properties.speed > 0) this.duration(Math.abs(this.properties.distance) / this.properties.speed);
    }

    protected setAll(n: number): void {
        this.properties.current = this.properties.next = this.properties.previous = n;
        this.updateDistance();
    }

    protected reset(): void {
        this.setAll(this.properties.current);
        this.properties.speed = 0;
    }

}