/**
 *
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic } from "./index.js";

export class DynamicPath implements iDynamic {

    public get isActive(): boolean {
        return false;
    }

    public get x(): number {
        return 0;
    }

    public get y(): number {
        return 0;
    }

    public moveTo(x: number, y: number): DynamicPath {
        return this;
    }

    public moveBy(x: number, y: number): DynamicPath {
        return this;
    }

    public setDuration(ms: number): DynamicPath {
        return this;
    }

    public setSpeed(pixels: number): DynamicPath {
        return this;
    }

    public setEase(easeOption: tEaseOption): DynamicPath {
        return this;
    }

    public run(): boolean {
        return false;
    }

    public turnOn(): void { }

    public turnOff(): void { }

    public update(ms: number): void { }

    public load(json: string): boolean {
        return false;
    }

    public save(): string {
        return '';
    }

}

// import { tEaseOption } from "@brendangooch/ease";
// import { DynamicUnit } from "../unit/dynamic-unit.js";
// import { Vector2D } from "@brendangooch/maths";
// import { iDynamicPath } from "../index.js";

// export class DynamicPath implements iDynamicPath {

//     private unit: DynamicUnit;
//     private previous = new Vector2D();
//     private next = new Vector2D();
//     private current = new Vector2D();
//     private difference = new Vector2D();
//     private isOn: boolean = false;

//     public constructor(x: number = 0, y: number = 0) {
//         this.unit = new DynamicUnit();
//         this.setAll(x, y);
//     }

//     get isActive(): boolean {
//         return this.unit.isActive;
//     }

//     public get x(): number {
//         return this.current.x;
//     }

//     public get y(): number {
//         return this.current.y;
//     }

//     public turnOn(): void {
//         this.isOn = true;
//     }

//     public turnOff(): void {
//         this.isOn = false;
//     }

//     public save(): string {
//         return JSON.stringify({
//             unit: this.unit.save(),
//             previous: this.previous.save(),
//             next: this.next.save(),
//             current: this.current.save(),
//             difference: this.difference.save(),
//             isOn: this.isOn
//         });
//     }

//     public load(json: string): void {
//         const state = JSON.parse(json);
//         if (state.unit === undefined) throw new Error('missing "unit" property');
//         if (state.previous === undefined) throw new Error('missing "previous" property');
//         if (state.next === undefined) throw new Error('missing "next" property');
//         if (state.current === undefined) throw new Error('missing "current" property');
//         if (state.difference === undefined) throw new Error('missing "difference" property');
//         if (state.isOn === undefined) throw new Error('missing "isOn" property');
//         this.unit.load(state.unit);
//         this.previous.load(state.previous);
//         this.next.load(state.next);
//         this.current.load(state.current);
//         this.difference.load(state.difference);
//         this.isOn = state.isOn;
//     }

//     public update(ms: number): void {
//         if (this.isOn && this.isActive) {
//             this.unit.update(ms);
//             this.updateCurrent();
//             if (!this.unit.isActive) this.updateComplete();
//         }
//     }

//     public moveTo(x: number, y: number, duration: number = 0, easeOption: tEaseOption = 'noEase'): void {
//         if (this.canMove(x, y, duration)) this.doMove(x, y, duration, easeOption);
//     }

//     private setAll(x: number, y: number): void {
//         this.previous.setXY(x, y);
//         this.next.setXY(x, y);
//         this.current.setXY(x, y);
//         this.updateDifference();
//     }

//     private updateDifference(): void {
//         this.difference = this.next.subtract(this.previous)
//     }

//     private updateCurrent(): void {
//         this.current = this.previous.add(this.difference.multiply(this.unit.current));
//     }

//     private updateComplete(): void {
//         this.setAll(this.next.x, this.next.y);
//         this.turnOff();
//     }

//     private canMove(x: number, y: number, duration: number): boolean {
//         return !this.isActive && duration >= 0 && (x !== this.current.x || y !== this.current.y);
//     }

//     private doMove(x: number, y: number, duration: number, easeOption: tEaseOption): void {
//         (duration === 0) ? this.instantMove(x, y) : this.dynamicMove(x, y, duration, easeOption);
//     }

//     private instantMove(x: number, y: number): void {
//         this.setAll(x, y);
//     }

//     private dynamicMove(x: number, y: number, duration: number, easeOption: tEaseOption): void {
//         this.next.setXY(x, y);
//         this.updateDifference();
//         this.turnOn();
//         this.unit.run(duration, easeOption);
//     }

// }