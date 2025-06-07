/**
 * 
 */

import { AnimationCommand } from "@brendangooch/animation-command";
import type { iDeferrable } from "./index.js";

export class ChangeValueCommand extends AnimationCommand {

    private deferrable: iDeferrable;

    public constructor(obj: iDeferrable, duration: number) {
        super(duration);
        this.deferrable = obj;
    }

    public executionHook(): void {
        this.deferrable.next();
    }

}