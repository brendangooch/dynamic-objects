/**
 * a vector that changes its position over time
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iDynamicObject } from "../index.js";
import { DynamicUnit } from "../index.js";

type tDynamicVectorProperties = {
    //
};

export class DynamicVector implements iDynamicObject {

    private properties: tDynamicVectorProperties = {
        //
    };

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


    public duration(ms: number): DynamicVector {
        return this;
    }

    public ease(ease: tEaseOption): DynamicVector {
        return this;
    }

    public onComplete(fn: Function): DynamicVector {
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
// import { DynamicUnit } from "../unit/dynamic-unit.js";
// import { Vector2D } from "@brendangooch/maths";


// export class DynamicVector extends BaseDynamicObject {

//     protected unit: DynamicUnit = new DynamicUnit();
//     protected state = { current: new Vector2D, previous: new Vector2D, next: new Vector2D };

//     public constructor(x: number = 0, y: number = 0) {
//         super();
//         this.setAll(x, y);
//     }

//     public get isActive(): boolean {
//         return this.unit.isActive;
//     }

//     public get x(): number {
//         return this.state.current.x;
//     }

//     public get y(): number {
//         return this.state.current.y;
//     }

//     public override save(): string {
//         return JSON.stringify({
//             parent: super.save(),
//             unit: this.unit.save(),
//             current: this.state.current.save(),
//             previous: this.state.previous.save(),
//             next: this.state.next.save()
//         });
//     }

//     public override load(json: string): void {
//         const state = JSON.parse(json);
//         super.load(state.parent);
//         this.unit.load(state.unit);
//         this.state.current.load(state.current);
//         this.state.previous.load(state.previous);
//         this.state.next.load(state.next);
//     }

//     public override duration(ms: number): DynamicVector {
//         super.duration(ms);
//         return this;
//     }

//     public override speed(unitsPerMS: number): DynamicVector {
//         super.speed(unitsPerMS);
//         return this;
//     }

//     public override ease(easeOption: tEaseOption): DynamicVector {
//         super.ease(easeOption);
//         return this;
//     }

//     public next(x: number, y: number): DynamicVector {
//         if (!this.isActive) {
//             this.state.next.setXY(x, y);
//             this.updateDistance();
//         }
//         return this;
//     }

//     public change(): void {
//         if (this.canChange()) this.doChange();
//     }

//     // stop unit, set all to current
//     public stop(): void {
//         this.unit.stop();
//         this.setAllToCurrent();
//         this.reset();
//     }


//     // abstract parent methods
//     protected override increment(ms: number): void {
//         this.unit.update(ms);
//         this.updateCurrent();
//     }

//     // hooks
//     protected override postUpdateComplete(): void {
//         this.setAllToNext();
//     }

//     // private methods
//     protected updateCurrent(): void {
//         this.state.current = this.state.previous.add(this.state.next.subtract(this.state.previous).multiply(this.unit.current));
//     }

//     private setAll(x: number, y: number): void {
//         this.state.current.setXY(x, y);
//         this.state.previous.setXY(x, y);
//         this.state.next.setXY(x, y);
//         this.updateDistance();
//     }

//     private setAllToCurrent(): void {
//         this.setAll(this.state.current.x, this.state.current.y);
//     }

//     private setAllToNext(): void {
//         this.setAll(this.state.next.x, this.state.next.y);
//     }

//     private updateDistance(): void {
//         this.properties.distance = this.state.next.distanceTo(this.state.previous);
//     }

//     private canChange(): boolean {
//         return !this.isActive && !this.state.next.equals(this.state.current);
//     }

//     private doChange(): void {
//         if (this.getDuration() > 0) this.dynamicChange();
//         else this.instantChange();
//     }

//     private instantChange(): void {
//         this.setAllToNext();
//         this.reset();
//     }

//     private dynamicChange(): void {
//         this.preDynamicChangeHook();
//         this.unit.duration(this.getDuration()).ease(this.properties.ease).start();
//     }

//     protected preDynamicChangeHook(): void { }

// }