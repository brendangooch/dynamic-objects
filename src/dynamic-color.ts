/**
 * an rgba color that changes values over time
 */

// import { tEaseOption } from "@brendangooch/ease";
// import { DynamicNumber, iDynamic } from "./index.js";

// export class DynamicColor implements iDynamic {

//     private r: DynamicNumber = new DynamicNumber();
//     private g: DynamicNumber = new DynamicNumber();
//     private b: DynamicNumber = new DynamicNumber();
//     private isOn: boolean = false;

//     public constructor(r: number, g: number, b: number) {
//         this.r.changeTo(r);
//         this.g.changeTo(g);
//         this.b.changeTo(b);
//     }

//     public get isActive(): boolean {
//         return this.r.isActive || this.g.isActive || this.b.isActive;
//     }

//     public get current(): string {
//         return `rgb(${this.r.current},${this.g.current},${this.b.current})`;
//     }

//     public duration(ms: number): DynamicColor {
//         if (!this.isActive) {
//             this.r.duration(ms);
//             this.g.duration(ms);
//             this.b.duration(ms);
//         }
//         return this;
//     }

//     public ease(easeOption: tEaseOption): DynamicColor {
//         if (!this.isActive) {
//             this.r.ease(easeOption);
//             this.g.ease(easeOption);
//             this.b.ease(easeOption);
//         }
//         return this;
//     }

//     public changeTo(r: number, g: number, b: number): boolean {
//         if (!this.isActive) {
//             const red = this.r.changeTo(r);
//             const green = this.g.changeTo(g);
//             const blue = this.b.changeTo(b);
//             if (red || green || blue) {
//                 this.turnOn();
//                 return true;
//             }
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
//             this.r.update(ms);
//             this.g.update(ms);
//             this.b.update(ms);
//         }
//     }

//     public load(json: string): boolean {
//         const state = JSON.parse(json);
//         if (state.foo === undefined) return false;
//         return true;
//     }

//     public save(): string {
//         return '';
//     }

// }