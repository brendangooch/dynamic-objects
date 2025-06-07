/**
 * 
 */

import { DynamicBezier } from "./dynamic-bezier.js";
import { DynamicVector } from "./dynamic-vector.js";
import type { iDeferrable, iDynamic, tChangePositionTo } from "./index.js";


export class DynamicPosition implements iDynamic, iDeferrable {

    private vector: DynamicVector = new DynamicVector();
    private bezier: DynamicBezier = new DynamicBezier();
    private current: DynamicVector | DynamicBezier = this.vector;
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
        return this.current.isActive;
    }

    public get isComplete(): boolean {
        return this.current.isComplete;
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
        if (next.angle && next.distance) this.nextBezier(next);
        else this.nextVector(next);
    }

    public update(deltaTime: number): void {
        if (this.isActive) {
            this.current.update(deltaTime);
            this.updateValue();
        }
    }

    public complete(): void {
        this.current.complete();
    }

    private nextBezier(next: tChangePositionTo): void {
        this.bezier.setValue(this.x, this.y);
        this.bezier.addChange(next);
        this.bezier.next();
        this.current = this.bezier;
    }

    private nextVector(next: tChangePositionTo): void {
        this.vector.setValue(this.x, this.y);
        this.vector.addChange(next);
        this.vector.next();
        this.current = this.vector;
    }

    private updateValue(): void {
        this.properties.x = this.current.x;
        this.properties.y = this.current.y;
    }

}