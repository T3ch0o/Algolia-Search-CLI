export abstract class CommandHandler {
    public abstract handle(): void;
    public abstract getMethod(): string;
}