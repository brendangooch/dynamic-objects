/**
 * 
 * a DynamicNumber with additional useful functionality
 * 
 * accepts min and max params
 * optionally round, round up or round down the output
 * 
 * additional methods:
 * changeToOriginal() - change to the initial value passed in constructor
 * changeToMax() - change to the max value passed in constructor
 * changeToMin() - change to the min value passed in constructor
 * changeToPrevious() - change to the previous value
 * 
 */

import { clamp } from "@brendangooch/maths";
import { DynamicNumber } from "./dynamic-number.js";
import { tEaseOption } from "@brendangooch/ease";

export class DynamicNumberExtended extends DynamicNumber {

    private min: number = 0;
    private max: number = 0;
    private initial: number = 0;
    private prev: number = 0;

    public constructor(initial: number, min: number, max: number) {
        super(initial);
        this.initial = initial;
        this.prev = initial;
        this.min = min;
        this.max = max;
    }

    public get rounded(): number {
        return Math.round(this.current);
    }

    public get roundedUp(): number {
        return Math.ceil(this.current);
    }

    public get roundedDown(): number {
        return Math.floor(this.current);
    }

    public override duration(ms: number): DynamicNumberExtended {
        super.duration(ms);
        return this;
    }

    public override speed(unitsPerMs: number): DynamicNumberExtended {
        super.speed(unitsPerMs);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicNumberExtended {
        super.ease(easeOption);
        return this;
    }

    public override changeTo(next: number): number {
        next = clamp(next, this.min, this.max);
        this.prev = this.current;
        return super.changeTo(next);
    }

    public changeToOriginal(): number {
        return this.changeTo(this.initial);
    }

    public changeToMax(): number {
        return this.changeTo(this.max);
    }

    public changeToMin(): number {
        return this.changeTo(this.min);
    }

    public changeToPrevious(): number {
        return this.changeTo(this.prev);
    }

    public override load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.parent === undefined) return false;
        if (state.min === undefined) return false;
        if (state.max === undefined) return false;
        if (state.initial === undefined) return false;
        if (state.prev === undefined) return false;
        const parentLoaded = super.load(state.parent);
        this.min = state.min;
        this.max = state.max;
        this.initial = state.initial;
        this.prev = state.prev;
        return parentLoaded;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            min: this.min,
            max: this.max,
            initial: this.initial,
            prev: this.prev
        });
    }

}