/**
 * abstract DynamicUnit class extended by all DynamicUnit decorators
 */

import * as Ease from '@brendangooch/ease';
import { DynamicUnit } from "./dynamic-unit.js";
import { iDynamicUnit } from "./index.js";

export abstract class BaseUnitDecorator implements iDynamicUnit {

    protected unit: DynamicUnit;

    public constructor(unit: DynamicUnit) {
        this.unit = unit;
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get current(): number {
        return this.unit.current;
    }

    public duration(ms: number): DynamicUnit {
        return this.unit.duration(ms);
    }

    public ease(easeOption: Ease.tEaseOption): DynamicUnit {
        return this.unit.ease(easeOption);
    }

    public run(): boolean {
        return this.unit.run();
    }

    public update(ms: number): void {
        this.unit.update(ms);
    }

    public load(json: string): boolean {
        return this.unit.load(json);
    }

    public save(): string {
        return this.unit.save();
    }

    public abstract clone(): iDynamicUnit;

}