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