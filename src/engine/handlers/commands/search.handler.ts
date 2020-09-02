import { SearchCommand } from './../../../enums/search-commands.enum';
import { AlgoliaSearchApiResponseInterface } from './../../../interfaces/algolia-search-api-response.interface copy';
import { Checker } from './../../../utils/checker.util';
import { CommandParser } from './../../../utils/command-parser.util';
import { AlgoliaSearchApiErrorResponseInterface } from './../../../interfaces/algolia-search-api-error-response.interface';
import { AlgoliaSettings } from './../../../config/algolia.settings';
import { Command } from '../../../enums/commands.enum';
import { Logger } from './../../../utils/logger.util';
import { Settings } from './../../../config/settings';
import { Injectable } from 'injection-js';
import { CommandHandler } from './../command.handler';
import inquirer from 'inquirer';

@Injectable()
export class SearchHandler extends CommandHandler {
    private options: any = {};

    constructor(private settings: Settings, private logger: Logger, private alogoliaSettings: AlgoliaSettings) {
        super();
    }

    public handle(): void {
        if (null === this.alogoliaSettings.user || (this.alogoliaSettings !== null && Object.keys(this.alogoliaSettings.user).length === 0)) {
            this.logger.info('You have to set you credentials first before trying to search anything in here!');

            process.exit(0);
        }

        this.alogoliaSettings.init();
        this.logger.info('If you want to exit the search press ctrl + c')
        this.setAttributes();
    }

    public getMethod(): string {
        return Command.SEARCH;
    }

    private setAttributes(): void {
        inquirer.prompt([{
            type: 'input',
            name: 'attributes',
            message: 'Attributes you want to retrieve you can separate them like that attr1:attr2 (default: all)'
        }])
        .then((answer: { attributes: string }) => {
            if (answer.attributes) {
                this.options = {
                    attributesToRetrieve:  CommandParser.getInputData(answer.attributes)
                };
            }

            this.inputQuery();
        });
    }

    private inputQuery(): void {
        inquirer.prompt([{
            type: 'input',
            name: 'search',
            message: 'Search Value (on empty value you will retrieve all data) ->'
        }])
        .then((answer: { search: string }) => {
            this.options.page = 0;
            
            this.search(answer.search);
        });
    }

    private askForPrevOrNextPage(input: string, response: AlgoliaSearchApiResponseInterface): void {
        const currentPage = response.page + 1;

        const choices = [
            SearchCommand.NEW
        ]

        if (currentPage !== 1) {
            choices.push(SearchCommand.PREV);
        }

        if (currentPage !== response.nbPages) {
            choices.push(SearchCommand.NEXT);
        }

        inquirer.prompt([{
            type: 'list',
            name: 'command',
            message: 'Where do you want to go?',
            choices
        }])
        .then((answer: { command: string }) => {
            // Either we make a new search or we change the current page
            if (answer.command === SearchCommand.NEW) {
                this.inputQuery();
            } else {
                const page = answer.command === SearchCommand.NEXT ? (response.page + 1) : (response.page - 1);
                this.options.page = page;
                this.search(input);
            }
        });
    }

    /**
     * We are searching through the queries and if there's an options we passed them
     * 
     * @param input 
     * @param options 
     */
    private search(input: string): void {
        this.alogoliaSettings.index.search(input, this.options)
            .then((response: AlgoliaSearchApiResponseInterface) => {
                this.logger.renderTable(response);

                if (response.nbPages > 1) {
                    this.askForPrevOrNextPage(input, response);
                } else {
                    this.inputQuery();
                }
            })
            .catch((err: AlgoliaSearchApiErrorResponseInterface) => {
                this.logger.error(err.message);
            });
    }
}