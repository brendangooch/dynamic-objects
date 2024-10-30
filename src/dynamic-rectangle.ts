/**
 * aggregates DynamicPosition, DynamicRotation and a collection of DynamicNumbers into one convenient place
 * DynamicRectangle is extended by ScreenEntity to keep the ScreenEntity class size to a minimum
 * all entities on the screen extend ScreenEntity
 */

import { tEaseOption } from "@brendangooch/ease";
import { tDynamicRectangleCurrentValue } from "./index.js";
import { DynamicNumber } from './dynamic-number.js';
import { DynamicPosition } from './dynamic-position.js';
import { DynamicRotation } from "./dynamic-rotation.js";
import { clamp, roundToPlaces } from "@brendangooch/maths";
import { BaseDynamicObject } from "./base-dynamic-object.js";

type tComponent = DynamicPosition | DynamicRotation | DynamicNumber;

export class DynamicRectangle extends BaseDynamicObject {

    public static DEFAULT_OPACITY: number = 1;
    public static DEFAULT_SCALE: number = 1;
    public static DEFAULT_WIDTH: number = 100;
    public static DEFAULT_HEIGHT: number = 100;

    public static MIN_OPACITY: number = 0;
    public static MIN_SCALE: number = 0;
    public static MIN_WIDTH: number = 0;
    public static MIN_HEIGHT: number = 0;

    public static MAX_OPACITY: number = 1;
    public static MAX_SCALE: number = 1000;
    public static MAX_WIDTH: number = 5000;
    public static MAX_HEIGHT: number = 5000;

    private components = {
        position: new DynamicPosition(),
        rotation: new DynamicRotation(),
        opacity: new DynamicNumber(DynamicRectangle.DEFAULT_OPACITY),
        scale: new DynamicNumber(DynamicRectangle.DEFAULT_SCALE),
        width: new DynamicNumber(DynamicRectangle.DEFAULT_WIDTH),
        height: new DynamicNumber(DynamicRectangle.DEFAULT_HEIGHT)
    };

    private currentValues = {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: DynamicRectangle.DEFAULT_OPACITY,
        scale: DynamicRectangle.DEFAULT_SCALE,
        width: DynamicRectangle.DEFAULT_WIDTH,
        height: DynamicRectangle.DEFAULT_HEIGHT
    };

    private _speed: number = 0;
    private visible: boolean = true;

    public get isActive(): boolean {
        return (
            this.components.position.isActive ||
            this.components.rotation.isActive ||
            this.components.opacity.isActive ||
            this.components.scale.isActive ||
            this.components.width.isActive ||
            this.components.height.isActive
        );
    }

    public get current(): tDynamicRectangleCurrentValue {
        return {
            x: this.currentValues.x,
            y: this.currentValues.y,
            rotation: this.currentValues.rotation,
            opacity: this.currentValues.opacity,
            scale: this.currentValues.scale,
            width: this.currentValues.width,
            height: this.currentValues.height
        }
    }

    public get isVisible(): boolean {
        return this.visible;
    }

    // CAN be set if active so don't call super()
    public override duration(ms: number): DynamicRectangle {
        if (ms > 0) {
            this._duration = ms;
            this._speed = 0;
        }
        return this;
    }

    // CAN be set if active
    public speed(unitsPerMs: number): DynamicRectangle {
        if (unitsPerMs > 0) {
            this._speed = unitsPerMs;
            this._duration = 0;
        }
        return this;
    }

    // CAN be set if active so don't call super()
    public override ease(easeOption: tEaseOption): DynamicRectangle {
        this.easeOption = easeOption;
        return this;
    }

    public moveTo(x: number, y: number): number {
        if (this.isDynamic) this.dynamicChange(this.components.position);
        const duration = this.components.position.moveTo(x, y);
        if (!this.isDynamic) this.updateCurrentPosition();
        this.reset();
        return duration;
    }

    public curveTo(x: number, y: number, distance: number, angle: number): number {
        if (this.isDynamic) this.dynamicChange(this.components.position);
        const duration = this.components.position.curveTo(x, y, distance, angle);
        if (!this.isDynamic) this.updateCurrentPosition();
        this.reset();
        return duration;
    }

    // cannot set speed on rotation
    public rotateTo(radians: number): number {
        if (this.isDynamic) this.dynamicChange(this.components.rotation);
        const duration = this.components.rotation.rotateTo(radians);
        if (!this.isDynamic) this.updateCurrentRotation();
        this.reset();
        return duration;
    }

    // cannot set speed on rotation
    public spinTo(numSpins: number, radians: number): number {
        if (this.isDynamic) this.dynamicChange(this.components.rotation);
        const duration = this.components.rotation.spinTo(numSpins, radians);
        if (!this.isDynamic) this.updateCurrentRotation();
        this.reset();
        return duration;
    }

    public fadeTo(opacity: number): number {
        opacity = clamp(opacity, 0, DynamicRectangle.MAX_OPACITY);
        if (this.isDynamic) this.dynamicChange(this.components.opacity);
        const duration = this.components.opacity.changeTo(opacity);
        if (!this.isDynamic) this.updateCurrentOpacity();
        this.reset();
        return duration;
    }

