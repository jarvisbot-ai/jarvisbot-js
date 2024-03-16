export interface Message {
    content: string;
    role: "system"|"user"|"assistant";
}

export default class JarvisChatParams {


    messages?: Message[] = [
        {
            content: "You are a helpful assistant.",
            role: "system"
        },
        {
            content: "What is the capital of France?",
            role: "user"
        }
    ];
    min_p?: number = 0.05;
    mirostat_eta?: number = 0.1;
    mirostat_mode?: number = 0;
    mirostat_tau?: number = 5;
    model?: any;
    n?: number = 1;
    presence_penalty?: number = 0;
    repeat_penalty?: number = 1.1;
    response_format?: any;
    seed?: any;
    stop?: any;
    stream?: boolean = false;
    temperature?: number = 0.8;
    tool_choice?: any;
    tools?: any;
    top_k?: number = 40;
    top_p?: number = 0.95;
    user?: any;
    sse?: boolean = false;

    constructor(messages: Message[]) {
        this.messages = messages
    }
}