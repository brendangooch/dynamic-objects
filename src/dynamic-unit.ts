/**
 * represents a unit of 0 - 1 changing over time
 */

import * as Ease from '@brendangooch/ease';
import { BaseDynamicObject } from './base-dynamic-object.js';
import { iDynamicUnit } from './index.js';

export class DynamicUnit extends BaseDynamicObject implements iDynamicUnit {

    private elapsed: number = 0;
    private currentValue: number = 0;
    private easeFn: Ease.tEaseFunction = Ease.load('noEase');

    public get isActive(): boolean {
        return this.elapsed !== this._duration;
    }

    public get current(): number {
        return this.currentValue;
    }

    public override duration(ms: number): DynamicUnit {
        if (!this.isActive && ms > 0) {
            super.duration(ms);
            this.elapsed = ms; // so unit isn't 'activated'
        }
        return this;
    }

    public override ease(easeOption: Ease.tEaseOption): DynamicUnit {
        super.ease(easeOption);
        return this;
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
        this.loadEase(this.easeOption); // correct this.easeOption should be loaded by prior super.load() call
        return parentLoaded;
    }

    public run(): boolean {
        if (!this.isActive && this._duration > 0) {
            this.loadEase(this.easeOption);
            this.elapsed = 0; // makes active
            this.turnOn();
            return true;
        }
        return false;
    }

    public clone(): DynamicUnit {
        const unit = new DynamicUnit();
        unit.duration(this._duration).ease(this.easeOption);
        return unit;
    }

    protected increment(ms: number): void {
        this.elapsed += ms;
        this.elapsed = Math.min(this.elapsed, this._duration);
    }

    protected updateCurrent(): void {
        this.currentValue = this.easeFn(this.progress);
    }

    protected updateComplete(): void {
        this.currentValue = 1;
        this.reset();
        this.turnOff();
    }

    private get progress(): number {
        return (this._duration === 0) ? 0 : this.elapsed / this._duration;
    }

    private loadEase(easeOption: Ease.tEaseOption): void {
        this.easeOption = easeOption;
        this.easeFn = Ease.load(easeOption);
    }

    private reset(): void {
        this._duration = 0;
        this.elapsed = 0;
        this.loadEase('noEase');
    }

}