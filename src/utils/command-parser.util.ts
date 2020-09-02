export class CommandParser {
    public static getInputData(value: string): Array<string> {
        return value.split(':');
    }

    public static getCommand(cli: any): string|null {
        if (cli.rawArgs.length < 3) {
            return null;
        }

        return cli.rawArgs[2].substring(2);
    }
}