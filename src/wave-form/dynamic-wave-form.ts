/**
 * 
 */

export class DynamicWaveForm {

    //

}

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