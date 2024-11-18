/**
 * a vector that changes its position over time
 */

import type { tEaseOption } from "@brendangooch/ease";
import { BaseDynamicObject } from "../base-dynamic-object.js";
import { DynamicUnit } from "../unit/dynamic-unit.js";
import type { Vector2D } from "@brendangooch/maths";


export class DynamicVector extends BaseDynamicObject {

    private unit: DynamicUnit;
    private currentValue: Vector2D;
    private previousValue: Vector2D;
    private nextValue: Vector2D;

    public constructor(x: number = 0, y: number = 0) {
        super();
        this.setAll(x, y);
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get x(): number {
        return this.currentValue.x;
    }

    public get y(): number {
        return this.currentValue.y;
    }

    public override save(): string {
        return '';
    }

    public override load(json: string): void { }

    public override duration(ms: number): DynamicVector {
        super.duration(ms);
        return this;
    }

    public override speed(unitsPerMS: number): DynamicVector {
        super.speed(unitsPerMS);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicVector {
        super.ease(easeOption);
        return this;
    }

    // 
    public next(x: number, y: number): DynamicVector {
        //
        return this;
    }

    // 
    public move(): boolean {
        return false;
    }

    // stop unit, set all to current
    public stop(): void { }


    // abstract parent methods
    protected override increment(ms: number): void {
        this.unit.update(ms);
        this.updateCurrent();
    }

    // hooks
    protected override postUpdateComplete(): void {

    }

    protected override postReset(): void {

    }

    // private methods
    private updateCurrent(): void {
        //
    }

    private setAll(x: number, y: number): void {
        //
    }

    private setAllToCurrent(): void {
        //
    }

    private updateDistance(): void {
        //
    }

    private canMove(): boolean {
        return false;
    }

    private doMove(): void {
        //
    }

    private instantMove(): void {
        //
    }

    private dynamicMove(): void {
        //
    }

}