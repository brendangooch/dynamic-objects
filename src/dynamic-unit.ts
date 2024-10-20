/**
 * represents a unit of 0 - 1 changing over time
 */

import * as Ease from '@brendangooch/ease';
import { iDynamicUnit } from "./index.js";
import { clamp } from "@brendangooch/maths";

type tDuration = { current: number; next: number };

export class DynamicUnit implements iDynamicUnit {

    private _elapsed: number = 0;
    private _duration: tDuration = { current: 0, next: 0 };
    private _easeOption: Ease.tEaseOption = 'noEase';
    private _easeFn: Ease.tEaseFunction = Ease.load('noEase');
    private _isOn: boolean = false;

    public get isActive(): boolean {
        return this._elapsed !== this._duration.current;
    }

    // a lot of the time, the unit will not be "running"
    // no need to call easeFn and calculate progress on every call, only when "running"
    public get current(): number {
        if (this.notStarted) return 0;
        if (this.isComplete) return 1;
        return clamp(this._easeFn(this.progress), 0, 1);
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
            this._elapsed = 0;
            this.turnOn();
        }
        return false;
    }

    public turnOn(): void {
        this._isOn = true;
    }

    public turnOff(): void {
        this._isOn = false;
    }

    public update(ms: number): void {
        if (this._isOn && this.isActive) {
            this.increment(ms);
            if (!this.isActive) this.updateComplete();
        }
    }

    public load(json: string): boolean {
        const state = JSON.parse(json);
        if (
            state.elapsed === undefined ||
            state.duration === undefined ||
            state.easeOption === undefined ||
            state.isOn === undefined
        ) { return false };
        this._elapsed = state.elapsed;
        this._duration = state.duration;
        this.loadEase(state.easeOption);
        this._isOn = state.isOn;
        return true;
    }

    public save(): string {
        return JSON.stringify({
            elapsed: this._elapsed,
            duration: this._duration,
            easeOption: this._easeOption,
            isOn: this._isOn
        });
    }

    private get progress(): number {
        return (this._duration.current === 0) ? 0 : this._elapsed / this._duration.current;
    }

    // if elapsed === 0 then an update cycle hasn't started
    private get notStarted(): boolean {
        return this._elapsed === 0;
    }

    // if !notStarted && elapsed === duration then an update cycle has completed
    private get isComplete(): boolean {
        return !this.notStarted && this._elapsed === this._duration.current;
    }

    private increment(ms: number): void {
        this._elapsed += ms;
        this._elapsed = Math.min(this._elapsed, this._duration.current);
    }

    private updateComplete(): void {
        this._duration.next = 0;
        this.loadEase('noEase');
        this.turnOff();
    }

    public loadEase(easeOption: Ease.tEaseOption): void {
        this._easeOption = easeOption;
        this._easeFn = Ease.load(easeOption);
    }

}