/**
 * represents a unit of 0 - 1 changing over time
 */

import { type tEaseFunction, type tEaseOption, load as loadEase } from "@brendangooch/ease";
import type { iDynamicUnit } from "../types/i-dynamic-unit.js";
import { BaseDynamicObject } from "../base-dynamic-object.js";

export class DynamicUnit extends BaseDynamicObject implements iDynamicUnit {

    private elapsed: number = 0;
    private currentValue: number = 0;
    private easeFn: tEaseFunction = loadEase(this.properties.ease);

    public get isActive(): boolean {
        return this.elapsed !== this.properties.duration;
    }

    public get current(): number {
        return this.currentValue;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            elapsed: this.elapsed,
            currentValue: this.currentValue
        });
    }

    public override load(json: string): void {
        const state = JSON.parse(json);
        super.load(state.parent);
        this.elapsed = state.elapsed;
        this.currentValue = state.currentValue;
        this.easeFn = loadEase(this.properties.ease);
    }

    public override duration(ms: number): iDynamicUnit {
        if (!this.isActive && ms > 0) {
            super.duration(ms);
            this.elapsed = ms;
        }
        return this;
    }

    public override ease(easeOption: tEaseOption): iDynamicUnit {
        if (!this.isActive) {
            super.ease(easeOption);
            this.easeFn = loadEase(easeOption);
        }
        return this;
    }

    public start(): void {
        if (!this.isActive && this.properties.duration > 0) {
            this.currentValue = 0;
            this.elapsed = 0;
        }
    }

    public stop(): void {
        this.reset();
    }

    public clone(): iDynamicUnit {
        const clone = new DynamicUnit();
        clone.duration(this.properties.duration).ease(this.properties.ease);
        return clone;
    }

    protected increment(ms: number): void {
        this.elapsed += ms;
        this.elapsed = Math.min(this.elapsed, this.properties.duration);
        this.updateCurrent();
    }

    protected updateCurrent(): void {
        this.currentValue = (this.elapsed === 0) ? 0 : this.easeFn(this.elapsed / this.properties.duration);
    }

    protected override postUpdateComplete(): void {
        this.currentValue = 1;
    }

    protected override postReset(): void {
        this.elapsed = 0;
    }

}