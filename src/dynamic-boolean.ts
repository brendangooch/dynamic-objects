/**
 * simple dynamic boolean value utilising setInterval to toggle between true and false continuously or for a given duration
 * no ease effect for the time-being (haven't worked out how to implement)
 */

import { BaseDynamicObject } from "./base-dynamic-object.js";

export class DynamicBoolean extends BaseDynamicObject {

    private elapsed: number = 0;
    private currentValue: boolean;
    private speed: number = 0; // speed of interval, NOT distance / duration
    private intervalID: number = 0;

    public constructor(initial: boolean) {
        super();
        this.currentValue = initial;
    }

    public get isActive(): boolean {
        return this.elapsed !== this._duration;
    }

    public get current(): boolean {
        return this.currentValue;
    }

    public override duration(ms: number): DynamicBoolean {
        super.duration(ms);
        this.elapsed = ms; // so object doesn't become active
        return this;
    }

    public true(): void {
        this.stop();
        this.currentValue = true;
    }

    public false(): void {
        this.stop();
        this.currentValue = false;
    }

    public start(speed: number): void {
        if (this._duration > 0 && !this.isActive) {
            this.elapsed = 0;
            this.turnOn();
        }
        this.speed = speed;
        this.doStart();
    }

    public stop(): void {
        this.doStop();
        this.turnOff();
        this.reset();
    }

    public override load(json: string): boolean {
        this.stop(); // will restart below if was on when saved
        const state = JSON.parse(json);
        if (state.parent === undefined) return false;
        if (state.elapsed === undefined) return false;
        if (state.currentValue === undefined) return false;
        if (state.speed === undefined) return false;
        if (state.intervalID === undefined) return false;
        const parentLoaded = super.load(state.parent);
        this.elapsed = state.elapsed;
        this.currentValue = state.currentValue;
        this.speed = state.speed;
        this.intervalID = state.intervalID;
        if (this.intervalID !== 0) this.doStart();
        return parentLoaded;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            elapsed: this.elapsed,
            currentValue: this.currentValue,
            speed: this.speed,
            intervalID: this.intervalID
        });
    }

    protected increment(ms: number): void {
        this.elapsed += ms;
        this.elapsed = Math.min(this.elapsed, this._duration);
    }

    // no implementation required
    protected updateCurrent(): void { }

    protected updateComplete(): void {
        this.stop();
    }

    private toggleCurrent(): void {
        this.currentValue = !this.currentValue;
    }

    private reset(): void {
        this._duration = 0;
        this.elapsed = 0;
    }

    private doStart(): void {
        this.intervalID = window.setInterval(this.toggleCurrent, this.speed);
    }

    private doStop(): void {
        clearInterval(this.intervalID);
        this.intervalID = 0;
    }


}