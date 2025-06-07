/**
 * when the time is up the callback gets fired
 */

import type { iUpdateable } from "@brendangooch/game-engine";
import { DynamicUnit } from "./dynamic-unit.js";

export class DynamicTimer implements iUpdateable {

    private timer: DynamicUnit = new DynamicUnit();
    private callback: Function;

    public run(duration: number, callback: Function): void {
        this.callback = callback;
        this.timer.run(duration);
    }

    public update(deltaTime: number): void {
        if (this.timer.isActive) {
            this.timer.update(deltaTime);
            if (this.timer.isComplete) this.callback();
        }
    }

}