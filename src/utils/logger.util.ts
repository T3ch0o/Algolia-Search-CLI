import { Settings } from '../config/settings';
import figlet from 'figlet';
import chalk from 'chalk';
import { Injectable } from 'injection-js';
import { AlgoliaSearchApiResponseInterface } from '../interfaces/algolia-search-api-response.interface';
import { report } from 'process';

@Injectable()
export class Logger {
    constructor(private settings:Settings) {
    }

    public printIntroduction(): void {
        console.log(figlet.textSync('Algolia-Search-CLI', { horizontalLayout: 'full' }) + '\n');
        this.wrapLog();
        this.settings.cli.outputHelp();
    }

    public error(message: string): void {
        this.wrapLog();
        console.log(chalk.bgRed.bold(message));
        this.wrapLog();
    }

    public info(message: string): void {
        this.wrapLog();
        console.log(chalk.bgBlue.bold(message));
        this.wrapLog();
    }

    public warn(message: string): void {
        this.wrapLog();
        console.log(chalk.bgYellow.bold(message));
        this.wrapLog();
    }

    public success(message: string): void {
        this.wrapLog();
        console.log(chalk.bgGreen.bold(message));
        this.wrapLog();
    }

    /**
     * Getting the list with results and rending table of it
     * 
     * @param list 
     */
    public renderTable(response: AlgoliaSearchApiResponseInterface): void {
        const map: Array<any> = [];

        // Going through the object list
        for (const data of response.hits) {
            const finalObj: any = {};

            // Going through the object(keys - values)
            for (const objName in data) {

                // Prevent from displaying sensitive data so we don't push anything we don't want to see
                if (!objName.startsWith('_') && !objName.includes('objectID')) {
                    // Having a small check for null values in case there's such
                    finalObj[objName] = null === data[objName] ? '-' : data[objName];
                }
            }

            map.push(finalObj);
        }

        if (map.length > 0) {
            console.table(map);
            console.log(`----- Page <<${response.page + 1} of ${response.nbPages}>> -----`)
        } else {
            console.log(chalk.bgBlue.bold('There is no data in this seach query'));
        }
    }

    private wrapLog(): void {
        console.log('='.repeat(process.stdout.columns));
    }
}