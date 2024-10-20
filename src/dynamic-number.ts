/**
 * most of the functionality is conveniently inherited from the DynamicUnit property
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic } from "./index.js";
import { DynamicUnit } from "./dynamic-unit.js";

export class DynamicNumber implements iDynamic {

    private unit: DynamicUnit = new DynamicUnit(); // extract
    private previous: number = 0;
    private next: number = 0;
    private cur: number = 0; // extract
    private dur: number = 0; // extract
    private spd: number = 0; // extract
    private isOn: boolean = false; // extract

    public constructor(initial: number = 0) {
        this.setAll(initial);
    }

    // extract
    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get current(): number {
        return this.cur;
    }

    public duration(ms: number): DynamicNumber {
        if (!this.isActive && ms > 0) {
            this.dur = ms;
        }
        return this;
    }

    public speed(unitsPerMs: number): DynamicNumber {
        if (!this.isActive && unitsPerMs > 0) {
            this.spd = unitsPerMs;
        }
        return this;
    }

    public ease(easeOption: tEaseOption): DynamicNumber {
        if (!this.isActive) {
            this.unit.ease(easeOption);
        }
        return this;
    }

    public changeTo(n: number): boolean {
        if (this.canChange(n)) return this.doChange(n);
        return false;
    }

    public changeBy(n: number): boolean {
        return this.changeTo(n + this.current);
    }

    public turnOn(): void {
        this.isOn = true;
    }

    public turnOff(): void {
        this.isOn = false;
    }

    public update(ms: number): void {
        if (this.isOn && this.isActive) {
            this.unit.update(ms);
            this.updateCurrent();
            if (!this.isActive) this.updateComplete();
        }
    }

    public load(json: string): boolean {

        const state = JSON.parse(json);

        if (state.unit === undefined) return false;
        if (state.previous === undefined) return false;
        if (state.next === undefined) return false;
        if (state.current === undefined) return false;
        if (state.duration === undefined) return false;
        if (state.speed === undefined) return false;
        if (state.isOn === undefined) return false;

        this.unit.load(state.unit);
        this.previous === state.previous;
        this.next === state.next;
        this.cur === state.current;
        this.dur === state.duration;
        this.spd === state.speed;
        this.isOn === state.isOn;

        return true;

    }

    public save(): string {
        return JSON.stringify({
            unit: this.unit.save(),
            previous: this.previous,
            next: this.next,
            current: this.cur,
            duration: this.dur,
            speed: this.spd,
            isOn: this.isOn
        });
    }

    private get diff(): number {
        return this.next - this.previous;
    }

    private setAll(n: number): void {
        this.cur = this.previous = this.next = n;
    }

    private updateCurrent(): void {
        this.cur = this.previous + (this.diff * this.unit.current);
    }

    private updateComplete(): void {
        this.setAll(this.next);
        this.spd = 0;
        this.dur = 0;
        this.turnOff();
    }

    // only update duration if speed property has been set (not 0)
    // diff must be positive or divide by 0 error
    private updateDuration(): void {
        if (this.spd !== 0 && this.diff > 0) this.dur = Math.abs(this.diff / this.spd);
    }

    private canChange(n: number): boolean {
        return !this.isActive && n !== this.cur;
    }

    private doChange(n: number): boolean {
        this.next = n;
        this.updateDuration();
        if (this.dur > 0) this.dynamicChange();
        else this.instantChange();
        return true;
    }

    private instantChange(): void {
        this.setAll(this.next);
    }

    private dynamicChange(): void {
        this.turnOn();
        this.unit.duration(this.dur).run();
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