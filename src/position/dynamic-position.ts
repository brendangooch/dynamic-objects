/**
 * aggregates vector and bezier into one class, choosing the most efficient option depending on curved or straight path required
 *
 */

import type { tEaseOption } from "@brendangooch/ease";

export class DynamicPosition {

    public get isActive(): boolean {
        return false;
    }

    public get x(): number {
        return 0;
    }

    public get y(): number {
        return 0;
    }

    public getDuration(): number {
        return 0;
    }

    public update(ms: number): void { }

    public save(): string {
        return '';
    }

    public load(json: string): void { }

    public duration(ms: number): DynamicPosition {
        return this;
    }

    public speed(unitsPerMS: number): DynamicPosition {
        return this;
    }

    public ease(easeOption: tEaseOption): DynamicPosition {
        return this;
    }

    public next(x: number, y: number): DynamicPosition {
        return this;
    }

    // change current value from previous to next
    public change(): void { }

    // end the current transition where it is
    public stop(): void { }

    // end the current transition and set current value to previous value
    public rewind(): void { }

    // end the current transition and set current value to next value
    public complete(): void { }

    // can update when on
    public on(): void { }

    // cannot update when off
    public off(): void { }

}