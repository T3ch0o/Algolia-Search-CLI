import { Logger } from './utils/logger.util';
import { Injectable } from "injection-js";

import { Settings } from './config/settings';

@Injectable()
export class CommandEngine {
    constructor(private settings: Settings, private logger: Logger) {
    }

    /**
     * Setup/proccess current command
     */
    public start(): void {
        this.settings.init();

        if (!process.argv.slice(2).length) {
            this.logger.printIntroduction();
        }
    }
}