/**
 * 
 */

export interface iUpdateable {
    get isOn(): boolean;
    update(ms: number): void;
}