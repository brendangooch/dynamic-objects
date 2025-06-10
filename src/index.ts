/**
 * package barrel file
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iUpdateable } from "@brendangooch/game-engine";

export interface iDeferrable {
    next(): void;
}

export interface iDynamic extends iUpdateable {
    get isActive(): boolean;
    get isComplete(): boolean;
    complete(): void;
}

export type tChangeTo = {
    duration: number;
    ease: tEaseOption;
};

export type tChangeNumberTo = tChangeTo & {
    value: number;
};

export type tChangePositionTo = tChangeTo & {
    x: number,
    y: number,
    angle?: number,
    distance?: number
};

export type tChangeRotationTo = tChangeNumberTo & {
    spin: number;
}

export type tChangeStringTo = tChangeTo & {
    value: string;
}

export type tChangeColorTo = tChangeTo & {
    red: number;
    green: number;
    blue: number;
}

export type tChangeWaveTo = tChangeTo & {
    numCycles: number;
    up: boolean;
    square: boolean;
};

export { DynamicUnit } from "./dynamic-unit.js";
export { DynamicNumber } from "./dynamic-number.js";
export { DynamicRotation } from "./dynamic-rotation.js";
export { DynamicPosition } from "./dynamic-position.js";
export { DynamicVector } from "./dynamic-vector.js";
export { DynamicBezier } from "./dynamic-bezier.js";
export { DynamicString } from "./dynamic-string.js";
export { DynamicColor } from "./dynamic-color.js";
export { DynamicWave } from "./dynamic-wave.js";
export { DynamicInterval } from "./dynamic-interval.js";
export { DynamicTimer } from "./dynamic-timer.js";
export { ChangeValueCommand } from "./change-value-command.js";