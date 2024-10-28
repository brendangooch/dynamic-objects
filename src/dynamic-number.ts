/**
 * a number that changes its value over time
 */

import { tEaseOption } from "@brendangooch/ease";
import { BaseDynamicObjectWithUnit } from "./base-dynamic-object-with-unit.js";

export class DynamicNumber extends BaseDynamicObjectWithUnit {

    private previous: number = 0;
    private next: number = 0;
    private distanceBetween: number = 0;
    private currentValue: number = 0;

    public constructor(intitial: number = 0) {
        super();
        this.setAll(intitial);
    }

    public get current(): number {
        return this.currentValue;
    }

    public override duration(ms: number): DynamicNumber {
        super.duration(ms);
        return this;
    }

    public override speed(unitsPerMs: number): DynamicNumber {
        super.speed(unitsPerMs);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicNumber {
        super.ease(easeOption);
        return this;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            previous: this.previous,
            next: this.next,
            distanceBetween: this.distanceBetween,
            currentValue: this.currentValue
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
        this.previous = state.previous;
        this.next = state.next;
        this.distanceBetween = state.distanceBetween;
        this.currentValue = state.currentValue;
        return parentLoaded;
    }

    protected setAll(n: number): void {
        this.previous = this.next = this.currentValue = n;
        this.updateDistanceBetween();
    }

    protected setAllToNext(): void {
        this.setAll(this.next);
    }

    protected updateCurrent(): void {
        this.currentValue = this.previous + (this.distanceBetween * this.unit.current);
    }

    protected nextEqualsCurrent(next: number): boolean {
        return next === this.currentValue;
    }

    protected setNext(next: number): void {
        this.next = next;
    }

    protected updateDistanceBetween(): void {
        this.distanceBetween = this.next - this.previous;
    }

    protected get distance(): number {
        return this.distanceBetween;
    }


}