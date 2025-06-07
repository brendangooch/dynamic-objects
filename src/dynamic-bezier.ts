/**
 * 
 */

import { QuadraticBezier } from "@brendangooch/bezier";
import type { iDeferrable, iDynamic, tChangePositionTo } from "./index.js";
import { DynamicUnit } from "./dynamic-unit.js";

export class DynamicBezier implements iDynamic, iDeferrable {

    private unit: DynamicUnit = new DynamicUnit();
    private bezier: QuadraticBezier = new QuadraticBezier();
    private changes: tChangePositionTo[] = [];
    private properties = {
        x: 0,
        y: 0
    };

    public constructor(x: number = 0, y: number = 0) {
        this.properties.x = x;
        this.properties.y = y;
    }

    public get x(): number {
        return this.properties.x;
    }

    public get y(): number {
        return this.properties.y;
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get isComplete(): boolean {
        return this.unit.isComplete;
    }

    public setValue(x: number, y: number): void {
        this.complete();
        this.properties.x = x;
        this.properties.y = y;
    }

    public addChange(props: tChangePositionTo): void {
        if (props.duration <= 0) throw new Error('duration must be greater than zero');
        this.changes.push(props);
    }

    public next(): void {
        const next = this.changes.shift();
        if (!next) throw new Error('no next value');
        this.complete();
        this.bezier.setStart(this.x, this.y);
        this.bezier.setEnd(next.x, next.y);
        if (next.angle && next.distance) this.bezier.setControlByAngleDistance(next.angle, next.distance);
        else this.bezier.makeStraight();
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
        this.bezier.setT(this.unit.value);
        this.properties.x = this.bezier.x;
        this.properties.y = this.bezier.y;
    }

}