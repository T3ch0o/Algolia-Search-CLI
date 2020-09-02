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
        this.searchQuery();
    }

    public getMethod(): string {
        return Command.SEARCH;
    }

    private searchQuery(): void {
        inquirer.prompt([{
            type: 'input',
            name: 'search',
            message: 'Search Value (on empty value you will retrieve all data) ->'
            }])
            .then((answer: string) => {
                this.alogoliaSettings.index.search(answer.search)
                    .then(({ hits }: any) => {
                        this.logger.renderTable(hits);
                        this.searchQuery();
                    })
                    .catch((err: AlgoliaSearchApiErrorResponseInterface) => {
                        this.logger.error(err.message);
                    });
            });
    }
}