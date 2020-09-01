import { Settings } from '../config/settings';
import figlet from 'figlet';
import chalk from 'chalk';
import { Injectable } from 'injection-js';

@Injectable()
export class Logger {
    constructor(private settings:Settings) {
    }

    public printIntroduction(): void {
        console.log(figlet.textSync('Algolia-Search-CLI', { horizontalLayout: 'full' }) + '\n');
        this.settings.cli.outputHelp();
    }

    public error(message: string): void {
        console.log(chalk.bgRed.bold(message));
    }

    public info(message: string): void {
        console.log(chalk.bgBlueBright.bold(message));
    }

    public warn(message: string): void {
        console.log(chalk.bgYellow.bold(message));
    }

    public success(message: string): void {
        console.log(chalk.bgGreen.bold(message));
    }
}