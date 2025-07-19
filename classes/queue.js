export class Queue {
    static Mode = Object.freeze({DENY: 0, CYCLE: 1});

    #maxSize;
    #mode;
    #queue;

    constructor(maxSize = 0, mode = Queue.Mode.DENY) {
        this.#maxSize = Math.max(0, maxSize);
        this.#mode = mode;
        this.#queue = [];
    }

    enqueue(item) {
        if (this.#maxSize > 0 && this.#queue.length === this.#maxSize) {
            switch (this.#mode) {
                case Queue.Mode.DENY:
                    throw new Error('Queue is full!');
                case Queue.Mode.CYCLE:
                    this.#queue.shift();
            }
        }

        this.#queue.push(item);
    }

    dequeue() {
        return this.#queue.shift(); // Remove from the front
    }

    peek() {
        return this.#queue[0];
    }

    isEmpty() {
        return this.#queue.length === 0;
    }

    size() {
        return this.#queue.length;
    }

    clear() {
        this.#queue = [];
    }

    hasItem(item) {
        return this.#queue.includes(item);
    }

    toArray() {
        return [...this.#queue];
    }
}