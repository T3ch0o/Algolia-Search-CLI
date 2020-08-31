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
        console.log(chalk.red(message));
    }

    public info(message: string): void {
        console.log(chalk.blueBright(message));
    }

    public warn(message: string): void {
        console.log(chalk.yellow(message));
    }

    public success(message: string): void {
        console.log(chalk.green(message));
    }
}