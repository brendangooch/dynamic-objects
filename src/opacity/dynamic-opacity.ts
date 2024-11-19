/**
 * represents an opacity between 0 and 1
 * a number with the next value clamped between 0 and 1
 * current value is also rounded to 2 decimal places for improved canvas rendering
 * 
 */

import type { tEaseOption } from "@brendangooch/ease";
import { DynamicNumber } from "../number/dynamic-number.js";
import { clamp, roundToPlaces } from "@brendangooch/maths";

export class DynamicOpacity extends DynamicNumber {

    public constructor(initial: number = 1) {
        super(clamp(initial, 0, 1));
    }

    public override get current(): number {
        return roundToPlaces(super.current, 2);
    }

    public override duration(ms: number): DynamicOpacity {
        super.duration(ms);
        return this;
    }

    public override speed(unitsPerMS: number): DynamicOpacity {
        super.speed(unitsPerMS);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicOpacity {
        super.ease(easeOption);
        return this;
    }

    public override next(n: number): DynamicOpacity {
        super.next(clamp(n, 0, 1));
        return this;
    }

    public fadeOut(): DynamicOpacity {
        if (!this.isActive) {
            this.next(0);
        }
        return this;
    }

    public fadeIn(): DynamicOpacity {
        if (!this.isActive) {
            this.next(1);
        }
        return this;
    }

}