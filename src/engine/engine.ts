import { Injectable, Injector } from 'injection-js';
import { CommandHandler } from './handlers/command.handler';
import { handlers } from './handlers/injector.config';

@Injectable()
export class Engine {
    private map: Map<string, CommandHandler>;

    constructor(private injector: Injector) { }

    /**
     * Filling our map with the command handlers that will handle our command execution
     */
    public init(): void {
        this.map = new Map<string, CommandHandler>();

        handlers.forEach((id: any) => {
            const service = this.injector.get(id);

            if (service instanceof CommandHandler) {
                this.map.set(service.getMethod(), service);
            }
        });
    }

    /**
     * Route the command to the appropriate Handler
     *
     * @param command
     */
    public route(command: string): void {
        if (null !== command && this.map.has(command)) {
            this.map.get(command).handle();
        }
    }
}