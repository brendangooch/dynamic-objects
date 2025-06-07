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

export type tChangeWaveTo = tChangeTo & {
    numCycles: number;
    up: boolean;
    square: boolean;
};

//