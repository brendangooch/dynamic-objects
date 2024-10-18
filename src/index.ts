/**
 * barrel file for package
 */

import { tEaseOption } from '@brendangooch/ease';
import { iUpdateable } from '@brendangooch/simple-game-loop';
import { DynamicUnit } from './dynamic-unit.js';

export interface iDynamic extends iUpdateable {
    get isActive(): boolean;
    run(): boolean;
    load(json: string): boolean;
    save(): string;
}

export interface iDynamicUnit extends iDynamic {
    get current(): number
    setDuration(ms: number): DynamicUnit
    setEase(easeOption: tEaseOption): DynamicUnit
}


// export { DynamicUnit } from './dynamic-unit.js';
// export { BaseDynamicUnit } from './unit/decorators/base-dynamic-unit.js'
// export { InvertedDynamicUnit } from './inverted-dynamic-unit.js'
// export { HalvedDynamicUnit } from './unit/decorators/halved-dynamic-unit.js'
// export { NegativeDynamicUnit } from './unit/decorators/negative-dynamic-unit.js'
// export { RoundedDownDynamicUnit } from './unit/decorators/rounded-down-dynamic-unit.js'
// export { RoundedUpDynamicUnit } from './unit/decorators/rounded-up-dynamic-unit.js'
// export { RoundedDynamicUnit } from './unit/decorators/rounded-dynamic-unit.js'
// export { ShiftedDownDynamicUnit } from './unit/decorators/shifted-down-dynamic-unit.js'
// export { ShiftedUpDynamicUnit } from './unit/decorators/shifted-up-dynamic-unit.js'
// export { DynamicNumber } from './dynamic-number.js';
// export { DynamicPath } from './dynamic-path.js';
// export { DynamicCurvedPath } from './dynamic-curved-path.js';






