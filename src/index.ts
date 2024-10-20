/**
 * barrel file for package
 */

import { tEaseOption } from '@brendangooch/ease';
import { iUpdateable } from '@brendangooch/simple-game-loop';
import { DynamicUnit } from './dynamic-unit.js';
import { DynamicNumber } from './dynamic-number.js';
import { DynamicVector } from './dynamic-vector.js';

export interface iDynamic extends iUpdateable {
    get isActive(): boolean;
    load(json: string): boolean;
    save(): string;
}

export interface iDynamicUnit extends iDynamic {
    get current(): number
    duration(ms: number): DynamicUnit
    ease(easeOption: tEaseOption): DynamicUnit
    run(): boolean;
}

// export { DynamicUnit };
// export { BaseDynamicUnit } from './unit/decorators/base-dynamic-unit.js'
// export { InvertedDynamicUnit } from './inverted-dynamic-unit.js'
// export { RoundedDynamicUnit } from './unit/decorators/rounded-down-dynamic-unit.js'
// export { FlooredDynamicUnit } from './unit/decorators/rounded-up-dynamic-unit.js'
// export { DynamicNumber };
// export { DynamicVector };
// export { DynamicBezier };
// export { DynamicPosition };






