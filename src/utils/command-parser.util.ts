export class CommandParser {
    public static collectInputData(value: string): Array<string> {
        return value.split(':');
    }
}