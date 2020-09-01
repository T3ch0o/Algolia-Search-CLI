import { Checker } from './../../../utils/checker.util';
import { Logger } from './../../../utils/logger.util';
import { Settings } from './../../../config/settings';
import { CommandHandler } from "./../command.handler";
import { Command } from '../../../enums/commands.enum';
import { Injectable } from 'injection-js';
import { writeFile } from 'fs';

@Injectable()
export class SetEnvHandler extends CommandHandler {
    constructor(private settings: Settings, private logger: Logger) {
        super();
    }

    public handle(): void {
        const args: Array<string> = this.settings.cli[this.getMethod()]

        if (args.length !== 3) {
            this.logger.error('Invalid length of arguments. You must provide exactly 3: ApplicationId:SearchAPIKey:IndexName.');
            process.exit(0);
        }

        if (Checker.isArgsEmpty(args)) {
            this.logger.error('One/more of the arguments is/are empty please try again with valid ones.');
            process.exit(0);
        }

        const json = JSON.stringify({
            appId: args[0],
            apiKey: args[1],
            indexName: args[2]
        });

        writeFile(this.settings.chachePath, json, 'utf8', () => { 
            this.logger.success('Your credentials are set up. You are totaly ready to go and search for some data.');
        });
    }

    public getMethod(): string {
        return Command.SET;
    }
}