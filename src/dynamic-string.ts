/**
 * 
 */

import { DynamicNumber } from "./dynamic-number.js";
import type { iDeferrable, iDynamic, tChangeStringTo } from "./index.js";


export class DynamicString implements iDynamic, iDeferrable {

    private index: DynamicNumber = new DynamicNumber();
    private changes: tChangeStringTo[] = [];
    private properties = {
        value: '',
        fullString: '',
    };

    public constructor(value: string = '') {
        this.properties.value = value;
    }

    public get value(): string {
        return this.properties.value;
    }

    public get isActive(): boolean {
        return this.index.isActive;
    }

    public get isComplete(): boolean {
        return this.index.isComplete;
    }

    public setValue(value: string): void {
        this.complete();
        this.properties.value = value;
    }

    public addChange(props: tChangeStringTo): void {
        this.changes.push(props);
    }

    public next(): void {
        const next = this.changes.shift();
        if (!next) throw new Error('no next value');
        if (next.duration === undefined && next.speed === undefined) throw new Error('you must set a speed or duration');
        if (next.value !== this.value) {
            if (next.duration === 0) this.setValue(next.value);
            else {
                this.complete();
                this.properties.fullString = next.value;
                this.properties.value = '';
                this.index.setValue(0);
                if (next.duration) {
                    this.index.addChange({
                        value: next.value.length,
                        duration: next.duration,
                        ease: next.ease
                    });
                }
                else {
                    this.index.addChange({
                        value: next.value.length,
                        speed: next.speed!,
                        ease: next.ease
                    });
                }
                this.index.next();
            }
        }
    }

    public update(deltaTime: number): void {
        if (this.isActive) {
            this.index.update(deltaTime);
            this.updateValue();
        }
    }

    public complete(): void {
        this.index.complete();
    }

    private updateValue(): void {
        this.properties.value = this.properties.fullString.substring(0, Math.round(this.index.value));
    }

}