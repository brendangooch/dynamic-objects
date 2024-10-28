/**
 * floors DynamicUnit output so unit outputs a value of 0 only
 * seems counterintuitive but when combines with inverted unit and repeated it's possible to create a square wave effect
 */

import { BaseUnitDecorator } from "./base-unit-decorator.js";
import { iDynamicUnit } from "./index.js";

export class FlooredDynamicUnit extends BaseUnitDecorator {

    public override get current(): number {
        return Math.floor(this.unit.current);
    }

    public clone(): iDynamicUnit {
        return new FlooredDynamicUnit(this.unit.clone());
    }

}