# dynamic-objects
3 classes that represent changing values over time: Unit, Number, Position

the concept is that the client can build dynamic objects to move/animate around an HTML canvas, replacing static properties such as Number, Position (x, y) with the Dynamic version from this library.  To dynamically alter the objects properties simply call update() on each dynamic object used, passing in the number of milliseconds passed since the last update.

you need to add the following type declarations to your project custom.d.ts file to use this library in typescript projects:
```

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

type tEaseFunction = (x: number) => number;

type tEaseOption = 'noEase' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo' | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce';

type tDynamicUnitOptions = {
    repeat?: number;
    ease?: tEaseOption;
    invert?: boolean;
    alternate?: boolean;
    round?: boolean;
};
```
