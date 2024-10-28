/**
 * barrel file for package
 */

import { tEaseOption } from '@brendangooch/ease';
import { iUpdateable } from '@brendangooch/simple-game-loop';
import { DynamicUnit } from './dynamic-unit.js';

export interface iDynamic extends iUpdateable {
    get isActive(): boolean;
    save(): string;
    load(json: string): boolean;
}

export interface iDynamicUnit extends iDynamic {
    get current(): number;
    duration(ms: number): DynamicUnit;
    ease(easeOption: tEaseOption): DynamicUnit;
    save(): string;
    load(json: string): boolean;
    run(): boolean;
    clone(): iDynamicUnit;
}

// export { AbstractDynamicObject } from './abstract-dynamic-object.js';
// export { BaseDynamicUnit } from './base-dynamic-unit.js';
// export { DynamicUnit };
// export { InvertedDynamicUnit } from './inverted-dynamic-unit.js';
// export { RoundedDynamicUnit } from './rounded-dynamic-unit.js';
// export { FlooredDynamicUnit } from './floored-dynamic-unit.js';
// export { DynamicNumber } from './dynamic-number.js';
// export { DynamicVector } from './dynamic-vector.js';
// export { DynamicBezier } from './dynamic-bezier.js';
// export { DynamicPosition } from './dynamic-position.js';
// export { DynamicInteger } from './dynamic-integer.js';