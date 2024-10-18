/**
 * represents a unit of 0 - 1 changing over time
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamicUnit } from "./index.js";

export class DynamicUnit implements iDynamicUnit {

    public get isActive(): boolean {
        return false;
    }

    public get current(): number {
        return 0;
    }

    public setDuration(ms: number): DynamicUnit {
        return this;
    }

    public setEase(easeOption: tEaseOption): DynamicUnit {
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

}


// import * as Ease from '@brendangooch/ease';
// import { clamp } from '@brendangooch/maths';
// import { iDynamicUnit } from '../index.js';

// export class DynamicUnit implements iDynamicUnit {

//     private elapsed: number = 0;
//     private duration: number = 0;
//     private easeOption: Ease.tEaseOption = 'noEase';
//     private easeFn: Ease.tEaseFunction = Ease.noEase;
//     private isOn: boolean = false;

//     public get isActive(): boolean {
//         return this.elapsed !== this.duration;
//     }

//     public get current(): number {
//         return clamp(this.easeFn(this.progress), 0, 1);
//     }

//     public turnOn(): void {
//         this.isOn = true;
//     }

//     public turnOff(): void {
//         this.isOn = false;
//     }

//     public save(): string {
//         return JSON.stringify({
//             elapsed: this.elapsed,
//             duration: this.duration,
//             easeOption: this.easeOption,
//             isOn: this.isOn
//         });
//     }

//     public load(json: string): void {
//         const state = JSON.parse(json);
//         if (state.elapsed === undefined) throw new Error('missing "elapsed" property');
//         if (state.duration === undefined) throw new Error('missing "duration" property');
//         if (state.easeOption === undefined) throw new Error('missing "ease" property');
//         if (state.isOn === undefined) throw new Error('missing "on" property');
//         this.elapsed = state.elapsed;
//         this.duration = state.duration;
//         this.loadEase(state.easeOption);
//         this.isOn = state.isOn;
//     }

//     public update(ms: number): void {
//         if (this.isOn && this.isActive) {
//             this.increment(ms);
//             if (!this.isActive) this.turnOff();
//         }
//     }

//     public run(duration: number, easeOption: Ease.tEaseOption = 'noEase'): void {
//         if (!this.isActive && duration >= 0) {
//             this.duration = duration;
//             this.loadEase(easeOption);
//             this.elapsed = 0;
//             this.turnOn();
//         }
//     }

//     private get progress(): number {
//         return (this.duration === 0) ? 0 : this.elapsed / this.duration;
//     }

//     private increment(ms: number): void {
//         this.elapsed += ms;
//         this.elapsed = Math.min(this.elapsed, this.duration);
//     }

//     public loadEase(easeOption: Ease.tEaseOption): void {
//         this.easeOption = easeOption;
//         this.easeFn = Ease.load(easeOption);
//     }

// };