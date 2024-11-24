/**
 * a number that changes its value over time
 */

export class DynamicNumber {

    //

}

// import type { tEaseOption } from "@brendangooch/ease";
// import { DynamicUnit } from "../unit/dynamic-unit.js";
// import { BaseDynamicObject } from "../base-dynamic-object.js";

// export class DynamicNumber extends BaseDynamicObject {

//     private unit: DynamicUnit = new DynamicUnit();
//     private state = { current: 0, previous: 0, next: 0 };

//     public constructor(initial: number = 0) {
//         super();
//         this.setAll(initial);
//     }

//     public get isActive(): boolean {
//         return this.unit.isActive;
//     }

//     public get current(): number {
//         return this.state.current;
//     }

//     public get rounded(): number {
//         return Math.round(this.current);
//     }

//     public override save(): string {
//         return JSON.stringify({
//             parent: super.save(),
//             unit: this.unit.save(),
//             state: this.state
//         });
//     }

//     public override load(json: string): void {
//         const state = JSON.parse(json);
//         super.load(state.parent);
//         this.unit.load(state.unit);
//         this.state = state.state;
//     }

//     public override duration(ms: number): DynamicNumber {
//         super.duration(ms);
//         return this;
//     }

//     public override speed(unitsPerMS: number): DynamicNumber {
//         super.speed(unitsPerMS);
//         return this;
//     }

//     public override ease(easeOption: tEaseOption): DynamicNumber {
//         super.ease(easeOption);
//         return this;
//     }

//     public next(n: number): DynamicNumber {
//         if (!this.isActive) {
//             this.state.next = n;
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
//     private updateCurrent(): void {
//         this.state.current = this.state.previous + ((this.state.next - this.state.previous) * this.unit.current);
//     }

//     private setAll(n: number): void {
//         this.state.current = this.state.previous = this.state.next = n;
//         this.updateDistance();
//     }

//     private setAllToCurrent(): void {
//         this.setAll(this.state.current);
//     }

//     private setAllToNext(): void {
//         this.setAll(this.state.next);
//     }

//     private updateDistance(): void {
//         this.properties.distance = Math.abs(this.state.next - this.state.previous);
//     }

//     private canChange(): boolean {
//         return !this.isActive && this.state.next !== this.state.current;
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
//         this.unit.duration(this.getDuration()).ease(this.properties.ease).start();
//     }

// }