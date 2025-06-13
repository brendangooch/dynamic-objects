/**
 * 
 */

import { clamp } from "@brendangooch/maths";
import { DynamicNumber } from "./dynamic-number.js";
import type { iDeferrable, iDynamic, tChangeColorTo } from "./index.js";


export class DynamicColor implements iDynamic, iDeferrable {

    private changes: tChangeColorTo[] = [];
    private red: DynamicNumber;
    private green: DynamicNumber;
    private blue: DynamicNumber;
    private currentValue: string = 'rgb(0,0,0)';

    public constructor(red: number = 0, green: number = 0, blue: number = 0) {
        this.red = new DynamicNumber(red);
        this.green = new DynamicNumber(green);
        this.blue = new DynamicNumber(blue);
    }

    public get value(): string {
        return this.currentValue;
    }

    public get isActive(): boolean {
        return this.colors.some(color => color.isActive);
    }

    public get isComplete(): boolean {
        return this.colors.every(color => color.isComplete);
    }

    public setValue(red: number, green: number, blue: number): void {
        this.complete();
        this.red.setValue(this.clamp(red));
        this.green.setValue(this.clamp(green));
        this.blue.setValue(this.clamp(blue));
        this.updateCurrent();
    }

    public addChange(props: tChangeColorTo): void {
        this.changes.push(props);
    }

    public next(): void {
        const next = this.changes.shift();
        if (!next) throw new Error('no next value');
        if (next.red !== this.red.value || next.green !== this.green.value || next.blue !== this.blue.value) {
            if (next.duration === 0) this.setValue(next.red, next.green, next.blue);
            else if (next.duration) {
                this.complete();
                this.red.addChange({
                    duration: next.duration,
                    ease: next.ease,
                    value: this.clamp(next.red)
                });
                this.green.addChange({
                    duration: next.duration,
                    ease: next.ease,
                    value: this.clamp(next.green)
                });
                this.blue.addChange({
                    duration: next.duration,
                    ease: next.ease,
                    value: this.clamp(next.blue)
                });
                this.red.next();
                this.green.next();
                this.blue.next();
            }
        }
    }

    public update(deltaTime: number): void {
        if (this.isActive) {
            this.colors.forEach(color => { if (color.isActive) color.update(deltaTime) });
            this.updateCurrent();
        }
    }

    public complete(): void {
        this.colors.forEach(color => color.complete());
    }

    private updateCurrent(): void {
        this.currentValue = `rgb(${this.red.value},${this.green.value},${this.blue.value})`;
    }

    private clamp(value: number): number {
        return clamp(value, 0, 255);
    }

    private get colors(): iDynamic[] {
        return [
            this.red,
            this.green,
            this.blue
        ];
    }

}