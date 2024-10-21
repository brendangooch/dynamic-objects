/**
 * inverts DynamicUnit output so unit outputs a value of 1 - 0 rather than 0 - 1
 */

import { BaseDynamicUnit } from "./base-dynamic-unit.js";
import { iDynamicUnit } from "./index.js";

export class InvertedDynamicUnit extends BaseDynamicUnit implements iDynamicUnit {

    public override get current(): number {
        return 1 - this.unit.current;
    }

}