/**
 * rounds DynamicUnit output so unit outputs a value of either 0 or 1
 */

import { BaseDynamicUnit } from "./base-dynamic-unit.js";
import { iDynamicUnit } from "./index.js";

export class RoundedDynamicUnit extends BaseDynamicUnit implements iDynamicUnit {

    public override get current(): number {
        return Math.round(this.unit.current);
    }

}