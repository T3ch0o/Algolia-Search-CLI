import { Injectable } from 'injection-js';
import { existsSync, readFile } from 'fs';
import { UserInterface } from './../interfaces/user.interface';
import { CommandParser } from './../utils/command-parser.util';
import { Command } from "commander";

@Injectable()
export class Settings {
    public cli: any;

    public command: string;

    // User is included if there's cache file
    public user: UserInterface;

    public chachePath = './src/cache/user.json'

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

        // Getting the user file if there's such in order to use on the execution program process
        try {
            if (existsSync(this.chachePath)) {
                readFile(this.chachePath, 'utf-8', (err: any, data: any) => {
                    this.user = JSON.parse(data);
                });
            }
        } catch(err) {
            console.error('Something went wrong with the system please try again.');
        }
    }
}