/**
 * 
 */

import { Vector } from "@brendangooch/vector";
import type { iDeferrable, iDynamic, tChangePositionTo } from "./index.js";
import { DynamicUnit } from "./dynamic-unit.js";

export class DynamicVector implements iDynamic, iDeferrable {

    private unit: DynamicUnit = new DynamicUnit();
    private changes: tChangePositionTo[] = [];
    private properties = {
        current: Vector.create(),
        previous: Vector.create(),
        distance: Vector.create()
    };

    public constructor(x: number = 0, y: number = 0) {
        this.properties.current.setXY(x, y);
    }

    public get x(): number {
        return this.properties.current.x;
    }

    public get y(): number {
        return this.properties.current.y;
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get isComplete(): boolean {
        return this.unit.isComplete;
    }

    public setValue(x: number, y: number): void {
        this.complete();
        this.properties.current.setXY(x, y);
    }

    public addChange(props: tChangePositionTo): void {
        this.changes.push(props);
    }

    public next(): void {
        const next = this.changes.shift();
        if (!next) throw new Error('no next value');
        if (next.x !== this.x || next.y !== this.y) {
            if (next.duration === 0) this.setValue(next.x, next.y);
            else {
                this.complete();
                this.properties.previous.setXY(this.x, this.y);
                this.properties.distance.copy(Vector.create(next.x, next.y).sub(this.properties.previous));
                this.unit.run(next.duration, next.ease);
            }
        }
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
        this.properties.current.copy(this.properties.previous.clone().add(this.properties.distance.clone().mult(this.unit.value)));
    }

}