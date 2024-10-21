/**
 *
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic } from "./index.js";
import { BaseDynamicObjectWithUnit } from "./base-dynamic-object-with-unit.js";
import { QuadraticBezierCurve } from "@brendangooch/maths";

export class DynamicBezier extends BaseDynamicObjectWithUnit implements iDynamic {


    private bezier = new QuadraticBezierCurve();

    public constructor(x: number = 0, y: number = 0) {
        super();
        // this.bezier.setAll(x, y); ?
    }

    // ?
    public get x(): number {
        return 0; // ?
    }

    // ?
    public get y(): number {
        return 0; // ?
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
        if (!this.isActive) this.bezier.setControlByDistanceAndAngleFromStart(distance, angle);
        return this;
    }

    public moveTo(x: number, y: number): boolean {
        if (this.canMove(x, y)) return this.doMove(x, y);
        return false;
    }

    public moveBy(x: number, y: number): boolean {
        return this.moveTo(x + this.x, y + this.y);
    }

    public load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.bezier === undefined) return false;
        this.bezier.load(state.bezier);
        return true;
    }

    public save(): string {
        return JSON.stringify({
            bezier: this.bezier.save()
        });
    }

    protected updateCurrent(): void {
        // ?
    }

    protected updateComplete(): void {
        this.bezier.setAll(this.bezier.x(1), this.bezier.y(1)); // ?
        this.spd = 0;
        this.dur = 0;
        this.turnOff();
    }

    protected get diff(): number {
        // ?
        return 0;
    }

    private canMove(x: number, y: number): boolean {
        return !this.isActive && (x !== this.x || y !== this.y);
    }

    private doMove(x: number, y: number): boolean {
        this.bezier.setEnd(x, y);
        this.updateDuration();
        if (this.dur > 0) this.dynamicMove();
        else this.instantMove();
        return true;
    }

    private instantMove(): void {
        this.bezier.setAll(this.bezier.x(1), this.bezier.y(1));
    }

    private dynamicMove(): void {
        this.turnOn();
        this.unit.duration(this.dur).run();
    }

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