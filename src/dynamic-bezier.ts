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
    private current: Vector2D = new Vector2D();
    private distanceBetween: number = 0; // the distance between start and end point on the path
    private bezier: QuadraticBezierCurve = new QuadraticBezierCurve();
    private next: Vector2D = new Vector2D();
    private _control = { distance: 0, angle: 0 };
    private _duration: number = 0;
    private _speed: number = 0;

    public constructor(x: number = 0, y: number = 0) {
        super();
        this.setAll(x, y);
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get x(): number {
        return this.current.x;
    }

    public get y(): number {
        return this.current.y;
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

    public control(distance: number, angle: number): DynamicBezier {
        if (!this.isActive) {
            this._control.distance = distance;
            this._control.angle = angle;
        }
        return this;
    }

    public moveTo(x: number, y: number): boolean {
        if (this.canMove(x, y)) return this.doMove(x, y);
        return false;
    }

    public moveBy(x: number, y: number): boolean {
        return this.moveTo(this.x + x, this.y + y);
    }

    public load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.unit === undefined) return false;
        if (state.current === undefined) return false;
        if (state.distanceBetween === undefined) return false;
        if (state.bezier === undefined) return false;
        if (state.next === undefined) return false;
        if (state.control === undefined) return false;
        if (state.duration === undefined) return false;
        if (state.speed === undefined) return false;
        if (state.isOn === undefined) return false;
        this.unit.load(state.unit);
        this.current.load(state.current);
        this.distanceBetween = state.distanceBetween;
        this.bezier.load(state.bezier);
        this.next.load(state.next);
        this._control = state.control;
        this._duration = state.duration;
        this._speed = state.speed;
        this.isOn = state.isOn;
        return true;
    }

    public save(): string {
        return JSON.stringify({
            unit: this.unit.save(),
            current: this.current.save(),
            distanceBetween: this.distanceBetween,
            bezier: this.bezier.save(),
            next: this.next.save(),
            control: this._control,
            duration: this._duration,
            speed: this._speed,
            isOn: this.isOn
        });
    }

    protected setAll(x: number, y: number): void {
        this.current.setXY(x, y);
        this.next.setXY(x, y);
        this.bezier.setAll(x, y);
        this.distanceBetween = 0;
    }

    protected increment(ms: number): void {
        this.unit.update(ms);
    }

    protected updateCurrent(): void {
        this.current.setX(this.bezier.x(this.unit.current));
        this.current.setY(this.bezier.y(this.unit.current));
    }

    protected updateComplete(): void {
        this.setAll(this.current.x, this.current.y);
        this.resetControlPoint();
        this._speed = 0;
        this._duration = 0;
        this.turnOff();
    }

    protected updateDuration(): void {
        if (this._speed !== 0 && this.distanceBetween > 0) this._duration = Math.abs(this.distanceBetween / this._speed);
    }

    // = distance between current and vector(x,y)
    protected updateDistanceBetween(): void {
        this.distanceBetween = this.current.distanceTo(this.next);
    }

    protected canMove(x: number, y: number): boolean {
        return !this.isActive && (x !== this.x || y !== this.y);
    }

    protected doMove(x: number, y: number): boolean {
        this.next.setXY(x, y);
        this.updateDistanceBetween();
        this.updateDuration();
        if (this._duration > 0) this.dynamicMove();
        else this.instantMove();
        return true;
    }

    protected instantMove(): void {
        this.setAll(this.next.x, this.next.y);
    }

    protected dynamicMove(): void {
        this.bezier.setEnd(this.next.x, this.next.y);
        if (this.hasControlPoint) this.bezier.setControlByDistanceAndAngleFromStart(this._control.distance, this._control.angle);
        else this.bezier.makeStraight();
        this.turnOn();
        this.unit.duration(this._duration).run();
    }

    protected get hasControlPoint(): boolean {
        return this._control.distance !== 0 && this._control.angle !== 0;
    }

    protected resetControlPoint(): void {
        this._control.distance = 0;
        this._control.angle = 0;
    }

};