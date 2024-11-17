/**
 * a number that changes its value over time
 */

import type { tEaseOption } from "@brendangooch/ease";
import { DynamicUnit } from "../unit/dynamic-unit.js";
import { BaseDynamicObject } from "../base-dynamic-object.js";

export class DynamicNumber extends BaseDynamicObject {

    private unit: DynamicUnit;
    private currentValue: number = 0;
    private previousValue: number = 0;
    private nextValue: number = 0;

    public constructor(initial: number = 0) {
        super();
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get current(): number {
        return this.currentValue;
    }

    public get rounded(): number {
        return Math.round(this.current);
    }

    public override save(): string {
        return '';
    }

    public override load(json: string): void { }

    public override duration(ms: number): DynamicNumber {
        return this;
    }

    public override speed(unitsPerMS: number): DynamicNumber {
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicNumber {
        return this;
    }

    // 
    public next(n: number): DynamicNumber {
        return this;
    }

    // 
    public change(): boolean {
        return false;
    }

    // 
    public stop(): void { }

    // 
    public rewind(): void { }

    // 
    public complete(): void { }

    // abstract parent methods
    protected override increment(ms: number): void {
        this.unit.update(ms);
        this.updateCurrent();
    }

    // private methods
    private updateCurrent(): void {
        //
    }

    // hooks


}