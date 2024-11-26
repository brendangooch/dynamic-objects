/**
 * 
 * represents a string of text whose length changes instantly or over time
 * used by GameConsole for typing effect
 * 
 */

export class DynamicText { }

// import type { tEaseOption } from "@brendangooch/ease";
// import type { iDynamic } from "../index.js";
// import { DynamicNumber } from "../number/dynamic-number.js";

// export class DynamicText implements iDynamic {

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


//     public duration(ms: number): DynamicText {
//         this.number.duration(ms);
//         return this;
//     }

//     public ease(ease: tEaseOption): DynamicText {
//         this.number.ease(ease);
//         return this;
//     }

//     public onComplete(fn: Function): DynamicText {
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
// // import { DynamicNumber } from "../number/dynamic-number.js";

// // export class DynamicText extends BaseDynamicObject {

// //     private index: DynamicNumber = new DynamicNumber(0);
// //     private nextString: string = '';
// //     private currentString: string = '';

// //     public constructor(initial: string = '') {
// //         super();
// //         this.currentString = initial;
// //     }

// //     public get isActive(): boolean {
// //         return this.index.isActive;
// //     }

// //     public get current(): string {
// //         return this.currentString;
// //     }

// //     public override save(): string {
// //         return JSON.stringify({
// //             parent: super.save(),
// //             index: this.index.save(),
// //             nextString: this.nextString,
// //             currentString: this.currentString
// //         });
// //     }

// //     public override load(json: string): void {
// //         const state = JSON.parse(json);
// //         super.load(state.parent);
// //         this.index.load(state.index);
// //         this.nextString = state.nextString;
// //         this.currentString = state.currentString;
// //     }

// //     public override getDuration(): number {
// //         return this.index.getDuration();
// //     }

// //     public override duration(ms: number): DynamicText {
// //         this.index.duration(ms);
// //         return this;
// //     }

// //     public override speed(unitsPerMS: number): DynamicText {
// //         this.index.speed(unitsPerMS);
// //         return this;
// //     }

// //     public override ease(easeOption: tEaseOption): DynamicText {
// //         this.index.ease(easeOption);
// //         return this;
// //     }

// //     public next(text: string): DynamicText {
// //         if (!this.isActive) {
// //             this.nextString = text;
// //             this.index.next(text.length);
// //         }
// //         return this;
// //     }

// //     public change(): void {
// //         if (!this.isActive) {
// //             this.index.change();
// //             this.updateCurrent(); // <-- instant change updates current string to full string, dynamic makes it 0 length
// //         }
// //     }

// //     public stop(): void {
// //         this.index.stop();
// //         this.reset();
// //         this.nextString = '';
// //     }

// //     protected increment(ms: number): void {
// //         this.index.update(ms);
// //         this.updateCurrent();
// //     }

// //     protected override postUpdateComplete(): void {
// //         this.index.next(0).change();
// //         this.currentString = this.nextString;
// //         this.nextString = '';
// //     }

// //     private updateCurrent(): void {
// //         this.currentString = this.nextString.substring(0, this.index.rounded);
// //     }

// // }