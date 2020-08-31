import { Settings } from '../config/settings';
import figlet from 'figlet';
import { Injectable } from 'injection-js';

@Injectable()
export class Logger {
    constructor(private settings:Settings) {
    }

    public printIntroduction(): void {
        console.log(figlet.textSync('Algolia-Search-CLI', { horizontalLayout: 'full' }) + '\n');
        this.settings.command.outputHelp();
    }
}