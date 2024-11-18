/**
 * aggregates DynamicPosition, DynamicRotation and a collection of DynamicNumbers into one convenient place
 * DynamicRectangle is extended by ScreenEntity to keep the ScreenEntity class size to a minimum
 *
 */

import { BaseDynamicObject } from "../base-dynamic-object.js";
import { DynamicNumber } from "../number/dynamic-number.js";
import { DynamicPosition } from "../position/dynamic-position.js";
import { DynamicRotation } from "../rotation/dynamic-rotation.js";
import { DynamicVisibility } from "../visibility/dynamic-visibility.js";

type tComponent = DynamicPosition | DynamicRotation | DynamicNumber | DynamicVisibility;

export class DynamicRectangle extends BaseDynamicObject {

    protected components: { id: string; object: tComponent }[] = [];

    public constructor() {
        super();
        this.add('visibility', new DynamicVisibility());
        this.add('position', new DynamicPosition());
        this.add('rotation', new DynamicRotation());
        this.add('opacity', new DynamicNumber());
        this.add('scale', new DynamicNumber());
        this.add('width', new DynamicNumber());
        this.add('height', new DynamicNumber());
    }

    public get isActive(): boolean {
        return this.components.every(component => component.object.isActive);
    }

    public get visibility(): DynamicVisibility {
        return <DynamicVisibility>this.find('visibility');
    }

    public get position(): DynamicPosition {
        return <DynamicPosition>this.find('position');
    }

    public get rotation(): DynamicRotation {
        return <DynamicRotation>this.find('rotation');
    }

    public get opacity(): DynamicNumber {
        return <DynamicNumber>this.find('opacity');
    }

    public get scale(): DynamicNumber {
        return <DynamicNumber>this.find('scale');
    }

    public get width(): DynamicNumber {
        return <DynamicNumber>this.find('width');
    }

    public get height(): DynamicNumber {
        return <DynamicNumber>this.find('height');
    }

    public override save(): string {
        return JSON.stringify({
            parent: super.save(),
            visibility: this.find('visibility')!.save(),
            position: this.find('position')!.save(),
            rotation: this.find('rotation')!.save(),
            opacity: this.find('opacity')!.save(),
            scale: this.find('scale')!.save(),
            width: this.find('width')!.save(),
            height: this.find('height')!.save()
        });
    }

    public override load(json: string): void {
        const state = JSON.parse(json);
        super.load(state.parent);
        this.find('visibility')!.load(state.visibility);
        this.find('position')!.load(state.position);
        this.find('rotation')!.load(state.rotation);
        this.find('opacity')!.load(state.opacity);
        this.find('scale')!.load(state.scale);
        this.find('width')!.load(state.width);
        this.find('height')!.load(state.height);
    }

    protected increment(ms: number): void {
        this.components.forEach(component => component.object.update(ms));
    }

    private add(id: string, object: tComponent): void {
        this.components.push({ id: id, object: object });
    }

    private find(id: string): tComponent | null {
        const component = this.components.find(component => component.id === id);
        return (component) ? component.object : null;
    }

}