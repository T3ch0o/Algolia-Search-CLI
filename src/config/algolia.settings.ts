import { Settings } from './settings';
import { Injectable } from "injection-js";
import algoliasearch from 'algoliasearch';

@Injectable()
export class AlgoliaSettings {
    public client: any;
    public index: any;

    constructor(private settings: Settings) {}

    public init(): void {
        this.client = algoliasearch(this.settings.user.appId, this.settings.user.apiKey);
        this.index = this.client.initIndex(this.settings.user.indexName);
    }
}