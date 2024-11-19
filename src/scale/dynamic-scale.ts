/**
 * represents a scale between 0 and infinity
 * a number with the next value clamped above 0
 * current value is also rounded to 2 decimal places for improved canvas rendering performance
 * 
 */

import type { tEaseOption } from "@brendangooch/ease";
import { DynamicNumber } from "../number/dynamic-number.js";
import { roundToPlaces } from "@brendangooch/maths";

export class DynamicScale extends DynamicNumber {

    public constructor(initial: number = 1) {
        super(Math.max(0, initial));
    }

    public override get current(): number {
        return roundToPlaces(super.current, 2);
    }

    public override duration(ms: number): DynamicScale {
        super.duration(ms);
        return this;
    }

    public override speed(unitsPerMS: number): DynamicScale {
        super.speed(unitsPerMS);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicScale {
        super.ease(easeOption);
        return this;
    }

    public override next(n: number): DynamicScale {
        super.next(Math.max(0, n));
        return this;
    }

}