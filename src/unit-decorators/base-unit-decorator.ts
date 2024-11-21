/**
 * the base class that all unit decorators inherit from
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iDynamicUnit } from "../types/i-dynamic-unit.js";

export abstract class BaseUnitDecorator implements iDynamicUnit {

    protected unit: iDynamicUnit;

    public constructor(unit: iDynamicUnit) {
        this.unit = unit;
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get current(): number {
        return this.unit.current;
    }

    public turnOn(): void {
        this.unit.turnOn();
    }

    public turnOff(): void {
        this.unit.turnOff();
    }

    public save(): string {
        return this.unit.save();
    }

    public load(json: string): void {
        this.unit.load(json);
    }

    public update(ms: number): void {
        this.unit.update(ms);
    }

    public duration(ms: number): iDynamicUnit {
        return this.unit.duration(ms);
    }

    public ease(easeOption: tEaseOption): iDynamicUnit {
        return this.unit.ease(easeOption);
    }

    public start(): void {
        this.unit.start();
    }

    public stop(): void {
        this.unit.stop();
    }

    public clone(): iDynamicUnit {
        return this.unit.clone();
    }

}