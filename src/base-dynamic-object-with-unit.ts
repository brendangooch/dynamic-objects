/**
 * common properties and functionality shared by all dynamic objects with an internal unit
 */

import { tEaseOption } from "@brendangooch/ease";
import { BaseDynamicObject } from "./base-dynamic-object.js";
import { DynamicUnit } from "./dynamic-unit.js";

export abstract class BaseDynamicObjectWithUnit extends BaseDynamicObject {

    protected unit: DynamicUnit = new DynamicUnit();
    protected dur: number = 0;
    protected spd: number = 0;

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public duration(ms: number): void {
        if (!this.isActive && ms > 0) {
            this.dur = ms;
        }
    }

    public speed(unitsPerMs: number): void {
        if (!this.isActive && unitsPerMs > 0) {
            this.spd = unitsPerMs;
        }
    }

    public ease(easeOption: tEaseOption): void {
        if (!this.isActive) {
            this.unit.ease(easeOption);
        }
    }

    protected increment(ms: number): void {
        this.unit.update(ms);
    }

    // only update duration if speed property has been set (not 0)
    // diff must be positive or will be divide by 0 error
    protected updateDuration(): void {
        if (this.spd !== 0 && this.diff > 0) this.dur = Math.abs(this.diff / this.spd);
    }

    protected abstract get diff(): number;

}