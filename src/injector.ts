import { Logger } from './utils/logger.util';
import { ReflectiveInjector } from "injection-js";
import { CommandEngine } from "./command-engine";
import { Settings } from './config/settings';

export const classes = [
    CommandEngine, Settings,

    // Utils
    Logger
];

// End of declarations

// We configure our injector (DIC)
export const injector = ReflectiveInjector.resolveAndCreate([...classes]);
