export class Page<T> {

    constructor(
        public items?: T[],
        public count?: number
    ) { }
}
