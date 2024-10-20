/**
 * 
 */

testAll();
function testAll(): void {
    describe('DynamicVector', () => {

        test('dummy', () => { });

        // public get isActive(): boolean
        // starts inactive
        // does not become active once duration is set
        // does not become active once speed is set
        // becomes active once valid duration is set and moveTo() is called
        // becomes active once valid duration is set and moveBy() is called
        // becomes active once valid speed is set and moveTo() is called
        // becomes active once valid speed is set and moveBy() is called
        // becomes inactive once duration has elapsed
        // can be active whether on or off


        // public get x() / get y(): number
        // initial current x value is 0 if not set in the constructor
        // initial current y value is 0 if not set in the constructor
        // initial current x value is value set in constuctor
        // initial current y value is value set in constuctor
        // x is the same value whether unit is on or off
        // y is the same value whether unit is on or off


        // public setDuration(ms: number): DynamicNumber
        // duration can only be set if not active
        // duration must be greater than 0 to have an effect


        // public setSpeed(units: number): DynamicVector
        // speed can only be set if not active
        // speed must be greater than 0 to have an effect
        // speed is in pixels per second


        // public setEase(easeOption: tEaseOption): DynamicUnit
        // ease can only be set if not active


        // public moveTo(x: number, y: number): boolean
        // position can only be changed if not active
        // does nothing if set to current x/y values
        // CAN change if x is different and y is the same
        // CAN change if y is different and x is the same
        // if duration is not set, changes current x/y values immediately
        // if duration is set, makes path active and changes x/y values dynamically over time


        // public moveBy(x: number, y: number): boolean
        // position can only be changed if not active
        // does nothing if x & y are 0
        // CAN change if x is not 0 and y is 0
        // CAN change if y is not 0 and x is 0
        // if duration is not set, changes current x/y values immediately
        // if duration is set, makes path active and changes x/y values dynamically over time
        // changes x value by correct amount immediately
        // changes y value by correct amount immediately
        // changes x value by correct amount dynamically over time
        // changes y value by correct amount dynamically over time
        // x can be a negative value
        // y can be a negative value


        // public turnOn(): void
        // public turnOff(): void
        // turning off and on stops and starts update


        // public update(ms: number): void
        // does not update if not active
        // does not update if turned off
        // updates if active and turned on (if duration set, move method called, having been inactive)


        // public load(json: string): boolean
        // public save(): string
        // can be saved whether turned on or off
        // behaves the same after save and load
        // load returns true on valid load
        // load returns false if "" property missing
        // load returns false if "" property missing
        // load returns false if "" property missing
        // load returns false if "" property missing
        // load returns false if "" property missing
        // load returns false if "isOn" property missing


        // returns expected current value during full duration
        // returns expected current value during full duration when speed is set
        // returns expected current value during full duration with ease applied
        // works with x/y values 0 - 1
        // works with positive x to higher x
        // works with positive x to lower x
        // works with negative x to higher x
        // works with negative x to lower x
        // works with positive y to higher y
        // works with positive y to lower y
        // works with negative y to higher y
        // works with negative y to lower y

    });

}