/**
 * a unit whose current output is always 0
 * seems counterintuitive but used by DynamicWaveForm to generate a square wave
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iDynamicUnit } from "../types/i-dynamic-unit.js";
import { BaseUnitDecorator } from "./base-unit-decorator.js";

export class FlooredUnit extends BaseUnitDecorator {

    public override get current(): number {
        return Math.floor(this.unit.current);
    }

    public override duration(ms: number): FlooredUnit {
        this.unit.duration(ms);
        return this;
    }

    public override ease(easeOption: tEaseOption): FlooredUnit {
        this.unit.ease(easeOption);
        return this;
    }

    public override clone(): iDynamicUnit {
        return new FlooredUnit(this.unit.clone());
    }

}