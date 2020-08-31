import { CommandParser } from '../utils/command-parser.util';
import { Command } from "commander";
import { Injectable } from 'injection-js';

@Injectable()
export class Settings {
    public command: any;

    constructor() {
        this.command = new Command();
    }

    /**
     * Setting up all commands that the user could execute through his CLI.
     */
    public init(): void {
        this.command
            .version('1.0.0')
            .option(
                '--set <items>',
                'set your algolia API Keys using: --set ApplicationId:SearchAPIKey',
                CommandParser.collectInputData
            )
            .option(
                '--clear-cache',
                'clear all your data'
            )
            .parse(process.argv);
    }
}