/**
 * the basic properties and behaviour of all dynamic objects in the package, excluding those that aggregate other dyanmic objects
 * implements the Template Method Pattern to avoid heavy code duplication
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic } from "./index.js";

export abstract class BaseDynamicObject implements iDynamic {

    protected isOn: boolean = false;
    protected _duration: number = 0;
    protected _ease: tEaseOption = 'noEase';

    public abstract get isActive(): boolean;

    // might need to remove this if client code complains about the type
    public abstract get current(): number | { x: number; y: number } | string;

    public duration(ms: number): void {
        if (!this.isActive && ms > 0) this._duration = ms;
    }

    public ease(easeOption: tEaseOption): void {
        if (!this.isActive) this._ease = easeOption;
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
            easeOption: this._ease
        });
    }

    public load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.isOn === undefined) return false;
        if (state.duration === undefined) return false;
        if (state.easeOption === undefined) return false;
        this.isOn = state.isOn;
        this._duration = state.duration;
        this._ease = state.easeOption;
        return true;
    }

    protected abstract increment(ms: number): void;
    protected abstract updateCurrent(): void;
    protected abstract updateComplete(): void;

}