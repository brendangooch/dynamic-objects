/**
 * a vector that changes its position over time
 */

export class DynamicVector { }

// import type { tEaseOption } from "@brendangooch/ease";
// import type { iDynamic, tPosition } from "../index.js";
// import { DynamicUnit } from "../index.js";
// import { Vector2D } from "@brendangooch/maths";

// type tDynamicVectorProperties = {
//     unit: DynamicUnit;
//     current: Vector2D;
// };

// export class DynamicVector implements iDynamic {

//     private properties: tDynamicVectorProperties = {
//         unit: new DynamicUnit(),
//         current: new Vector2D(),
//     };

//     public constructor() { }

//     public get current(): tPosition {
//         return { x: this.properties.current.x, y: this.properties.current.y };
//     }

//     public get isActive(): boolean {
//         return this.properties.unit.isActive;
//     }

//     public get isComplete(): boolean {
//         return this.properties.unit.isComplete;
//     }

//     public get isRunning(): boolean {
//         return this.properties.unit.isRunning;
//     }

//     public get isOn(): boolean {
//         return this.properties.unit.isOn;
//     }

//     public turnOn(): void {
//         this.properties.unit.turnOn();
//     }

//     public turnOff(): void {
//         this.properties.unit.turnOff();
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
//         this.properties.unit.start();
//     }

//     public stop(): void {
//         this.properties.unit.stop();
//     }

//     public pause(): void {
//         this.properties.unit.pause();
//     }


//     public duration(ms: number): DynamicVector {
//         this.properties.unit.duration(ms);
//         return this;
//     }

//     public ease(ease: tEaseOption): DynamicVector {
//         this.properties.unit.ease(ease);
//         return this;
//     }

//     public onComplete(fn: Function): DynamicVector {
//         this.properties.unit.onComplete(fn);
//         return this;
//     }

//     public change(): boolean {
//         return this.properties.unit.change();
//     }

//     public update(ms: number): void {
//         this.properties.unit.update(ms);
//     }

//     public tick(): void {
//         this.properties.unit.tick();
//     }

//     public stepForwards(): void {
//         this.properties.unit.stepForwards();
//     }

//     public stepBackwards(): void {
//         this.properties.unit.stepBackwards();
//     }

//     public complete(): void {
//         this.properties.unit.end();
//     }

//     public rewind(): void {
//         this.properties.unit.rewind();
//     }

//     public runRate(speed: number): void {
//         this.properties.unit.runRate(speed);
//     }

//     public speedUp(): void {
//         this.properties.unit.speedUp();
//     }

//     public slowDown(): void {
//         this.properties.unit.slowDown();
//     }

//     public normalSpeed(): void {
//         this.properties.unit.normalSpeed();
//     }

// }