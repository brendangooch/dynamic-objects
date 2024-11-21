/**
 * a timer that can be persisted
 * contains a single callback function that is called when the duration has finished
 * callback persists throughout object life time
 * can be turned on/off and state (time elapsed) can be saved
 */

import { BaseDynamicObject } from "../base-dynamic-object.js";
import { DynamicUnit } from "../unit/dynamic-unit.js";

export class DynamicTimer extends BaseDynamicObject {

    private unit: DynamicUnit = new DynamicUnit();
    private onComplete: Function;

    public constructor(onComplete: Function) {
        super();
        this.onComplete = onComplete;
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            unit: this.unit.save()
        });
    }

    public override load(json: string): void {
        const state = JSON.parse(json);
        super.load(state.parent);
        this.unit.load(state.unit);
    }

    public override duration(ms: number): DynamicTimer {
        super.duration(ms);
        return this;
    }

    public start(): void {
        if (!this.isActive) {
            this.unit.duration(this.properties.duration).start();
        }
    }

    protected increment(ms: number): void {
        this.unit.update(ms);
    }

    protected override postUpdateComplete(): void {
        this.onComplete();
    }

}

// const timer = new DynamicTimer(() => console.log('time is uo!'));
// timer.duration(1000).start();
// timer.update(100);
// timer.update(100);
// timer.update(100);

// // quit game
// timer.off();
// const state = timer.save();
// // ..
// // return to game
// timer.load(state);
// timer.on();

// timer.update(100);
// timer.update(100);
// // ..
// // ..
// // > time is up!
