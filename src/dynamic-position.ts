/**
 * aggregates vector and bezier into one class, choosing the most efficient option depending on curved or straight path
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic } from "./index.js";

export class DynamicPosition implements iDynamic {

    public get isActive(): boolean {
        return false;
    }

    public get x(): number {
        return 0;
    }

    public get y(): number {
        return 0;
    }

    public duration(ms: number): DynamicPosition {
        return this;
    }

    public speed(pixelsPerSecond: number): DynamicPosition {
        return this;
    }

    public ease(easeOption: tEaseOption): DynamicPosition {
        return this;
    }

    public addControlPoint(distance: number, angle: number): DynamicPosition {
        return this;
    }

    public moveTo(x: number, y: number): Promise<boolean> {
        return new Promise((res) => { });
    }

    public moveBy(x: number, y: number): Promise<boolean> {
        return new Promise((res) => { });
    }

    public turnOn(): void {

    }

    public turnOff(): void {

    }

    public update(ms: number): void {

    }

    public load(json: string): boolean {
        return false;
    }

    public save(): string {
        return '';
    }

}