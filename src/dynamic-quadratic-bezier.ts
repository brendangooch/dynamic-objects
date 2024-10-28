/**
 * a point on a quadratic bezier curve that changes its position over time
 */

import { tEaseOption } from "@brendangooch/ease";
import { DynamicVector } from "./dynamic-vector.js";
import { QuadraticBezierCurve, Vector2D } from "@brendangooch/maths";

export class DynamicQuadraticBezier extends DynamicVector {

    private bezier = new QuadraticBezierCurve();
    private controlDistance: number = 0;
    private controlAngle: number = 0;

    public override duration(ms: number): DynamicQuadraticBezier {
        super.duration(ms);
        return this;
    }

    public override speed(unitsPerMs: number): DynamicQuadraticBezier {
        super.speed(unitsPerMs);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicQuadraticBezier {
        super.ease(easeOption);
        return this;
    }

    public controlPoint(distance: number, angle: number): DynamicQuadraticBezier {
        if (!this.isActive) {
            this.controlDistance = distance;
            this.controlAngle = angle;
        }
        return this;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            bezier: this.bezier.save(),
            controlDistance: this.controlDistance,
            controlAngle: this.controlAngle
        });
    }

    public override load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.parent === undefined) return false;
        if (state.bezier === undefined) return false;
        if (state.controlDistance === undefined) return false;
        if (state.controlAngle === undefined) return false;
        const parentLoaded = super.load(state.parent);
        this.bezier.load(state.bezier);
        this.controlDistance = state.controlDistance;
        this.controlAngle = state.controlAngle;
        return parentLoaded;
    }

    // 
    // protected override setAll(v: Vector2D): void {
    //     super.setAll(v);
    //     this.bezier.setAll(v.x, v.y);
    // }

    protected override updateCurrent(): void {
        this.currentValue.setX(this.bezier.x(this.unit.current));
        this.currentValue.setY(this.bezier.y(this.unit.current));
    }

    // set the internal bezier curve up correctly
    protected override preDynamicChangeHook(): void {
        this.bezier.setStart(this.previous.x, this.previous.y);
        this.bezier.setEnd(this.next.x, this.next.y);
        this.bezier.setControlByDistanceAndAngleFromStart(this.controlDistance, this.controlAngle);
    }

    protected override reset(): void {
        super.reset();
        this.controlDistance = 0;
        this.controlAngle = 0;
    }

}