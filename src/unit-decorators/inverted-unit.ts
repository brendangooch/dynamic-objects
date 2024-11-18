/**
 * a dynamic unit with inverted output from 1 - 0
 * used by DynamicWaveForm to form triangle wave
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iDynamicUnit } from "../types/i-dynamic-unit.js";
import { BaseUnitDecorator } from "./base-unit-decorator.js";

export class InvertedUnit extends BaseUnitDecorator {

    public override get current(): number {
        return 1 - this.unit.current;
    }

    public override duration(ms: number): InvertedUnit {
        this.unit.duration(ms);
        return this;
    }

    public override ease(easeOption: tEaseOption): InvertedUnit {
        this.unit.ease(easeOption);
        return this;
    }

    public override clone(): iDynamicUnit {
        return new InvertedUnit(this.unit.clone());
    }

}