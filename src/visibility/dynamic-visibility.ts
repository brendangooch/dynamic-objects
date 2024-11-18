/**
 * returns a boolean value to represent whether an object is visible or not
 * visibility can be set dynamically or instantly
 */

import { BaseDynamicObject } from "../base-dynamic-object.js";
import { DynamicUnit } from "../unit/dynamic-unit.js";
import { DynamicWaveForm } from "../wave-form/dynamic-wave-form.js";

export class DynamicVisibility extends BaseDynamicObject {

    private unit: DynamicUnit = new DynamicUnit();
    private wave: DynamicWaveForm = new DynamicWaveForm();
    private visible: boolean = true;
    private _frequency: number = 0;

    public get isActive(): boolean {
        return this.unit.isActive;
    }

    public get isVisible(): boolean {
        if (!this.isActive) return this.visible;
        return this.wave.current === 1;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            unit: this.unit.save(),
            visible: this.visible,
            frequency: this._frequency
        });
    }

    public override load(json: string): void {
        const state = JSON.parse(json);
        super.load(state.parent);
        this.unit.load(state.unit);
        this.visible = state.visible;
        this._frequency = state.frequency;
        this.restartWave();
    }

    public override duration(ms: number): DynamicVisibility {
        super.duration(ms);
        return this;
    }

    public frequency(frequency: number): DynamicVisibility {
        if (!this.isActive && frequency > 0) {
            this._frequency = frequency;
        }
        return this;
    }

    // stop wave form and unit, set visible to true
    public show(): void {
        this.stopBoth();
        this.visible = true;
    }

    // stop wave form, set visible to false
    public hide(): void {
        this.stopBoth();
        this.visible = false;
    }

    // configure wave form, start unit
    public blink(): void {
        if (!this.isActive && this.properties.duration > 0 && this._frequency > 0) {
            this.unit.duration(this.properties.duration).start();
            this.startWave();
        }
    }

    protected increment(ms: number): void {
        this.unit.update(ms);
        this.wave.update(ms);
    }

    protected override postUpdateComplete(): void {
        this.wave.stop();
    }

    protected override postReset(): void {
        this._frequency = 0;
    }

    private startWave(): void {
        this.wave.square(this._frequency).start();
    }

    private stopBoth(): void {
        this.unit.stop();
        this.wave.stop();
    }

    private restartWave(): void {
        if (this.isActive) {
            this.wave.stop();
            this.startWave();
        }
    }

}