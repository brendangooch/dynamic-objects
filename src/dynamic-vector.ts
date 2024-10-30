/**
 * a vector that changes its position over time
 */

import { tEaseOption } from "@brendangooch/ease";
import { BaseDynamicObjectWithUnit } from "./base-dynamic-object-with-unit.js";
import { Vector2D } from "@brendangooch/maths";
import { tPosition } from "./index.js";

export class DynamicVector extends BaseDynamicObjectWithUnit {

    protected previous: Vector2D = new Vector2D();
    protected next: Vector2D = new Vector2D();
    private distanceBetween: Vector2D = new Vector2D();
    protected currentValue: Vector2D = new Vector2D();

    public constructor(initial: Vector2D = new Vector2D(0, 0)) {
        super();
        this.setAll(initial);
    }

    public get current(): tPosition {
        return {
            x: this.currentValue.x,
            y: this.currentValue.y
        };
    }

    public override duration(ms: number): DynamicVector {
        super.duration(ms);
        return this;
    }

    public override speed(unitsPerMs: number): DynamicVector {
        super.speed(unitsPerMs);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicVector {
        super.ease(easeOption);
        return this;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            previous: this.previous.save(),
            next: this.next.save(),
            distanceBetween: this.distanceBetween.save(),
            currentValue: this.currentValue.save()
        });
    }

    public override load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.parent === undefined) return false;
        if (state.previous === undefined) return false;
        if (state.next === undefined) return false;
        if (state.distanceBetween === undefined) return false;
        if (state.currentValue === undefined) return false;
        const parentLoaded = super.load(state.parent);
        this.previous.load(state.previous);
        this.next.load(state.next);
        this.distanceBetween.load(state.distanceBetween);
        this.currentValue.load(state.currentValue);
        return parentLoaded;
    }

    // bezier overrides
    protected setAll(v: Vector2D): void {
        this.previous.copy(v);
        this.next.copy(v);
        this.currentValue.copy(v);
        this.updateDistanceBetween();
    }

    protected setAllToNext(): void {
        this.setAll(this.next);
    }

    // bezier overrides
    protected updateCurrent(): void {
        this.currentValue = this.previous.add(this.distanceBetween.multiply(this.unit.current));
    }

    protected nextEqualsCurrent(next: Vector2D): boolean {
        return next.equals(this.currentValue);
    }

    protected setNext(next: Vector2D): void {
        this.next.copy(next);
    }

    protected updateDistanceBetween(): void {
        this.distanceBetween = this.next.subtract(this.previous);
    }

    protected get distance(): number {
        return this.distanceBetween.length;
    }

}