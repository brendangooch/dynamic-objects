/**
 * 
 */

import type { tEaseOption } from "@brendangooch/ease";

type tProperties = { duration: number; speed: number; distance: number; ease: tEaseOption };

export abstract class BaseDynamicObject {

    private isOn: boolean = true;
    protected properties: tProperties = { duration: 0, speed: 0, distance: 0, ease: 'noEase' };

    abstract get isActive(): boolean;

    public turnOn(): void {
        this.isOn = true;
    }

    public turnOff(): void {
        this.isOn = false;
    }

    public save(): string {
        return JSON.stringify(this.properties);
    }

    public load(json: string): void {
        this.properties = JSON.parse(json);
    }

    public update(ms: number): void {
        if (this.isOn && this.isActive) {
            this.increment(ms);
            if (!this.isActive) this.updateComplete();
        }
    }

    public getDuration(): number {
        if (this.properties.speed > 0 && this.properties.distance > 0) return this.properties.distance / this.properties.speed;
        return this.properties.duration;
    }

    public duration(ms: number): void {
        if (!this.isActive && ms > 0) {
            this.properties.duration = ms;
        }
    }

    public speed(unitsPerMS: number): void {
        if (!this.isActive && unitsPerMS > 0) {
            this.properties.speed = unitsPerMS;
        }
    }

    public ease(easeOption: tEaseOption): void {
        if (!this.isActive) {
            this.properties.ease = easeOption;
        }
    }


    protected updateComplete(): void {
        this.reset();
        this.postUpdateComplete();
    }

    protected reset(): void {
        this.properties.duration = 0;
        this.properties.speed = 0;
        this.properties.distance = 0;
        this.properties.ease = 'noEase';
        this.postReset();
    }

    // must implement
    protected abstract increment(ms: number): void;

    // optional hooks
    protected postUpdateComplete(): void { }
    protected postReset(): void { }

}