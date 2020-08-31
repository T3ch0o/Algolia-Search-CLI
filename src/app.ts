import "reflect-metadata";
import { injector } from "./injector";
import { Bootstrap } from './bootstrap';

const bootstrap: Bootstrap = injector.get(Bootstrap);
bootstrap.start();

