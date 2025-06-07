/**
 * 
 */

import { DynamicUnit } from "./dynamic-unit.js";
import type { iDeferrable, iDynamic, tChangeNumberTo } from "./index.js";


export class DynamicNumber implements iDynamic, iDeferrable {

    private unit: DynamicUnit = new DynamicUnit();
    private changes: tChangeNumberTo[] = [];
    private properties = {
        value: 0,
        previous: 0,
        distance: 0
    };

    public constructor(value: number = 0) {
        this.properties.value = value;
    }

    public get value(): number {
        return this.properties.value;
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get isComplete(): boolean {
        return this.unit.isComplete;
    }

    public setValue(value: number): void {
        this.complete();
        this.properties.value = value;
    }

    public addChange(props: tChangeNumberTo): void {
        if (props.duration <= 0) throw new Error('duration must be greater than zero');
        this.changes.push(props);
    }

    public next(): void {
        const next = this.changes.shift();
        if (!next) throw new Error('no next value');
        this.complete();
        this.properties.previous = this.properties.value;
        this.properties.distance = next.value - this.properties.previous;
        this.unit.run(next.duration, next.ease);
    }

    public update(deltaTime: number): void {
        if (this.isActive) {
            this.unit.update(deltaTime);
            this.updateValue();
        }
    }

    public complete(): void {
        this.unit.complete();
    }

    private updateValue(): void {
        this.properties.value = this.properties.previous + (this.properties.distance * this.unit.value);
    }

}