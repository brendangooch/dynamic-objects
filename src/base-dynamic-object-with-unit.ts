/**
 * the shared properties and behaviour of the DynamicNumber and DynamicVector classes
 * implements the Template Method pattern to avoid heavy code duplication
 */

import { Vector2D } from "@brendangooch/maths";
import { BaseDynamicObject } from "./base-dynamic-object.js";
import { DynamicUnit } from "./dynamic-unit.js";

export abstract class BaseDynamicObjectWithUnit extends BaseDynamicObject {

    protected unit: DynamicUnit = new DynamicUnit();
    protected _speed: number = 0;

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public speed(unitsPerMs: number): BaseDynamicObjectWithUnit {
        if (!this.isActive && unitsPerMs > 0) {
            this._speed = unitsPerMs;
        }
        return this;
    }

    public changeTo(next: number | Vector2D): number {
        if (this.canChange(next)) return this.doChange(next);
        return 0;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            unit: this.unit.save(),
            speed: this._speed
        });
    }

    public override load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.parent === undefined) return false;
        if (state.unit === undefined) return false;
        if (state.speed === undefined) return false;
        const parentLoaded = super.load(state.parent);
        this.unit.load(state.unit);
        this._speed = state.speed;
        return parentLoaded;
    }

    protected increment(ms: number): void {
        this.unit.update(ms);
    }

    protected updateComplete(): void {
        this.setAllToNext();
        this.reset();
        this.turnOff();
    }

    protected canChange(next: number | Vector2D): boolean {
        return !this.isActive && !this.nextEqualsCurrent(next);
    }

    protected doChange(next: number | Vector2D): number {
        this.setNext(next);
        this.updateDistanceBetween();
        this.updateDuration();
        if (this._duration > 0) this.dynamicChange();
        else this.instantChange();
        return this._duration;
    }

    protected updateDuration(): void {
        if (this._speed > 0 && this.distance > 0) {
            this._duration = Math.abs(this.distance / this._speed);
        }
    }

    protected instantChange(): void {
        this.setAllToNext();
    }

    // preDynamicChangeHook for Bezier child
    protected dynamicChange(): void {
        this.preDynamicChangeHook();
        this.turnOn();
        this.unit.duration(this._duration).ease(this._ease).run();
    }

    // for Bezier child to configure internal bezier curve
    protected preDynamicChangeHook(): void { }

    protected abstract override updateCurrent(): void;
    protected abstract nextEqualsCurrent(next: number | Vector2D): boolean;
    protected abstract setNext(next: number | Vector2D): void;
    protected abstract updateDistanceBetween(): void;
    protected abstract get distance(): number;
    protected abstract setAll(n: number | Vector2D): void;
    protected abstract setAllToNext(): void;

    protected reset(): void {
        this._speed = 0;
        this._duration = 0;
        this._ease = 'noEase';
    }

}