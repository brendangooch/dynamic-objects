/**
 * 
 * represents a rgb color that can change instantly or dynamically over time
 * used by GameTimer to change color from green to red as time runs out
 * 
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iDynamicObject } from "../index.js";

export class DynamicColor {

    public get current(): string {
        return '';
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


    public duration(ms: number): DynamicColor {
        return this;
    }

    public ease(ease: tEaseOption): DynamicColor {
        return this;
    }

    public onComplete(fn: Function): DynamicColor {
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
// import { DynamicColor } from "../number/dynamic-number.js";
// import { clamp } from "@brendangooch/maths";

// export class DynamicColor extends BaseDynamicObject {

//     private red: DynamicColor = new DynamicColor();
//     private green: DynamicColor = new DynamicColor();
//     private blue: DynamicColor = new DynamicColor();
//     private colors: DynamicColor[] = [this.red, this.green, this.blue];
//     private currentColor: string = '';

//     public constructor(r: number, g: number, b: number) {
//         super();
//         r = clamp(r, 0, 255);
//         g = clamp(g, 0, 255);
//         b = clamp(b, 0, 255);
//         this.currentColor = this.makeColorString(r, g, b);
//     }

//     public get isActive(): boolean {
//         return this.colors.some(color => color.isActive);
//     }

//     public get current(): string {
//         return this.currentColor;
//     }

//     public override save(): string {
//         return JSON.stringify({
//             parent: super.save(),
//             red: this.red.save(),
//             green: this.green.save(),
//             blue: this.blue.save(),
//             current: this.currentColor
//         });
//     }

//     public override load(json: string): void {
//         const state = JSON.parse(json);
//         super.load(state.parent);
//         this.red.load(state.red);
//         this.green.load(state.green);
//         this.blue.load(state.blue);
//         this.currentColor = state.current;
//     }

//     public override getDuration(): number {
//         return Math.max(this.red.getDuration(), this.green.getDuration(), this.blue.getDuration());
//     }

//     public override duration(ms: number): DynamicColor {
//         this.colors.forEach(color => color.duration(ms));
//         return this;
//     }

//     public override speed(unitsPerMS: number): DynamicColor {
//         this.colors.forEach(color => color.speed(unitsPerMS));
//         return this;
//     }

//     public override ease(easeOption: tEaseOption): DynamicColor {
//         this.colors.forEach(color => color.ease(easeOption));
//         return this;
//     }

//     public next(r: number, g: number, b: number): DynamicColor {
//         if (!this.isActive) {
//             r = clamp(r, 0, 255);
//             g = clamp(g, 0, 255);
//             b = clamp(b, 0, 255);
//             this.red.next(r);
//             this.green.next(g);
//             this.blue.next(b);
//         }
//         return this;
//     }

//     public change(): void {
//         if (!this.isActive) {
//             this.colors.forEach(color => color.change());
//             this.updateCurrent(); // <-- instant change updates current color immediately
//         }
//     }

//     public stop(): void {
//         this.colors.forEach(color => color.stop());
//         this.reset();
//     }

//     protected increment(ms: number): void {
//         this.colors.forEach(color => color.update(ms));
//         this.updateCurrent();
//     }

//     private updateCurrent(): void {
//         this.currentColor = this.makeColorString(this.red.rounded, this.green.rounded, this.blue.rounded);
//     }

//     private makeColorString(r: number, g: number, b: number): string {
//         return `rgb(${r},${g},${b})`;
//     }

// }