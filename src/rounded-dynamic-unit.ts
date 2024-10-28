/**
 * rounds DynamicUnit output so unit outputs a value of either 0 or 1
 */

import { BaseUnitDecorator } from "./base-unit-decorator.js";
import { iDynamicUnit } from "./index.js";

export class RoundedDynamicUnit extends BaseUnitDecorator {

    public override get current(): number {
        return Math.round(this.unit.current);
    }

    public clone(): iDynamicUnit {
        return new RoundedDynamicUnit(this.unit.clone());
    }

}