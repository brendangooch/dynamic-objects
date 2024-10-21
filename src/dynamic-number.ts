/**
 * a number that changes its value over time
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic } from "./index.js";
import { DynamicUnit } from "./dynamic-unit.js";
import { AbstractDynamicObject } from "./abstract-dynamic-object.js";

export class DynamicNumber extends AbstractDynamicObject implements iDynamic {

    private unit: DynamicUnit = new DynamicUnit();
    private previous: number = 0;
    private next: number = 0;
    private difference: number = 0;
    private _current: number = 0;
    private _duration: number = 0;
    private _speed: number = 0;

    public constructor(initial: number = 0) {
        super();
        this.setAll(initial);
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get current(): number {
        return this._current;
    }

    public duration(ms: number): DynamicNumber {
        if (!this.isActive && ms > 0) {
            this._duration = ms;
        }
        return this;
    }

    public speed(unitsPerMs: number): DynamicNumber {
        if (!this.isActive && unitsPerMs > 0) {
            this._speed = unitsPerMs;
        }
        return this;
    }

    public ease(easeOption: tEaseOption): DynamicNumber {
        if (!this.isActive) {
            this.unit.ease(easeOption);
        }
        return this;
    }

    public changeTo(n: number): boolean {
        if (this.canChange(n)) return this.doChange(n);
        return false;
    }

    public changeBy(n: number): boolean {
        return this.changeTo(n + this.current);
    }

    public load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.unit === undefined) return false;
        if (state.previous === undefined) return false;
        if (state.next === undefined) return false;
        if (state.difference === undefined) return false;
        if (state.current === undefined) return false;
        if (state.duration === undefined) return false;
        if (state.speed === undefined) return false;
        if (state.isOn === undefined) return false;
        this.unit.load(state.unit);
        this.previous === state.previous;
        this.next === state.next;
        this.difference === state.difference;
        this._current === state.current;
        this._duration === state.duration;
        this._speed === state.speed;
        this.isOn === state.isOn;
        return true;
    }

    public save(): string {
        return JSON.stringify({
            unit: this.unit.save(),
            previous: this.previous,
            next: this.next,
            difference: this.difference,
            current: this._current,
            duration: this._duration,
            speed: this._speed,
            isOn: this.isOn
        });
    }

    protected setAll(n: number): void {
        this._current = this.previous = this.next = n;
        this.updateDifference();
    }

    protected setAllToNext(): void {
        this.setAll(this.next);
    }

    protected increment(ms: number): void {
        this.unit.update(ms);
    }

    protected updateCurrent(): void {
        this._current = this.previous + (this.difference * this.unit.current);
    }

    protected updateDifference(): void {
        this.difference = this.next - this.previous;
    }

    protected updateComplete(): void {
        this.setAllToNext();
        this._speed = 0;
        this._duration = 0;
        this.turnOff();
    }

    protected updateDuration(): void {
        if (this._speed !== 0 && this.difference > 0) this._duration = Math.abs(this.difference / this._speed);
    }

    protected canChange(n: number): boolean {
        return !this.isActive && n !== this._current;
    }

    protected doChange(n: number): boolean {
        this.next = n;
        this.updateDifference();
        this.updateDuration();
        if (this._duration > 0) this.dynamicChange();
        else this.instantChange();
        return true;
    }

    protected instantChange(): void {
        this.setAllToNext();
    }

    protected dynamicChange(): void {
        this.turnOn();
        this.unit.duration(this._duration).run();
    }

};