/**
 * 
 */

import type { iUpdateable } from "@brendangooch/game-engine";
import { DynamicUnit } from "./dynamic-unit.js";


export class DynamicInterval implements iUpdateable {

    private timer: DynamicUnit = new DynamicUnit();
    private duration: number;
    private callback: Function = () => { }

    public constructor(duration: number, callback: Function) {
        this.duration = duration;
        this.callback = callback;
        this.restart();
    }

    public update(deltaTime: number): void {
        this.timer.update(deltaTime);
        if (this.timer.isComplete) {
            this.restart();
            this.callback();
        }
    }

    private restart(): void {
        this.timer.run(this.duration);
    }

}