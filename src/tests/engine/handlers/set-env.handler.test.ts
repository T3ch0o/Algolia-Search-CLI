import { readFile } from 'fs';

import 'reflect-metadata';
import { injector } from './../../../injector';
import { SetEnvHandler } from '../../../engine/handlers/commands/set-env.handler';
import { Settings } from '../../../config/settings';
import { Command } from '../../../enums/commands.enum'

const settings: Settings = injector.get(Settings);
settings.cli[Command.SET] = ['test', 'test', 'test'];

describe('[Handlers][Set Env]', () => {
    test('[handle] Should write file ...', () => {
        const setEnvHandler: SetEnvHandler = injector.get(SetEnvHandler);

        setEnvHandler.handle();

        setTimeout(() => {
            readFile(settings.chachePath, 'utf8', (erro, file) => {
                expect(file).toEqual('{"appId":"test","apiKey":"test","indexName":"test"}');
            });
        }, 1000);
    });
});