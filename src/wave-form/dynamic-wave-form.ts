/**
 * 
 */

import type { iDynamicUnit } from "../types/i-dynamic-unit.js";
import { BaseDynamicObject } from "../base-dynamic-object.js";

type tWaveForm = 'sawtooth' | 'triangle' | 'square'

export class DynamicWaveForm extends BaseDynamicObject {

    private type: tWaveForm;
    private pattern: iDynamicUnit[] = [];
    private index: 0 | 1;
    private currentUnit: iDynamicUnit;

    public constructor(type: tWaveForm) {
        super();
        this.type = type;
        this.loadPattern();
    }

    public get isActive(): boolean {
        return false;
    }

    public get current(): number {
        return 0;
    }

    public stop(): void { }
    public rewind(): void { }
    public complete(): void { }

    protected increment(ms: number): void {
        this.currentUnit.update(ms);
    }

    protected override postUpdateComplete(): void {
        this.toggleIndex();
        this.currentUnit = this.pattern[this.index].clone();
    }

    protected loadPattern(): void {
        switch (this.type) {
            //
        }
    }

    protected toggleIndex(): void {
        this.index = (this.index === 0) ? 1 : 0;
    }

}