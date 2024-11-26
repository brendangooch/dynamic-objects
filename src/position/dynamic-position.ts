/**
 * aggregates vector and bezier into one class, choosing the most efficient option depending on curved or straight path required
 *
 */

export class DynamicPosition { }

// import type { tEaseOption } from "@brendangooch/ease";
// import type { iDynamic } from "../index.js";
// import { DynamicVector } from "../vector/dynamic-vector.js";
// import { DynamicBezier } from "../bezier/dynamic-bezier.js";

// export class DynamicPosition implements iDynamic {

//     private strategy: DynamicVector | DynamicBezier;

//     public get current(): { x: number; y: number } {
//         return this.strategy.current;
//     }

//     public get isActive(): boolean {
//         return this.strategy.isActive;
//     }

//     public get isComplete(): boolean {
//         return this.strategy.isComplete;
//     }

//     public get isRunning(): boolean {
//         return this.strategy.isRunning;
//     }

//     public get isOn(): boolean {
//         return this.strategy.isOn;
//     }

//     public turnOn(): void {
//         this.strategy.turnOn();
//     }

//     public turnOff(): void {
//         this.strategy.turnOff();
//     }

//     public load(json: string): boolean {
//         if (!this.isOn) {
//             const state = JSON.parse(json);
//             if (state.foo === undefined) return false;
//         }
//         return false;
//     }

//     public save(): string {
//         if (!this.isOn) {
//             //
//         }
//         return '';
//     }

//     public start(): void {
//         this.strategy.start();
//     }

//     public stop(): void {
//         this.strategy.stop();
//     }

//     public pause(): void {
//         this.strategy.pause()
//     }

//     public duration(ms: number): DynamicPosition {
//         this.strategy.duration(ms);
//         return this;
//     }

//     public ease(ease: tEaseOption): DynamicPosition {
//         this.strategy.ease(ease);
//         return this;
//     }

//     public onComplete(fn: Function): DynamicPosition {
//         this.strategy.onComplete(fn);
//         return this;
//     }

//     public change(): boolean {
//         return this.strategy.change();
//     }

//     public update(ms: number): void {
//         this.strategy.update(ms);
//     }

//     public tick(): void {
//         this.strategy.tick()
//     }

//     public stepForwards(): void {
//         this.strategy.stepForwards();
//     }

//     public stepBackwards(): void {
//         this.strategy.stepBackwards();
//     }

//     public complete(): void {
//         this.strategy.complete();
//     }

//     public rewind(): void {
//         this.strategy.rewind();
//     }

//     public runRate(speed: number): void {
//         this.strategy.runRate(speed);
//     }

//     public speedUp(): void {
//         this.strategy.speedUp();
//     }

//     public slowDown(): void {
//         this.strategy.slowDown();
//     }

//     public normalSpeed(): void {
//         this.strategy.normalSpeed();
//     }

// }

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