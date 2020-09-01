import { Injectable } from 'injection-js';
import { CommandParser } from './../utils/command-parser.util';
import { Command } from 'commander';
import path from 'path';

@Injectable()
export class Settings {
    public cli: any;

    public command: string;

    public chachePath: string;

    constructor() {
        this.cli = new Command();
        this.chachePath = path.join(__dirname, 'user.json');
    }

    /**
     * Setting up all commands that the user could execute through his CLI.
     */
    public init(): void {
        this.cli
            .version('1.0.0')
            .option(
                '--set <APIKeys>',
                'set your algolia API Keys using: --set ApplicationId:SearchAPIKey:IndexName',
                CommandParser.collectInputData
            )
            .option(
                '--clear-cache',
                'clear all your data'
            )
            .option(
                '--search',
                'go to seach mode'
            )
            .parse(process.argv);
        
        this.command = CommandParser.getCommand(this.cli);
    }
}