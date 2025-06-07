/**
 * 
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iDeferrable, iDynamic, tChangeWaveTo } from "./index.js";
import { DynamicUnit } from "./dynamic-unit.js";

export class DynamicWave implements iDynamic, iDeferrable {

    private cycle: DynamicUnit = new DynamicUnit();
    private changes: tChangeWaveTo[] = [];
    private completed: boolean = true;
    private ease: tEaseOption;
    private numCycles: number;
    private cycleDuration: number;
    private up: boolean;
    private square: boolean;
    private currentValue: number = 0;

    public constructor(value: number = 0) {
        this.currentValue = value;
    }

    public get value(): number {
        return this.currentValue;
    }

    public get isActive(): boolean {
        return !this.isComplete;
    }

    public get isComplete(): boolean {
        return this.completed;
    }

    public setValue(value: number): void {
        this.complete();
        this.currentValue = value;
    }

    public addChange(props: tChangeWaveTo): void {
        if (props.duration <= 0) throw new Error('duration must be greater than zero');
        this.changes.push(props);
    }

    public next(): void {
        const next = this.changes.shift();
        if (!next) throw new Error('no next value');
        this.complete();
        this.ease = next.ease;
        this.numCycles = next.numCycles;
        this.cycleDuration = next.duration / next.numCycles;
        this.square = next.square;
        this.up = next.up;
        this.currentValue = (this.up) ? 0 : 1;
        this.restartCycle();
        this.completed = false;
    }

    public update(deltaTime: number): void {
        if (!this.isComplete) {
            this.cycle.update(deltaTime);
            this.updateValue();
            if (this.cycle.isComplete) this.cycleComplete();
        }
    }

    public complete(): void {
        this.completed = true;
        this.cycle.complete();
    }

    private updateValue(): void {
        const value = (this.square) ? 1 : this.cycle.value;
        this.currentValue = (this.up) ? value : 1 - value;
    }

    private cycleComplete(): void {
        this.numCycles--;
        if (this.numCycles === 0) this.complete();
        else {
            this.flipDirection();
            this.restartCycle();
        }
    }

    private flipDirection(): void {
        this.up = !this.up;
    }

    private restartCycle(): void {
        this.cycle.run(this.cycleDuration, this.ease);
    }

}