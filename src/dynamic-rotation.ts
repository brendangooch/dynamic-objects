/**
 * 
 */

import { DynamicNumber } from "./dynamic-number.js";
import type { iDeferrable, iDynamic, tChangeRotationTo } from "./index.js";


export class DynamicRotation implements iDynamic, iDeferrable {

    private rotation: DynamicNumber;
    private changes: tChangeRotationTo[] = [];
    private spinAmount: number = 0;

    public constructor(value: number = 0) {
        this.rotation = new DynamicNumber(value);
    }

    public get value(): number {
        return this.rotation.value;
    }

    public get isActive(): boolean {
        return this.rotation.isActive;
    }

    public get isComplete(): boolean {
        return this.rotation.isComplete;
    }

    public setValue(value: number): void {
        this.rotation.setValue(value);
    }

    public addChange(props: tChangeRotationTo): void {
        if (props.duration <= 0) throw new Error('duration must be greater than zero');
        this.changes.push(props);
    }

    public next(): void {
        const next = this.changes.shift();
        if (!next) throw new Error('no next value');
        this.complete();
        this.spinAmount = Math.PI * 2 * next.spin;
        this.rotation.addChange({
            value: next.value + this.spinAmount,
            duration: next.duration,
            ease: next.ease
        });
        this.rotation.next();
    }

    public update(deltaTime: number): void {
        if (this.isActive) {
            this.rotation.update(deltaTime);
            if (this.rotation.isComplete) this.removeSpin();
        }
    }

    public complete(): void {
        this.rotation.complete();
    }

    private removeSpin(): void {
        this.rotation.setValue(this.rotation.value - this.spinAmount);
        this.spinAmount = 0;
    }

}