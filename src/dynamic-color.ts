/**
 * an rgba color that changes its rgb values over time
 * can do more with this but simple implementation for now (YAGNI)
 * 
 */

import { tEaseOption } from "@brendangooch/ease";
import { BaseDynamicObject } from "./base-dynamic-object.js";
import { DynamicNumberExtended } from "./dynamic-number-extended.js";

export class DynamicColor extends BaseDynamicObject {

    private r: DynamicNumberExtended;
    private g: DynamicNumberExtended;
    private b: DynamicNumberExtended;
    private currentValue: string = '';

    public constructor(r: number, g: number, b: number) {
        super();
        this.r = new DynamicNumberExtended(r, 0, 255);
        this.g = new DynamicNumberExtended(g, 0, 255);
        this.b = new DynamicNumberExtended(b, 0, 255);
        this.updateCurrent();
    }

    public get isActive(): boolean {
        return this.r.isActive || this.g.isActive || this.b.isActive;
    }

    public get current(): string {
        return this.currentValue;
    }

    public override duration(ms: number): DynamicColor {
        super.duration(ms);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicColor {
        super.ease(easeOption);
        return this;
    }

    public changeTo(r: number, g: number, b: number): number {
        if (this.canChange(r, g, b)) return this.doChange(r, g, b);
        return 0;
    }

    public override load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.parent === undefined) return false;
        if (state.r === undefined) return false;
        if (state.g === undefined) return false;
        if (state.b === undefined) return false;
        if (state.currentValue === undefined) return false;
        const parentLoaded = super.load(state.parent);
        this.r.load(state.r);
        this.g.load(state.g);
        this.b.load(state.b);
        this.currentValue = state.currentValue;
        return parentLoaded;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            r: this.r.save(),
            g: this.g.save(),
            b: this.b.save(),
            currentValue: this.currentValue
        });
    }

    protected increment(ms: number): void {
        this.r.update(ms);
        this.g.update(ms);
        this.b.update(ms);
    }

    protected updateCurrent(): void {
        this.currentValue = `rgb(${this.r.rounded},${this.g.rounded},${this.b.rounded})`;
    }

    protected updateComplete(): void {
        this.reset();
        this.turnOff();
    }

    private canChange(r: number, g: number, b: number): boolean {
        return !this.isActive && (r !== this.r.current || g !== this.g.current || b !== this.b.current);
    }

    private doChange(r: number, g: number, b: number): number {
        if (this._duration > 0) this.dynamicChange(r, g, b);
        else this.instantChange(r, g, b);
        return this._duration;
    }

    private instantChange(r: number, g: number, b: number): void {
        this.r.changeTo(r);
        this.g.changeTo(g);
        this.b.changeTo(b);
        this.updateCurrent();
    }

    private dynamicChange(r: number, g: number, b: number): void {
        this.r.duration(this._duration).ease(this._ease).changeTo(r);
        this.g.duration(this._duration).ease(this._ease).changeTo(g);
        this.b.duration(this._duration).ease(this._ease).changeTo(b);
        this.turnOn();
    }

    private reset(): void {
        this._duration = 0;
        this._ease = 'noEase';
    }

}