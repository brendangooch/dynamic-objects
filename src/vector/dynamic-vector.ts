/**
 * a vector that changes its position over time
 */

// import type { tEaseOption } from "@brendangooch/ease";
// import { DynamicUnit } from "../unit/dynamic-unit.js";

// export class DynamicVector {

//     protected unit: DynamicUnit;

//     public get isActive(): boolean {
//         return false;
//     }

//     public get x(): number {
//         return 0;
//     }

//     public get y(): number {
//         return 0;
//     }

//     public getDuration(): number {
//         return 0;
//     }

//     public update(ms: number): void { }

//     public save(): string {
//         return '';
//     }

//     public load(json: string): void { }

//     public duration(ms: number): DynamicVector {
//         return this;
//     }

//     public speed(unitsPerMS: number): DynamicVector {
//         return this;
//     }

//     public ease(easeOption: tEaseOption): DynamicVector {
//         return this;
//     }

//     // set the next value but do not activate
//     public next(x: number, y: number): DynamicVector {
//         return this;
//     }

//     // change current value from previous to next
//     public change(): void { }

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