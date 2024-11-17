/**
 * represents an angle in radians from -infinity to infinity that can change instantly or dynamically over time
 * used by DynamicRectangle to set its rotation
 */

// import type { tEaseOption } from "@brendangooch/ease";
// import { DynamicNumber } from "../number/dynamic-number.js";

// export class DynamicRotation {

//     private rotation: DynamicNumber;

//     public get isActive(): boolean {
//         return false;
//     }

//     public get current(): number {
//         return 0;
//     }

//     public get rounded(): number {
//         return Math.round(this.current);
//     }

//     public getDuration(): number {
//         return 0;
//     }

//     public update(ms: number): void { }

//     public save(): string {
//         return '';
//     }

//     public load(json: string): void { }

//     public duration(ms: number): DynamicRotation {
//         return this;
//     }

//     public speed(unitsPerMS: number): DynamicRotation {
//         return this;
//     }

//     public ease(easeOption: tEaseOption): DynamicRotation {
//         return this;
//     }

//     public next(n: number): DynamicRotation {
//         return this;
//     }

//     // 
//     public change(): boolean {
//         return false;
//     }

//     // end the current transition where it is
//     public stop(): void { }

//     // end the current transition and set current value to previous value
//     public rewind(): void { }

//     // end the current transition and set current value to next value
//     public complete(): void { }

//     // can update when on
//     public on(): void { }

//     // cannot update when off
//     public off(): void { }

// }


// import type { tEaseOption } from "@brendangooch/ease";
// import { BaseDynamicObject } from "../base-dynamic-object.js";
// import { DynamicRotation } from "../number/dynamic-number.js";
// import type { tStopOption } from "../index.js";

// export class DynamicRotation extends BaseDynamicObject {

// private static TAU: number = Math.PI * 2;

// private rotation: DynamicRotation;
// private spin: number = 0;

// public constructor(initial: number = 0) {
//     super();
//     this.rotation = new DynamicRotation(initial);
// }

// public get isActive(): boolean {
//     return this.rotation.isActive;
// }

// public get current(): number {
//     return this.rotation.current;
// }

// public override save(): string {
//     return JSON.stringify({
//         parent: super.save(),
//         rotation: this.rotation.save(),
//         spin: this.spin,
//         speed: this._speed
//     })
// }

// public override load(json: string): boolean {
//     const state = JSON.parse(json);
//     if (state.parent === undefined) return false;
//     if (state.rotation === undefined) return false;
//     if (state.spin === undefined) return false;
//     const parentLoaded = super.load(state.parent);
//     this.rotation.load(state.rotation);
//     this.spin = state.spin;
//     return parentLoaded;
// }

// public override duration(ms: number): DynamicRotation {
//     super.duration(ms);
//     // this._speed = 0;
//     return this;
// }

// public override ease(easeOption: tEaseOption): DynamicRotation {
//     super.ease(easeOption);
//     return this;
// }

// public override speed(unitsPerMs: number): DynamicRotation {
//     super.speed(unitsPerMs);
//     return this;
// }

// // stop

// public rotateTo(radians: number): number | false {
//     if (this.canChange(radians)) return this.doChange(radians);
//     return 0;
// }

// // numSpins must be a positive or negative integer
// // no point doing an instant change with spin!
// public spinTo(numSpins: number, radians: number): number | false {
//     if ((this._duration > 0 || this._speed > 0) && Number.isInteger(numSpins)) {
//         this.addSpin(numSpins);
//         return this.rotateTo(radians + this.spin);
//     }
//     return 0;
// }

// protected increment(ms: number): void {
//     this.rotation.update(ms);
// }

// // not required, rotation (DynamicRotation) caches its own current value, already efficient
// protected updateCurrent(): void { }

// // remove spin after each dynamic rotation complete
// protected override updateCompleteHook(): void {
//     this.removeSpin();
// }

// protected override stopHook(option: tStopOption): void {
//     this.rotation.stop(option);
// }

// private canChange(radians: number): boolean {
//     return !this.isActive && radians !== this.current;
// }

// private doChange(radians: number): number | false {
//     if (this._duration > 0 || this._speed > 0) return this.dynamicChange(radians);
//     else this.instantChange(radians);
//     return 0;
// }

// private instantChange(radians: number): void {
//     this.rotation.changeTo(radians);
//     this.reset();
// }

// private dynamicChange(radians: number): number | false {
//     if (this._duration > 0) this.rotation.duration(this._duration);
//     if (this._speed > 0) this.rotation.speed(this._speed);
//     if (this._easeOption) this.rotation.ease(this._easeOption);
//     this.turnOn();
//     return this.rotation.changeTo(radians);
// }

// private addSpin(numSpins: number): void {
//     this.spin += numSpins * DynamicRotation.TAU;
// }

// // remove any "spin" added to rotation during last change
// // essentially adding or subtracting TAU * numSpins from current value
// private removeSpin(): void {
//     if (this.spin !== 0) {
//         this.rotation.changeTo(this.rotation.current - this.spin);
//         this.spin = 0;
//     }
// }

// }