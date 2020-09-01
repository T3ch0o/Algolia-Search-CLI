import { ClearCacheHandler } from './commands/clear-cache.handler';
import { SetEnvHandler } from './commands/set-env.handler';
import { SearchHandler } from './commands/search.handler';

export const handlers = [
    SetEnvHandler, ClearCacheHandler, SearchHandler
];