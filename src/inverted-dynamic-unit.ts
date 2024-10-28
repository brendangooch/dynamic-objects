/**
 * inverts DynamicUnit output so unit outputs a value of 1 - 0 rather than 0 - 1
 */

import { BaseUnitDecorator } from "./base-unit-decorator.js";
import { iDynamicUnit } from "./index.js";

export class InvertedDynamicUnit extends BaseUnitDecorator {

    public override get current(): number {
        return 1 - this.unit.current;
    }

    public clone(): iDynamicUnit {
        return new InvertedDynamicUnit(this.unit.clone());
    }

}