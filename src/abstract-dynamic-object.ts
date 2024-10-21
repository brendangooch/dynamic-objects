/**
 * common functionality shared by all dynamic objects
 */

export abstract class AbstractDynamicObject {

    protected isOn: boolean = false;

    abstract get isActive(): boolean;

    public turnOn(): void {
        this.isOn = true;
    }

    public turnOff(): void {
        this.isOn = false;
    }

    public update(ms: number): void {
        if (this.isOn && this.isActive) {
            this.increment(ms);
            this.updateCurrent();
            if (!this.isActive) this.updateComplete();
        }
    }

    protected abstract increment(ms: number): void;
    protected abstract updateCurrent(): void;
    protected abstract updateComplete(): void;

}