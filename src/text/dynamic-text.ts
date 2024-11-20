/**
 * 
 * represents a string of text whose length changes instantly or over time
 * used by GameConsole for typing effect
 * 
 */

import type { tEaseOption } from "@brendangooch/ease";
import { BaseDynamicObject } from "../base-dynamic-object.js";
import { DynamicNumber } from "../number/dynamic-number.js";

export class DynamicText extends BaseDynamicObject {

    private index: DynamicNumber = new DynamicNumber(0);
    private nextString: string = '';
    private currentString: string = '';

    public constructor(initial: string = '') {
        super();
        this.currentString = initial;
    }

    public get isActive(): boolean {
        return this.index.isActive;
    }

    public get current(): string {
        return this.currentString;
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            index: this.index.save(),
            nextString: this.nextString,
            currentString: this.currentString
        });
    }

    public override load(json: string): void {
        const state = JSON.parse(json);
        super.load(state.parent);
        this.index.load(state.index);
        this.nextString = state.nextString;
        this.currentString = state.currentString;
    }

    public override getDuration(): number {
        return this.index.getDuration();
    }

    public override duration(ms: number): DynamicText {
        this.index.duration(ms);
        return this;
    }

    public override speed(unitsPerMS: number): DynamicText {
        this.index.speed(unitsPerMS);
        return this;
    }

    public override ease(easeOption: tEaseOption): DynamicText {
        this.index.ease(easeOption);
        return this;
    }

    public next(text: string): DynamicText {
        if (!this.isActive) {
            this.nextString = text;
            this.index.next(text.length);
        }
        return this;
    }

    public change(): void {
        if (!this.isActive) {
            this.index.change();
            this.updateCurrent(); // <-- instant change updates current string to full string, dynamic makes it 0 length
        }
    }

    public stop(): void {
        this.index.stop();
        this.reset();
        this.nextString = '';
    }

    protected increment(ms: number): void {
        this.index.update(ms);
        this.updateCurrent();
    }

    protected override postUpdateComplete(): void {
        this.index.next(0).change();
        this.currentString = this.nextString;
        this.nextString = '';
    }

    private updateCurrent(): void {
        this.currentString = this.nextString.substring(0, this.index.rounded);
    }

}