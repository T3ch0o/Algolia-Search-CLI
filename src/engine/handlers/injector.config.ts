import { ClearCacheHandler } from './commands/clear-cache.handler';
import { SetEnvHandler } from './commands/set-env.handler';

export const handlers = [
    SetEnvHandler, ClearCacheHandler
];