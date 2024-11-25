/**
 * 
 * represents an angle in radians from -infinity to infinity that can change instantly or dynamically over time
 * used by DynamicRectangle to set its rotation 
 * basically a DynamicRotation wrapped in a class that can add spins to the next value to simulate spin THEN removes the spin once update complete
 * 
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iDynamicObject } from "../index.js";

export class DynamicRotation {

    public get current(): number {
        return 0;
    }

    public get isActive(): boolean {
        return false;
    }

    public get isComplete(): boolean {
        return false;
    }

    public get isRunning(): boolean {
        return false;
    }

    public get isOn(): boolean {
        return false;
    }

    public turnOn(): void {

    }

    public turnOff(): void {

    }

    public load(json: string): void {
        if (!this.isOn) {
            //
        }
    }

    public save(): string {
        if (!this.isOn) {
            //
        }
        return '';
    }

    public start(): void {
        if (this.isOn) {
            //
        }
    }

    public stop(): void {
        if (this.isOn) {
            //
        }
    }

    public pause(): void {
        if (this.isOn) {
            //
        }
    }


    public duration(ms: number): DynamicRotation {
        return this;
    }

    public ease(ease: tEaseOption): DynamicRotation {
        return this;
    }

    public onComplete(fn: Function): DynamicRotation {
        return this;
    }


    public update(ms: number): void {
        //
    }

    public tick(): void {
        //
    }

    public stepForwards(): void {
        //
    }

    public stepBackwards(): void {
        //
    }

    public complete(): void {
        //
    }

    public rewind(): void {
        //
    }

    public runRate(speed: number): void {
        if (this.isOn && !this.isRunning) {
            //
        }
    }

    public speedUp(): void {
        if (this.isOn) {
            //
        }
    }

    public slowDown(): void {
        if (this.isOn) {
            //
        }
    }

    public normalSpeed(): void {
        if (this.isOn) {
            //
        }
    }

}

// import type { tEaseOption } from "@brendangooch/ease";
// import { BaseDynamicObject } from "../base-dynamic-object.js";
// import { DynamicRotation } from "../number/dynamic-number.js";

// export class DynamicRotation extends BaseDynamicObject {

//     private static TAU: number = Math.PI * 2;

//     private rotation: DynamicRotation;
//     private spin: number = 0;

//     public constructor(initial: number = 0) {
//         super();
//         this.rotation = new DynamicRotation(initial);
//     }

//     public get isActive(): boolean {
//         return this.rotation.isActive;
//     }

//     public get current(): number {
//         return this.rotation.current;
//     }

//     public override save(): string {
//         return JSON.stringify({
//             parent: super.save(),
//             rotation: this.rotation.save(),
//             spin: this.spin
//         });
//     }

//     public override load(json: string): void {
//         const state = JSON.parse(json);
//         super.load(state.parent);
//         this.rotation.load(state.rotation);
//         this.spin = state.spin;
//     }

//     public override getDuration(): number {
//         return this.rotation.getDuration();
//     }

//     public override duration(ms: number): DynamicRotation {
//         this.rotation.duration(ms);
//         return this;
//     }

//     public override speed(unitsPerMS: number): DynamicRotation {
//         this.rotation.speed(unitsPerMS);
//         return this;
//     }

//     public override ease(easeOption: tEaseOption): DynamicRotation {
//         this.rotation.ease(easeOption);
//         return this;
//     }

//     public next(rotation: number, spins: number = 0): DynamicRotation {
//         if (!this.isActive) {
//             this.spin = spins * DynamicRotation.TAU;
//             this.rotation.next(rotation + this.spin);
//         }
//         return this;
//     }

//     public rotate(): void {
//         if (!this.isActive) {
//             this.rotation.change();
//         }
//     }

//     public stop(): void {
//         this.rotation.stop();
//         this.spin = 0;
//     }

//     protected increment(ms: number): void {
//         this.rotation.update(ms);
//     }

//     protected override postUpdateComplete(): void {
//         this.removeSpin();
//     }

//     private removeSpin(): void {
//         if (this.spin !== 0) {
//             this.rotation.next(this.current - this.spin).change();
//             this.spin = 0;
//         }
//     }

// }