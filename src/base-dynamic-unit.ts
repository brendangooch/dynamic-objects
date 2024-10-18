/**
 * abstract DynamicUnit class extended by all DynamicUnit decorators
 */



// import * as Ease from '@brendangooch/ease';
// import { iDynamicUnit } from '../../index.js';

// export abstract class BaseDynamicUnit implements iDynamicUnit {

//     protected unit: iDynamicUnit;

//     public constructor(unit: iDynamicUnit) {
//         this.unit = unit;
//     }

//     public get isActive(): boolean {
//         return this.unit.isActive;
//     }

//     public get current(): number {
//         return this.unit.current;
//     }

//     public turnOn(): void {
//         this.unit.turnOn();
//     }

//     public turnOff(): void {
//         this.unit.turnOff();
//     }

//     public save(): string {
//         return this.unit.save();
//     }

//     public load(json: string): void {
//         this.unit.load(json);
//     }

//     public update(ms: number): void {
//         this.unit.update(ms);
//     }

//     public run(duration: number, easeOption: Ease.tEaseOption = 'noEase'): void {
//         this.unit.run(duration, easeOption);
//     }

// }