    public scaleTo(scale: number): number {
        scale = clamp(scale, 0, DynamicRectangle.MAX_SCALE);
        if (this.isDynamic) this.dynamicChange(this.components.scale);
        const duration = this.components.scale.changeTo(scale);
        if (!this.isDynamic) this.updateCurrentScale();
        this.reset();
        return duration;
    }

    public widthTo(width: number): number {
        width = clamp(width, 0, DynamicRectangle.MAX_WIDTH);
        if (this.isDynamic) this.dynamicChange(this.components.width);
        const duration = this.components.width.changeTo(width);
        if (!this.isDynamic) this.updateCurrentWidth();
        this.reset();
        return duration;
    }

    public heightTo(height: number): number {
        height = clamp(height, 0, DynamicRectangle.MAX_HEIGHT);
        if (this.isDynamic) this.dynamicChange(this.components.height);
        const duration = this.components.height.changeTo(height);
        if (!this.isDynamic) this.updateCurrentHeight();
        this.reset();
        return duration;
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }

    public override load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.parent === undefined) return false;
        if (state.position === undefined) return false;
        if (state.rotation === undefined) return false;
        if (state.opacity === undefined) return false;
        if (state.scale === undefined) return false;
        if (state.width === undefined) return false;
        if (state.height === undefined) return false;
        if (state.currentValues === undefined) return false;
        if (state.speed === undefined) return false;
        if (state.visible === undefined) return false;
        const parentLoaded = super.load(state.parent);
        this.components.position.load(state.position);
        this.components.rotation.load(state.rotation);
        this.components.opacity.load(state.opacity);
        this.components.scale.load(state.scale);
        this.components.width.load(state.width);
        this.components.height.load(state.height);
        this.currentValues = state.currentValues;
        this._speed = state.speed;
        this.visible = state.visible;
        return parentLoaded;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            position: this.components.position.save(),
            rotation: this.components.rotation.save(),
            opacity: this.components.opacity.save(),
            scale: this.components.scale.save(),
            width: this.components.width.save(),
            height: this.components.height.save(),
            currentValues: this.currentValues,
            speed: this._speed,
            visible: this.visible
        });
    }

    // if the component has completed its update, set its final current value of this cycle
    protected increment(ms: number): void {
        this.components.position.update(ms);
        if (!this.components.position.isActive) this.updateCurrentPosition();
        this.components.rotation.update(ms);
        if (!this.components.rotation.isActive) this.updateCurrentRotation();
        this.components.opacity.update(ms);
        if (!this.components.opacity.isActive) this.updateCurrentOpacity();
        this.components.scale.update(ms);
        if (!this.components.scale.isActive) this.updateCurrentScale();
        this.components.width.update(ms);
        if (!this.components.width.isActive) this.updateCurrentWidth();
        this.components.height.update(ms);
        if (!this.components.height.isActive) this.updateCurrentHeight();
    }

    // only calculate the new current value if the component is active
    protected updateCurrent(): void {
        if (this.components.position.isActive) this.updateCurrentPosition();
        if (this.components.rotation.isActive) this.updateCurrentRotation();
        if (this.components.opacity.isActive) this.updateCurrentOpacity();
        if (this.components.scale.isActive) this.updateCurrentScale();
        if (this.components.width.isActive) this.updateCurrentWidth();
        if (this.components.height.isActive) this.updateCurrentHeight();
    }

    protected updateComplete(): void {
        this.turnOff();
    }

    // rounded for efficiency as per MDN Canvas docs recommendation
    private updateCurrentPosition(): void {
        this.currentValues.x = Math.round(this.components.position.x);
        this.currentValues.y = Math.round(this.components.position.y);
    }

    // rounded to 2 places should be precise enough
    private updateCurrentRotation(): void {
        this.currentValues.rotation = roundToPlaces(this.components.rotation.current, 2);
    }

    // rounded to 2 places should be precise enough
    private updateCurrentOpacity(): void {
        this.currentValues.opacity = roundToPlaces(this.components.opacity.current, 2);
    }

    // rounded to 2 places should be precise enough
    private updateCurrentScale(): void {
        this.currentValues.scale = roundToPlaces(this.components.scale.current, 2);
    }

    // rounded for efficiency as per MDN Canvas docs recommendation
    private updateCurrentWidth(): void {
        this.currentValues.width = this.components.width.rounded;
    }

    // rounded for efficiency as per MDN Canvas docs recommendation
    private updateCurrentHeight(): void {
        this.currentValues.height = this.components.height.rounded;
    }

    private get isDynamic(): boolean {
        return this._duration > 0 || this._speed > 0;
    }

    private dynamicChange(component: tComponent): void {
        this.setDuration(component);
        this.setSpeed(component);
        this.setEase(component);
        this.turnOn();
    }

    private setDuration(component: tComponent): void {
        if (this._duration > 0) component.duration(this._duration);
    }

    private setSpeed(component: tComponent): void {
        if (this._speed > 0) component.speed(this._speed);
    }

    private setEase(component: tComponent): void {
        if (this.easeOption !== 'noEase') component.ease(this.easeOption);
    }

    private reset(): void {
        this._duration = 0;
        this._speed = 0;
        this.easeOption = 'noEase';
    }

}