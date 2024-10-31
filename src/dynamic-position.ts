/**
 * aggregates vector and bezier into one class, choosing the most efficient option depending on curved or straight path required
 *
 */

import { tEaseOption } from "@brendangooch/ease";
import { DynamicQuadraticBezier } from "./dynamic-quadratic-bezier.js";
import { DynamicVector } from "./dynamic-vector.js";
import { iDynamic } from "./index.js";
import { Vector2D } from "@brendangooch/maths";

export class DynamicPosition implements iDynamic {

    private bezier: DynamicQuadraticBezier;
    private vector: DynamicVector;
    private strategy: DynamicVector | DynamicQuadraticBezier;
    private currentStrategy: 'vector' | 'bezier';

    public constructor(x: number = 0, y: number = 0) {
        this.vector = new DynamicVector(new Vector2D(x, y));
        this.bezier = new DynamicQuadraticBezier(new Vector2D(x, y));
        this.strategy = this.vector;
        this.currentStrategy = 'vector';
    }

    public get isActive(): boolean {
        return this.strategy.isActive;
    }

    public get x(): number {
        return this.strategy.current.x;
    }

    public get y(): number {
        return this.strategy.current.y;
    }

    public duration(ms: number): DynamicPosition {
        if (!this.isActive) {
            this.vector.duration(ms);
            this.bezier.duration(ms);
        }
        return this;
    }

    public speed(unitsPerMs: number): DynamicPosition {
        if (!this.isActive) {
            this.vector.speed(unitsPerMs);
            this.bezier.speed(unitsPerMs);
        }
        return this;
    }

    public ease(easeOption: tEaseOption): DynamicPosition {
        if (!this.isActive) {
            this.vector.ease(easeOption);
            this.bezier.ease(easeOption);
        }
        return this;
    }

    // switch to vector
    public moveTo(x: number, y: number): number {
        if (!this.isActive) {
            if (!this.isVector) this.switchStrategy();
            this.bezier = new DynamicQuadraticBezier(new Vector2D(x, y)); // reloading resets duration/speed/ease
            return this.strategy.changeTo(new Vector2D(x, y));
        }
        return 0;
    }

    // switch to bezier
    public curveTo(x: number, y: number, distance: number, angle: number): number {
        if (!this.isActive) {
            if (this.isVector) this.switchStrategy();
            this.bezier.controlPoint(distance, angle);
            this.vector = new DynamicVector(new Vector2D(x, y)); // reloading resets duration/speed/ease
            return this.strategy.changeTo(new Vector2D(x, y));
        }
        return 0;
    }

    public update(ms: number): void {
        this.strategy.update(ms);
    }

    public load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.bezier === undefined) return false;
        if (state.vector === undefined) return false;
        if (state.currentStrategy === undefined) return false;
        this.bezier.load(state.bezier);
        this.vector.load(state.vector);
        if (state.currentStrategy === 'vector') this.loadVector();
        else this.loadBezier();
        return true;
    }

    public save(): string {
        return JSON.stringify({
            bezier: this.bezier.save(),
            vector: this.vector.save(),
            currentStrategy: this.currentStrategy
        });
    }

    protected get isVector(): boolean {
        return this.currentStrategy === 'vector';
    }

    protected switchStrategy(): void {
        if (this.currentStrategy === 'vector') this.loadBezier();
        else this.loadVector();
    }

    protected loadVector(): void {
        this.strategy = this.vector;
        this.currentStrategy = 'vector';
    }

    protected loadBezier(): void {
        this.strategy = this.bezier;
        this.currentStrategy = 'bezier';
    }

}