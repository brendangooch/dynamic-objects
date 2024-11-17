/**
 * represents a unit of 0 - 1 changing over time
 */

import type { iDynamic, tStopOption } from '../index.js';
import { type tEaseOption, type tEaseFunction, load as loadEase } from '@brendangooch/ease';
import { BaseDynamicObject } from '../base-dynamic-object.js';

export interface iDynamicUnit extends iDynamic {
    get current(): number;
    duration(ms: number): iDynamicUnit;
    ease(easeOption: tEaseOption): iDynamicUnit;
    stop(option: tStopOption): void;
    run(): boolean;
    clone(): iDynamicUnit;
}

export class DynamicUnit extends BaseDynamicObject implements iDynamicUnit {

    private elapsed: number = 0;
    private currentValue: number = 0;
    private easeFn: tEaseFunction = loadEase('noEase');

    public get isActive(): boolean {
        return this.elapsed !== this._duration;
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

    public override load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.parent === undefined) return false;
        if (state.elapsed === undefined) return false;
        if (state.currentValue === undefined) return false;
        const parentLoaded = super.load(state.parent);
        this.elapsed = state.elapsed;
        this.currentValue = state.currentValue;
        this.loadEase(this._easeOption); // correct this.easeOption should be loaded by prior super.load() call
        return parentLoaded;
    }

    public override duration(ms: number): iDynamicUnit {
        if (!this.isActive && ms > 0) {
            super.duration(ms);
            this.elapsed = ms; // so unit isn't 'activated'
        }
        return this;
    }

    public override ease(easeOption: tEaseOption): iDynamicUnit {
        super.ease(easeOption);
        return this;
    }

    public run(): boolean {
        if (!this.isActive && this._duration > 0) {
            this.loadEase(this._easeOption);
            this.elapsed = 0; // makes active
            this.turnOn();
            return true;
        }
        return false;
    }

    public clone(): iDynamicUnit {
        const unit = new DynamicUnit();
        unit.duration(this._duration).ease(this._easeOption);
        return unit;
    }

    protected increment(ms: number): void {
        this.elapsed += ms;
        this.elapsed = Math.min(this.elapsed, this._duration);
    }

    protected updateCurrent(): void {
        this.currentValue = this.easeFn(this.progress);
    }

    protected override stopHook(): void {
        this.currentValue = 0;
        this.elapsed = 0;
    }

    protected override resetHook(): void {
        this.elapsed = 0;
    }

    private get progress(): number {
        return (this._duration === 0) ? 0 : this.elapsed / this._duration;
    }

    private loadEase(easeOption: tEaseOption): void {
        this.easeFn = loadEase(easeOption);
    }

}