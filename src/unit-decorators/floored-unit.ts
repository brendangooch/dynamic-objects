/**
 * a unit whose current output is always 0
 * seems counterintuitive but used by DynamicWaveForm to generate a square wave
 */

import type { iDynamicUnit } from "../types/i-dynamic-unit.js";
import { BaseUnitDecorator } from "./base-unit-decorator.js";

export class FlooredUnit extends BaseUnitDecorator {

    public override get current(): number {
        return Math.floor(this.unit.current);
    }

    public override clone(): iDynamicUnit {
        return new FlooredUnit(this.unit.clone());
    }

}