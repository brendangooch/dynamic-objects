/**
 * represents a unit of 0 - 1 changing over time
 */

import * as Ease from '@brendangooch/ease';
import { clamp } from '@brendangooch/maths';

interface iUpdateable {
    get isOn(): boolean;
    update(ms: number): void;
}

interface iDynamic extends iUpdateable {
    get isComplete(): boolean;
    get isActive(): boolean;
    save(): string;
    load(json: string): void;
}

type tEaseFunction = (x: number) => number;

type tEaseOption = 'noEase' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo' | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce';

type tDynamicUnitOptions = {
    repeat?: number;
    ease?: tEaseOption;
    invert?: boolean;
    alternate?: boolean;
    round?: boolean;
};

export class DynamicUnit implements iDynamic {

    private on: boolean = false;
    private elapsed: number = 0;
    private duration: number = 0;
    private ease: string = 'noEase';
    private easeFn: tEaseFunction = Ease.noEase;
    private repeat: number = 0;
    private invert: boolean = false;
    private alternate: boolean = false;
    private round: boolean = false;

    public get current(): number {
        let current = clamp(this.easeFn(this.progress), 0, 1);
        if (this.invert) current = 1 - current;
        if (this.round) current = Math.round(current);
        return current;
    }

    public get isComplete(): boolean {
        return this.elapsed === this.duration && this.repeat === 0;
    }

    public get isActive(): boolean {
        return !this.isComplete;
    }

    public get isOn(): boolean {
        return this.on;
    }

    public save(): string {
        return JSON.stringify({
            on: this.on,
            elapsed: this.elapsed,
            duration: this.duration,
            ease: this.ease,
            repeat: this.repeat,
            invert: this.invert,
            alternate: this.alternate,
            round: this.round,
        });
    }

    // throws error if a param is missing
    // SHOULD be wrapped in a try/catch block
    public load(json: string): void {

        const state = JSON.parse(json);

        if (state.on === undefined) throw new Error('missing "on" property');
        if (state.elapsed === undefined) throw new Error('missing "elapsed" property');
        if (state.duration === undefined) throw new Error('missing "duration" property');
        if (state.ease === undefined) throw new Error('missing "ease" property');
        if (state.repeat === undefined) throw new Error('missing "repeat" property');
        if (state.invert === undefined) throw new Error('missing "invert" property');
        if (state.alternate === undefined) throw new Error('missing "alternate" property');
        if (state.round === undefined) throw new Error('missing "round" property');

        this.on = state.on;
        this.elapsed = state.elapsed;
        this.duration = state.duration;
        this.ease = state.ease;
        this.easeFn = Ease.load(state.ease);
        this.repeat = state.repeat;
        this.invert = state.invert;
        this.alternate = state.alternate;
        this.round = state.round;

    }

    public update(ms: number): void {
        if (!this.isComplete) {
            this.increment(ms);
            if (this.elapsed === this.duration) {
                this.doRepeat();
                this.doAlternate();
            }
        }
        else this.turnOff();
    }

    public reset(): void {
        this.on = false;
        this.elapsed = 0;
        this.duration = 0;
        this.ease = 'noEase';
        this.easeFn = Ease.load('noEase');
        this.repeat = 0;
        this.invert = false;
        this.alternate = false;
        this.round = false;
    }

    // extract methods?
    public start(duration: number, options?: tDynamicUnitOptions): void {
        if (this.isComplete && duration >= 0) {
            this.reset();
            this.duration = duration;
            if (options !== undefined) {
                if (options.ease !== undefined) {
                    this.ease = options.ease;
                    this.easeFn = Ease.load(options.ease);
                }
                if (options.repeat !== undefined && Number.isInteger(options.repeat)) this.repeat = options.repeat;
                if (options.alternate !== undefined && this.repeat > 0) this.alternate = options.alternate;
                if (options.invert !== undefined) this.invert = options.invert;
                if (options.round !== undefined) this.round = options.round;
            }
            this.turnOn();
        }
    }

    private increment(ms: number): void {
        this.elapsed += ms;
        this.elapsed = Math.min(this.elapsed, this.duration);
    }

    private get progress(): number {
        return (this.duration === 0) ? 0 : this.elapsed / this.duration;
    }

    private doRepeat(): void {
        if (this.repeat > 0) {
            this.elapsed = 0;
            this.repeat--;
        }
    }

    private doAlternate(): void {
        if (this.alternate) this.invert = !this.invert;
    }

    private turnOn(): void {
        this.on = true;
    }

    private turnOff(): void {
        this.on = false;
    }

}