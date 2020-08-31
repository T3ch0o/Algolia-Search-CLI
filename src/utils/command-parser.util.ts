export class CommandParser {
    public static collectInputData(value: string): Array<string> {
        return value.split(':');
    }

    public static getCommand(cli: any): string {
        return cli.rawArgs[2].substring(2);
    }
}