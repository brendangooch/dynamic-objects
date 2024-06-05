/**
 * 
 */

import { iUpdateable } from "./i-updateable.js";

export interface iDynamic extends iUpdateable {
    get isComplete(): boolean;
    get isActive(): boolean;
    save(): string;
    load(json: string): void;
}