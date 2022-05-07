export class Message {

    public _id: string;
    public _subject: string;
    public _msgText: string;
    public _sender: string;

    constructor(id: string, subject: string, msgText: string, sender: string) {
        this._id = id;
        this._subject = subject;
        this._msgText = msgText;
        this._sender = sender;
    }
}