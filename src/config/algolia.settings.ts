import { Logger } from './../utils/logger.util';
import { Settings } from './settings';
import { Injectable } from 'injection-js';
// @ts-ignore
const algoliasearch = require("algoliasearch");
import { readFileSync } from 'fs';
import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class AlgoliaSettings {
    public client: any;
    public index: any;
    // User is included if there's cache file
    public user: UserInterface = null;

    constructor(private settings: Settings, private logger: Logger) {
        // Getting the user file if there's such in order to use on the execution program process

        try {
            const file = readFileSync(this.settings.chachePath, 'utf-8')
            this.user = JSON.parse(file) as UserInterface;
        } catch (err) {
            // There's no reason to catch this error eventually nothing will break
        }
    }

    public init(): void {
        this.client = algoliasearch(this.user.appId, this.user.apiKey);
        this.index = this.client.initIndex(this.user.indexName);
    }
}