/**
 * package barrel file
 */

import type { tEaseOption } from "@brendangooch/ease";

export type tCurrentValue = number | { x: number; y: number } | string;
export interface iDynamicObject {
    get current(): tCurrentValue;
    get isActive(): boolean;
    get isComplete(): boolean;
    get isRunning(): boolean;
    get isOn(): boolean;
    turnOn(): void;
    turnOff(): void;
    load(json: string): void;
    save(): string;
    start(): void;
    stop(): void;
    pause(): void;
    duration(ms: number): iDynamicObject;
    ease(ease: tEaseOption): iDynamicObject;
    onComplete(fn: Function): iDynamicObject;
    update(ms: number): void;
    tick(): void;
    stepForwards(): void;
    stepBackwards(): void;
    complete(): void;
    rewind(): void;
    runRate(speed: number): void;
    speedUp(): void;
    slowDown(): void;
    normalSpeed(): void;
};

export { DynamicUnit } from "./unit/dynamic-unit.js";