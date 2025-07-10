class Node {
    value;
    next;

    constructor(item, next = null) {
        this.value = item;
        this.next = next;
    }
}

export default class LinkedStack {
    #size;
    #maxSize;
    #top;

    constructor(maxSize = 0) {
        this.#maxSize = maxSize;
        this.#top = null;
        this.#size = 0;
    }

    push(item) {
        this.#top = new Node(item, this.#top);
        this.#size++;
    }

    pop() {
        if (this.isEmpty())
            return undefined;

        const value = this.#top.value;

        this.#top = this.#top.next;
        this.#size--;

        return value;
    }

    peek() {
        return this.#top?.value;
    }

    isEmpty() {
        return this.#size === 0;
    }

    size() {
        return this.#size;
    }

    clear() {
        this.#top = null;
        this.#size = 0;
    }

    toArray() {
        const result = [];
        let current = this.#top;

        while (current) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }
}