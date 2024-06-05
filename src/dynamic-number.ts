/**
 * most of the functionality is conveniently inherited from the DynamicUnit property
 */

import { DynamicUnit } from "./dynamic-unit.js";

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

type tEaseOption = 'noEase' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo' | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce';



export class DynamicNumber implements iDynamic {

    private unit: DynamicUnit = new DynamicUnit();
    private previous: number;
    private next: number;

    public constructor(initial: number = 0) {
        this.previous = initial;
        this.next = initial;
    }

    public get current(): number {
        return (this.previous === this.next) ? this.previous : this.previous + (this.diff * this.unit.current);
    }

    public get isOn(): boolean {
        return this.unit.isOn;
    }

    public get isComplete(): boolean {
        return this.unit.isComplete;
    }

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public save(): string {
        return JSON.stringify({
            previous: this.previous,
            next: this.next,
            unit: this.unit.save()
        });
    }

    public load(json: string): void {
        const state = JSON.parse(json);
        if (state.previous === undefined) throw new Error('missing "previous" property');
        if (state.next === undefined) throw new Error('missing "next" property');
        if (state.unit === undefined) throw new Error('missing "unit" property');
        this.previous = state.previous;
        this.next = state.next;
        this.unit.load(state.unit);
    }

    public update(ms: number): void {
        if (this.unit.isOn) this.unit.update(ms);
        if (this.unit.isComplete && this.previous !== this.next) this.previous = this.next;
    }

    // duration === 0 changes current number immediately
    public change(next: number, duration: number, ease?: tEaseOption): void {
        if (this.isComplete && duration >= 0) {
            this.next = next;
            if (duration === 0) this.previous = next;
            else {
                if (ease !== undefined) this.unit.start(duration, { ease: ease });
                else this.unit.start(duration);
            }
        }
    }

    private get diff(): number {
        return this.next - this.previous;
    }

}