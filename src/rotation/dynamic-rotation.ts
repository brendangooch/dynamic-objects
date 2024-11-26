/**
 * 
 * represents an angle in radians from -infinity to infinity that can change instantly or dynamically over time
 * used by DynamicRectangle to set its rotation 
 * basically a DynamicRotation wrapped in a class that can add spins to the next value to simulate spin THEN removes the spin once update complete
 * 
 */

export class DynamicRotation { }

// import type { tEaseOption } from "@brendangooch/ease";
// import type { iDynamic } from "../index.js";
// import { DynamicNumber } from "../number/dynamic-number.js";

// export class DynamicRotation implements iDynamic {

//     private number: DynamicNumber;

//     public get current(): number {
//         return this.number.current;
//     }

//     public get isActive(): boolean {
//         return this.number.isActive;
//     }

//     public get isComplete(): boolean {
//         return this.number.isComplete;
//     }

//     public get isRunning(): boolean {
//         return this.number.isRunning;
//     }

//     public get isOn(): boolean {
//         return this.number.isOn;
//     }

//     public turnOn(): void {
//         this.number.turnOn();
//     }

//     public turnOff(): void {
//         this.number.turnOff();
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
//         this.number.start();
//     }

//     public stop(): void {
//         this.number.stop();
//     }

//     public pause(): void {
//         this.number.pause();
//     }


//     public duration(ms: number): DynamicRotation {
//         this.number.duration(ms);
//         return this;
//     }

//     public ease(ease: tEaseOption): DynamicRotation {
//         this.number.ease(ease);
//         return this;
//     }

//     public onComplete(fn: Function): DynamicRotation {
//         this.number.onComplete(fn);
//         return this;
//     }

//     public change(): boolean {
//         return this.number.change();
//     }

//     public update(ms: number): void {
//         this.number.update(ms);
//     }

//     public tick(): void {
//         this.number.tick();
//     }

//     public stepForwards(): void {
//         this.number.stepForwards();
//     }

//     public stepBackwards(): void {
//         this.number.stepBackwards();
//     }

//     public complete(): void {
//         this.number.complete();
//     }

//     public rewind(): void {
//         this.number.rewind();
//     }

//     public runRate(speed: number): void {
//         this.number.runRate(speed);
//     }

//     public speedUp(): void {
//         this.number.speedUp();
//     }

//     public slowDown(): void {
//         this.number.slowDown();
//     }

//     public normalSpeed(): void {
//         this.number.normalSpeed();
//     }

// }

// // import type { tEaseOption } from "@brendangooch/ease";
// // import { BaseDynamicObject } from "../base-dynamic-object.js";
// // import { DynamicRotation } from "../number/dynamic-number.js";

// // export class DynamicRotation extends BaseDynamicObject {

// //     private static TAU: number = Math.PI * 2;

// //     private rotation: DynamicRotation;
// //     private spin: number = 0;

// //     public constructor(initial: number = 0) {
// //         super();
// //         this.rotation = new DynamicRotation(initial);
// //     }

// //     public get isActive(): boolean {
// //         return this.rotation.isActive;
// //     }

// //     public get current(): number {
// //         return this.rotation.current;
// //     }

// //     public override save(): string {
// //         return JSON.stringify({
// //             parent: super.save(),
// //             rotation: this.rotation.save(),
// //             spin: this.spin
// //         });
// //     }

// //     public override load(json: string): void {
// //         const state = JSON.parse(json);
// //         super.load(state.parent);
// //         this.rotation.load(state.rotation);
// //         this.spin = state.spin;
// //     }

// //     public override getDuration(): number {
// //         return this.rotation.getDuration();
// //     }

// //     public override duration(ms: number): DynamicRotation {
// //         this.rotation.duration(ms);
// //         return this;
// //     }

// //     public override speed(unitsPerMS: number): DynamicRotation {
// //         this.rotation.speed(unitsPerMS);
// //         return this;
// //     }

// //     public override ease(easeOption: tEaseOption): DynamicRotation {
// //         this.rotation.ease(easeOption);
// //         return this;
// //     }

// //     public next(rotation: number, spins: number = 0): DynamicRotation {
// //         if (!this.isActive) {
// //             this.spin = spins * DynamicRotation.TAU;
// //             this.rotation.next(rotation + this.spin);
// //         }
// //         return this;
// //     }

// //     public rotate(): void {
// //         if (!this.isActive) {
// //             this.rotation.change();
// //         }
// //     }

// //     public stop(): void {
// //         this.rotation.stop();
// //         this.spin = 0;
// //     }

// //     protected increment(ms: number): void {
// //         this.rotation.update(ms);
// //     }

// //     protected override postUpdateComplete(): void {
// //         this.removeSpin();
// //     }

// //     private removeSpin(): void {
// //         if (this.spin !== 0) {
// //             this.rotation.next(this.current - this.spin).change();
// //             this.spin = 0;
// //         }
// //     }

// // }