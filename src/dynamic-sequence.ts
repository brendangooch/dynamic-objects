/**
 * a sequence of units repeated for a specified duration
 */

// import * as Ease from "@brendangooch/ease";
// import { iDynamic, iDynamicUnit } from "./index.js";

// export default class DynamicSequence implements iDynamic {

//     private _pattern: iDynamicUnit[] = [];
//     private _duration: number = 0;
//     private easeOption: Ease.tEaseOption = 'noEase';
//     private easeFn: Ease.tEaseFunction = Ease.load('noEase');
//     private _repeat: number = 0;
//     private units: iDynamicUnit[] = [];
//     private currentIndex: number = 0;
//     private isOn: boolean = false;

//     // active if current unit is active
//     public get isActive(): boolean {
//         return this.currentUnit !== null && this.currentUnit.isActive;
//     }

//     public get current(): number {
//         return this.units[this.currentIndex].current;
//     }

//     public pattern(units: iDynamicUnit[]): DynamicSequence {
//         if (!this.isActive) {
//             this._pattern = units;
//         }
//         return this;
//     }

//     // how long the sequence runs for
//     public duration(ms: number): DynamicSequence {
//         if (!this.isActive) {
//             this._duration = ms;
//         }
//         return this;
//     }

//     // apply ease to the pattern to speed up / slow down the output
//     public ease(easeOption: Ease.tEaseOption): DynamicSequence {
//         if (!this.isActive) {
//             this.loadEase(easeOption);
//         }
//         return this;
//     }

//     // how many times the pattern will repeat
//     public repeat(n: number): DynamicSequence {
//         if (!this.isActive) {
//             this._repeat = n;
//         }
//         return this;
//     }

//     // start the pattern
//     public run(): boolean {
//         if (this.canRun) {
//             this.createUnits();
//             this.currentIndex = 0;
//             this.turnOn();
//             return true;
//         }
//         return false;
//     }


//     public turnOn(): void {
//         this.isOn = true;
//     }

//     public turnOff(): void {
//         this.isOn = false;
//     }

//     public update(ms: number): void {
//         if (this.isOn && this.isActive) {
//             this.units[this.currentIndex].update(ms);
//             if (!this.units[this.currentIndex].isActive) {
//                 if (this.currentIndex === this.maxIndex) this.turnOff();
//                 else this.nextIndex();
//             }
//         }
//     }

//     public load(json: string): boolean {
//         const state = JSON.parse(json);
//         if (state.ease === undefined) return false;
//         return true;
//     }

//     public save(): string {
//         return JSON.stringify({
//             ease: this.easeOption
//         });
//     }

//     private loadEase(easeOption: Ease.tEaseOption): void {
//         this.easeOption = easeOption;
//         this.easeFn = Ease.load(easeOption);
//     }

//     private createUnits(): void {
//         if (this.canRun) {

//             // clear existing
//             this.units.length = 0;

//             // add the pattern repeat number of times to this.units
//             // this algorithm needs some thought - currently incorrect but on the right tracks
//             for (let i = 1; i <= this._repeat; i++) {
//                 const progress = this.easeFn(i / this._repeat);
//                 const patternDuration = this._duration * progress;
//                 const unitDuration = patternDuration / this._pattern.length;
//                 this._pattern.forEach(unit => {
//                     const clone = unit.clone();
//                     clone.duration(unitDuration).run();
//                     this.units.push(clone);
//                 });
//             }

//         }
//     }

//     private nextIndex(): void {
//         if (this.currentIndex < this.maxIndex) this.currentIndex++;
//     }

//     private get maxIndex(): number {
//         return this.units.length - 1;
//     }

//     private get canRun(): boolean {
//         return !this.isActive && this._pattern.length > 0 && this._duration > 0 && this._repeat > 0;
//     }

//     private get currentUnit(): iDynamicUnit | null {
//         if (this.units[this.currentIndex] === undefined) return null;
//         return this.units[this.currentIndex];
//     }

// }