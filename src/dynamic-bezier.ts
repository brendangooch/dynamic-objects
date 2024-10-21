/**
 * a number that changes its value over time
 */

import { tEaseOption } from "@brendangooch/ease";
import { iDynamic } from "./index.js";
import { DynamicUnit } from "./dynamic-unit.js";
import { AbstractDynamicObject } from "./abstract-dynamic-object.js";
import { QuadraticBezierCurve, Vector2D } from "@brendangooch/maths";

export class DynamicBezier extends AbstractDynamicObject implements iDynamic {

    private unit: DynamicUnit = new DynamicUnit();
    private previous: Vector2D = new Vector2D();
    private next: Vector2D = new Vector2D();
    private difference: Vector2D = new Vector2D();
    private _current: Vector2D = new Vector2D();
    private _duration: number = 0;
    private _speed: number = 0;
    private _control: Vector2D = new Vector2D();
    private _distance: number = 0;
    private _angle: number = 0;
    private bezier: QuadraticBezierCurve = new QuadraticBezierCurve();

    public constructor(x: number = 0, y: number = 0) {
        super();
        this.setAll(new Vector2D(x, y));
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get x(): number {
        return this._current.x;
    }

    public get y(): number {
        return this._current.y;
    }

    public duration(ms: number): DynamicBezier {
        if (!this.isActive && ms > 0) {
            this._duration = ms;
        }
        return this;
    }

    public speed(unitsPerMs: number): DynamicBezier {
        if (!this.isActive && unitsPerMs > 0) {
            this._speed = unitsPerMs;
        }
        return this;
    }

    public ease(easeOption: tEaseOption): DynamicBezier {
        if (!this.isActive) {
            this.unit.ease(easeOption);
        }
        return this;
    }

    public control(x: number, y: number): DynamicBezier {
        if (!this.isActive) {
            this._control = new Vector2D(x, y);
            this._distance = 0;
            this._angle = 0;
        }
        return this;
    }

    public distance(distance: number): DynamicBezier {
        if (!this.isActive) {
            this._control.setXY(0, 0);
            this._distance = distance;
        }
        return this;
    }

    public angle(angle: number): DynamicBezier {
        if (!this.isActive) {
            this._control.setXY(0, 0);
            this._angle = angle;
        }
        return this;
    }

    public moveTo(x: number, y: number): boolean {
        if (this.canChange(new Vector2D(x, y))) return this.doChange(new Vector2D(x, y));
        return false;
    }

    public moveBy(x: number, y: number): boolean {
        return this.moveTo(x + this.x, y + this.y);
    }

    public load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.unit === undefined) return false;
        if (state.previous === undefined) return false;
        if (state.next === undefined) return false;
        if (state.difference === undefined) return false;
        if (state.current === undefined) return false;
        if (state.duration === undefined) return false;
        if (state.speed === undefined) return false;
        if (state.isOn === undefined) return false;
        if (state.control === undefined) return false;
        if (state.distance === undefined) return false;
        if (state.angle === undefined) return false;
        if (state.bezier === undefined) return false;
        this.unit.load(state.unit);
        this.previous.load(state.previous);
        this.next.load(state.next);
        this.difference.load(state.difference);
        this._current.load(state.current);
        this._duration === state.duration;
        this._speed === state.speed;
        this.isOn === state.isOn;
        this._control.load(state.control);
        this._distance = state.distance;
        this._angle = state.angle;
        this.bezier.load(state.bezier);
        return true;
    }

    public save(): string {
        return JSON.stringify({
            unit: this.unit.save(),
            previous: this.previous.save(),
            next: this.next.save(),
            difference: this.difference.save(),
            current: this._current.save(),
            duration: this._duration,
            speed: this._speed,
            isOn: this.isOn,
            control: this._control.save(),
            distance: this._distance,
            angle: this._angle,
            bezier: this.bezier.save()
        });
    }

    protected setAll(v: Vector2D): void {
        this.previous.copy(v);
        this.next.copy(v);
        this._current.copy(v);
        this.bezier.setAll(v.x, v.y); // <--
        this.updateDifference();
    }

    protected setAllToNext(): void {
        this.setAll(this.next);
    }

    protected increment(ms: number): void {
        this.unit.update(ms);
    }

    protected updateCurrent(): void {
        this._current.setX(this.bezier.x(this.unit.current));
        this._current.setY(this.bezier.y(this.unit.current));
    }

    protected updateDifference(): void {
        this.difference = this.next.subtract(this.previous);
    }

    protected updateComplete(): void {
        this.setAllToNext();
        this._speed = 0;
        this._duration = 0;
        this.resetControl();
        this.turnOff();
    }

    protected updateDuration(): void {
        if (this._speed !== 0 && this.difference.length > 0) this._duration = Math.abs(this.difference.length / this._speed);
    }

    protected canChange(v: Vector2D): boolean {
        return !this.isActive && (v.x !== this.x || v.y !== this.y);
    }

    protected doChange(v: Vector2D): boolean {
        this.next.copy(v);
        this.updateDifference();
        this.updateDuration();
        if (this._duration > 0) this.dynamicChange();
        else this.instantChange();
        return true;
    }

    protected instantChange(): void {
        this.setAllToNext();
        this.resetControl();
    }

    protected dynamicChange(): void {

        this.bezier.setEnd(this.next.x, this.next.y);

        if (this._control.length > 0) {
            this.bezier.setControl(this._control.x, this._control.y);
        }

        else if (this._distance > 0 && this._angle > 0) {
            this.bezier.setControlByDistanceAndAngleFromStart(this._distance, this._angle);
        }

        else {
            this.bezier.makeStraight();
        }

        this.turnOn();
        this.unit.duration(this._duration).run();

    }

    protected resetControl(): void {
        this._control.setXY(0, 0);
        this._distance = 0;
        this._angle = 0;
    }

};