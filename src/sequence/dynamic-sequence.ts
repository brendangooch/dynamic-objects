/**
 * a sequence of callback functions that fire at even intervals during sequence duration whilst running
 * 
 */

import type { tEaseOption } from "@brendangooch/ease";
import { BaseDynamicObject } from "../base-dynamic-object.js";
import { DynamicUnit } from "../unit/dynamic-unit.js";

export class DynamicSequence extends BaseDynamicObject {

    // the buffer (in %) at the start and end of seuqnece
    private static TIME_BUFFER: number = 0.05;

    protected unit: DynamicUnit = new DynamicUnit();
    protected onStartFn: Function | null = null;
    protected onCompleteFn: Function | null = null;
    protected times: number[] = [];
    protected callbacks: Function[] = [];

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public override duration(ms: number): DynamicSequence {
        this.unit.duration(ms);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicSequence {
        this.unit.ease(easeOption);
        return this;
    }

    public onStart(fn: Function): DynamicSequence {
        if (!this.isActive) {
            this.onStartFn = fn;
        }
        return this;
    }

    public onComplete(fn: Function): DynamicSequence {
        if (!this.isActive) {
            this.onCompleteFn = fn;
        }
        return this;
    }

    public add(fn: Function): DynamicSequence {
        if (!this.isActive) {
            this.callbacks.push(fn);
            this.updateTimes();
        }
        return this;
    }

    public run(): void {
        if (!this.isActive) {
            if (this.onStartFn) this.onStartFn();
            this.unit.start();
        }
    }

    protected increment(ms: number): void {
        this.unit.update(ms);
        this.fire();
    }

    protected fire(): void {
        if (this.times[0] !== undefined && this.times[0] <= this.unit.current) {
            this.times.shift();
            this.callbacks.shift()!();
        }
    }

    protected override postUpdateComplete(): void {
        if (this.onCompleteFn) this.onCompleteFn();
        // this should be in postReset() but method is called before postUpdateComplete() in parent
        this.times.length = 0;
        this.callbacks.length = 0;
        this.onCompleteFn = null;
        this.onStartFn = null;
    }

    private get numCallbacks(): number {
        return this.callbacks.length;
    }

    private get availableTime(): number {
        return 1 - (2 * DynamicSequence.TIME_BUFFER);
    }

    private get spaceBetween(): number {
        return this.availableTime / (this.numCallbacks + 1);
    }

    private updateTimes(): void {
        this.times.length = 0;
        for (let i = 1; i <= this.numCallbacks; i++) {
            this.times.push(DynamicSequence.TIME_BUFFER + (i * this.spaceBetween));
        }
    }

}