export class Checker {
    public static isArgsEmpty(args: string | Array<string>): boolean {
        if (Array.isArray(args)) {
            return args.filter((arg) => (!arg || 0 === arg.length)).length > 0;
        } 

        return (!args || 0 === args.length);
    }
}