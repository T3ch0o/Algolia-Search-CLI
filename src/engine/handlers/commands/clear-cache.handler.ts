import { Logger } from './../../../utils/logger.util';
import { Settings } from './../../../config/settings';
import { Injectable } from 'injection-js';
import { CommandHandler } from "./../command.handler";
import { writeFile } from 'fs';
import { Command } from "../../../enums/commands.enum";

@Injectable()
export class ClearCache extends CommandHandler {
    constructor(private settings: Settings, private logger: Logger) {
        super();
    }

    public handle(): void {
        writeFile(this.settings.chachePath, JSON.stringify({}), 'utf8', () => { 
            this.logger.info('Cached is cleared!');
        });
    }

    public getMethod(): string {
        return Command.CLEAR_CACHE;
    }
}