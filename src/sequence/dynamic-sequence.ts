/**
 * a sequence of timed callback functions
 * once % progress is reached, the callback is executed
 * 
 */

import { BaseDynamicObject } from "../base-dynamic-object.js";
import { DynamicUnit } from "../unit/dynamic-unit.js";
import { clamp } from "@brendangooch/maths";

type tAction = { at: number; fn: Function };
type tAtOption = number | 'start' | 'end';

export class DynamicSequence extends BaseDynamicObject {

    protected unit: DynamicUnit = new DynamicUnit();
    protected actions: tAction[] = [];
    protected atStartFn: Function | null = null;
    protected atEndFn: Function | null = null;

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public override duration(ms: number): DynamicSequence {
        if (!this.isActive && ms > 0) {
            super.duration(ms);
        }
        return this;
    }

    public at(at: tAtOption, fn: Function): DynamicSequence {
        if (!this.isActive) {
            if (at === 'start') this.atStartFn = fn;
            if (at === 'end') this.atEndFn = fn;
            if (typeof at === 'number') this.actions.push({ at: clamp(at, 0.01, 0.99), fn: fn });
        }
        return this;
    }

    public start(): void {
        if (!this.isActive) {
            if (this.atStartFn) this.atStartFn();
            this.unit.duration(this.properties.duration).start();
        }
    }

    protected increment(ms: number): void {
        this.unit.update(ms);
        this.fire();
    }

    protected fire(): void {
        const toFire = this.actions.filter(action => action.at >= this.unit.current).sort((a, b) => (a.at < b.at) ? 1 : -1)[0];
        if (toFire) toFire.fn();
    }

    protected override postUpdateComplete(): void {
        if (this.atEndFn) this.atEndFn();
    }

    protected override postReset(): void {
        this.actions.length = 0;
        this.atStartFn = null;
        this.atEndFn = null;
    }

}

// const sequence = new DynamicSequence();
// sequence
//     .at('start', () => console.log('0%'))
//     .at(0.2, () => console.log('20%'))
//     .at(0.4, () => console.log('40%'))
//     .at(0.6, () => console.log('60%'))
//     .at(0.8, () => console.log('80%'))
//     .at('end', () => console.log('100%'))
//     .duration(1000)
//     .start();

// // > 0%
// sequence.update(100);
// sequence.update(100);
// // > 20%
// sequence.update(100);
// sequence.update(100);
// // > 40%
// sequence.update(100);
// sequence.update(100);
// // > 60%
// sequence.update(100);
// sequence.update(100);
// // > 80%
// sequence.update(100);
// sequence.update(100);
// // > 100%