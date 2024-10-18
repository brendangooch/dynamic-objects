/**
 * most of the functionality is conveniently inherited from the DynamicUnit property
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic } from "./index.js";

export class DynamicNumber implements iDynamic {

    public get isActive(): boolean {
        return false;
    }

    public get current(): number {
        return 0;
    }

    public changeTo(x: number, y: number): DynamicNumber {
        return this;
    }

    public changeBy(x: number, y: number): DynamicNumber {
        return this;
    }

    public setDuration(ms: number): DynamicNumber {
        return this;
    }

    public setSpeed(units: number): DynamicNumber {
        return this;
    }

    public setEase(easeOption: tEaseOption): DynamicNumber {
        return this;
    }

    public run(): boolean {
        return false;
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

};



// import * as Ease from '@brendangooch/ease';
// import { DynamicUnit } from '../unit/dynamic-unit.js';
// import { iDynamicNumber } from '../index.js';

// export class DynamicNumber implements iDynamicNumber {

//     private unit: DynamicUnit;
//     private previous: number = 0;
//     private next: number = 0;
//     private isOn: boolean = false;

//     public constructor(initial: number = 0) {
//         this.unit = new DynamicUnit();
//         this.setBoth(initial);
//     }

//     public get isActive(): boolean {
//         // return this.previous !== this.next;
//         return this.unit.isActive;
//     }

//     public get current(): number {
//         return (!this.isActive) ? this.previous : this.previous + (this.diff * this.unit.current);
//     }

//     public save(): string {
//         return JSON.stringify({
//             unit: this.unit.save(),
//             previous: this.previous,
//             next: this.next,
//             isOn: this.isOn
//         });
//     }

//     public load(json: string): void {
//         const state = JSON.parse(json);
//         if (state.unit === undefined) throw new Error('missing "unit" property');
//         if (state.previous === undefined) throw new Error('missing "previous" property');
//         if (state.next === undefined) throw new Error('missing "next" property');
//         if (state.isOn === undefined) throw new Error('missing "isOn" property');
//         this.unit.load(state.unit);
//         this.previous = state.previous;
//         this.next = state.next;
//         this.isOn = state.isOn;
//     }

//     public update(ms: number): void {
//         if (this.isOn && this.isActive) {
//             this.unit.update(ms);
//             if (!this.isActive) this.updateComplete();
//         }
//     }

//     public turnOn(): void {
//         this.isOn = true;
//     }

//     public turnOff(): void {
//         this.isOn = false;
//     }

//     public change(to: number, duration: number = 0, easeOption: Ease.tEaseOption = 'noEase'): void {
//         if (this.canChange(to, duration)) this.doChange(to, duration, easeOption);
//     }

//     private canChange(to: number, duration: number): boolean {
//         return !this.isActive && duration >= 0 && to !== this.current;
//     }

//     private doChange(to: number, duration: number, easeOption: Ease.tEaseOption): void {
//         (duration === 0) ? this.instantChange(to) : this.dynamicChange(to, duration, easeOption);
//     }

//     private instantChange(to: number): void {
//         this.setBoth(to);
//     }

//     private dynamicChange(to: number, duration: number, easeOption: Ease.tEaseOption): void {
//         this.next = to;
//         this.turnOn();
//         this.unit.run(duration, easeOption);
//     }

//     private get diff(): number {
//         return this.next - this.previous;
//     }

//     private updateComplete(): void {
//         this.setBoth(this.next);
//         this.turnOff();
//     }

//     private setBoth(value: number): void {
//         this.previous = this.next = value;
//     }

// }