import { Checker } from './../../../utils/checker.util';
import { Logger } from './../../../utils/logger.util';
import { Settings } from './../../../config/settings';
import { CommandHandler } from "./../command.handler";
import { Command } from "../../../enums/commands.enum";
import { Injectable } from "injection-js";
import { writeFile, exists } from 'fs';

@Injectable()
export class SetEnvHandler extends CommandHandler {
    constructor(private settings: Settings, private logger: Logger) {
        super();
    }

    public handle(): void {
        const args: Array<string> = this.settings.cli[this.getMethod()]

        if (args.length !== 2) {
            this.logger.error('Invalid length of arguments. You must provide only 2: ApplicationId:SearchAPIKey.');
            return;
        }

        if (Checker.isArgsEmpty(args)) {
            this.logger.error('One of the arguments are empty please try again with valid ones.');
            return;
        }

        const json = JSON.stringify({
            appId: args[0],
            apiKey: args[1]
        });

        writeFile('./src/cache/user.json', json, 'utf8', () => { });
    }

    public getMethod(): string {
        return Command.SET;
    }
}