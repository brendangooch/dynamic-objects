/**
 * the basic properties and behaviour of all dynamic objects in the package, excluding those that aggregate other dyanmic objects
 * implements the Template Method Pattern to avoid heavy code duplication
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic, tCurrentValue } from "./index.js";

export abstract class BaseDynamicObject implements iDynamic {

    protected _duration: number = 0;
    protected easeOption: tEaseOption = 'noEase';
    protected isOn: boolean = false;

    public abstract get isActive(): boolean;

    public abstract get current(): tCurrentValue;

    public duration(ms: number): void {
        if (!this.isActive && ms > 0) this._duration = ms;
    }

    public ease(easeOption: tEaseOption): void {
        if (!this.isActive) this.easeOption = easeOption;
    }

    public turnOn(): void {
        this.isOn = true;
    }

    public turnOff(): void {
        this.isOn = false;
    }

    public update(ms: number): void {
        if (this.isOn && this.isActive) {
            this.increment(ms);
            this.updateCurrent();
            if (!this.isActive) this.updateComplete();
        }
    }

    public save(): string {
        return JSON.stringify({
            isOn: this.isOn,
            duration: this._duration,
            easeOption: this.easeOption
        });
    }

    public load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.isOn === undefined) return false;
        if (state.duration === undefined) return false;
        if (state.easeOption === undefined) return false;
        this.isOn = state.isOn;
        this._duration = state.duration;
        this.easeOption = state.easeOption;
        return true;
    }

    protected abstract increment(ms: number): void;
    protected abstract updateCurrent(): void;
    protected abstract updateComplete(): void;

}