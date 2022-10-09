import { Event, EventEmitter } from "vscode";

export class CustomEvent {
    private constructor() { }
    public static customEvent = new CustomEvent();

    private readonly eventEmitter: EventEmitter<string> = new EventEmitter<string>();
    public readonly subscribe: Event<string> = this.eventEmitter.event;

    public publish(data: string) {
        this.eventEmitter.fire(data);
    }
}