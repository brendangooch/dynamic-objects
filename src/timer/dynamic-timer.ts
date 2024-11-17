/**
 * a timer that can be persisted
 */

import { BaseDynamicObject } from "../base-dynamic-object.js";
import { DynamicUnit } from "../unit/dynamic-unit.js";

export class DynamicTimer extends BaseDynamicObject {

    private unit: DynamicUnit;
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
        if (!this.isActive && ms > 0) {
            super.duration(ms);
        }
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
// timer.off();
// // quit game
// const state = timer.save();
// // ..
// // return to game
// timer.load(state);
// timer.on();
// timer.update(100);
// timer.update(100);
// // ..
// // ..
// // > timer is up!
