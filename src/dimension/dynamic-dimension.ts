/**
 * represents a dimension between 0 and infinity
 * a number with the next value clamped above 0
 * current value is also rounded for improved canvas rendering performance
 * 
 */

import type { tEaseOption } from "@brendangooch/ease";
import { DynamicNumber } from "../number/dynamic-number.js";

export class DynamicDimension extends DynamicNumber {

    public constructor(initial: number = 0) {
        super(Math.max(0, initial));
    }

    public override get current(): number {
        return Math.round(super.current);
    }

    public override duration(ms: number): DynamicDimension {
        super.duration(ms);
        return this;
    }

    public override speed(unitsPerMS: number): DynamicDimension {
        super.speed(unitsPerMS);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicDimension {
        super.ease(easeOption);
        return this;
    }

    public override next(n: number): DynamicDimension {
        super.next(Math.max(0, n));
        return this;
    }

}