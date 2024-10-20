/**
 *
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic } from "./index.js";
import { BaseDynamicObjectWithUnit } from "./base-dynamic-object-with-unit.js";

export class DynamicBezier extends BaseDynamicObjectWithUnit implements iDynamic {

    //

    public get x(): number {
        return 0;
    }

    public get y(): number {
        return 0;
    }

    public override duration(ms: number): DynamicBezier {
        super.duration(ms);
        return this;
    }

    public override speed(unitsPerMs: number): DynamicBezier {
        super.speed(unitsPerMs);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicBezier {
        super.ease(easeOption);
        return this;
    }

    public addControlPoint(distance: number, angle: number): DynamicBezier {
        return this;
    }

    public moveTo(x: number, y: number): boolean {
        return false;
    }

    public moveBy(x: number, y: number): boolean {
        return this.moveTo(x + this.x, y + this.y);
    }

    // public update(ms: number): void {}

    public load(json: string): boolean {
        return false;
    }

    public save(): string {
        return '';
    }

    protected updateCurrent(): void { }
    protected updateComplete(): void { }
    protected get diff(): number { return 0; }

    private canMove(x: number, y: number): boolean {
        return false;
    }

    private doMove(x: number, y: number): boolean {
        return true;
    }

    private instantMove(): void { }

    private dynamicMove(): void { }

}

// import { tEaseOption } from "@brendangooch/ease";
// import { DynamicUnit, iDynamicCurvedPath } from "../index.js";
// import { QuadraticBezierCurve } from "@brendangooch/maths";

// export class DynamicCurvedPath implements iDynamicCurvedPath {

//     private unit: DynamicUnit;
//     private bezier: QuadraticBezierCurve;
//     private isOn: boolean = false;

//     public constructor(x: number = 0, y: number = 0) {
//         this.unit = new DynamicUnit();
//         this.bezier = new QuadraticBezierCurve();
//         this.bezier.setAll(x, y);
//     }

//     get isActive(): boolean {
//         return this.unit.isActive;
//     }

//     public get x(): number {
//         return this.bezier.x(this.unit.current);
//     }

//     public get y(): number {
//         return this.bezier.y(this.unit.current);
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
//             bezier: this.bezier.save(),
//             isOn: this.isOn
//         });
//     }

//     public load(json: string): void {
//         const state = JSON.parse(json);
//         if (state.unit === undefined) throw new Error('missing "unit" property');
//         if (state.bezier === undefined) throw new Error('missing "bezier" property');
//         if (state.isOn === undefined) throw new Error('missing "isOn" property');
//         this.unit.load(state.unit);
//         this.bezier.load(state.bezier);
//         this.isOn = state.isOn;
//     }

//     public update(ms: number): void {
//         if (this.isOn && this.isActive) {
//             this.unit.update(ms);
//             if (!this.unit.isActive) this.updateComplete();
//         }
//     }

//     // straight path
//     public moveTo(x: number, y: number, duration: number = 0, easeOption: tEaseOption = 'noEase'): void {
//         if (this.canMove(x, y, duration)) this.doMove(x, y, duration, easeOption);
//     }

//     // curved path
//     public curveTo(x: number, y: number, distance: number, angle: number, duration: number = 0, easeOption: tEaseOption = 'noEase'): void {
//         if (this.canMove(x, y, duration)) this.doCurve(x, y, distance, angle, duration, easeOption);
//     }

//     private updateComplete(): void {
//         this.bezier.setAll(this.bezier.x(1), this.bezier.y(1));
//         this.turnOff();
//     }

//     private canMove(x: number, y: number, duration: number): boolean {
//         return !this.isActive && duration >= 0 && (x !== this.bezier.x(1) || y !== this.bezier.y(1));
//     }

//     private doMove(x: number, y: number, duration: number, easeOption: tEaseOption): void {
//         (duration === 0) ? this.instantMove(x, y) : this.dynamicMove(x, y, duration, easeOption);
//     }

//     private doCurve(x: number, y: number, distance: number, angle: number, duration: number, easeOption: tEaseOption): void {
//         (duration === 0) ? this.instantMove(x, y) : this.dynamicCurve(x, y, distance, angle, duration, easeOption);
//     }

//     private instantMove(x: number, y: number): void {
//         this.bezier.setAll(x, y);
//     }

//     private dynamicMove(x: number, y: number, duration: number, easeOption: tEaseOption): void {
//         this.bezier.setEnd(x, y);
//         this.bezier.makeStraight();
//         this.turnOn();
//         this.unit.run(duration, easeOption);
//     }

//     private dynamicCurve(x: number, y: number, distance: number, angle: number, duration: number, easeOption: tEaseOption): void {
//         this.bezier.setEnd(x, y);
//         this.bezier.setControlByDistanceAndAngleFromStart(distance, angle);
//         this.turnOn();
//         this.unit.run(duration, easeOption);
//     }

// }