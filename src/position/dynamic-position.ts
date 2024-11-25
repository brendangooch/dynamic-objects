/**
 * aggregates vector and bezier into one class, choosing the most efficient option depending on curved or straight path required
 *
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iDynamicObject } from "../index.js";
import { DynamicUnit } from "../index.js";


export class DynamicPosition implements iDynamicObject {

    //

    public get current(): { x: number; y: number } {
        return { x: 0, y: 0 };;
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

    public duration(ms: number): DynamicPosition {
        return this;
    }

    public ease(ease: tEaseOption): DynamicPosition {
        return this;
    }

    public onComplete(fn: Function): DynamicPosition {
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

// + updateDistance
// + store nextValue

// import type { tEaseOption } from "@brendangooch/ease";
// import { BaseDynamicObject } from "../base-dynamic-object.js";
// import { DynamicVector } from "../vector/dynamic-vector.js";
// import { DynamicBezier } from "../bezier/dynamic-bezier.js";
// import { Vector2D } from "@brendangooch/maths";

// export class DynamicPosition extends BaseDynamicObject {

//     private vector: DynamicVector;
//     private bezier: DynamicBezier;
//     private strategy: DynamicVector | DynamicBezier;
//     private isVector: boolean;
//     private nextValue: Vector2D = new Vector2D();

//     public constructor(x: number = 0, y: number = 0) {
//         super();
//         this.vector = new DynamicVector(x, y);
//         this.bezier = new DynamicBezier(x, y);
//         this.strategy = this.vector;
//         this.isVector = true;
//     }

//     public get isActive(): boolean {
//         return this.strategy.isActive;
//     }

//     public get x(): number {
//         return Math.round(this.strategy.x);
//     }

//     public get y(): number {
//         return Math.round(this.strategy.y);
//     }

//     public override save(): string {
//         return JSON.stringify({
//             parent: super.save(),
//             vector: this.vector.save(),
//             bezier: this.bezier.save(),
//             isVector: this.isVector,
//             next: this.nextValue.save()
//         });
//     }

//     public override load(json: string): void {
//         const state = JSON.parse(json);
//         super.load(state.parent);
//         this.vector.load(state.vector);
//         this.bezier.load(state.bezier);
//         this.isVector = state.isVector;
//         this.nextValue.load(state.next);
//         if (this.isVector) this.strategy = this.vector;
//         else this.strategy = this.bezier;
//     }

//     public override duration(ms: number): DynamicPosition {
//         super.duration(ms);
//         return this;
//     }

//     public override speed(unitsPerMS: number): DynamicPosition {
//         super.speed(unitsPerMS);
//         return this;
//     }

//     public override ease(easeOption: tEaseOption): DynamicPosition {
//         super.ease(easeOption);
//         return this;
//     }

//     public next(x: number, y: number): DynamicPosition {
//         if (!this.isActive) {
//             this.nextValue.setXY(x, y);
//             this.updateDistance();
//         }
//         return this;
//     }

//     public move(): void {
//         if (!this.isActive) {
//             if (!this.isVector) this.switchToVector();
//             this.setDurationSpeedEase();
//             this.vector.next(this.nextValue.x, this.nextValue.y).change();
//         }
//     }

//     public curveTo(distance: number, angle: number): void {
//         if (!this.isActive && (this.properties.duration > 0 || this.properties.speed > 0)) {
//             if (this.isVector) this.switchToBezier();
//             this.setDurationSpeedEase();
//             this.bezier.control(distance, angle).next(this.nextValue.x, this.nextValue.y).change();
//         }
//     }

//     public stop(): void {
//         this.strategy.stop();
//         this.reset();
//     }

//     protected increment(ms: number): void {
//         this.strategy.update(ms);
//     }

//     private updateDistance(): void {
//         this.properties.distance = this.nextValue.distanceTo(new Vector2D(this.x, this.y));
//     }

//     private switchToBezier(): void {
//         this.bezier.next(this.vector.x, this.vector.y).change();
//         this.strategy = this.bezier;
//         this.isVector = false;
//     }

//     private switchToVector(): void {
//         this.vector.next(this.bezier.x, this.bezier.y).change();
//         this.strategy = this.vector;
//         this.isVector = true;
//     }

//     private setDurationSpeedEase(): void {
//         if (this.properties.speed > 0) this.strategy.speed(this.properties.speed);
//         if (this.properties.duration > 0) this.strategy.duration(this.properties.duration);
//         this.strategy.ease(this.properties.ease);
//     }

// }