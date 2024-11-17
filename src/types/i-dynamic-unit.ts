/**
 * 
 */

import type { tEaseOption } from "@brendangooch/ease";
import type { iUpdateable } from "@brendangooch/simple-game-loop";

export interface iDynamicUnit extends iUpdateable {
    get isActive(): boolean;
    get current(): number;
    turnOn(): void;
    turnOff(): void;
    save(): string;
    load(json: string): void;
    duration(ms: number): iDynamicUnit;
    ease(easeOption: tEaseOption): iDynamicUnit;
    start(): void;
    stop(): void;
    clone(): iDynamicUnit;
}