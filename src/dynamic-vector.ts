/**
 * a number that changes its value over time
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic } from "./index.js";
import { DynamicUnit } from "./dynamic-unit.js";
import { AbstractDynamicObject } from "./abstract-dynamic-object.js";
import { Vector2D } from "@brendangooch/maths";

export class DynamicVector extends AbstractDynamicObject implements iDynamic {

    private unit: DynamicUnit = new DynamicUnit();
    private previous: Vector2D = new Vector2D();
    private next: Vector2D = new Vector2D();
    private difference: Vector2D = new Vector2D();
    private _current: Vector2D = new Vector2D();
    private _duration: number = 0;
    private _speed: number = 0;

    public constructor(x: number = 0, y: number = 0) {
        super();
        this.setAll(new Vector2D(x, y));
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get x(): number {
        return this._current.x;
    }

    public get y(): number {
        return this._current.y;
    }

    public duration(ms: number): DynamicVector {
        if (!this.isActive && ms > 0) {
            this._duration = ms;
        }
        return this;
    }

    public speed(unitsPerMs: number): DynamicVector {
        if (!this.isActive && unitsPerMs > 0) {
            this._speed = unitsPerMs;
        }
        return this;
    }

    public ease(easeOption: tEaseOption): DynamicVector {
        if (!this.isActive) {
            this.unit.ease(easeOption);
        }
        return this;
    }

    public moveTo(x: number, y: number): boolean {
        if (this.canChange(new Vector2D(x, y))) return this.doChange(new Vector2D(x, y));
        return false;
    }

    public moveBy(x: number, y: number): boolean {
        return this.moveTo(x + this.x, y + this.y);
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
        this.previous.load(state.previous);
        this.next.load(state.next);
        this.difference.load(state.difference);
        this._current.load(state.current);
        this._duration === state.duration;
        this._speed === state.speed;
        this.isOn === state.isOn;
        return true;
    }

    public save(): string {
        return JSON.stringify({
            unit: this.unit.save(),
            previous: this.previous.save(),
            next: this.next.save(),
            difference: this.difference.save(),
            current: this._current.save(),
            duration: this._duration,
            speed: this._speed,
            isOn: this.isOn
        });
    }

    protected setAll(v: Vector2D): void {
        this.next.copy(v);
        this.previous.copy(v);
        this._current.copy(v);
        this.updateDifference();
    }

    protected setAllToNext(): void {
        this.setAll(this.next);
    }

    protected increment(ms: number): void {
        this.unit.update(ms);
    }

    protected updateCurrent(): void {
        this._current = this.previous.add(this.difference.multiply(this.unit.current))
    }

    protected updateDifference(): void {
        this.difference = this.next.subtract(this.previous);
    }

    protected updateComplete(): void {
        this.setAllToNext();
        this._speed = 0;
        this._duration = 0;
        this.turnOff();
    }

    protected updateDuration(): void {
        if (this._speed !== 0 && this.difference.length > 0) this._duration = Math.abs(this.difference.length / this._speed);
    }

    protected canChange(v: Vector2D): boolean {
        return !this.isActive && (v.x !== this.x || v.y !== this.y);
    }

    protected doChange(v: Vector2D): boolean {
        this.next.copy(v);
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