/**
 * 
 */

import { QuadraticBezierCurve } from "@brendangooch/maths";
import { DynamicUnit } from "./dynamic-unit.js";
import { Vector2D } from "@brendangooch/maths";

export class DynamicPosition {

    private unit: DynamicUnit = new DynamicUnit();

    // @ts-ignore
    private start: Vector2D;
    // @ts-ignore
    private end: Vector2D;
    // @ts-ignore
    private control: Vector2D;
    // @ts-ignore
    private bezier: QuadraticBezierCurve;

    public constructor(x: number = 0, y: number = 0) {
        this.moveImmediate(x, y);
    }

    public get x(): number {
        return this.bezier.x(this.unit.current);
    }

    public get y(): number {
        return this.bezier.y(this.unit.current);
    }

    public get isOn(): boolean {
        return this.unit.isOn;
    }

    public get isComplete(): boolean {
        return this.unit.isComplete;
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public save(): string {
        return JSON.stringify({
            start: {
                x: this.start.x,
                y: this.start.y
            },
            end: {
                x: this.end.x,
                y: this.end.y
            },
            control: {
                x: this.control.x,
                y: this.control.y
            },
            unit: this.unit.save()
        });
    }

    public load(json: string): void {
        const state = JSON.parse(json);
        if (state.start === undefined) throw new Error('missing "start" property');
        if (state.end === undefined) throw new Error('missing "end" property');
        if (state.control === undefined) throw new Error('missing "control" property');
        if (state.unit === undefined) throw new Error('missing "unit" property');
        this.start = new Vector2D(state.start.x, state.start.y);
        this.end = new Vector2D(state.end.x, state.end.y);
        this.control = new Vector2D(state.control.x, state.control.y);
        this.updateBezier();
        this.unit.load(state.unit);
    }

    public update(ms: number): void {
        if (this.unit.isOn) this.unit.update(ms);
        if (this.unit.isComplete && this.start.distanceTo(this.end) > 0) this.moveImmediate(this.end.x, this.end.y);
    }

    // move in a STRAIGHT line
    // duration === 0 changes current position immediately
    public moveTo(x: number, y: number, duration: number, ease?: tEaseOption): void {
        if (this.isComplete && duration >= 0) {
            if (duration === 0) this.moveImmediate(x, y);
            else this.moveStraight(x, y, duration, ease);
        }
    }

    // move in a CURVED line
    // rotation is the rotation away from the start vector
    // distance is the distance away from the start vector
    public curveTo(x: number, y: number, rotation: number, distance: number, duration: number, ease?: tEaseOption): void {
        if (this.isComplete && duration > 0) {
            this.end = new Vector2D(x, y);
            this.curvedPath(rotation, distance);
            this.updateBezier();
            this.restartUnit(duration, ease);
        }
    }

    private updateBezier(): void {
        this.bezier = new QuadraticBezierCurve(this.start, this.control, this.end);
    }

    private moveImmediate(x: number, y: number): void {
        this.start = new Vector2D(x, y);
        this.end = this.start.clone();
        this.control = this.start.clone();
        this.updateBezier();
    }

    private moveStraight(x: number, y: number, duration: number, ease?: tEaseOption): void {
        this.end = new Vector2D(x, y);
        this.straightPath();
        this.updateBezier();
        this.restartUnit(duration, ease);
    }

    private straightPath(): void {
        this.control = this.start.subtract(this.end);
        this.control.normalize();
        this.control.angle += Math.PI;
        this.control.length = this.start.distanceTo(this.end) / 2;
        this.control.addTo(this.start);
    }

    private curvedPath(rotation: number, distance: number): void {
        this.control = this.start.subtract(this.end);
        this.control.normalize();
        this.control.angle += Math.PI + rotation;
        this.control.length = distance;
        this.control.addTo(this.start);
    }

    private restartUnit(duration: number, ease?: tEaseOption): void {
        if (ease !== undefined) this.unit.start(duration, { ease: ease });
        else this.unit.start(duration);
    }

}