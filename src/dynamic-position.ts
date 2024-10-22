/**
 * aggregates vector and bezier into one class, choosing the most efficient option depending on curved or straight path required
 * 
 */

import { tEaseOption } from "@brendangooch/ease";
import { DynamicBezier } from "./dynamic-bezier.js";
import { DynamicVector } from "./dynamic-vector.js";
import { iDynamic } from "./index.js";

export class DynamicPosition implements iDynamic {

    private bezier: DynamicBezier;
    private vector: DynamicVector;
    private strategy: DynamicVector | DynamicBezier;
    private currentStrategy: 'vector' | 'bezier';

    public constructor(x: number = 0, y: number = 0) {
        this.vector = new DynamicVector(x, y);
        this.bezier = new DynamicBezier(x, y);
        this.strategy = this.vector;
        this.currentStrategy = 'vector';
    }

    public get isActive(): boolean {
        return this.strategy.isActive;
    }

    public get x(): number {
        return this.strategy.x;
    }

    public get y(): number {
        return this.strategy.y;
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
    public moveTo(x: number, y: number): boolean {
        if (!this.isActive) {
            if (!this.isVector) this.switchStrategy();
            return this.strategy.moveTo(x, y);
        }
        return false;
    }

    public moveBy(x: number, y: number): boolean {
        return this.moveTo(this.x + x, this.y + y);
    }

    // switch to bezier
    public curveTo(x: number, y: number, distance: number, angle: number): boolean {
        if (!this.isActive) {
            if (this.isVector) this.switchStrategy();
            this.bezier.control(distance, angle);
            return this.strategy.moveTo(x, y);
        }
        return false;
    }

    public turnOn(): void {
        this.strategy.turnOn();
    }

    public turnOff(): void {
        this.strategy.turnOff();
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

// import { tEaseOption } from "@brendangooch/ease";
// import { iDynamic } from "./index.js";
// import { DynamicVector } from "./dynamic-vector.js";
// import { DynamicBezier } from "./dynamic-bezier.js";

// export class DynamicPosition implements iDynamic {

//     private vector: DynamicVector;
//     private bezier: DynamicBezier;
//     private strategy: DynamicVector | DynamicBezier;
//     private isVector: boolean;
//     private _duration: number = 0;
//     private _speed: number = 0;
//     private _ease: tEaseOption = 'noEase';

//     // default strategy is vector
//     public constructor(x: number = 0, y: number = 0) {
//         this.vector = new DynamicVector(x, y);
//         this.bezier = new DynamicBezier(x, y);
//         this.strategy = this.vector;
//         this.isVector = true;
//     }

//     public get isActive(): boolean {
//         return this.strategy.isActive;
//     }

//     public get x(): number {
//         return this.strategy.x;
//     }

//     public get y(): number {
//         return this.strategy.y;
//     }

//     public duration(ms: number): DynamicPosition {
//         if (!this.isActive) {
//             this._duration = ms;
//             this._speed = 0;
//         }
//         return this;
//     }

//     public speed(unitsPerMs: number): DynamicPosition {
//         if (!this.isActive) {
//             this._speed = unitsPerMs;
//             this._duration = 0;
//         }
//         return this;
//     }

//     public ease(easeOption: tEaseOption): DynamicPosition {
//         if (!this.isActive) {
//             this._ease = easeOption;
//         }
//         return this;
//     }

//     // switch strategy to vector (if not already)
//     public moveTo(x: number, y: number): boolean {
//         if (!this.isActive) {
//             if (!this.isVector) {
//                 this.vector = new DynamicVector(this.x, this.y);
//                 if (this._duration > 0) this.vector.duration(this._duration);
//                 if (this._speed > 0) this.vector.duration(this._speed);
//                 this.vector.ease(this._ease);
//                 this.strategy = this.vector;
//                 this.isVector = true;
//             }
//             this.reset();
//             return this.strategy.moveTo(x, y);
//         }
//         return false;
//     }

//     // switch strategy to bezier (if not already)
//     // makes no sense to call curveTo() without setting speed or duration
//     public curveTo(x: number, y: number, distance: number, angle: number): boolean {
//         if (!this.isActive) {
//             if (this._duration === 0 && this._speed === 0) return false;
//             if (this.isVector) {
//                 this.bezier = new DynamicBezier(this.x, this.y);
//                 if (this._duration > 0) this.bezier.duration(this._duration);
//                 if (this._speed > 0) this.bezier.speed(this._speed);
//                 this.bezier.ease(this._ease);
//                 this.bezier.distance(distance).angle(angle);
//                 this.strategy = this.bezier;
//                 this.isVector = false;
//             }
//             this.reset();
//             return this.strategy.moveTo(x, y);
//         }
//         return false;
//     }

//     public moveBy(x: number, y: number): boolean {
//         return this.moveTo(this.x + x, this.y + y);
//     }

//     public curveBy(x: number, y: number, distance: number, angle: number): boolean {
//         return this.curveTo(this.x + x, this.y + y, distance, angle);
//     }

//     public turnOn(): void {
//         this.strategy.turnOn();
//     }

//     public turnOff(): void {
//         this.strategy.turnOff();
//     }

//     public update(ms: number): void {
//         this.strategy.update(ms);
//     }

//     public load(json: string): boolean {
//         const state = JSON.parse(json);
//         if (state.strategy === undefined) return false;
//         if (state.isVector === undefined) return false;
//         if (state.duration === undefined) return false;
//         if (state.speed === undefined) return false;
//         if (state.ease === undefined) return false;

//         //

//         return true;
//     }

//     public save(): string {
//         return JSON.stringify({
//             //
//         });
//     }

//     private reset(): void {
//         this._duration = 0;
//         this._speed = 0;
//         this._ease = 'noEase';
//     }

// }