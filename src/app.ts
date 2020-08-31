import "reflect-metadata";
import { injector } from "./injector";
import { CommandEngine } from './command-engine';

const bootstrap: CommandEngine = injector.get(CommandEngine);
bootstrap.start();

