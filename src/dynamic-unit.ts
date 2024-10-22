/**
 * represents a unit of 0 - 1 changing over time
 */

import * as Ease from '@brendangooch/ease';
import { iDynamicUnit } from "./index.js";
import { clamp } from "@brendangooch/maths";
import { AbstractDynamicObject } from './abstract-dynamic-object.js';

type tDuration = { current: number; next: number };

export class DynamicUnit extends AbstractDynamicObject implements iDynamicUnit {

    private elapsed: number = 0;
    private _current: number = 0;
    private _duration: tDuration = { current: 0, next: 0 };
    private easeOption: Ease.tEaseOption = 'noEase';
    private easeFn: Ease.tEaseFunction = Ease.load('noEase');

    public get isActive(): boolean {
        return this.elapsed !== this._duration.current;
    }

    // cache current rather than calculate on each call
    public get current(): number {
        return this._current;
    }

    public duration(ms: number): DynamicUnit {
        if (!this.isActive && ms > 0) {
            this._duration.next = ms;
        }
        return this;
    }

    public ease(easeOption: Ease.tEaseOption): DynamicUnit {
        if (!this.isActive) {
            this.loadEase(easeOption);
        }
        return this;
    }

    // activates and turns unit on IF not active and next duration > 0
    public run(): boolean {
        if (!this.isActive && this._duration.next > 0) {
            this._duration.current = this._duration.next;
            this.elapsed = 0;
            this.turnOn();
        }
        return false;
    }

    public load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.elapsed === undefined) return false;
        if (state.duration === undefined) return false;
        if (state.easeOption === undefined) return false;
        if (state.isOn === undefined) return false;
        this.elapsed = state.elapsed;
        this._duration = state.duration;
        this.loadEase(state.easeOption);
        this.isOn = state.isOn;
        return true;
    }

    public save(): string {
        return JSON.stringify({
            elapsed: this.elapsed,
            duration: this._duration,
            easeOption: this.easeOption,
            isOn: this.isOn
        });
    }

    private get progress(): number {
        return (this._duration.current === 0) ? 0 : this.elapsed / this._duration.current;
    }

    protected increment(ms: number): void {
        this.elapsed += ms;
        this.elapsed = Math.min(this.elapsed, this._duration.current);
    }

    // clamp prevents in/out and bounce ease effects
    // client is responsible for clamping current value
    protected updateCurrent(): void {
        // this._current = clamp(this.easeFn(this.progress), 0, 1);
        this._current = this.easeFn(this.progress);
    }

    protected updateComplete(): void {
        this._duration.next = 0;
        this._current = 1;
        this.loadEase('noEase');
        this.turnOff();
    }

    private loadEase(easeOption: Ease.tEaseOption): void {
        this.easeOption = easeOption;
        this.easeFn = Ease.load(easeOption);
    }

}