/**
 * a point on a quadratic bezier curve that changes its position over time
 */

import { DynamicVector } from "../vector/dynamic-vector.js";

export class DynamicBezier extends DynamicVector {

    //

}

// import type { tEaseOption } from "@brendangooch/ease";
// import { DynamicVector } from "../vector/dynamic-vector.js";
// import { QuadraticBezierCurve } from "@brendangooch/maths";

// export class DynamicBezier extends DynamicVector {

//     private bezier: QuadraticBezierCurve = new QuadraticBezierCurve();
//     private distance: number = 0;
//     private angle: number = 0;

//     public override save(): string {
//         return JSON.stringify({
//             parent: super.save(),
//             bezier: this.bezier.save(),
//             distance: this.distance,
//             angle: this.angle
//         });
//     }

//     public override load(json: string): void {
//         const state = JSON.parse(json);
//         super.load(state.parent);
//         this.bezier.load(state.bezier);
//         this.distance = state.distance;
//         this.angle = state.angle;
//     }

//     public override duration(ms: number): DynamicBezier {
//         super.duration(ms);
//         return this;
//     }

//     public override speed(unitsPerMS: number): DynamicBezier {
//         super.speed(unitsPerMS);
//         return this;
//     }

//     public override ease(easeOption: tEaseOption): DynamicBezier {
//         super.ease(easeOption);
//         return this;
//     }

//     public control(distance: number, angle: number): DynamicBezier {
//         if (!this.isActive) {
//             this.distance = distance;
//             this.angle = angle;
//         }
//         return this;
//     }

//     protected override updateCurrent(): void {
//         this.state.current.setX(this.bezier.x(this.unit.current));
//         this.state.current.setY(this.bezier.y(this.unit.current));
//     }

//     protected override preDynamicChangeHook(): void {
//         this.bezier.setStart(this.state.previous.x, this.state.previous.y);
//         this.bezier.setEnd(this.state.next.x, this.state.next.y);
//         this.bezier.setControlByDistanceAndAngleFromStart(this.distance, this.angle);
//     }

//     protected override postReset(): void {
//         this.distance = 0;
//         this.angle = 0;
//     }

// }