/**
 * 
 */

import { load as loadEase, type tEaseFunction, type tEaseOption } from '@brendangooch/ease';
import { clamp } from '@brendangooch/maths';
import type { iDynamic } from './index.js';

export class DynamicUnit implements iDynamic {

    private easeFn: tEaseFunction = loadEase('noEase');
    private properties = {
        elapsed: 0,
        duration: 0,
        value: 0
    };

    public log(msg: string): void {
        console.group(msg);
        console.log(`completed: ${this.isComplete}`);
        console.log(`active: ${this.isActive}`);
        console.log(`elapsed: ${this.properties.elapsed}`);
        console.log(`duration: ${this.properties.duration}`);
        console.log(`value: ${this.properties.value}`);
        console.groupEnd();
    }

    public get value(): number {
        return this.properties.value;
    }

    public get elapsed(): number {
        return this.properties.elapsed;
    }

    public get isActive(): boolean {
        return this.properties.elapsed !== this.properties.duration;
    }

    public get isComplete(): boolean {
        return !this.isActive;
    }

    public run(duration: number, ease: tEaseOption = 'noEase'): void {
        this.complete();
        if (duration > 0) {
            this.properties.elapsed = 0;
            this.properties.value = 0;
            this.properties.duration = duration;
            this.easeFn = loadEase(ease);
        }
    }

    public complete(): void {
        this.properties.elapsed = this.properties.duration;
        this.properties.value = 1;
    }

    public update(deltaTime: number): void {
        if (this.isActive) {
            this.incrementElapsed(deltaTime);
            this.updateCurrent();
        }
    }

    private incrementElapsed(ms: number): void {
        this.properties.elapsed += ms;
        this.properties.elapsed = clamp(this.properties.elapsed, 0, this.properties.duration);
    }

    private updateCurrent(): void {
        this.properties.value = this.easeFn(this.progress);
    }

    private get progress(): number {
        return (this.properties.elapsed === 0) ? 0 : this.properties.elapsed / this.properties.duration;
    }

}