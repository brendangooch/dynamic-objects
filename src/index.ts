/**
 * package barrel file
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iUpdateable } from "@brendangooch/simple-game-loop";

export interface iDynamic extends iUpdateable {
    get isActive(): boolean;
    get isComplete(): boolean;
    get isRunning(): boolean;
    get isOn(): boolean;
    turnOn(): void;
    turnOff(): void;
    load(json: string): boolean;
    save(): string;
    start(): void;
    stop(): void;
    pause(): void;
    getDuration(): number;
    duration(ms: number): iDynamic;
    ease(ease: tEaseOption): iDynamic;
    onComplete(fn: Function): iDynamic;
    change(): boolean;
    tick(): void;
    step(dir: 1 | -1): void;
    rewind(): void;
    endNow(): void;
    runRate(speed: number): void;
};

export { DynamicUnit } from "./unit/dynamic-unit.js";