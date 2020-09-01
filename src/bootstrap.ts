import { Engine } from './engine/engine';
import { Logger } from './utils/logger.util';
import { Injectable } from 'injection-js';

import { Settings } from './config/settings';

@Injectable()
export class Bootstrap {
    constructor(private settings: Settings, private logger: Logger, private engine: Engine) {
    }

    /**
     * Setup/proccess current command
     */
    public start(): void {
        this.settings.init();

        if (process.argv.length < 3) {
            this.logger.printIntroduction();
        }

        this.engine.init();
        this.engine.route(this.settings.command);
    }
}