
import 'reflect-metadata';
import { ClearCacheHandler } from './../../../engine/handlers/commands/clear-cache.handler';
import { readFile } from 'fs';
import { injector } from './../../../injector';
import { Settings } from '../../../config/settings';

const settings: Settings = injector.get(Settings);

describe('[Handlers][Clear Cache]', () => {
    test('[handle] File should be empty ...', () => {
        const clearCacheHandler: ClearCacheHandler = injector.get(ClearCacheHandler);

        clearCacheHandler.handle();

        setTimeout(() => {
            readFile(settings.chachePath, 'utf8', (erro, file) => {
                expect(file).toEqual('{}');
            });
        }, 1000);
    });
});