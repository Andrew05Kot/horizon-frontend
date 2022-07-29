export class KeyValuePair {
    public key: string;
    public value: string;

    constructor(init?: Partial<KeyValuePair>) {
        Object.assign(this, init);
    }
}
