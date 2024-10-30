/**
 * a string that changes its length over time from 0 characters to full string
 * 
 */

import { tEaseOption } from "@brendangooch/ease";
import { BaseDynamicObject } from "./base-dynamic-object.js";
import { DynamicNumber } from "./dynamic-number.js";

export class DynamicString extends BaseDynamicObject {

    public static MAX_CHARS: number = 1000;

    private string: string = '';
    private currentValue: string = '';
    private index: DynamicNumber = new DynamicNumber();

    public get isActive(): boolean {
        return this.index.isActive;
    }

    public get current(): string {
        return this.currentValue;
    }

    public override duration(ms: number): DynamicString {
        super.duration(ms);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicString {
        super.ease(easeOption);
        return this;
    }

    public changeTo(next: string): number {
        if (this.canChange(next)) return this.doChange(next);
        return 0;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            string: this.string,
            currentValue: this.currentValue,
            index: this.index.save()
        });
    }

    public override load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.parent === undefined) return false;
        if (state.string === undefined) return false;
        if (state.currentValue === undefined) return false;
        if (state.index === undefined) return false;
        const parentLoaded = super.load(state.parent);
        this.string = state.string;
        this.currentValue = state.currentValue;
        this.index.load(state.index);
        return parentLoaded;
    }

    protected increment(ms: number): void {
        this.index.update(ms);
    }

    // which rounding is best?  round, up or down?
    protected updateCurrent(): void {
        this.currentValue = this.string.substring(0, this.index.rounded);
    }

    protected updateComplete(): void {
        this.reset();
        this.turnOff();
    }

    private canChange(next: string): boolean {
        return !this.isActive && next !== '';
    }

    private doChange(next: string): number {
        this.string = next;
        if (this._duration > 0) this.dynamicChange();
        else this.instantChange();
        return this._duration;
    }

    private instantChange(): void {
        this.currentValue = this.string;
    }

    private dynamicChange(): void {
        this.currentValue = '';
        this.index.duration(this._duration).ease(this.easeOption).changeTo(this.string.length);
        this.turnOn();
    }

    private reset(): void {
        this.index.changeTo(0);
        this._duration = 0;
        this.easeOption = 'noEase';
    }

}