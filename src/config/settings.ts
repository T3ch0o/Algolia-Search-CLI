import { CommandParser } from './../utils/command-parser.util';
import { Command } from "commander";
import { Injectable } from 'injection-js';

@Injectable()
export class Settings {
    public cli: any;

    public command: string;

    constructor() {
        this.cli = new Command();
    }

    /**
     * Setting up all commands that the user could execute through his CLI.
     */
    public init(): void {
        this.cli
            .version('1.0.0')
            .option(
                '--set <APIKeys>',
                'set your algolia API Keys using: --set ApplicationId:SearchAPIKey',
                CommandParser.collectInputData
            )
            .option(
                '--clear-cache',
                'clear all your data'
            )
            .parse(process.argv);
        
        this.command = CommandParser.getCommand(this.cli);
    }
}