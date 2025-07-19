class Node {
    value;
    next;

    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

export class LinkedQueue {
    static Mode = Object.freeze({DENY: 0, CYCLE: 1});

    #front;
    #back;
    #maxSize;
    #mode;
    #size;

    constructor(maxSize = 0, mode = LinkedQueue.Mode.DENY) {
        this.#front = null;
        this.#back = null;
        this.#size = 0;
        this.#maxSize = maxSize;
        this.#mode = mode;
    }

    enqueue(item) {
        if (this.#maxSize > 0 && this.#size === this.#maxSize) {
            switch (this.#mode) {
                case LinkedQueue.Mode.DENY:
                    throw new Error('Queue is full!');
                case LinkedQueue.Mode.CYCLE:
                    this.dequeue();
            }
        }

        const node = new Node(item);

        if (this.#back)
            this.#back.next = node;

        else
            this.#front = node;

        this.#back = node;
        this.#size++;
    }

    dequeue() {
        if (!this.#front)
            return undefined;

        const value = this.#front.value;

        this.#front = this.#front.next;
        this.#size--;

        if (!this.#front)
            this.#back = null;

        return value;
    }

    peek() {
        return this.#front?.value;
    }

    isEmpty() {
        return this.#size === 0;
    }

    size() {
        return this.#size;
    }

    clear() {
        this.#front = this.#back = null;
        this.#size = 0;
    }

    toArray() {
        const result = [];
        let current = this.#front;

        while (current) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }
}