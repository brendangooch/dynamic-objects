/**
 * 
 */

export class DynamicWaveForm { }

// import type { tEaseOption } from "@brendangooch/ease";
// import type { iDynamic } from "../index.js";

// export class DynamicWaveForm implements iDynamic {

//     public get current(): number {
//         return 0;
//     }

//     public get isActive(): boolean {
//         return false;
//     }

//     public get isComplete(): boolean {
//         return false;
//     }

//     public get isRunning(): boolean {
//         return false;
//     }

//     public get isOn(): boolean {
//         return false;
//     }

//     public turnOn(): void {

//     }

//     public turnOff(): void {

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
//         if (this.isOn) {
//             //
//         }
//     }

//     public stop(): void {
//         if (this.isOn) {
//             //
//         }
//     }

//     public pause(): void {
//         if (this.isOn) {
//             //
//         }
//     }

//     public duration(ms: number): DynamicWaveForm {
//         ms;
//         return this;
//     }

//     public ease(ease: tEaseOption): DynamicWaveForm {
//         ease;
//         return this;
//     }

//     public onComplete(fn: Function): DynamicWaveForm {
//         fn;
//         return this;
//     }

//     public change(): boolean {
//         return false;
//     }

//     public update(ms: number): void {
//         ms;
//         //
//     }

//     public tick(): void {
//         //
//     }

//     public stepForwards(): void {
//         //
//     }

//     public stepBackwards(): void {
//         //
//     }

//     public complete(): void {
//         //
//     }

//     public rewind(): void {
//         //
//     }

//     public runRate(speed: number): void {
//         speed;
//     }

//     public speedUp(): void {

//     }

//     public slowDown(): void {

//     }

//     public normalSpeed(): void {

//     }

// }

// import type { iDynamicUnit } from "../types/i-dynamic-unit.js";
// import { BaseDynamicObject } from "../base-dynamic-object.js";
// import { DynamicUnit } from "../unit/dynamic-unit.js";
// import { InvertedUnit } from "../unit-decorators/inverted-unit.js";
// import { FlooredUnit } from "../unit-decorators/floored-unit.js";

// export class DynamicWaveForm extends BaseDynamicObject {

//     private pattern: iDynamicUnit[] = [];
//     private index: 0 | 1 = 0;
//     private currentUnit: iDynamicUnit = new DynamicUnit(); // placeholder

//     public get isActive(): boolean {
//         return this.currentUnit.isActive;
//     }

//     public get current(): number {
//         return this.currentUnit.current;
//     }

//     public sawtooth(frequency: number): DynamicWaveForm {
//         if (!this.isActive) {
//             this.pattern = [
//                 new DynamicUnit().duration(frequency / 2),
//                 new DynamicUnit().duration(frequency / 2)
//             ];
//         }
//         return this;
//     }

//     public triangle(frequency: number): DynamicWaveForm {
//         if (!this.isActive) {
//             this.pattern = [
//                 new DynamicUnit().duration(frequency / 2),
//                 new InvertedUnit(new DynamicUnit()).duration(frequency / 2)
//             ];
//         }
//         return this;
//     }

//     public square(frequency: number): DynamicWaveForm {
//         if (!this.isActive) {
//             this.pattern = [
//                 new InvertedUnit(new FlooredUnit(new DynamicUnit())).duration(frequency / 2),
//                 new FlooredUnit(new DynamicUnit()).duration(frequency / 2)
//             ];
//         }
//         return this;
//     }

//     public start(): void {
//         if (!this.isActive && this.pattern.length !== 0) {
//             this.index = 0;
//             this.nextCurrent();
//         }
//     }

//     public stop(): void {
//         this.currentUnit.stop();
//     }

//     protected increment(ms: number): void {
//         this.currentUnit.update(ms);
//     }

//     protected override postUpdateComplete(): void {
//         this.toggleIndex();
//         this.nextCurrent();
//     }

//     private toggleIndex(): void {
//         this.index = (this.index === 0) ? 1 : 0;
//     }

//     private nextCurrent(): void {
//         this.currentUnit = this.pattern[this.index].clone();
//         this.currentUnit.start();

//     }

// }