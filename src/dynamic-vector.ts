/**
 *
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic } from "./index.js";
import { Vector2D } from "@brendangooch/maths";
import { BaseDynamicObjectWithUnit } from "./base-dynamic-object-with-unit.js";

export class DynamicVector extends BaseDynamicObjectWithUnit implements iDynamic {

    private previous: Vector2D = new Vector2D();
    private next: Vector2D = new Vector2D();
    private current: Vector2D = new Vector2D();
    private difference: Vector2D = new Vector2D();

    public constructor(x: number = 0, y: number = 0) {
        super();
        this.setAll(new Vector2D(x, y));
    }

    public get x(): number {
        return this.current.x;
    }

    public get y(): number {
        return this.current.y;
    }

    public override duration(ms: number): DynamicVector {
        super.duration(ms);
        return this;
    }

    public override speed(unitsPerMs: number): DynamicVector {
        super.speed(unitsPerMs);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicVector {
        super.ease(easeOption);
        return this;
    }

    public moveTo(x: number, y: number): boolean {
        if (this.canMove(x, y)) return this.doMove(x, y);
        return false;
    }

    public moveBy(x: number, y: number): boolean {
        return this.moveTo(x + this.x, y + this.y);
    }

    // extract some
    public load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.unit === undefined) return false;
        if (state.previous === undefined) return false;
        if (state.next === undefined) return false;
        if (state.current === undefined) return false;
        if (state.difference === undefined) return false;
        if (state.duration === undefined) return false;
        if (state.speed === undefined) return false;
        if (state.isOn === undefined) return false;
        this.unit.load(state.unit);
        this.previous.load(state.previous);
        this.next.load(state.next);
        this.current.load(state.current);
        this.difference.load(state.difference);
        this.dur = state.duration;
        this.spd = state.speed;
        this.isOn = state.isOn;
        return true;
    }

    // extract some
    public save(): string {
        return JSON.stringify({
            unit: this.unit.save(),
            previous: this.previous.save(),
            next: this.next.save(),
            current: this.current.save(),
            difference: this.difference.save(),
            duration: this.dur,
            speed: this.spd,
            isOn: this.isOn
        });
    }

    // make protected, add abstract in parent
    private setAll(v: Vector2D): void {
        this.previous.copy(v);
        this.next.copy(v);
        this.current.copy(v);
        this.updateDifference();
    }

    private updateDifference(): void {
        this.difference = this.next.subtract(this.previous);
    }

    protected updateCurrent(): void {
        this.current = this.previous.add(this.difference.multiply(this.unit.current));
    }

    // extract
    protected updateComplete(): void {
        this.setAll(this.next);
        this.spd = 0;
        this.dur = 0;
        this.turnOff();
    }

    protected get diff(): number {
        return this.difference.length;
    }

    private canMove(x: number, y: number): boolean {
        return !this.isActive && (x !== this.current.x || y !== this.current.y);
    }

    private doMove(x: number, y: number): boolean {
        this.next.setXY(x, y);
        this.updateDifference();
        this.updateDuration();
        if (this.dur > 0) this.dynamicMove();
        else this.instantMove();
        return true;
    }

    private instantMove(): void {
        this.setAll(this.next);
    }

    private dynamicMove(): void {
        this.turnOn();
        this.unit.duration(this.dur).run();
    }

}